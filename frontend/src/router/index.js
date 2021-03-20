import Vue from "vue";
import VueRouter from "vue-router";
import ChartSolo from "../views/chart-solo/chart-solo.vue";
import ChartsMulti from "../views/charts-multi/charts-multi.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Chart",
    component: ChartSolo,
  },
  {
    path: "/chart",
    component: ChartSolo,
  },
  {
    path: "/charts-multi",
    name: "ChartsMulti",
    component: ChartsMulti,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
