import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import AuthAxios from "../auth-axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: localStorage.getItem("token") || "",
    userId: null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      localStorage.setItem("token", userData.token);
      state.userId = userData.userId;
    }
  },
  actions: {
    signup({ commit, dispatch }, authData) {
      AuthAxios.post(
        "/accounts:signUp?key=AIzaSyDlPD7KfrzK2ciEEmuIXbSbjx-iRHaAA_s",
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      )
        .then(res => {
          console.log(res);
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId
          });
          console.log(
            "/users/" + this.state.userId + ".json?auth=" + this.state.idToken
          );
          dispatch("storeUser", authData);
        })
        .catch(error => console.log(error));
    },
    login({ commit }, authData) {
      AuthAxios.post(
        "/accounts:signInWithPassword?key=AIzaSyDlPD7KfrzK2ciEEmuIXbSbjx-iRHaAA_s",
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      )
        .then(res => {
          console.log(res);
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId
          });
        })
        .catch(error => console.log(error.response));
    },
    storeUser(userData) {
      axios
        .post(
          "/users/" + this.state.userId + ".json?auth=" + this.state.idToken,
          userData
        )
        .then(res => {
          console.log(res);
        })
        .catch(error => console.log(error));
    }
  },
  modules: {}
});
