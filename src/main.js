import Vue from 'vue';
import Vuetify from 'vuetify';

import App from './App.vue';
import store from './store';

Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
