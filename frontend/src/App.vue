<template>
  <v-app>
    <v-app-bar app color="primary" dark v-if="!isChartsMulti && false">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid grid-list-xs>
        <v-row>
          <v-col sm="3" v-if="!isChartsMulti" class="pa-0">
            <stocks-filtered></stocks-filtered>
          </v-col>
          <v-col :sm="{ 9: !isChartsMulti }">
            <v-container grid-list-xs fluid>
              <v-row>
                <v-col v-if="!isChartsMulti"><filter-tab></filter-tab> </v-col>
              </v-row>
              <v-row>
                <v-col class="pa-0">
                  <router-view />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>

      <!-- <HelloWorld /> -->
    </v-main>
  </v-app>
</template>

<script>
import FilterTab from "./views/filters/filter.vue";
import StocksFiltered from "./views/stocks-filtered/stocks-filtered.vue";
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    StocksFiltered,
    FilterTab,
    // HelloWorld,
  },

  data: () => ({
    isChartsMulti: false,
  }),
  watch: {
    "$route.path": {
      immediate: true,
      deep: true,
      handler: function (value) {
        this.isChartsMulti = value === "/charts-multi";
      },
    },
  },
};
</script>
