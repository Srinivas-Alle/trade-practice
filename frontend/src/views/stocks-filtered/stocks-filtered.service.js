import Vue from "vue";
const getStocksMatchingDate = (from, to) => {
  from = "2020-02-03T09:05:00+0530";
  to = "2020-02-03T09:25:00+0530";
  return Vue.axios.get(`/getStocks?from=${encodeURIComponent(from)}&to=${to}`);
};
export default {
  getStocksMatchingDate,
};
