import { BasicModule } from './ApiService';
import Module from '@/generic/Module';

export interface BaseApi extends Module {
  basic: BasicModule;
}

export type Constructor<T> = new (...args: any[]) => T;

export function mixinBaseApi<T extends Constructor<Module>>(BaseModule: T) {
  return class extends BaseModule {
    public basic: BasicModule;

    // args[ItsApp, callee: (...), Symbol(Symbol.iterator): ƒ]
    constructor(...args: any[]) {
      super(args[0]);
      this.basic = new BasicModule(args[0]);
    }
  };
}
