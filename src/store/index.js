import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    }
  },
  actions: {
    signup({ commit }, authData) {
      Axios.post(
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
        })
        .catch(error => console.log(error));
    },
    login({ commit }, authData) {
      Axios.post(
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
        .catch(error => console.log(error));
      commit();
    }
  },
  modules: {}
});
