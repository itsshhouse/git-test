import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface State {
  DBList: string[];
}

export const VuexCommit = {};

export const mutations = {};
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
  },
  mutations,
  actions: {},
  getters,
  // modules: {},
};
export default new Vuex.Store(store);
