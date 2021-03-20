import Vue from "vue";

const getChartData = (token, from, timeFrame) => {
  return new Promise((resolve) => {
    Vue.axios
      .get(
        `/chartData?timeFrame=${timeFrame}&token=${token}&from=${encodeURIComponent(
          from
        )}`
      )
      .then((response) => {
        resolve(response);
      });
  });
};

export default {
  getChartData,
};
