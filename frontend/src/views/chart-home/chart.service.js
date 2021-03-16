import Vue from "vue";

const getChartData = (token, from, timeFrame) => {
  return new Promise((resolve) => {
    Vue.axios
      .get(
        `/chartData?timeFrame=${timeFrame}&token=${token}&from=${escape(from)}`
      )
      .then((response) => {
        resolve(response);
      });
  });
};

// const get30minData = () => {
//   return new Promise((resolve) => {
//     Vue.axios.get(`/chartData?time=30minutes`).then((response) => {
//       resolve(response);
//     });
//   });
// };
// const get5minData = () => {
//   return new Promise((resolve) => {
//     Vue.axios.get(`/chartData?time=5minutes`).then((response) => {
//       resolve(response);
//     });
//   });
// };

export default {
  getChartData,
  // get5minData,
  // get30minData,
};
