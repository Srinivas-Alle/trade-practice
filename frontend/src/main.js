import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./config";
import "../src/interceptor";
import HighchartsVue from "highcharts-vue";
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false;
Vue.use(HighchartsVue);
new Vue({
  router,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
