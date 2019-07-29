import Vue from 'vue';
import Vuetify from 'vuetify';

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/dist/vuetify.min.css';

import App from './App.vue';
import store from './store';

const vuetifyOptions = {
  iconfont: 'md',
};

Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  vuetify: new Vuetify(vuetifyOptions),
  store,
  render: (h) => h(App),
}).$mount('#app');
