import Vue from 'vue';
import Vuetify from 'vuetify';

import App from './App';

import '../../node_modules/material-icons/iconfont/material-icons.css';
import '../../node_modules/vuetify/dist/vuetify.min.css';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;
Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>',
}).$mount('#app');
