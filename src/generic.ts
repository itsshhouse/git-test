/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-escape */
import Logger from '@/extensions/Logger';
import Request from '@/extensions/Request';
import Utilities from '@/extensions/Utilities';
import ItsApp from '@/generic/ItsApp';
import Topic from '@/generic/Topic';
import { Route } from 'vue-router';
import BaseView from './generic/BaseView';
import Controller from './generic/Controller';
import Module from './generic/Module';

export interface IDialog {
  alert(message: string, closeCallback?: () => void): void;
  confirm(message: string, closeCallback?: (result: boolean) => void): void;
  show(options: any): void;
}

export interface ISplash {
  show(): void;
  close(): void;
  progressInfo(percentage: number, message: string): void;
}

export interface ITopic {
  publish(args?: any): void;
  subscribe(func: () => void): void;
  unsubscribe(func: () => void): any;
}

export interface TopicArray {
  [x: string]: Topic;
}

export interface IModule {
  app: ItsApp;
  name: string;
  initialize(): void;
  CreateControllerWithName(controlName: string, view?: BaseView): IController | null;
  CreateControllerWithType(
    type: new (module: IModule, view: BaseView) => Controller<IModule, any>
  ): IController | null;
  CreateController(view: BaseView): IController | null;
  PublishTopic(topicName: string, args: any[]): void;
}

export interface IApp {
  layout: ILayoutModule;

  utilities: Utilities;
  request: Request;
  logger: Logger;
  locale: string;
  setting: ISettings;
  name: string;
  user: IUser;
  router: IItsRouter;
  guid(): string;
  getModule(name: string): IModule | null;
  loadModule(name: string, element: HTMLElement): Promise<IModule>;
  start(): void;
  Topic(topicName: string): Topic;
}

/**
 * Vue-Router
 */
export interface IRouterMap {
  path: string;
  // eslint-disable-next-line no-use-before-define
  view?: BaseView | IComponentItem;
  selector?: string;
  children?: IRouterMap[];
  redirect?: string;
  defaultRoute?: boolean;
}

export interface IComponentItem {
  path: string;
  name: string;
}

export interface IModel {
  [x: string]: any;
}

export interface IController {
  module: IModule;
  model: IModel;
  view: BaseView;
}

export interface ViewExtension {
  name: string;
}

export function getFnName(fn: any) {
  let f = typeof fn === 'function';

  if (!f && typeof fn === 'object') {
    fn = (fn as any).constructor as () => void;
    f = true;
  }
  const s =
    f &&
    (((fn as () => void).name && ['', (fn as () => void).name]) ||
      fn.toString().match(/function ([^\(]+)/));

  return (!f && 'not a function') || (s && s[1]) || 'anonymous';
}

export interface ISettings {
  applicationName: string;
  startModule: string;
  requireLogin: boolean;
  loginModule: string;
}

export type IUIRenderConstructor = new (container: BaseView) => IUIRender;

export interface IUIRender {
  view: BaseView;
  template: string;
  reload: () => void;
  rerender: () => void;
  render: () => void;
  clear: () => void;
}

export interface ILoadingMessage {
  showIn(container: HTMLElement): string;
  close(name: string): void;
}

export interface ILayoutModule extends IModule {
  getAllViews(): BaseView[];
  initalizeLayout(): void;
  createViewByName(
    moduleName: string,
    controllerName: string,
    viewName: string,
    parentView: BaseView | null,
    extention: ViewExtension
  ): Promise<BaseView>;

  createView<ModuleT extends Module, ControllerT extends Controller<any, any>>(
    mod: ModuleT,
    viewType: new (el: HTMLElement) => BaseView,
    controllerT: new (module: Module, view: BaseView) => Controller<any, any>,
    parentView: BaseView,
    extention: ViewExtension
  ): Promise<BaseView>;

  createUIRender(view: BaseView): IUIRender;
  messageBox: IDialog;
  loadingMessage: ILoadingMessage;
  // removeView(view: View): void;
  // addView(view: View, parent: View): View;
}

export interface ILoginModule extends IModule {
  login(callbackAfterLogin: (user: IUser) => void): void;
  logout(callbackAfterLogout: () => void): void;
}

export interface IUser {
  id: string;

  roles: [string];

  groups: [string];

  name: string;

  email: string;
}

export interface IRouter {
  push(location: string, onComplete?: () => void, onAbort?: () => void): void;
  match: (raw?: string, current?: Route, redirectedFrom?: string) => Route;
  currentRoute: Route;
}

export interface IItsRouter {
  routers: IRouter[];
  fromLink: boolean;
  linkTo(to: string): void;
}

export default IApp;
