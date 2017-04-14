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

<style lang='sass'>

</style>
