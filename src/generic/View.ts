import BaseView from './BaseView';
import Controller from '@/generic/Controller';
import { IModel } from '@/generic';
import Module from '@/generic/Module';

export default class View<
  ControllerT extends Controller<IModel, Module> = Controller<IModel, Module>,
  T extends Module = Module
> extends BaseView {
  constructor(protected element: HTMLElement, template = '') {
    super(template);
    this._template = template;
    if (element) {
      this._moduleName = element.dataset.itsapp as string;
      this._controllerName = element.dataset.controller as string;
      element.addEventListener('destroyed', () => {
        this.close();
      });
    }
  }
}
