import _ from 'underscore';
import BaseView from '@/generic/BaseView';
import { IModel, IController } from '@/generic';
import Module from '@/generic/module';

export default class Controller<T extends IModel, M extends Module> implements IController {
  protected _data: T;

  protected rendered = false;

  /**
   * Creates an instance of Controller.
   *
   * @param {Module} _module
   * @param {BaseView} [_view=null]
   */
  constructor(private _module: M, private _view: BaseView) {
    if (!_.isEmpty(_view)) {
      _view.controller = this;
    }
    this._data = {} as T;
  }

  get model(): T {
    return this._data;
  }

  set model(newData: T) {
    this._data = newData;
  }

  get module(): M {
    return this._module;
  }

  set view(newView: BaseView) {
    this._view = newView;
    if (this._view !== null && this._view.controller !== this) {
      this._view.controller = this;
    }
  }

  get view(): BaseView {
    return this._view;
  }
}
