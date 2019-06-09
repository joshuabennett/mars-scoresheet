import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
export const eventBus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})
