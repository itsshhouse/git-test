import Vue, { PluginObject } from 'vue';
import ItsApp from '@/generic/ItsApp';
import I18NData from '@/resource/i18n/zh-CN';

const DEFAULT_OPTIONS = {
  baseUrl: 'i18n',
  fallbackLanguage: 'zh-CN',
  timeout: 500,
  async: false,
};

export default class I18NFactory implements PluginObject<any> {
  public app: ItsApp;

  public itsapp: any;

  public language: string;

  public data!: I18NData;

  public opts!: {
    baseUrl: string;
    fallbackLanguage: string;
    timeout: number;
    async: boolean;
  };

  constructor(app: ItsApp) {
    this.app = app;
    this.language = DEFAULT_OPTIONS.fallbackLanguage;
  }

  public async getLanguageResrouce(language = DEFAULT_OPTIONS.fallbackLanguage) {
    if (language && language === 'zh-CN') {
      const i18nData = await import(`../resource/i18n/${language}`).catch(
        err => this.app.logger.error
      );
      // eslint-disable-next-line new-cap
      this.data = new i18nData.default();
      this.language = language;
    }
    return this.data;
  }

  public install(vue: typeof Vue, options: any) {
    this.opts = { ...DEFAULT_OPTIONS };
    const update = (vm: any) => {
      let i = vm._watchers.length;
      while (i--) {
        vm._watchers[i].update(true); // shallow updates
      }
      const children = vm.$children;
      i = children.length;
      while (i--) {
        const child = children[i];
        update(child);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const i18n = this;
    vue.prototype.$setLanguage = (vm: any, callback: (args?: any) => void) => {
      // console.debug("Setting language: " + language);

      vm.$language = i18n.language;
      vm.$i18n = i18n.data;

      update(vm.$root);
      if (callback) {
        callback();
      }
    };
  }
}
