import Vue from "vue";
import VueRouter from "vue-router";
import Account from "../views/Account.vue";
import Home from "../views/Home.vue";

import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const expirationDate = localStorage.getItem("expirationDate");
  const now = new Date();
  var isLogged = false;
  if (token && !(now >= expirationDate)) {
    isLogged = true;
  }
  if (!isLogged && to.path !== "/account") {
    next("/account");
  } else {
    next();
  }
});

export default router;
