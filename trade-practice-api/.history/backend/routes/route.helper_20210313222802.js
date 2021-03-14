import * as chartService from "../services/chart.service";

const getChartData = (req, res) => {
  return chartService.get15minsChartData(req, res);
};
module.exports = {
  getChartData,
};
