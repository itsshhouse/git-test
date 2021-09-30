import { IItsRouter, IRouter } from '@/generic';
import ItsApp from './ItsApp';

export default class ItsVueRouter implements IItsRouter {
  public routers: IRouter[] = [];

  public fromLink = false;

  private _app: ItsApp;

  constructor(app: ItsApp) {
    this._app = app;
  }

  public linkTo(path: string) {
    this.fromLink = true;
    const paths = this.handlePath(path);
    const end = paths.length;
    const eachView = (i = 0) => {
      this.handleRouterView(paths[i]).then(result => {
        if (result) {
          // eslint-disable-next-line no-param-reassign
          if (++i < end) {
            eachView(i);
          } else {
            this.fromLink = false;
          }
        } else {
          // this._app.layout.messageBox.show('wrong path');
          this.fromLink = false;
        }
      });
    };
    eachView();
  }

  private handlePath(path: string): string[] {
    const paths: string[] = [];
    const params = path.split('/');
    params.shift();
    params.reduce((_path, pathName) => {
      const newPath = `${_path}/${pathName}`;
      paths.push(newPath);
      return newPath;
    }, '');
    return paths;
  }

  private handleRouterView(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const { routers } = this;
      const router = routers.filter(item => item.match(path).matched.length > 0)[0];
      if (router) {
        if (router.currentRoute.fullPath === path) {
          resolve(true);
        } else {
          router.push(path, () => resolve(true));
        }
      } else {
        resolve(false);
      }
    });
  }
}
