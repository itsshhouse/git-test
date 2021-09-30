/* eslint-disable space-before-function-paren */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-constructor */
import _ from 'underscore';
import Vue, { ComponentOptions } from 'vue';
import OptionView from '@/generic/OptionView';
import { getFnName } from '@/generic';

export default class OptionRender {
  public vm!: Vue;

  constructor(private _view: OptionView) {}

  get view() {
    return this._view;
  }

  public destroy() {
    if (this.vm) {
      this.vm.$destroy();
      delete this.vm;
    }
  }

  public renderMount(container: Element) {
    const op = this.getVueOption();
    const Component = Vue.extend(op);
    const component = new Component().$mount();
    container.appendChild(component.$el);
  }

  private getVueMethods(obj: { [x: string]: any }) {
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
    const result = Object.create(null);
    const vueKeys = ['props', 'computed', 'watch', 'directives', 'filters', 'components'];
    const res: { [key: string]: any } = {};
    for (const m in obj) {
      if (m.indexOf('$') === 0 && typeof obj[m] === 'object') {
        res[m] = obj[m];
      }
    }

    Object.keys(res).forEach(name => {
      const testName = name.substring(1);
      if (vueKeys.some(k => k === testName)) {
        (result as any)[testName] = res[name];
      }
    });
    return result;
  }

  private destroyChildren() {
    const children = this.view.children as OptionView[];
    children.forEach(child => {
      child.close();
    });
  }

  // 🚈 组织 vue component option
  public getVueOption() {
    const renderClass = this;
    const { view } = this;
    const options = {} as ComponentOptions<Vue>;
    options.data = () => this.view.controller.model;
    options.created = function() {
      (this as any).$setLanguage(this);
      (this as Vue).$nextTick(() => {
        _.isFunction(view._$created) && view._$created(this as Vue);
      });
    };

    options.beforeCreate = function(this: Vue) {
      (this as Vue).$nextTick(() => {
        _.isFunction(view._$beforeCreate) && view._$beforeCreate(this);
      });
    };

    options.beforeDestroy = function() {
      renderClass.destroyChildren();
      (this as Vue).$nextTick(() => {
        _.isFunction(view._$beforeDestroy) && view._$beforeDestroy(this as Vue);
      });
    };

    options.destroyed = function() {
      (this as Vue).$nextTick(() => {
        _.isFunction(view._$destroyed) && view._$destroyed(this as Vue);
      });
    };

    options.beforeMount = function() {
      (this as Vue).$nextTick(() => {
        _.isFunction(view._$beforeMount) && view._$beforeMount(this as Vue);
      });
    };

    options.mounted = function() {
      const v = this as Vue;
      view.container = v.$el as HTMLElement;
      view.container.dataset.itsapp = getFnName(view.controller.module);
      view.container.dataset.controller = getFnName(view.controller);
      view.container.dataset.view = getFnName(view);
      (view.container as any).view = view;
      renderClass.vm = v;
      v.$nextTick(() => {
        _.isFunction(view._$mounted) && view._$mounted(v);
      });
    };

    options.beforeUpdate = function() {
      (this as Vue).$nextTick(() => {
        _.isFunction(view._$beforeUpdate) && view._$beforeUpdate(this as Vue);
      });
    };

    options.updated = function() {
      (this as Vue).$nextTick(() => {
        _.isFunction(view._$updated) && view._$updated(this as Vue);
      });
    };

    options.activated = function() {
      (this as Vue).$nextTick(() => {
        _.isFunction(view._$activated) && view._$activated(this as Vue);
      });
    };

    options.deactivated = function() {
      (this as Vue).$nextTick(() => {
        _.isFunction(view._$deactivated) && view._$deactivated(this as Vue);
      });
    };

    options.errorCaptured = function error(err: Error, vm: Vue, info: string) {
      (this as Vue).$nextTick(() => {
        _.isFunction(view._$errorCaptured) && view._$errorCaptured(err, vm, info);
      });
    };

    const pros = this.getVueProperties(this.view);
    if (!_.isEmpty(pros)) {
      _.extend(options, pros);
    }

    options.methods = this.getVueMethods(this.view);

    // ⚡ to render .vue file (html, css)
    const myVue = this.view.myVue as any;
    options.render = myVue.render;
    options.staticRenderFns = myVue.staticRenderFns;

    // 👺实现 css scoped
    // 有些像 Sass 之类的预处理器无法正确解析 >>>。
    // 这种情况下你可以使用 ::v-deep 操作符取而代之——这是一个 >>> 的别名，同样可以正常工作。
    // https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors
    myVue._scopeId && ((options as any)._scopeId = myVue._scopeId);
    return options;
  }
}
