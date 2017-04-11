import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home.vue'
import Disc from '@/pages/Disc.vue'
import Order from '@/pages/Order.vue'
import User from '@/pages/User.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/disc',
      name: 'Disc',
      component: Disc
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
