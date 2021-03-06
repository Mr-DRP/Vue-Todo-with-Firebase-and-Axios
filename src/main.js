import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.baseURL = "https://vue-todor.firebaseio.com";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
