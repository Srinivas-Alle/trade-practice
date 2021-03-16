<template>
  <div>
    <template v-for="(stock, index) in visibleStocks">
      <v-list-item :key="index" @click="getChartOfTick(stock)">
        <v-list-item-content>
          <span :class="{ 'red--text': stock.signalType === 'S' }">{{
            stock.name
          }}</span>
        </v-list-item-content>
      </v-list-item>
      <v-divider :key="index"></v-divider>
    </template>
    <div class="text-center">
      <v-pagination
        v-model="page"
        @input="showStocksOfPage"
        :length="length"
        circle
      ></v-pagination>
    </div>
  </div>
</template>
<script>
import stockFilterServie from "../stocks-filtered/stocks-filtered.service.js";

export default {
  props: {},
  data() {
    return {
      totalStocks: [],
      visibleStocks: [],
      pageSize: 12,
      length: 1,
      page: 1,
    };
  },
  mounted() {
    this.getStocksOfDay();
  },
  computed: {},
  methods: {
    showStocksOfPage(page) {
      if (this.totalStocks.length < page - 1 * this.pageSize) return;
      this.visibleStocks = this.totalStocks.slice(
        (page - 1) * this.pageSize,
        page * this.pageSize
      );
    },
    getStocksOfDay() {
      stockFilterServie.getStocksMatchingDate().then((resposne) => {
        this.totalStocks = resposne;
        this.visibleStocks = this.totalStocks.slice(0, this.pageSize);
        this.length = Math.ceil(this.totalStocks.length / this.pageSize);
      });
    },
    getChartOfTick(stock) {
      this.$router.push({
        path: "/chart",
        query: {
          token: stock.instrument_token,
          timeFrame: "15minutes",
          from: stock.time,
        },
      });
    },
  },
};
</script>
<style scoped>
</style>