const get15minsChartData = (req, res) => {
  res.send({
    timeFrame: "15mins",
  });
};

const get5minsChartData = (req, res) => {
  res.send({
    timeFrame: "5mins",
  });
};

const get30minsChartData = (req, res) => {
  res.send({
    timeFrame: "30mins",
  });
};

module.exports = {
  get15minsChartData,
  get5minsChartData,
  get30minsChartData,
};
