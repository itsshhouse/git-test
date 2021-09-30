import Vue from 'vue';
import ElementUI from 'element-ui';
import Layout from '@/components/Layout/Layout';
import ItsApp from '@/generic/ItsApp';
import ElementMsg from '@/components/ElementLayout/ElementMsg';
import '@/css/app.scss';

Vue.use(ElementUI);

export default class ElementLayout extends Layout {
  public _messageBox: any;

  constructor(app: ItsApp) {
    super(app);
    this._messageBox = new ElementMsg() as any;
    app.Topic('itsapp.layoutLoaded').publish({
      app,
      layout: this,
    });
  }
}
