import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import ChatRoom from '@/views/ChatRoom'
import Profile from '@/views/Profile'
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

router.beforeEach((to, _, next) => {
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
