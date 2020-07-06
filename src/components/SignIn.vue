<template>
  <div
    class="card mx-auto mt-5 text-center border border-primary center"
    style="max-width: 30rem;"
  >
    <div class="card-header bg-primary">Sign In</div>
    <div class="card-body">
      <div class="row">
        <div class="offset-sm-3">
          <div v-if="alert.message" :class="'alert ' + alert.type">
            {{ alert.message }}
          </div>
          <router-view></router-view>
        </div>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="input-gr">
          <input
            v-model="email"
            type="text"
            placeholder="Email or Username"
            required
          />
          <span class="append">
            <i class="fa fa-envelope"></i>
          </span>
        </div>
        <div class="input-gr">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            required
          />
          <span class="append">
            <i
              class="fa"
              :class="[isEmpty ? lockClass : changeEyeIcon]"
              @click="showPassword = !showPassword"
            ></i>
          </span>
        </div>
        <input
          class="btn btn-primary mt-2"
          style="border-radius: 10px;"
          type="submit"
          value="Sign in"
        />
      </form>
      <br />
      <p>
        Don't have an Account?<strong class="text-primary point" @click="myFn()"
          >Sign Up</strong
        >
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {
    myFn: Function
  },
  data() {
    return {
      showPassword: false,
      lockClass: "fa-lock",
      eyeClass: "fa-eye",
      email: "",
      password: ""
    };
  },
  computed: {
    isEmpty() {
      return this.password === "" ? true : false;
    },
    changeEyeIcon() {
      return this.isEmpty ? "" : this.showPassword ? "fa-eye" : "fa-eye-slash";
    },
    ...mapState({
      alert: state => state.alert
    })
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("login", formData)
        .then(() => this.$router.push("/"))
        .catch(() => {});
    }
  }
};
</script>
