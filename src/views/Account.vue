<template>
  <transition name="fade" mode="out-in">
    <component :is="selectedComponent" :myFn="switchComp"></component>
  </transition>
</template>

<script>
import Signin from "../components/SignIn.vue";
import Signup from "../components/SignUp.vue";
export default {
  data() {
    return {
      selectedComponent: "appSignin"
    };
  },
  methods: {
    switchComp() {
      this.selectedComponent === "appSignin"
        ? (this.selectedComponent = "appSignup")
        : (this.selectedComponent = "appSignin");
    }
  },
  components: {
    appSignin: Signin,
    appSignup: Signup
  }
};
</script>

<style>
/* animation start */
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave {
  
}

.fade-leave-active {
  transition: opacity 0.5s;
  opacity: 0;
}

/* animation end */

.input-gr {
  margin: 5px;
}
.input-gr > input {
  height: 45px;
  width: 100%;
  padding: 0 10px;
  border-radius: 30px;
  border: 1px solid silver;
  font-size: 16px;
}

.append > i {
  font-size: 20px;
  color: grey;
  z-index: 2000;
  position: absolute;
}
.append {
  float: right;
  margin-top: -37px;
  margin-right: 35px;
  position: relative;
  cursor: pointer;
}
</style>
