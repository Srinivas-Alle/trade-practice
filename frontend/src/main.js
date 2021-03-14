import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import "./config";
import "../src/interceptor";
import HighchartsVue from "highcharts-vue";
Vue.config.productionTip = false;
Vue.use(HighchartsVue);
console.log("dd");
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
