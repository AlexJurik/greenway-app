import i18n from '@/plugins/i18n';
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/axios'

const app = new Vue({
  store,
  i18n,
  vuetify,
  render: h => h(App),
});
app.$mount('#app');