import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
