<template>
  <div class="hello">
    <!-- <highcharts :options="chartOptions"></highcharts> -->
    <highcharts
      style="height: 600px"
      class="stock"
      :constructor-type="'stockChart'"
      :options="stockOptions"
    ></highcharts>
  </div>
</template>

<script>
import moment from "moment";
import chartService from "../chart-core/chart.service";

export default {
  name: "chart",
  props: {
    timeFrame: String,
  },
  data() {
    return {
      token: undefined,
      from: undefined,
      stockOptions: {
        time: {
          timezoneOffset: -(5 * 60 + 30),
        },
        rangeSelector: {
          buttons: [
            {
              type: "hour",
              count: 1,
              text: "1h",
            },
            {
              type: "day",
              count: 1,
              text: "1D",
            },
            {
              type: "month",
              count: 1,
              text: "1M",
            },
            {
              type: "all",
              count: 1,
              text: "All",
            },
          ],
          selected: 2,
          inputEnabled: false,
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
            top: "62%",
            height: "20%",
            offset: 0,
            lineWidth: 2,
          },
        ],
        plotOptions: {
          candlestick: {
            color: "red",
            upColor: "green",
            grouping: false,
            shadow: false,
          },
        },
        tooltip: {
          split: true,
        },
      },
    };
  },
  mounted() {},
  methods: {
    updateChart() {
      this.getChartDataOf(this.token, this.timeFrame, this.from);
    },
    prepareChart(data, timeFrame) {
      var ohlc = [],
        volume = [],
        dataLength = data.length,
        // set the allowed units for data grouping

        i = 0;

      for (i; i < dataLength; i += 1) {
        let open = data[i]["open"];
        let close = data[i]["close"];
        if (i === 10) {
          ohlc.push({
            x: data[i]["time"], // the date
            open: data[i]["open"], // open
            low: data[i]["low"], // low
            close: data[i]["close"], // close
            high: data[i]["high"], // high
            color: "#000000",
          });
          volume.push({
            x: data[i]["time"],
            y: data[i]["volume"],
            color: "#000000",
          });
        } else {
          ohlc.push([
            data[i]["time"], // the date
            data[i]["open"], // open
            data[i]["high"], // high
            data[i]["low"], // low
            data[i]["close"], // close
          ]);
          volume.push({
            x: data[i]["time"],
            y: data[i]["volume"],
            color: open < close ? "green" : "red",
          });
        }
        console.log(ohlc);

        // volume.push([
        //   data[i]["time"], // the date
        //   data[i]["volume"], // the volume
        // ]);
      }

      // create the chart
      this.stockOptions = {
        ...this.stockOptions,
        rangeSelector: {
          selected: 2,
        },

        title: {
          text: `${data[0].name}  :${moment(data[0].time).format(
            "YY-MM-DD"
          )}- ${moment(data[data.length - 1].time).format(
            "YY-MM-DD"
          )}(${timeFrame})`,
        },

        yAxis: [
          {
            crosshair: true,
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
            grouping: false,
          },
          {
            labels: {
              align: "right",
              x: -3,
            },
            title: {
              text: "Volume",
            },
            top: "62%",
            height: "33%",
            offset: 0,
            color: "red",
            lineWidth: 2,
            grouping: false,
          },
        ],

        tooltip: {
          split: true,
        },

        series: [
          {
            type: "candlestick",
            name: `${data[0].name}`,
            data: ohlc,
            tooltip: {
              valueDecimals: 2,
              formatter: function () {
                return (
                  "The value for <b>" +
                  this.x +
                  "</b> is <b>" +
                  this.y +
                  "</b>, in series " +
                  this.series.name
                );
              },
            },
          },
          {
            type: "column",
            name: "Volume",
            data: volume,
            yAxis: 1,
            tooltip: {
              valueDecimals: 2,
            },
          },
        ],
      };
    },
    getChartDataOf(token, timeFrame, from) {
      if (!token) return;
      console.log(token, timeFrame, from);

      chartService
        .getChartData(token, decodeURIComponent(from), timeFrame)
        .then((data) => {
          this.prepareChart(data, timeFrame);
        });
    },
  },
  components: {},
  watch: {
    "$route.query": {
      immediate: true,
      deep: true,
      handler: function ({ token, from }) {
        this.token = token;
        this.from = from;
        this.updateChart();
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
