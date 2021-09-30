/* eslint-disable no-shadow */
import ItsApp from '@/generic/ItsApp';
import axios, { AxiosError, AxiosResponse, Method } from 'axios';

export interface ILoading {
  msg: string;
  show(): void;
  error(): void;
  close(): void;
  messageInstance: any;
}

export default class Request {
  public baseUrl: string;

  private showingCount: number;

  public headers!: any;

  private _loading!: ILoading;

  constructor(app: ItsApp, api: string) {
    this.baseUrl = api;
    this.showingCount = 0;
  }

  public setToken(token: string) {
    if (this.headers === undefined) {
      this.headers = {
        token,
      };
    } else {
      this.headers.token = token;
    }
  }

  public setUserName(name: string) {
    if (this.headers === undefined) {
      this.headers = {
        USER_NAME: name,
      };
    } else {
      this.headers.USER_NAME = name;
    }
  }

  public setServiceName(name: string) {
    if (this.headers === undefined) {
      this.headers = {
        serviceName: name,
      };
    } else {
      this.headers.serviceName = name;
    }
  }

  public buildPath(controllerName?: string, sectionName?: string, args?: { [x: string]: any }) {
    let url = String(this.baseUrl);

    if (url.lastIndexOf('/') !== url.length - 1) {
      url += '/';
    }
    url = url + controllerName || '';
    if (sectionName && sectionName !== '') {
      url = `${url}/${encodeURIComponent(sectionName)}`;
    }
    if (args !== undefined) {
      if (typeof args === 'string' || typeof args === 'number' || typeof args === 'boolean') {
        url += args;
      } else if (typeof args === 'object') {
        url += '?';
        let argstr = '';
        Object.keys(args).forEach(k => {
          argstr += `&${encodeURIComponent(k)}=${encodeURIComponent(args[k])}`; // 传key,eg:/api/interface?key=10&key2=20
          // argstr += `${encodeURIComponent(args[k])}`;//没有key,eg:/api/interface/10
        });
        if (argstr !== '') {
          argstr = argstr.substring(1);
        }
        url += argstr;
      }
    }

    return url;
  }

  public get<T = any>(
    controllerName: string,
    sectionName: string,
    args: { [x: string]: any } | undefined | null,
    ajaxConfig: { notShowProgress: boolean },
    callback?: (args?: any) => void
  ) {
    const params = args === null ? undefined : args;
    const url = this.buildPath(controllerName, sectionName, params);
    return this._call<T>(url, 'GET', undefined, ajaxConfig.notShowProgress);
  }

  public post<T = any>(
    controllerName: string,
    sectionName: string,
    args: { [x: string]: any } | string | undefined | null | number,
    ajaxConfig: { notShowProgress: boolean },
    callback?: (args?: any) => void
  ) {
    const params =
      // eslint-disable-next-line no-nested-ternary
      args == null
        ? undefined
        : typeof args === 'string' || typeof args === 'number'
        ? JSON.stringify(args)
        : args;
    const url = this.buildPath(controllerName, sectionName);
    return this._call<T>(url, 'POST', params, ajaxConfig.notShowProgress);
  }

  public downloadFile(controllerName: string, sectionName: string, args?: { [x: string]: any }) {
    const url = this.buildPath(controllerName, sectionName, args);
    let iframe = document.querySelector('#dss_download_iframe') as HTMLIFrameElement;
    if (iframe === null) {
      iframe = document.createElement('iframe');
      iframe.setAttribute('id', 'dss_download_iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }
    iframe.setAttribute('src', url);
  }

  private _call<T>(
    url: string,
    method: Method,
    data: { [x: string]: any } | undefined | string | number,
    notShowProgress: boolean
  ): Promise<T> {
    if (!notShowProgress) {
      if (this.showingCount > 0) {
        this.showingCount++;
      } else {
        this.showingCount = 1;
        // this._loading.show();
      }
    }

    const headers = this.headers === undefined ? {} : this.headers;
    return new Promise((apiResolve, apiReject) => {
      axios
        .request<T>({
          method,
          url,
          headers: Object.assign(headers, {
            'Content-Type': 'application/json',
          }),
          maxContentLength: 2000 * 10000,
          data,
        })
        .then((response: AxiosResponse<T>) => {
          if (response.status === 200 || response.statusText === 'OK') {
            const resData: any = response.data;
            apiResolve(resData.data);
          } else {
            // this.app.logger.error('API AxiosResponse Error', response);
          }
        })
        .catch((error: AxiosError) => {
          // this._loading.error();
          // this.app.logger.error(error.message, error.config);
          apiReject(error);
        })
        .finally(() => {
          if (!notShowProgress) {
            if (this.showingCount > 1) {
              this.showingCount--;
            } else {
              // this._loading.close();
              this.showingCount = 0;
            }
          }
        });
    });
  }
}
