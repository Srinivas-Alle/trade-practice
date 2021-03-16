import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./config";
import "../src/interceptor";
import Highcharts from "highcharts";
import Stock from "highcharts/modules/stock";
import HighchartsVue from "highcharts-vue";
import vuetify from "./plugins/vuetify";
Stock(Highcharts);

Vue.config.productionTip = false;
Vue.use(HighchartsVue);
new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
