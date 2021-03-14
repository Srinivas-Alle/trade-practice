import Vue from "vue";

const get15minData = () => {
  return new Promise((resolve) => {
    Vue.axios.get(`/chartData?time=15minutes`).then((response) => {
      resolve(response);
    });
  });
};

const get30minData = () => {
  return new Promise((resolve) => {
    Vue.axios.get(`/chartData?time=30minutes`).then((response) => {
      resolve(response);
    });
  });
};
const get5minData = () => {
  return new Promise((resolve) => {
    Vue.axios.get(`/chartData?time=5minutes`).then((response) => {
      resolve(response);
    });
  });
};

export default {
  get15minData,
  get5minData,
  get30minData,
};
