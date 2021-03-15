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
const getStocksMatchingCriteria = (req, res) => {
  const from = req.query["from"];
  const to = req.query["to"];
  console.log(from, to);
  res.send([
    {
      name: "apple",
      tick: "APL",
      from,
      to,
      signalType: "L",
    },
    {
      name: "Infosys",
      tick: "infy",
      from,
      to,
      signalType: "S",
    },
    {
      name: "apple1",
      tick: "APL",
      from,
      to,
      signalType: "L",
    },
    {
      name: "Infosys2",
      tick: "infy",
      from,
      to,
      signalType: "S",
    },
  ]);
};
module.exports = {
  get15minsChartData,
  get5minsChartData,
  get30minsChartData,
  getStocksMatchingCriteria,
};
