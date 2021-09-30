import {
  Accessors,
  PropsDefinition,
  WatchOptionsWithHandler,
  WatchHandler,
  DirectiveFunction,
  DirectiveOptions,
  Component,
  AsyncComponent,
} from 'vue/types/options';
import _ from 'underscore';
import BaseView from './BaseView';
import Controller from '@/generic/Controller';
import { IModel, ViewExtension } from '@/generic';
import Module from '@/generic/Module';
import OptionRender from '@/components/Layout/OptionRender';
import Vue from 'Vue';

type DefaultProps = Record<string, any>;

export default class OptionView<
  ControllerT extends Controller<IModel, Module> = Controller<IModel, Module>,
  T extends Module = Module
> extends BaseView<ControllerT, T> {
  public extension: ViewExtension = {
    name: 'OptionView',
  };

  // vue life hook
  public _$beforeCreate(vm: Vue) {}

  public _$created(vm: Vue) {}

  public _$beforeDestroy(vm: Vue) {}

  public _$destroyed(vm: Vue) {}

  public _$beforeMount(vm: Vue) {}

  public _$mounted(vm: Vue) {}

  public _$beforeUpdate(vm: Vue) {}

  public _$updated(vm: Vue) {}

  public _$activated(vm: Vue) {}

  public _$deactivated(vm: Vue) {}

  public _$errorCaptured(err: Error, vm: Vue, info: string) {}

  // vue Options
  public $props!: PropsDefinition<DefaultProps>;

  public $computed!: Accessors<{ [key: string]: any }>;

  public $watch!: Record<string, WatchOptionsWithHandler<any> | WatchHandler<any> | string>;

  public $directives!: { [key: string]: DirectiveFunction | DirectiveOptions };

  public $components!: {
    [key: string]: Component<any, any, any, any> | AsyncComponent<any, any, any, any>;
  };

  public $filters!: { [key: string]: () => void };

  // its view option
  protected _optionsRender!: OptionRender;

  protected _controller: ControllerT;

  set controller(controller: ControllerT) {
    if (this._controller !== controller && controller !== null) {
      this._controller = controller;
      if (this._controller.view !== this) {
        this._controller.view = this;
      }

      this._optionsRender = new OptionRender(this);
    } else if (controller === null) {
      delete this._controller;
    }
  }

  get controller(): ControllerT {
    return this._controller;
  }

  get container() {
    return this.element;
  }

  set container(el: HTMLElement) {
    this.element = el;
  }

  get options() {
    return this._optionsRender.getVueOption();
  }

  get viewVm(): Vue {
    return this._optionsRender.vm;
  }

  public appendInnerView(childView: OptionView, selector: string) {
    const container = this.element.querySelector(selector);
    if (container != null) {
      childView._optionsRender.renderMount(container);
      this.attachChild = () => false;
      this.addChild(childView);
    }
  }

  public close() {
    if (this.parent && this.parent != null && this.parent !== undefined) {
      this.parent.removeChild(this);
    }
    this._optionsRender.destroy();
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this._children = [];
  }

  public show() {
    this.element.classList.remove('view-hidden');
    if (this.onShow && this.onShow != null) {
      this.onShow(this);
    }
  }

  public hide() {
    this.element.classList.add('view-hidden');
    if (this.onHide && this.onHide != null) {
      this.onHide(this);
    }
  }

  public removeChild(view: OptionView) {
    const index = this._children.indexOf(view);
    if (index >= 0) {
      this._children.splice(index, 1);
    }
  }
}
