import { IModel, IModule, getFnName, IController } from '../generic';

import ItsApp from './ItsApp';
import BaseView from './BaseView';
import View from './View';
import Controller from './Controller';

export default class Module implements IModule {
  protected controllerTypes: {
    [x: string]: any;
  } = {};

  public modulePath!: string;

  public app!: ItsApp;

  public name!: string;

  constructor(app: ItsApp) {
    this.app = app;
  }

  public initialize() {
    this.app.guid();
  }

  /**
   * Create controller with name
   *
   * @param {string} control name
   * @returns {IController}
   */
  public CreateControllerWithName<M extends Module, C extends Controller<IModel, Module>>(
    controlName: string,
    view?: BaseView
  ): C | null {
    // [old]
    // for (const val of this.controllerTypes) {
    //   if (controlName === getFnName(val)) {
    //     return new val(this);
    //   }
    // }
    if (Object.keys(this.controllerTypes).some(k => k === controlName)) {
      return view === undefined
        ? new this.controllerTypes[controlName](this)
        : new this.controllerTypes[controlName](this, view);
    }
    return null;
  }

  /**
   * create controller
   *
   * @param {View} [view=null] view must inherit from Generic.View
   * @returns {IController}
   */
  public CreateController(view: View): IController | null {
    // [old]
    // for (const val of this.controllerTypes) {
    //   if (view.controllerName === getFnName(val)) {
    //     return new val(this, view);
    //   }
    // }

    return this.CreateControllerWithName(view.controllerName, view);
  }

  public PublishTopic(topicName: string, ...args: any[]): void {
    this.app.Topic(topicName).publish(args);
  }

  /**
   * Create controller with type
   *
   * @param {{ new (module: Module, view: BaseView): Controller<{}> }} type
   * @returns {IController}
   */
  public CreateControllerWithType<M extends Module, C extends Controller<IModel, Module>>(
    type: new (module: M, view: BaseView) => Controller<IModel, Module>
  ) {
    // [old]
    // return this.CreateControllerWithName(getFnName(type as any));
    return this.CreateControllerWithName<M, C>(type.name);
  }
}
