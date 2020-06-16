import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store.js'
import Notify from '@/components/Notify'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import SendReview from '@/components/SendReview.vue'
import Reviews from '@/components/Reviews.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Notify',
      component: Notify,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: Reviews
    },
    {
      path: '/send_review',
      name: 'send_review',
      component: SendReview,
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
