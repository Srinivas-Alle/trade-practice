const chartService = require("../services/chart.service");

const getChartData = (req, res) => {
  const time = req.query["time"];
  if (time === "15minutes") return chartService.get15minsChartData(req, res);
  if (time === "5minutes") return chartService.get5minsChartData(req, res);
  if (time === "30minutes") return chartService.get30minsChartData(req, res);
  res.status(400).send({
    message: "Invalid time",
  });
};

const getStocks = (req, res) => {
  return chartService.getStocksMatchingCriteria(req, res);
};
module.exports = {
  getChartData,
  getStocks,
};
