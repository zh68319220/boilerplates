<template>
  <div id="app">
    <div class='content'></div>
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
