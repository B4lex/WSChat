import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login'
import ChatRoom from '@/pages/ChatRoom'
import Profile from '@/pages/Profile'
import { auth } from '@/services'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/room',
      name: 'chat-room',
      component: ChatRoom,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.isLoggedIn()) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
