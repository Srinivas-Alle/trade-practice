<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png" />
    {{ chartData }}
    <chart msg="Welcome to Your Vue.js App Srini" />
  </div>
</template>

<script>
// @ is an alias to /src
import chart from "../chart-home/chart";
import chartService from "../chart-home/chart.service";

export default {
  name: "Home",
  components: {
    chart,
  },
  data() {
    return {
      chartData: "hellow",
    };
  },
  mounted() {
    this.getChartData(15);
  },
  methods: {
    getChartData(time) {
      let promise;
      if (time === 15) promise = chartService.get15minData();
      promise.then((data) => (this.chartData = data));
    },
  },
};
</script>
