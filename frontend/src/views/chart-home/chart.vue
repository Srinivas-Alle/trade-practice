<template>
  <div class="hello">
    {{ msg }}dd
    <!-- <highcharts :options="chartOptions"></highcharts> -->
    <highcharts
      class="stock"
      :constructor-type="'stockChart'"
      :options="stockOptions"
    ></highcharts>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import stockInit from "highcharts/modules/stock";
stockInit(Highcharts);
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      chartOptions: {
        series: [
          {
            data: [1, 2, 3], // sample data
          },
        ],
      },
      stockOptions: {
        rangeSelector: {
          selected: 1,
        },
        title: {
          text: "AAPL Stock Price",
        },
        series: [
          {
            name: "AAPL",
            data: [10, 20, 10, 23, 65, 121, 44, 66, 98, 30, 32, 56, 25, 12, 53],
            pointStart: Date.UTC(2018, 1, 1),
            pointInterval: 1000 * 3600 * 24,
            tooltip: {
              valueDecimals: 2,
            },
          },
        ],
      },
    };
  },
  mounted() {
    // this.getChartData();
  },
  methods: {
    getChartData() {
      this.$http
        .get("https://demo-live-data.highcharts.com/aapl-ohlcv.json")
        .then((data) => {
          // split the data set into ohlc and volume
          var ohlc = [],
            volume = [],
            dataLength = data.length,
            // set the allowed units for data grouping
            groupingUnits = [
              [
                "week", // unit name
                [1], // allowed multiples
              ],
              ["month", [1, 2, 3, 4, 6]],
            ],
            i = 0;

          for (i; i < dataLength; i += 1) {
            ohlc.push([
              data[i][0], // the date
              data[i][1], // open
              data[i][2], // high
              data[i][3], // low
              data[i][4], // close
            ]);

            volume.push([
              data[i][0], // the date
              data[i][5], // the volume
            ]);
          }

          // create the chart
          window.Highcharts.stockChart("container", {
            rangeSelector: {
              selected: 1,
            },

            title: {
              text: "AAPL Historical",
            },

            yAxis: [
              {
                labels: {
                  align: "right",
                  x: -3,
                },
                title: {
                  text: "OHLC",
                },
                height: "60%",
                lineWidth: 2,
                resize: {
                  enabled: true,
                },
              },
              {
                labels: {
                  align: "right",
                  x: -3,
                },
                title: {
                  text: "Volume",
                },
                top: "65%",
                height: "35%",
                offset: 0,
                lineWidth: 2,
              },
            ],

            tooltip: {
              split: true,
            },

            series: [
              {
                type: "candlestick",
                name: "AAPL",
                data: ohlc,
                dataGrouping: {
                  units: groupingUnits,
                },
              },
              {
                type: "column",
                name: "Volume",
                data: volume,
                yAxis: 1,
                dataGrouping: {
                  units: groupingUnits,
                },
              },
            ],
          });
        });
    },
  },
  components: {
    // highcharts: Highcharts,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
