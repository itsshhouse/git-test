import { Message, MessageBox } from 'element-ui';
import { IDialog } from '@/generic';

export default class ElementMsg implements IDialog {
  private _msg: any;

  private _msgBox: any;

  constructor() {
    this._msg = Message as any;
    this._msgBox = MessageBox as any;
  }

  public alert = (message: string, closeCallback?: () => void) => {
    this._msgBox.alert(message, '', {
      callback: closeCallback,
    });
  };

  public confirm = (message: string, closeCallback?: (result: boolean) => void) => {
    if (closeCallback) {
      this._msgBox.confirm(message, '', {
        callback: (action: string) => {
          if (action === 'confirm') {
            closeCallback(true);
          } else {
            closeCallback(false);
          }
        },
      });
    } else {
      this._msgBox.confirm(message, '');
    }
  };

  public show = (options: { [x: string]: any }) => {
    if (Object.prototype.hasOwnProperty.call(options, 'type')) {
      switch (options.type) {
        case 'success':
          this._msg.success(options as any);
          return {};
        case 'warning':
          this._msg.warning(options as any);
          return {};
        case 'error':
          this._msg.error(options as any);
          return {};
        default:
          return {};
      }
    }
    this._msg.info(options as any);
    return {};
  };
}
