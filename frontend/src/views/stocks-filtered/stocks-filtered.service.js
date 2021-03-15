import Vue from "vue";
const getStocksMatchingDate = (from, to) => {
  return Vue.axios.get(`/getStocks?from=${from}&to=${to}`);
};
export default {
  getStocksMatchingDate,
};
