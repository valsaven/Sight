import Vue from 'vue';
import Vuex from 'vuex';

import { createVuexStore } from 'vuex-simple';

import { RootStore } from './store';

Vue.use(Vuex);

// create our module class instance
const instance = new RootStore();

// create and export our store
export default createVuexStore(instance, {
  strict: false,
  modules: {},
  plugins: [],
});

