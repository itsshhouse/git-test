import Logger from '@/extensions/Logger';
import { ITopic } from '@/generic';

export default class Topic implements ITopic {
  public topicName: string;

  public logger: Logger;

  constructor(topicName: string, logger: Logger) {
    this.topicName = topicName;
    this.logger = logger;
  }

  public publish(args?: {}) {
    if (args !== undefined) {
      this.logger.log(`Topic[${this.topicName}] Published:${JSON.stringify(args)}`);
    }
  }

  public subscribe(func: (args?: any) => void): void {
    if (typeof func === 'function') {
      this.logger.log(`Topic[${this.topicName}] subscribed`);
      func();
    }
  }

  public unsubscribe(func: (args?: any) => void) {
    if (typeof func === 'function') {
      this.logger.log(`Topic[${this.topicName}] unsubscribed`);
      func();
    }
  }
}
