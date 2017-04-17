<template>
<div class="app">
  <h1>Home</h1>
  <p>{{data.login}}</p>
  <Footer-menu></Footer-menu>
</div>
</template>

<script type='es6'>
import Footer from '../components/Footer.vue'
import { getGitUser } from '../api/'
import { bgImg } from '../assets/imgs/bg.jpg'

export default {
  name: 'home',
  components: {
    'Footer-menu': Footer
  },
  data () {
    return{
      data: ""
    }
  },
  mounted () {
    var _this = this
    getGitUser('zh68319220').then((data) => {
      return getGitUser('yyx990803')
    }).then((data) => {
      return getGitUser('yursile')
    }).then((data) => {
      _this.data = data
    })
  }
}
</script>

<style lang='scss'>
.app{
  display: block;
  h1{ display:none; }
}
</style>
