<template>
  <div id="app">
    <img src="./assets/logo.png" class="logo">
    <img src="./assets/bg.jpg" class="logo">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang='sass'>
  @import './sass/_reset.scss';
  @import './sass/_app.scss';
</style>
