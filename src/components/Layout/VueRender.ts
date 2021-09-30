/* eslint-disable guard-for-in */
/* eslint-disable new-cap */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-this-alias */
import Vue, { ComponentOptions } from 'vue';
import _ from 'underscore';
import { IUIRender, IRouterMap } from '@/generic';
import BaseView from '@/generic/BaseView';

export default class VueRender implements IUIRender {
  private extendVue!: typeof Vue;

  public vm!: Vue;

  private _template!: string;

  private rendered = false;

  constructor(private _view: BaseView) {
    if (_view.template && _view.template != null && _view.template !== '') {
      this.template = _view.template;
    }
  }

  set template(tpl: string) {
    if (tpl !== this._template) {
      this._template = tpl;
      this.clear();

      this.extendVue = Vue.extend({
        template: this.template,
      });
    }
  }

  get template() {
    return this._template;
  }

  get view() {
    return this._view;
  }

  public reload() {
    if (this.vm) {
      // this.vm.$destroy();
      this.vm.$mount(this.vm.$el);
    }
  }

  public rerender() {
    this.clear();
    this.rendered = false;
    this.render();
  }

  public render() {
    if (this.rendered) {
      return;
    }
    const module = this;
    this.clear();
    const { view } = this;

    const options = this.getVueOption() as ComponentOptions<Vue>;
    options.mounted = function() {
      _.isFunction(view._$mounted) && view._$mounted(this);
    };

    options.destroyed = function() {
      const clearVueComponent = (vm: Vue) => {
        if (vm.$children.length > 0) {
          vm.$children.forEach(v => clearVueComponent(v));
        }
        vm.$destroy();
      };
      (this as Vue).$nextTick(() => {
        clearVueComponent(module.vm);
        delete module.vm;
      });
    };

    if (module.extendVue) {
      module.vm = new module.extendVue(options);
    } else {
      module.vm = new Vue(options);
    }
    // mount to its app wrapper
    module.vm.$mount();
    (document.getElementById(this.view.container.id) as HTMLElement).appendChild(module.vm.$el);

    this.rendered = true;
  }

  public clear() {
    const module = this;

    if (module.vm) {
      module.vm.$destroy();
    }

    while (this._view.container.firstChild) {
      this._view.container.removeChild(this._view.container.firstChild);
    }
  }

  private getMethods(obj: { [x: string]: any }) {
    const a = (Object as any).getPrototypeOf(obj);
    const b = Object.getOwnPropertyNames(a);

    const res: { [key: string]: (...args: any[]) => any } = {};
    for (const m in obj) {
      if (_.isFunction(obj[m])) {
        res[m] = obj[m];
      }
    }

    b.forEach(item => {
      if (item !== 'constructor' && _.isFunction(obj[item])) {
        res[item] = obj[item];
      }
    });
    return res;
  }

  private getVueProperties(obj: { [x: string]: any }) {
    const res: { [key: string]: any } = {};
    for (const m in obj) {
      if (m.indexOf('$') === 0 && typeof obj[m] === 'object') {
        res[m] = obj[m];
      }
    }
    return res;
  }

  private getLifeHooks(obj: { [x: string]: any }) {
    const res: { [key: string]: any } = {};
    const LifeCycle = ['mounted', 'created', 'ready', 'compiled', 'attached'];
    // tslint:disable-next-line:forin
    for (const m in obj) {
      const hook = LifeCycle.filter(h => h === m);
      if (hook.length) {
        res[m] = obj[m];
      }
    }
    return res;
  }

  // 🚈 组织 vue component option
  private getVueOption() {
    const options = {} as ComponentOptions<Vue>;
    options.data = () => this.view.controller.model;
    options.created = function() {
      (this as any).$setLanguage(this);
    };

    const vueKeys = [
      'props',
      'computed',
      'watch',
      'directives',
      'elementDirectives',
      'filters',
      'components',
      'transitions',
      'partials',
    ];

    const pros = this.getVueProperties(this.view);

    Object.keys(pros).forEach(name => {
      const testName = name.substring(1);
      if (vueKeys.some(k => k === testName)) {
        // [old] options[testName] = pros[name];
        (options as any)[testName] = pros[name];
      }
    });

    options.methods = this.getMethods(this.view);
    _.extend(options, this.getLifeHooks(this.view));

    // ⚡ to render .vue file (html, css)
    delete options.template;
    const myVue = this.view.myVue as any;
    options.render = myVue.render;
    options.staticRenderFns = myVue.staticRenderFns;
    myVue._scopeId && ((options as any)._scopeId = myVue._scopeId);

    return options;
  }
}
