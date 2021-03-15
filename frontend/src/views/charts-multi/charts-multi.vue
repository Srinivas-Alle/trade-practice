<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <v-col sm="12"> <chart></chart></v-col>
    </v-row>
    <v-row>
      <v-col sm="6"> <chart></chart></v-col>
      <v-col sm="6"> <chart></chart></v-col>
    </v-row>
  </v-container>
</template>
<script>
import chart from "../chart-home/chart.vue";

export default {
  components: { chart },
  props: {},
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>