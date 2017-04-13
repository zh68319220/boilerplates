<template>
<div class="app">
  <h1>Home</h1>
  <p>{{data.email}}</p>
  <p>{{data.blog}}</p>
  <Footer-menu></Footer-menu>
</div>
</template>

<script type='es6'>
import Footer from '../components/Footer.vue'
import { getGitUser } from '../actions/'

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
      _this.data = data
    })
  }
}
</script>

<style lang='sass'>

</style>
