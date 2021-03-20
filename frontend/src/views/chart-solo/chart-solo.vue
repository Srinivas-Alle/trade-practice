<template>
  <div class="hello">
    <chartCore :timeFrame="timeFrame" :token="token" :from="from"></chartCore>
  </div>
</template>

<script>
import chartCore from "../chart-core/chart";

export default {
  name: "chart",
  data() {
    return {
      timeFrame: "15minutes",
      token: undefined,
      from: undefined,
    };
  },
  components: {
    chartCore,
  },
  watch: {
    "$route.query": {
      immediate: true,
      deep: true,
      handler: function ({ token, timeFrame, from }) {
        this.token = token;
        this.timeFrame = timeFrame;
        this.from = from;
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
