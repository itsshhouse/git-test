/* eslint-disable no-use-before-define */
/* eslint-disable no-multi-assign */
import _ from 'underscore';
import Module from '@/generic/Module';
import Controller from './Controller';

import { getFnName, IUIRender, ViewExtension, IModel } from '@/generic';
import guid from '@/generic/Guid';

export type TemplateChangedFunc = (
  sender: BaseView<Controller<IModel, Module>, Module>,
  tpl: string
) => void;

export type ViewVisibleChangedFunc = (
  sender: BaseView<Controller<IModel, Module>, Module>
) => boolean;

export type ViewEnableChangedFunc = (sender: BaseView<Controller<IModel, Module>, Module>) => void;

export type ViewRenderedFunc = (sender: BaseView<Controller<IModel, Module>, Module>) => void;

export default class BaseView<
  ControllerT extends Controller<IModel, Module> = Controller<IModel, Module>,
  T extends Module = Module
> {
  public extension: ViewExtension = {
    name: 'BaseView',
  };

  public myVue!: any;

  // load .vue file
  public onShow: ViewVisibleChangedFunc = () => false;

  public onHide: ViewVisibleChangedFunc = () => false;

  public onEnableChanged: ViewEnableChangedFunc = () => false;

  public onViewRendered: ViewRenderedFunc = () => false;

  public _$mounted(vm: any) {}

  protected _moduleName!: string;

  protected _controllerName!: string;

  protected _children: BaseView<Controller<IModel, Module>, Module>[] = [];

  protected _template!: string;

  protected element!: HTMLElement;

  protected _uiRender!: IUIRender;

  private _rendered = false;

  protected _controller!: ControllerT;

  private _parent!: BaseView<Controller<IModel, Module>, Module>;

  set controller(controller: ControllerT) {
    if (this._controller !== controller && controller !== null) {
      this._controller = controller;
      if (this._controller.view !== this) {
        this._controller.view = this;
      }
      this._rendered = false;
      this.element.dataset.itsapp = getFnName(this._controller.module);
      this.element.dataset.controller = getFnName(this._controller);
      this._uiRender = this._controller.module.app.layout.createUIRender(this);
    } else if (controller === null) {
      //  [old]  this._controller = null;
      delete this._controller;
      // this._uiRender = null;
      // delete this._uiRender;
    }
  }

  get controller(): ControllerT {
    return this._controller;
  }

  set template(tpl: string) {
    if (this._template !== tpl) {
      this._template = tpl;
      this._uiRender.template = tpl;
      if (this.onTemplateChanged && this.onTemplateChanged != null) {
        this.onTemplateChanged(this, this._template);
      }
    }
  }

  get template() {
    return this._template;
  }

  get parent() {
    return this._parent;
  }

  set parent(view: BaseView<Controller<IModel, Module>, Module>) {
    this._parent = view;
    // consider to change, avoid to use addChild. TODO YUS
    if (this._parent && this._parent != null) {
      this._parent.addChild(this);
    }
  }

  get module(): T {
    return this._controller.module as T;
  }

  get children(): BaseView<Controller<IModel, Module>, Module>[] {
    return _.clone(this._children);
  }

  get controllerName(): string {
    return this._controllerName;
  }

  get moduleName(): string {
    return this._moduleName;
  }

  get css(): string {
    const csss = this.element.className;
    if (!csss) {
      return '';
    }
    return csss;
  }

  set css(css: string) {
    let newcss = this.css.replace('hide', '');
    newcss = newcss.replace('invisible', '');
    this.element.className = css;
  }

  get container() {
    return this.element;
  }

  get enable() {
    return this.element.dataset.enabled === 'true';
  }

  set enable(v: boolean) {
    this.element.dataset.enabled = v ? 'true' : 'false';
    if (v) {
      this.css = this.css.replace('disabled', '').replace('disable', '');
    } else {
      let newcss = this.css.replace('disabled', '').replace('disable', '');
      this.css = newcss += ' disabled disable ';
    }

    if (this.onEnableChanged && this.onEnableChanged != null) {
      this.onEnableChanged(this);
    }
  }

  get visible() {
    return this.element.dataset.visible === 'true';
  }

  set visible(v: boolean) {
    if (v) {
      this.show();
    } else {
      this.hide();
    }
  }

  constructor(template = '') {
    this._template = template;
    this.element = document.createElement('div');
    this.element.id = guid();
    // this._moduleName = element.dataset['itsapp'];
    // this._controllerName = element.dataset['controller'];
    // this.visible = element.dataset['visible'] == "true" ? true : false;
    // this.enable = element.dataset['enabled'] == "true" ? true : false;
    this.element.dataset.view = getFnName(this);

    // this.element.addEventListener('destroyed', () => {
    //   this.close();
    // });
  }

  public onTemplateChanged: TemplateChangedFunc = (
    sender: BaseView<Controller<IModel, Module>, Module>,
    tpl: string
  ) => false;

  public IsRole(role: string): boolean {
    if (
      this.controller &&
      this.controller.module.app.user &&
      this.controller.module.app.user.roles
    ) {
      return _.contains(this.controller.module.app.user.roles, role);
    }
    return false;
  }

  public IsMemberOf(group: string): boolean {
    if (
      this.controller &&
      this.controller.module.app.user &&
      this.controller.module.app.user.groups
    ) {
      return _.contains(this.controller.module.app.user.groups, group);
    }
    return false;
  }

  public addChild(view: BaseView<Controller<IModel, Module>, Module>) {
    // for (const v of this._children) {
    //   if (v === view) {
    //     return;
    //   }
    // }
    if (this._children.some(c => c === view)) {
      return;
    }

    view._parent = this;
    if (this.attachChild && this.attachChild != null) {
      this.attachChild(view);
    }
    this._children.push(view);
  }

  public removeChild(view: BaseView<Controller<IModel, Module>, Module>) {
    // [old] view._parent = null;
    delete view._parent;

    const index = this._children.indexOf(view);
    this._children.splice(index, 1);
    // [old] $(view.element).detach();
    this.element.removeChild(view.element);
  }

  public close() {
    if (this.parent && this.parent != null && this.parent !== undefined) {
      this.parent.removeChild(this);
    }

    this._children = [];
    if (_.isUndefined(this.element.remove)) {
      this.element.innerHTML = '';
      (this.element as any).removeNode();
    } else {
      this.element.remove();
    }

    this._uiRender.clear();

    delete this.element;
  }

  public render() {
    if (_.isEmpty(this._controller)) {
      // tslint:disable-next-line:no-console
      console.warn(`controller has not been set in view${getFnName(this)}`);
      return;
    }

    if (this.visible) {
      let newcss = this.css.replace('hide', '');
      newcss = newcss.replace('invisible', '');
      this.css = newcss;
    } else {
      let newcss = this.css.replace('hide', '');
      newcss = newcss.replace('invisible', '');
      this.element.dataset.visible = 'false';
      this.css = newcss;
    }

    if (this.enable) {
      this.css = this.css.replace('disabled', '').replace('disable', '');
    } else {
      let newcss = this.css.replace('disabled', '').replace('disable', '');
      this.css = newcss += ' disabled disable ';
    }

    // getAllView need
    (this.element as any).view = this;

    if (!this._rendered) {
      this._uiRender.render();
    } else {
      this._uiRender.reload();
    }
    this._rendered = true;
    if (this.onViewRendered && this.onViewRendered != null) {
      this.onViewRendered(this);
    }
  }

  public show() {
    let newcss = this.css.replace('hide', '');
    newcss = newcss.replace('invisible', '');

    this.element.dataset.visible = 'true';

    this.css = newcss;
    // [old] $(this.element).show();
    this.element.style.display = 'block';

    if (this._rendered !== true) {
      this.render();
    }
    if (this.onShow && this.onShow != null) {
      this.onShow(this);
    }
  }

  public hide() {
    let newcss = this.css.replace('hide', '');
    newcss = newcss.replace('invisible', '');
    this.element.dataset.visible = 'false';
    this.css = newcss;
    // [old] $(this.element).hide();
    this.element.style.display = 'none';
    if (this.onHide && this.onHide != null) {
      this.onHide(this);
    }
  }

  /**
   * attach child view to HTML element, if no need ,just set this property
   * as null or undefined.
   * @protected
   */
  protected attachChild = (view: BaseView<Controller<IModel, Module>, Module>) => {
    const parentEl = view.element.closest(`#${this.element.id}`);
    if (parentEl !== null) {
      if (view.element.parentElement) {
        view.element.parentElement.removeChild(view.element);
      }
      parentEl.appendChild(view.element);
    }
  };

  protected appendInnerView(view: BaseView<Controller<IModel, Module>, Module>, selector: string) {
    const container = this.element.querySelector(selector);
    if (container !== undefined && container != null) {
      container.appendChild(view.container);
      this.attachChild = () => false;
      this.addChild(view);
    }
  }

  protected maxContainer() {
    if (this.container) {
      this.container.style.width = '100%';
      this.container.style.height = '100%';
      this.container.style.margin = '0';
      this.container.style.padding = '0';
    }
  }
}
