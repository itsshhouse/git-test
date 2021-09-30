import Logger from '@/extensions/Logger';
import Request from '@/extensions/Request';
import Utilities from '@/extensions/Utilities';
import {
  IApp,
  IItsRouter,
  ILayoutModule,
  ILoginModule,
  ISettings,
  IUser,
  TopicArray,
} from '@/generic';
import ItsVueRouter from '@/generic/ItsRouter';
import config from '@/setting/config';
import { isEmpty } from 'underscore';
import { isBlank } from 'underscore.string';
import guid from './Guid';
import Module from '@/generic/Module';
import Topic from './Topic';
import Callbacks from '@/generic/Callback';
import I18NFactory from '@/extensions/i18n';
import Vue from 'vue';
import I18NData from '@/resource/i18n/zh-CN';

export default class ItsApp implements IApp {
  private appTag = 'data-ItsApp';

  protected topics: TopicArray;

  protected referedModules!: {
    [x: string]: any;
  };

  protected modules: Module[] = [];

  private _name!: string;

  public layout!: ILayoutModule;

  public utilities: Utilities;

  public request!: Request;

  public logger: Logger;

  public locale: string;

  public i18n!: I18NData;

  public setting: ISettings;

  public loginModule!: ILoginModule;

  public router: IItsRouter;

  public user = {} as IUser;

  public guid = guid;

  private static applist: { [name: string]: ItsApp } = {};

  constructor(public name: string, public apiUrl: string) {
    const settings = config;
    this.utilities = new Utilities(this);
    this.topics = {};
    this.logger = new Logger();
    this.setting = settings;
    ItsApp.applist[name] = this;
    this.locale = this.utilities.getCookie('language');
    if (this.locale || this.locale === '') {
      if (settings.language && settings.language !== '') {
        this.locale = settings.language;
      } else {
        this.locale = 'zh-CN';
      }
    }
    this.router = new ItsVueRouter(this);
  }

  public getModule(name: string): Module | null {
    const mod = this.modules.find(m => m.name === name);
    return mod === undefined ? null : mod;
  }

  public loadModule(name: string): Promise<Module> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const app: ItsApp = this;
    // eslint-disable-next-line consistent-return
    return new Promise<Module>(async loadResolve => {
      const exist = this.modules.some(m => m.name === name);
      if (exist) {
        // loadResolve(this.modules.find(m => m.name === name));
      } else {
        const path = `../components/${name}/${name}`;
        try {
          const m = await import(`../components/${name}/${name}`);
          // eslint-disable-next-line no-shadow
          const ModuleT: new (app: ItsApp) => Module = m[name];
          const comp = new ModuleT(app);
          comp.initialize();
          comp.name = name;
          comp.modulePath = path;
          this.referedModules[name] = comp;
          this.modules.push(comp);
          loadResolve(comp);
        } catch (err) {
          return this.logger.error;
        }
      }
    });
  }

  public async start() {
    await this.i18nInitialize(this, this.locale).then(async () => {
      this.request = new Request(this, this.apiUrl);

      await this.prepareModules(async () => {
        // initialize all modules
        Object.keys(this.referedModules).forEach(key => {
          // const path = this.referedModules[key];
          const Component = this.referedModules[key];
          const Comp: new (app: ItsApp) => Module = Component[key] || Component.default;
          const mod = new Comp(this);
          mod.initialize();
          mod.name = key;
          mod.modulePath = key;
          this.modules.push(mod);
        });
        if (this.setting.startModule && !isBlank(this.setting.startModule)) {
          const layoutmodule: any = this.getModule(this.setting.startModule);
          const layoutM = layoutmodule as ILayoutModule;
          this.layout = layoutM;
        }
        if (this.setting.requireLogin && !isBlank(this.setting.loginModule)) {
          const moduleloaded: any = this.getModule(this.setting.loginModule);
          this.loginModule = moduleloaded as ILoginModule;
          if (this.loginModule && this.loginModule.login) {
            this.loginModule.login((user: IUser) => {
              this.user = user;
              if (this.layout) {
                this.layout.initalizeLayout();
                this.Topic('ItsApp.moduleLoaded').publish();
              }
            });
          } else {
            const msg = `failed to load login module: ${this.setting.loginModule}`;
            this.logger.error(msg);
            // alert(msg);
          }
        } else if (this.layout) {
          this.layout.initalizeLayout();
          this.Topic('ItsApp.moduleLoaded').publish();
        }
      });
    });
  }

  private async prepareModules(action: () => void) {
    // download all refereed mod resources
    const refs = document.querySelectorAll('modref');
    const result: {
      [x: string]: Module;
    } = {};

    const moduleNames: string[] = [];

    // added layout
    const startModuleName = this.setting.startModule;
    if (!isBlank(startModuleName)) {
      const name = startModuleName;
      result[startModuleName] = await import(`../components/${name}/${name}`)
        .catch
        // this.logger.error
        ();
      moduleNames.push(name);
    }

    refs.forEach(async $refs => {
      const moduleName = $refs.getAttribute('data-module') as string;
      if (!isBlank(moduleName)) {
        const _name = moduleName;
        result[moduleName] = await import(`../components/${_name}/${_name}`);
        moduleNames.push(_name);
      }
    });

    this.referedModules = result;
    if (action) {
      action();
    }
  }

  public Topic(topicName: string): Topic {
    let callbacks: Callbacks;
    let topic: Topic = this.topics[topicName];
    if (!topic) {
      callbacks = new Callbacks('');
      topic = new Topic(topicName, this.logger);
      topic.publish = function tpPublish(...args) {
        const msg = `topic published with id: ${topicName}`;
        callbacks.fire.apply(topic, Array.from(args));
        if (this.logger) {
          try {
            this.logger.log(msg);
          } catch (e) {
            this.logger.error(msg);
          }
        }
      };
      topic.subscribe = function tpSub(...args) {
        const msg = `topic subscribed with id: ${topicName}`;
        callbacks.add.apply(topic, Array.from(args));
        if (this.logger) {
          try {
            this.logger.log(msg);
          } catch (e) {
            this.logger.error(msg);
          }
        }
      };
      topic.unsubscribe = callbacks.remove;
      if (topicName) {
        this.topics[topicName] = topic;
      }
    }
    return topic;
  }

  public i18nInitialize(module: ItsApp, language?: string): Promise<boolean> {
    // TODO: I18n

    const i18nFactory = new I18NFactory(this);
    Vue.use(i18nFactory);
    return new Promise<boolean>(i18nResolve => {
      i18nFactory
        .getLanguageResrouce(language)
        .then(
          data => {
            // eslint-disable-next-line no-param-reassign
            module.i18n = data;
            i18nResolve(true);
          },
          err => this.logger.error
        )
        .catch(err => this.logger.error);
    });
  }
}
