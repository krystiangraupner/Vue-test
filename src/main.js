import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueCurrencyFilter from 'vue-currency-filter';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(require('vue-moment'));
Vue.use(VueCurrencyFilter,
  {
    symbol: 'R$',
    thousandsSeparator: '.',
    fractionCount: 2,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true
  });
Vue.filter("formatStatus", status => {
  if (!status) return "";
  return status
    .replace("PROD_", "")
    .replace(/(\B)[^ ]*/g, match => match.toLowerCase())
    .replace(/^[^ ]/g, match => match.toUpperCase());
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
