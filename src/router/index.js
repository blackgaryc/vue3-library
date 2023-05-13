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
    children: [
      {
        meta: {
          requiresAuth: true
        },
        path: '',
        name: 'user_home',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue'),
      },
      {
        meta: {
          requiresAuth: true
        },
        path: 'logout',
        name: 'user_logout',
        component: () => import(/* webpackChunkName: "AdminBookFileUploadProcessView" */ '../views/UserLogoutView.vue'),
      },
    ]
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
    path: '/register',
    name: 'register',
    meta: {
      requiresAuth: false
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
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
        path: 'home',
        component: () => import(/* webpackChunkName: "admin" */ '../views/admin/HomeView.vue'),
      },
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
            path: 'index',
            name: 'book_manage',
            // 图书管理
            component: () => import(/* webpackChunkName: "manage_book_home_view" */ '../views/admin/book/index.vue'),
          },
          {
            meta: {
              requiresAuth: false
            },
            path: 'file',
            name: 'book_file_manage',
            // 书籍文件管理
            component: () => import(/* webpackChunkName: "book_file_review" */ '../views/admin/book/FileUploadProcessView.vue'),
          },
          {
            meta: {
              requiresAuth: false
            },
            path: 'file/upload',
            name: 'book_file_review',
            // 上传文件审核
            component: () => import(/* webpackChunkName: "FileUploadProcessView" */ '../views/admin/book/FileUploadProcessView.vue'),
          },
          {
            meta: {
              requiresAuth: false
            },
            path: 'tag',
            name: 'book_tag_manage',
            // 标签管理
            component: () => import(/* webpackChunkName: "book_file_review" */ '../views/admin/book/FileUploadProcessView.vue'),
          },
          {
            meta: {
              requiresAuth: false
            },
            path: 'tag',
            name: 'book_category_manage',
            // 分类管理
            component: () => import(/* webpackChunkName: "book_file_review" */ '../views/admin/book/FileUploadProcessView.vue'),
          },
          {
            meta: {
              requiresAuth: false
            },
            path: 'tag',
            name: 'book_publisher_manage',
            // 出版社管理
            component: () => import(/* webpackChunkName: "book_file_review" */ '../views/admin/book/FileUploadProcessView.vue'),
          },
        ]
      },
      {
        meta: {
          requiresAuth: false
        },
        path: 'user',
        name: 'admin_user_manage',
        component: () => import(/* webpackChunkName: "manage_book_home_view" */ '../views/admin/user/index.vue'),
      },
      {
        meta: {
          requiresAuth: false
        },
        path: 'category',
        name: 'admin_category_manage',
        component: () => import(/* webpackChunkName: "manage_book_home_view" */ '../views/admin/category/index.vue'),
      },
      {
        meta: {
          requiresAuth: false
        },
        path: 'tag',
        name: 'admin_tag_manage',
        component: () => import(/* webpackChunkName: "manage_book_home_view" */ '../views/admin/tag/index.vue'),
      },
      {
        meta: {
          requiresAuth: false
        },
        path: 'publisher',
        name: 'admin_publisher_manage',
        component: () => import(/* webpackChunkName: "manage_book_home_view" */ '../views/admin/publisher/index.vue'),
      },
      {
        meta: {
          requiresAuth: false
        },
        path: 'booklist',
        name: 'admin_booklist_manage',
        component: () => import(/* webpackChunkName: "manage_book_home_view" */ '../views/admin/bookList/index.vue'),
      },
      
    ]
  },
  {
    path: '/file/upload',
    name: 'uploader',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "uploader" */ '../views/UploadBookView.vue'),


  }
  ,
  {
    path: '/book/:id',
    name: 'book_detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "book_detail" */ '../views/BookDetailView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
  ,
  {
    path: '/book/classify',
    name: 'book_classify',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "book_classify" */ '../views/BookClassifyView.vue')
  },
  {
    path: '/publishers',
    name: 'publisher_list',
    component: () => import(/* webpackChunkName: "publisher_list" */ '../views/PublisherListView.vue')
  },
  {
    path: '/publisher/:id',
    name: 'publisher_details',
    component: () => import(/* webpackChunkName: "publisher_details" */ '../views/PublisherDetailsView.vue')
  },
  {
    path: '/ranklist',
    name: 'ranklist',
    component: () => import(/* webpackChunkName: "rank" */ '../views/RankingListView.vue')
  },
  {
    path: '/user/book/fav',
    name: 'book_favs',
    component: () => import(/* webpackChunkName: "rank" */ '../views/BookFavsView.vue')
  },
  {
    path: '/user/bookList',
    name: 'book_list',
    component: () => import(/* webpackChunkName: "rank" */ '../views/UserBookListView.vue'),
    children: [
      ]
  },
  {
    path: '/booklist/:id',
    name: 'booklist_detal',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserBookListDetailView.vue'),
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
      let url = to.fullPath
      // don't set logout url
      if (url === '/user/logout') {
        url = '/'
      }
      localStorage.setItem("last_login_process_url", url)
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
