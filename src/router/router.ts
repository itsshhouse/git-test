import { IModel } from '@/generic';
import BaseView from '@/generic/BaseView';
import Controller from '@/generic/Controller';
import ItsApp from '@/generic/ItsApp';
import Module from '@/generic/Module';
import OptionView from '@/generic/OptionView';
import { find, isEmpty, isFunction, values } from 'underscore';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // eslint-disable-next-line no-undef
  const app: ItsApp = itsApp;

  if (isEmpty(to.matched)) {
    next('/');
  }
  const toRoute: any = find(to.matched, r => r.name === to.name);
  if (toRoute && toRoute.components && toRoute.components.default) {
    next();
  } else {
    const t = toRoute.props.default.its;
    let result: any[] = [];
    if (isFunction(t.module)) {
      result = [t.module(), t.controller(), t.view()];
    } else {
      result = [t.module, t.controller, t.view];
    }
    Promise.all(result).then(all => {
      const M: new (itsapp: ItsApp) => Module = values(all[0])[0];
      const C: new (mod: Module, view: BaseView) => Controller<IModel, Module> = values(all[1])[0];
      const V: new () => OptionView = values(all[2])[0];
      const mod = new M(app);
      const view = new V();
      const ctrl = new C(mod, view);

      // 去掉该属性,否则添加到 dom 上
      delete toRoute.props.default.its;
      toRoute.components.default = view.options;
      next();
    });
  }
});
export default router;
