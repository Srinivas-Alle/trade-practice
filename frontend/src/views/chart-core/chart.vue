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
import chartService from "../chart-core/chart.service";

export default {
  name: "chart",
  props: {
    // token: String,
    timeFrame: String,
    // from: String,
  },
  data() {
    return {
      token: undefined,
      from: undefined,
      stockOptions: {
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
              type: "all",
              count: 1,
              text: "All",
            },
          ],
          selected: 1,
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
        ohlc.push([
          data[i]["time"], // the date
          data[i]["open"], // open
          data[i]["high"], // high
          data[i]["low"], // low
          data[i]["close"], // close
        ]);

        volume.push([
          data[i]["time"], // the date
          data[i]["volume"], // the volume
        ]);
      }

      // create the chart
      this.stockOptions = {
        rangeSelector: {
          selected: 1,
        },

        title: {
          text: `${data[0].name}-${timeFrame}`,
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
            height: "33%",
            offset: 0,
            color: "red",
            lineWidth: 2,
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
          },
          {
            type: "column",
            name: "Volume",
            data: volume,
            yAxis: 1,
          },
        ],
      };
    },
    getChartDataOf(token, timeFrame, from) {
      if (!token) return;
      console.log(token, timeFrame, from);
      // let prom = undefined;
      // if (timeFrame === "15minutes") {
      //   prom = chartService.get15minData(token, from);
      // } else if (timeFrame === "5minutes") {
      //   prom = chartService.get5minData(token, from);
      // } else {
      //   prom = chartService.get30minData(token, from);
      // }

      chartService.getChartData(token, from, timeFrame).then((data) => {
        this.prepareChart(data, timeFrame);
      });
    },
  },
  components: {
    // highcharts: Highcharts,
  },
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
