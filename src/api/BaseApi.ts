import { BasicModule, AccessModule, OracleMonitorModule, ServerMonitorModule } from './ApiService';
import Module from '@/generic/Module';

export interface BaseApi extends Module {
  basic: BasicModule;
  access: AccessModule;
  oracleMonitor: OracleMonitorModule;
  serversMonitor: ServerMonitorModule;
}

export type Constructor<T> = new (...args: any[]) => T;

export function mixinBaseApi<T extends Constructor<Module>>(BaseModule: T) {
  return class extends BaseModule {
    public basic: BasicModule;

    public access: AccessModule;

    public oracleMonitor: OracleMonitorModule;

    public serversMonitor: ServerMonitorModule;

    // args[ItsApp, callee: (...), Symbol(Symbol.iterator): ƒ]
    constructor(...args: any[]) {
      super(args[0]);
      this.basic = new BasicModule(args[0]);
      this.access = new AccessModule(args[0]);
      this.oracleMonitor = new OracleMonitorModule(args[0]);
      this.serversMonitor = new ServerMonitorModule(args[0]);
    }
  };
}
