import Vue from "vue";
import VueRouter from "vue-router";
import Account from "../views/Account.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/account",
    name: "Account",
    component: Account
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
