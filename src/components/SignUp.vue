<template>
  <div
    class="card mx-auto mt-5 text-center border border-primary center"
    style="max-width: 30rem;"
  >
    <div class="card-header bg-primary">Sign In</div>
    <div class="card-body">
      <div class="input-gr">
        <input type="text" placeholder="Username" />
        <span class="append">
          <i class="fa fa-user"></i>
        </span>
      </div>
      <div class="input-gr">
        <input type="text" placeholder="Email" />
        <span class="append">
          <i class="fa fa-envelope"></i>
        </span>
      </div>
      <div class="input-gr">
        <input type="text" placeholder="Password" />
        <span class="append">
          <i class="fa fa-lock"></i>
        </span>
      </div>
      <div class="input-gr">
        <input type="text" placeholder="Confirm Password" />
        <span class="append">
          <i class="fa fa-lock"></i>
        </span>
      </div>

      <input class="btn btn-primary mt-2" type="submit" value="Sign in" />
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
  }
};
</script>
