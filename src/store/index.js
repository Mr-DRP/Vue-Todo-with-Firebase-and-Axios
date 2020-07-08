import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import AuthAxios from "../auth-axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: "",
    userId: null,
    alert: {
      message: "",
      type: ""
    },
    todos: []
  },

  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },

    addTodo(state, todos) {
      state.todos.push(todos);
    },

    fetchTodo(state, todos) {
      state.todos = todos;
    },

    deleteTodo(state, key) {
      const index = state.todos.findIndex(item => item.id == key);
      state.todos.splice(index, 1);
    },

    saveError(state, error) {
      state.alert.message = error.message;
      state.alert.type = error.type;
    },

    clear(state) {
      state.alert.message = "";
      state.alert.type = "";
    }
  },

  actions: {
    signup({ commit, dispatch }, authData) {
      return new Promise((resolve, reject) => {
        AuthAxios.post(
          "/accounts:signUp?key=AIzaSyDlPD7KfrzK2ciEEmuIXbSbjx-iRHaAA_s",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
          .then(res => {
            commit("authUser", {
              token: res.data.idToken,
              userId: res.data.localId
            });
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + res.data.expiresIn * 1000
            );
            localStorage.setItem("token", res.data.idToken);
            localStorage.setItem("expirationDate", expirationDate);
            localStorage.setItem("userId", res.data.localId);
            dispatch("storeUser", authData);
            resolve(res);
          })
          .catch(error => {
            this.dispatch("handleErrors", error.response.data.error);
            reject(error);
          });
      });
    },

    login({ commit }, authData) {
      return new Promise((resolve, reject) => {
        AuthAxios.post(
          "/accounts:signInWithPassword?key=AIzaSyDlPD7KfrzK2ciEEmuIXbSbjx-iRHaAA_s",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
          .then(res => {
            commit("authUser", {
              token: res.data.idToken,
              userId: res.data.localId
            });
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + res.data.expiresIn * 1000
            );
            localStorage.setItem("token", res.data.idToken);
            localStorage.setItem("expirationDate", expirationDate);
            localStorage.setItem("userId", res.data.localId);
            resolve(res);
          })
          .catch(error => {
            this.dispatch("handleErrors", error.response.data.error);
            reject(error);
          });
      });
    },

    tryAutoLogin({ commit }) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      const now = new Date();
      if (now >= expirationDate) {
        return;
      } else {
        const userId = localStorage.getItem("userId");
        commit("authUser", { userId, token });
      }
    },

    storeUser({}, userData) {
      axios
        .post(
          "/users/" + this.state.userId + ".json?auth=" + this.state.idToken,
          { email: userData.email, username: userData.username }
        )
        .catch(error => console.log(error));
    },

    addTodo({ commit }, todos) {
      axios
        .post(
          "/users/" +
            this.state.userId +
            "/todos.json?auth=" +
            this.state.idToken,
          {
            title: todos.title,
            timestamp: { ".sv": "timestamp" },
            status: false
          }
        )
        .then(res => {
          commit("addTodo", {
            title: todos.title,
            status: false,
            id: res.data.name
          });
        })
        .catch(error => console.log(error));
    },

    fetchTodo({ commit }) {
      axios
        .get(
          "/users/" +
            this.state.userId +
            "/todos.json?auth=" +
            this.state.idToken
        )
        .then(res => {
          let tempTodos = [];
          for (var key in res.data) {
            var todoEach = {
              title: res.data[key].title,
              timestamp: res.data[key].timestamp,
              status: res.data[key].status,
              id: key
            };
            tempTodos.push(todoEach);
          }
          const tempSorted = tempTodos.sort(
            (a, b) => a.timestamp - b.timestamp
          );
          commit("fetchTodo", tempSorted);
        });
    },

    deleteTodo({ commit }, key) {
      axios
        .delete(
          "/users/" +
            this.state.userId +
            "/todos/" +
            key +
            ".json?auth=" +
            this.state.idToken
        )
        .then(res => {
          commit("deleteTodo", key);
        })
        .catch(error => console.log(error));
    },

    changeStatus({ commit }, todo) {
      axios
        .patch(
          "/users/" +
            this.state.userId +
            "/todos/" +
            todo.id +
            ".json?auth=" +
            this.state.idToken,
          {
            status: todo.status
          }
        )
        .catch(error => console.log(error));
    },

    handleErrors({ commit }, error) {
      if (error.message === "INVALID_EMAIL") {
        commit("saveError", {
          message: "Invalid Email. Please Try Again!",
          type: "alert-danger"
        });
      } else if (error.message === "INVALID_PASSWORD") {
        commit("saveError", {
          message: "Invalid Password. Please Try Again!",
          type: "alert-danger"
        });
      } else if (error.message === "EMAIL_NOT_FOUND") {
        commit("saveError", {
          message: "No account with this credentials.",
          type: "alert-danger"
        });
      } else if (error.message === "EMAIL_EXISTS") {
        commit("saveError", {
          message: "Email is already used. Try logging in instead.",
          type: "alert-danger"
        });
      } else {
        commit("saveError", {
          message: "Something wrong! Please Try again.",
          type: "alert-danger"
        });
      }
    },

    clearError({ commit }) {
      commit("clear");
    }
  }
});
