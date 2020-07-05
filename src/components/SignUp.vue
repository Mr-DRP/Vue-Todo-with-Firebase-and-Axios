<template>
  <div
    class="card mx-auto mt-5 text-center border border-primary center"
    style="max-width: 30rem;"
  >
    <div class="card-header bg-primary">Sign In</div>
    <div class="card-body">
      <form @submit.prevent="onSubmit">
        <div class="input-gr">
          <input
            type="text"
            placeholder="Username"
            v-model="username"
            required
          />
          <span class="append">
            <i class="fa fa-user"></i>
          </span>
        </div>
        <div class="input-gr">
          <input type="text" placeholder="Email" v-model="email" required />
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
        <div class="input-gr">
          <input
            v-model="confirmPass"
            :type="showConfirm ? 'text' : 'password'"
            placeholder="Confirm Password"
            required
          />
          <span class="append">
            <i
              class="fa"
              :class="[isEmptyConfirm ? lockClass : changeEyeIconConfirm]"
              @click="showConfirm = !showConfirm"
            ></i>
          </span>
        </div>
        <p v-if="notmatched" class="text-danger">Password donot match.</p>
        <input class="btn btn-primary mt-2" type="submit" value="Sign in" />
      </form>
      <br />
      <p>
        Already have an account?<strong class="text-primary" @click="myFn()"
          >Sign In Now</strong
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    myFn: Function
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPass: "",
      showPassword: false,
      showConfirm: false,
      notmatched: false,
      lockClass: "fa-lock",
      eyeClass: "fa-eye"
    };
  },
  methods: {
    onSubmit() {
      if (this.password === this.confirmPass) {
        this.notmatched = false;
        const formData = {
          username: this.username,
          email: this.email,
          password: this.password
        };
        this.$store.dispatch("signup", {
          email: formData.email,
          password: formData.password
        });
      } else {
        this.notmatched = true;
      }
    }
  },
  computed: {
    isEmpty() {
      return this.password === "" ? true : false;
    },
    isEmptyConfirm() {
      return this.confirmPass === "" ? true : false;
    },
    changeEyeIcon() {
      return this.isEmpty ? "" : this.showPassword ? "fa-eye" : "fa-eye-slash";
    },
    changeEyeIconConfirm() {
      return this.isEmptyConfirm
        ? ""
        : this.showConfirm
        ? "fa-eye"
        : "fa-eye-slash";
    }
  }
};
</script>
