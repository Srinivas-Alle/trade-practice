<template>
  <div>
    <v-container>
      <v-row>
        <v-col lg="2">
          <v-icon large color="green darken-2" @click="showPrev()">
            mdi-arrow-left-thin-circle-outline
          </v-icon>
        </v-col>
        <v-col lg="8">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Picker in menu"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col lg="2">
          <v-icon large color="green darken-2" @click="showNext()">
            mdi-arrow-right-thin-circle-outline
          </v-icon>
        </v-col>
      </v-row>
    </v-container>
    <template v-for="(stock, index) in visibleStocks">
      <v-list-item :key="stock.tick" @click="getChartOfTick(stock)">
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
import moment from "moment";
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
      date: new Date("2021-03-26").toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    };
  },
  mounted() {
    this.getStocksOfDay(moment(this.date).format("YYYY-MM-DD"));
  },
  computed: {},
  methods: {
    showPrev() {
      let prevDay = moment(this.date).subtract(1, "day").format("YYYY-MM-DD");
      console.log(
        "🚀 ~ file: stocks-filtered.vue ~ line 92 ~ showPrev ~ prevDay",
        prevDay
      );
      this.date = prevDay;
      this.getStocksOfDay(prevDay);
    },
    showNext() {
      let nextDay = moment(this.date).add(1, "day").format("YYYY-MM-DD");
      console.log(
        "🚀 ~ file: stocks-filtered.vue ~ line 97 ~ showNext ~ nextDay",
        nextDay
      );
      this.date = nextDay;

      this.getStocksOfDay(nextDay);
    },
    showStocksOfPage(page) {
      if (this.totalStocks.length < page - 1 * this.pageSize) return;
      this.visibleStocks = this.totalStocks.slice(
        (page - 1) * this.pageSize,
        page * this.pageSize
      );
    },
    getStocksOfDay(date) {
      stockFilterServie.getStocksMatchingDate(date).then((resposne) => {
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