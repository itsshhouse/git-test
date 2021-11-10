import Vue from 'vue';
import '@/css/app.scss';
import ItsApp from './generic/ItsApp';
import router from '@/router/router';
import store, { VuexCommit } from './store';
import ECharts from 'vue-echarts';
import 'echarts-liquidfill';
import moment from 'moment';

require('./mock.ts');

Vue.config.productionTip = false;
Vue.component('v-chart', ECharts);

const itsApp = new ItsApp('WebFoundation', 'http://192.168.90.61:7001/');
itsApp.Topic('itsapp.moduleLoaded').subscribe(() => {
  console.log('itsApp all moduleLoaded');
});
itsApp.start().then(async () => {
  window.itsApp = itsApp;
  moment.locale('zh-CN');

  // const database = await new OracleMonitorModule(itsApp).GetHomeData({
  //   pageIndex: 1,
  //   pageSize: 10,
  // });
  // store.commit(VuexCommit.GET_DB_LIST, database);

  // const server = await new ServerMonitorModule(itsApp).GetServersInfo();
  // store.commit(VuexCommit.GET_SERVER_LIST, server);

  const vueApp = new Vue({
    router,
    store,
  }).$mount('#app');

  console.log('current-path :>> ', vueApp.$route);
  vueApp.$router.push('/login');
});
