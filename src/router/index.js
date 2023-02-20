import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
    component: LoginView
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
    component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue'),
  },
  {
    path: '/user/info',
    name: 'user_info',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/UserInfoEditView.vue'),

  },
  {
    path: '/user/register',
    name: 'register',
    meta: {
      requiresAuth: false
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/UserRegister.vue'),

  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      console.log(store.getters.isLoggedIn)
      next({ name: 'login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    if(to.name==='login' && store.getters.isLoggedIn){
      next({ name: 'home' })
    }
    next() // does not require auth, make sure to always call next()!
  }
})


export default router
