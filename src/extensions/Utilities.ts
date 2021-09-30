/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import ItsApp from '@/generic/ItsApp';

export default class Utilities {
  public app: ItsApp;

  constructor(app: ItsApp) {
    this.app = app;
    // TODO: destroyed
    //   $.event.special.destroyed = {
    //     remove: function (o) {
    //         if (o.handler && o.type !== 'destroyed') {
    //             o.handler()
    //         }
    //     }
    // };

    const jsonParesFunc = JSON.parse;
    JSON.parse = (jsonString: string) => {
      if (jsonString === '') {
        return '';
      }
      return jsonParesFunc(jsonString);
    };
  }

  public getCookie(cname: string) {
    JSON.parse('');
    const name = `${cname}=`;
    const ca = document.cookie.split(';');
    ca.forEach(c => {
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    });
    return '';
  }

  public setCookie(cname: string, cvalue: string, exdays = 1000) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    document.cookie = `${cname}=${cvalue};expires=${d.toUTCString()}`;
  }

  public delCookie(name: string) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = this.getCookie(name);
    if (cval != null) {
      document.cookie = `${name}=${cval};expires=${exp.toUTCString()}`;
    }
  }

  public getCurrentAddress() {
    return `http://${window.location.host}`;
  }

  /*
   * copy from
   * http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
   * the regular expression based implementation is the fastest, with the split and join
   * implementation being 53% slower.
   */
  public replaceAll(target: string, search: string, replacement: string) {
    return target.replace(new RegExp(search, 'g'), replacement);
  }

  public cutString(str: string, len: number) {
    let str_length = 0;
    const str_len = str.length;
    let str_cut = '';

    for (let i = 0; i < str_len; i++) {
      const a = str.charAt(i);
      str_length++;
      if (escape(a).length > 4) {
        // chinese string more than 4
        str_length++;
      }
      str_cut = str_cut.concat(a);
      if (str_length >= len) {
        str_cut = str_cut.concat('...');
        return str_cut;
      }
    }
    if (str_length < len) {
      return str;
    }
  }

  public validSecretWord(word: string) {
    const secretChaReg = new RegExp(
      "[` ~!@#$^&*()+=|{}':;',\\[\\].<>/?~！@#￥……&*（）——+|{}【】‘；：”“’。，、？]"
    );

    const secretWords = ['select', 'and', 'or', 'where', 'insert', 'update'];

    return (
      word.split('').some(secretChaReg.test) || secretWords.some(w => word.trim().indexOf(w) >= 0)
    );
  }
}
