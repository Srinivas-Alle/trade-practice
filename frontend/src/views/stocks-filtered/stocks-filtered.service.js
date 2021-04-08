import Vue from "vue";
const getStocksMatchingDate = (from, to) => {
  console.log(
    "🚀 ~ file: stocks-filtered.service.js ~ line 9 ~ getStocksMatchingDate ~ to",
    to
  );
  // from = "2020-02-27T09:05:00+0530";
  // to = "2020-02-27T09:25:00+0530";
  return Vue.axios.get(
    `/getStocks?from=${encodeURIComponent(from)}&to=${from}`
  );
};

export default {
  getStocksMatchingDate,
};
