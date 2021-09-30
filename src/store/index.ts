import { GetServersInfoModel, HomeDataModel } from '@/api/ApiService';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface State {
  DBList: HomeDataModel[];
  Server: GetServersInfoModel[];
}

export const VuexCommit = {
  GET_DB_LIST: 'getHomeData',
  GET_SERVER_LIST: 'getServersInfo',
};

export const mutations = {
  [VuexCommit.GET_DB_LIST]: (state: State, DBList: HomeDataModel[]) => {
    state.DBList = DBList;
  },
  [VuexCommit.GET_SERVER_LIST]: (state: State, Server: GetServersInfoModel[]) => {
    state.Server = Server;
  },
};
export const getters = {};
export interface Store {
  state: State;
  mutations: typeof mutations;
  actions: any;
  getters: typeof getters;
}

const store: Store = {
  state: {
    DBList: undefined,
    Server: undefined,
  },
  mutations,
  actions: {},
  getters,
  // modules: {},
};
export default new Vuex.Store(store);
