const elastic = require("../elastic");

const getChartData = (token, from, indexName) => {
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

  return new Promise((resolve, reject) => {
    elastic.search(query, indexName).then((response) => {
      response = response.map((obj, index) => {
        obj._source.time = new Date(obj._source.time).getTime();
        return obj._source;
      });
      resolve(response);
    });
  });
};
const get15minsChartData = (req, res) => {
  const token = req.query["token"];
  let from = req.query["from"];
  // from = from.replace("0530", "").trim();
  getChartData(token, from, "ticks_10minute").then((result) =>
    res.send(result)
  );
};

const get5minsChartData = (req, res) => {
  const token = req.query["token"];
  let from = req.query["from"];
  // from = from.replace("0530", "").trim();
  getChartData(token, from, "ticks_5minute").then((result) => res.send(result));
};

const get30minsChartData = (req, res) => {
  const token = req.query["token"];
  let from = req.query["from"];
  // from = from.replace("0530", "").trim();
  getChartData(token, from, "ticks_30minute").then((result) =>
    res.send(result)
  );
};
const getStocksMatchingCriteria = (req, res) => {
  let from = req.query["from"];
  // from = from.replace("0530", "").trim();

  let to = req.query["to"];
  // to = to.replace("0530", "").trim();

  console.log(from, to);
  const query = {
    size: 200,
    query: {
      range: {
        time: {
          gte: "2020-02-03T09:25:00+0530",
          lte: "2020-02-03T09:25:00+0530",
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
