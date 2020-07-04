<template>
  <div
    class="card mx-auto mt-5 text-center border border-primary center"
    style="max-width: 30rem;"
  >
    <div class="card-header bg-primary">Sign In</div>
    <div class="card-body">
      <div class="input-gr">
        <input type="text" placeholder="Email or Username" />
        <span class="append">
          <i class="fa fa-envelope"></i>
        </span>
      </div>
      <div class="input-gr">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
        />
        <span class="append">
          <i
            class="fa"
            :class="[isEmpty ? lockClass : changeEyeIcon]"
            @click="showPassword = !showPassword"
          ></i>
        </span>
      </div>
      <input class="btn btn-primary mt-2" type="submit" value="Sign in" />
      <br />
      <p>
        Don't have an Account?<strong class="text-primary" @click="myFn()"
          >Sign Up</strong
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
      showPassword: false,
      lockClass: "fa-lock",
      eyeClass: "fa-eye",
      password: ""
    };
  },
  computed: {
    isEmpty() {
      return this.password === "" ? true : false;
    },
    changeEyeIcon() {
      return this.isEmpty ? "" : this.showPassword ? "fa-eye" : "fa-eye-slash";
    }
  }
};
</script>
