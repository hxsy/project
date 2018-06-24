import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/WelcomePage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Home
    }
  ]
})
