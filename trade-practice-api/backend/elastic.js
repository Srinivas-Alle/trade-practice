const elasticsearch = require("elasticsearch");

const client = new elasticsearch.Client({
  host: "localhost:9200",
  apiVersion: "_default",
});
client.ping(
  {
    // ping usually has a 3000ms timeout
    requestTimeout: 1000,
  },
  function (error) {
    if (error) {
      console.trace("elasticsearch cluster is down!");
    } else {
      console.log("elasticsearch!! All is well");
    }
  }
);
const getElasticInstance = () => {
  return client;
};

const search = (query, indexName) => {
  try {
    return new Promise((resolve, reject) => {
      if (!indexName) throw new Error("pass Index");
      client.search(
        {
          index: indexName,
          body: query,
        },
        (err, response) => {
          try {
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(response.hits.hits);
          } catch (e) {
            reject(new Error("while geting resonse from elastic"));

            console.error(e);
          }
        }
      );
    });
  } catch (err) {
    console.error(err);
    reject();
  }
};

module.exports = {
  getElasticInstance,
  search,
};
