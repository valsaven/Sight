import { createApp } from 'vue';
import { RecycleScroller } from 'vue-virtual-scroller';

import App from './App.vue'


const app = createApp(App);

app
  .component('RecycleScroller', RecycleScroller)
  .mount('#app')
  .$nextTick(window.removeLoading);

