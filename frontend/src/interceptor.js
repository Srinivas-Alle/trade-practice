import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);
const requestInterceptor = (request) => {
  if (request.url.indexOf("http") === -1) {
    request.url = window.apiBasePath + request.url;
  }
  return request;
};
const responseInterceport = (response) => {
  return response.data;
};
const responseErrorInterceptor = (response) => {
  console.log(response);
  alert(response.message);
};
Vue.axios.interceptors.request.use(requestInterceptor);
Vue.axios.interceptors.response.use(
  responseInterceport,
  responseErrorInterceptor
);
