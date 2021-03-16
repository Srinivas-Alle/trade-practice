const elastic = require("../elastic");
const get15minsChartData = (req, res) => {
  const token = req.query["token"];
  let from = req.query["from"];
  from = from.replace("0530", "").trim();
  const query = {
    size: 1000,
    query: {
      bool: {
        must: [
          {
            match: {
              instrument_token: token,
            },
          },
          {
            range: {
              time: {
                gte: from,
              },
            },
          },
        ],
      },
    },
  };

  elastic.search(query, "ticks_10minute").then((response) => {
    response = response.map((obj, index) => {
      obj._source.time = new Date(obj._source.time).getTime();
      return obj._source;
    });
    res.send(response);
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
  const query = {
    size: 200,
    query: {
      range: {
        time: {
          gte: "2020-08-03T09:15:00+0530",
          lte: "2020-08-03T09:15:00+0530",
        },
      },
    },
  };
  elastic.search(query, "ticks_10minute").then((response) => {
    response = response.map((obj, index) => {
      obj._source.name = ++index + " " + obj._source.name;
      return obj._source;
    });
    console.log(response);
    res.send(response);
  });
};
module.exports = {
  get15minsChartData,
  get5minsChartData,
  get30minsChartData,
  getStocksMatchingCriteria,
};
