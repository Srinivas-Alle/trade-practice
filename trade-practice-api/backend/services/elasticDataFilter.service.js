const elastic = require("../elastic");
const moment = require("moment");
const fs = require("fs");
const technicalIndicator = require("technicalindicators");

const niftyQuotes = JSON.parse(
  fs.readFileSync(
    "/Users/srinivasalle/Desktop/workspace/trade-practice/trade-practice-api/backend/NSE_FUTURES_listed_EQ.json",
    "utf8"
  )
);
const getAverageOfTick = (name, gte, lt, indexName) => {
  const query = {
    size: 0,
    query: {
      bool: {
        must: [
          {
            match: {
              "name.keyword": name,
            },
          },
          {
            range: {
              time: {
                gte,
                lt,
              },
            },
          },
        ],
      },
    },
    aggs: {
      avg_volume: {
        avg: {
          field: "volume",
        },
      },
      value_count: {
        value_count: {
          field: "volume",
        },
      },
    },
  };
  return new Promise((resolve, reject) => {
    elastic.getAggregation(query, indexName).then((response) => {
      resolve({ avg_volume: response.aggregations.avg_volume.value });
    });
  });
};

/**
 * Volume should be 2x on average of 20 ema
 *  */
const isTickMatchedTheVolumeCondtion = async (name, date, indexName) => {
  let gte = moment(date).subtract(2, "days").format("YYYY-MM-DD");
  // let lt = date + "T09:15:00+0530";
  let lt = date;
  // console.log(lt);
  let { avg_volume } = await getAverageOfTick(name, gte, lt, indexName);
  // console.log(avg_volume);
  const query = {
    query: {
      bool: {
        must: [
          {
            match: {
              "name.keyword": name,
            },
          },
          {
            range: {
              volume: {
                gt: 2 * avg_volume,
              },
            },
          },
          {
            match: {
              time: lt,
            },
          },
        ],
      },
    },
  };
  let ticks = await elastic.search(query, indexName);
  // console.log(ticks);
  return ticks.length > 0 ? ticks : undefined;
};
const getMatchingTicksForTheDay = async (day) => {
  let ticks = [];
  let filteredTicks = [];
  for (let i = 0; i < niftyQuotes.length; i++) {
    let quote = niftyQuotes[i];
    let dayQuote = await isTickMatchedTheVolumeCondtion(
      quote.name,
      day,
      "ticks_15minute"
    );
    if (!dayQuote) continue;
    const tick = dayQuote[0]._source;
    const { open, low, close, high } = tick;
    if (
      !technicalIndicator.bullishinvertedhammerstick({
        open: [open],
        close: [close],
        low: [low],
        high: [high],
      })
    ) {
      continue;
    }
    // console.log(dayQuote[0]._source.name);
    filteredTicks.push(dayQuote[0]._source);
  }
  return filteredTicks;
  // niftyQuotes.forEach(async (quote) => {});
};
// getMatchingTicksForTheDay("2021-03-26");
// isTickMatchedTheVolumeCondtion("HDFC BANK", "2021-03-23", "ticks_15minute");
module.exports = {
  getMatchingTicksForTheDay,
};
