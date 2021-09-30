import VueRender from '@/components/Layout/VueRender';
import { getFnName, IDialog, ILayoutModule, IUIRender, ViewExtension } from '@/generic';
import BaseView from '@/generic/BaseView';
import Controller from '@/generic/Controller';
import ItsApp from '@/generic/ItsApp';
import Module from '@/generic/Module';
import View from '@/generic/View';
import _ from 'underscore';

export default class Layout extends Module implements ILayoutModule {
  protected _messageBox: IDialog;

  constructor(app: ItsApp) {
    super(app);
    // TODO: _messageBox
    this._messageBox = {
      alert(message: string, closeCallback?: () => void) {
        if (typeof closeCallback === 'function') {
          closeCallback();
        }
      },
      confirm(message: string, closeCallback?: (result: boolean) => void) {
        if (typeof closeCallback === 'function') {
          closeCallback(true);
        }
      },
      show(options: any) {
        return options;
      },
    };
  }

  public get messageBox() {
    return this._messageBox;
  }

  // TODO: loadingMessage
  public loadingMessage = {
    showIn(container: HTMLElement) {
      return typeof container;
    },
    close(name: string) {
      name.split(',');
    },
  };

  // get loadingMessage(): ILoadingMessage {
  //   let _children: JQuery<HTMLElement>;
  //   const loading: ILoadingMessage = {
  //     showIn: (container: HTMLElement) => {
  //       _children = $(container).children();

  //       for (const child of _children) {
  //         $(child).addClass('dss-loading-hide');
  //       }
  //       const guid = this.app.guid();
  //       const msg =
  //         '<div id="loadingmsg-' +
  //         guid +
  //         '" class="alert alert-info" role="alert">' +
  //         this.app.i18n.request.loading +
  //         '</div>';
  //       $(container).append(msg);
  //       return guid;
  //     },
  //     close: (name: string) => {
  //       const $loading = $('#loadingmsg-' + name);
  //       if ($loading.length > 0) {
  //         $($loading).remove();
  //       }
  //       for (const child of _children) {
  //         $(child).removeClass('dss-loading-hide');
  //       }
  //     },
  //   };
  //   return loading;
  // }

  // get messageBox(): typeof BootstrapDialog {
  //   return this._messageBox;
  // }

  public getAllViews(): View[] {
    const viewsDiv = document.querySelectorAll('[data-itsapp][data-controller][data-view]');
    const result: View[] = [];
    Array.from(viewsDiv).forEach((viewDiv: any) => {
      result.push(viewDiv.view);
    });
    return result;
  }

  public initalizeLayout() {
    const viewsDiv = document.querySelectorAll('[data-itsapp][data-controller][data-view]');

    let finishCount = viewsDiv.length;

    Array.from(viewsDiv).forEach((viewDiv: any) => {
      const conf = this.getViewConfig(viewDiv);
      if (!conf.moduleName || _.isEmpty(conf.moduleName)) {
        this.app.logger.error('this.app.i18n.layout.view_config_error');
      }

      this.initView(viewDiv as HTMLElement).then(
        view => {
          view.controller.view.render();
          finishCount--;
          if (finishCount === 0) {
            this.app.Topic('all.views.loaded').publish();
          }
        },
        failedId => {
          this.app.logger.error(`failed to load js ${failedId}`);
        }
      );
    });
  }

  public createUIRender(view: BaseView): IUIRender {
    const render = new VueRender(view);
    return render;
  }

  private getViewConfig(
    element: HTMLElement
  ): {
    moduleName: string;
    controllerName: string;
    viewName: string;
    visible: boolean;
    enable: boolean;
  } {
    const result: any = {};
    result.moduleName = element.dataset.itsapp;
    result.controllerName = element.dataset.controller;
    result.viewName = element.dataset.view;
    result.visible = element.dataset.visible === 'true';
    result.enable = element.dataset.enabled === 'true';

    return result;
  }

  private initView(
    element: HTMLElement,
    extention: ViewExtension = {
      name: 'View',
    }
  ): Promise<View> {
    const config = this.getViewConfig(element);
    let mod = this.app.getModule(config.moduleName);

    const cb = async (
      module: Module,
      initViewResolve: (value?: View | PromiseLike<View> | undefined) => void
    ) => {
      const ViewType: new (el: HTMLElement) => View = await import(
        `../${config.moduleName}/${config.viewName}`
      )
        .then(v => v[config.viewName])
        .catch(err => this.app.logger.error);
      if (!element.id || element.id === '') {
        element.id = this.app.guid();
      }
      const view: View = new ViewType(element);
      const elany: any = element;
      elany.view = view;
      const parent = element.parentElement && element.parentElement.closest('[data-view]');
      if (parent != null) {
        const parentEle: any = parent;
        const parentView: View = parentEle.view;
        parentView.addChild(view);
      }
      if (extention) {
        view.extension = extention;
      }
      this.app.logger.log(`initializing view:${config.viewName}`);
      mod = module;
      mod.CreateController(view);
      initViewResolve(view);
    };

    return new Promise(initViewResolve => {
      if (mod == null) {
        this.app.loadModule(config.moduleName).then(loadModule => cb(loadModule, initViewResolve));
      } else {
        cb(mod, initViewResolve);
      }
    });
  }

  public createViewByName(
    moduleName: string,
    controllerName: string,
    viewName: string,
    parentView: View | null,
    extention: ViewExtension = {
      name: 'View',
    }
  ): Promise<View> {
    const element = document.createElement('div');
    element.setAttribute('data-itsapp', moduleName);
    element.setAttribute('data-view', viewName);
    element.setAttribute('data-controller', controllerName);
    element.setAttribute('data-visible', 'false');
    element.setAttribute('data-enabled', 'true');

    return this.initView(element, extention).then(view => {
      if (parentView && parentView != null) {
        parentView.addChild(view);
      } else {
        document.body.appendChild(element);
      }
      return view;
    });
  }

  public createView<ModuleT extends Module, ControllerT extends Controller<ModuleT, ModuleT>>(
    mod: ModuleT,
    viewType: new (el: HTMLElement) => View,
    controllerT: new (module: Module, view: View) => Controller<ModuleT, ModuleT>,
    parentView: BaseView | null = null,
    extention: ViewExtension = {
      name: 'View',
    }
  ): Promise<View> {
    const element = document.createElement('div');
    element.setAttribute('data-itsapp', mod.name);
    element.setAttribute('data-view', getFnName(viewType));
    element.setAttribute('data-controller', getFnName(controllerT));
    element.setAttribute('data-visible', 'false');
    element.setAttribute('data-enabled', 'true');

    return this.initView(element, extention).then(view => {
      if (parentView && parentView != null) {
        parentView.addChild(view);
      } else {
        document.body.appendChild(element);
      }
      return view;
    });
  }
}
