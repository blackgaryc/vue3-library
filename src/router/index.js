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
    component: () => import(/* webpackChunkName: "about" */ '../views/UserRegister.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      requiresAuth: false
    },
    children: [
      {
        meta: {
          requiresAuth: false
        },
        path: '',
        component: () => import(/* webpackChunkName: "HomeView" */ '../views/admin/HomeView.vue'),
      },
      {
        path: 'manage',
        name: 'admin',
        meta: {
          requiresAuth: false
        },
        children: [
          {
            meta: {
              requiresAuth: false
            },
            path: 'book',
            children: [
              {
                meta: {
                  requiresAuth: false
                },
                path: '',
                name: 'manage_book_home_view',
                component: () => import(/* webpackChunkName: "AdminBookFileUploadProcessView" */ '../views/admin/book/HomeView.vue'),
              },
              {
                meta: {
                  requiresAuth: false
                },
                path: 'upload',
                name: 'manage_book_file_upload',
                component: () => import(/* webpackChunkName: "AdminBookFileUploadProcessView" */ '../views/admin/book/FileUploadProcessView.vue'),
              }
            ]
          }
        ]
      },

    ]
  },
  {
    path: '/file/upload',
    name: 'uploader',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "UploadBookView" */ '../views/UploadBookView.vue'),


  }
  ,
  {
    path: '/book/:id',
    name: 'book_detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/BookDetailView.vue')
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
      localStorage.setItem("last_login_process_url", to.fullPath)
      next({ name: 'login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    if (to.name === 'login' && store.getters.isLoggedIn) {
      next({ name: 'home' })
    }
    next() // does not require auth, make sure to always call next()!
  }
})

export default router
