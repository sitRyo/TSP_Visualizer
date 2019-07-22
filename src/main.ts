import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import Echart from 'echarts';

Vue.config.productionTip = false;
Vue.prototype.$echarts = Echart;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
