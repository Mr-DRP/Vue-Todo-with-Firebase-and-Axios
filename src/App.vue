<template>
  <div id="app" class="container color-bg">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("tryAutoLogin");
  }
};
</script>

<style>
#app {
  font-size: 25px;
}
</style>
