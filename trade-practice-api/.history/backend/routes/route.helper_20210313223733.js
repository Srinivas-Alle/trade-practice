const chartService = require("../services/chart.service");

const getChartData = (req, res) => {
  const time = req.query["time"];
  if (time === "15minutes") return chartService.get15minsChartData(req, res);
  if (time === "5minutes") return chartService.get5minsChartData(req, res);
  if (time === "30minutes") return chartService.get30minsChartData(req, res);
  res.send(new Error("invalid Time"));
};
module.exports = {
  getChartData,
};
