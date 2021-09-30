export default class Logger {
  private messages: string[];

  constructor() {
    this.messages = [];
  }

  public show() {
    this.messages.forEach(msg => {
      const fn = msg.includes('ERROR') ? console.error : console.warn;
      fn(msg);
    });
  }

  public log(msg: string) {
    this.messages.push(`[INFO(${new Date().toJSON()})]:${msg}`);
  }

  public error(err: string | Error, args?: any) {
    const error = err instanceof Error ? err : new Error(err);
    this.messages.push(`[ERROR(${new Date().toJSON()})]:${error.message}`);
    console.error(error);
    console.error(args);
  }
}
