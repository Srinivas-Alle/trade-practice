<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <v-col sm="12"> <chart :timeFrame="timeFrame"></chart></v-col>
    </v-row>
    <v-row>
      <v-col sm="6"> <chart :timeFrame="slowTime"></chart></v-col>
      <v-col sm="6"> <chart :timeFrame="fastTime"></chart></v-col>
    </v-row>
  </v-container>
</template>
<script>
import chart from "../chart-core/chart.vue";

export default {
  components: { chart },
  props: {},
  data() {
    return {
      timeFrame: "15minutes",
      slowTime: "30minutes",
      fastTime: "5minutes",
    };
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>