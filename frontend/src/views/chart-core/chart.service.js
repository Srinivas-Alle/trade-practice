import Vue from "vue";
import moment from "moment";

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// console.log(date.addDays(5));
const getChartData = (token, to, timeFrame) => {
  let from = "";
  if (timeFrame === "15minutes") {
    from = moment(to).subtract(5, "days");
  }
  if (timeFrame === "30minutes") {
    from = moment(to).subtract(10, "days");
  }
  if (timeFrame === "5minutes") {
    from = moment(to).subtract(3, "days");
  }
  from = moment(from).format("YYYY-MM-DD");
  return new Promise((resolve) => {
    console.log(moment(to).format("YYYY-MM-DD"));
    Vue.axios
      .get(
        `/chartData?timeFrame=${timeFrame}&token=${token}&from=${encodeURIComponent(
          from
        )}&to=${moment(to).format("YYYY-MM-DD")}`
      )
      .then((response) => {
        resolve(response);
      });
  });
};

export default {
  getChartData,
};
