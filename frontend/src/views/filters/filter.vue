<template>
  <v-row>
    <v-col sm="2">
      <v-select
        @change="changeTimeFrame($event)"
        :items="items"
        v-model="value"
        item-text="label"
        label="timeframe"
      ></v-select>
    </v-col>
    <v-col sm="2">
      <v-btn color="success" @click="showMulitpleCharts()"
        >Multiple Charts</v-btn
      >
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { id: 5, label: "5 minutes" },
        { id: 15, label: "15 minutes" },
        { id: 5, label: "30 minutes" },
      ],
      value: undefined,
    };
  },
  methods: {
    showMulitpleCharts() {
      const { query } = this.$route;
      window.open(
        `http://localhost:8080/charts-multi?name=${query.name}&time=5minutes,15minutes,30minutes`,
        "_blank"
      );
    },
    changeTimeFrame(time) {
      const { query } = this.$route;
      this.$router.push({
        path: "/chart",
        query: {
          name: query.name,
          time: time.replaceAll(" ", ""),
        },
      });
    },
  },
};
</script>
<style scoped>
</style>