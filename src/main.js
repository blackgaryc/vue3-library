import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import { VueMasonryPlugin } from 'vue-masonry';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import MasonryWall from '@yeger/vue-masonry-wall'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store'
import VueCookies from 'vue-cookies'

// axios.defaults.baseURL='http://library.v2ry.top'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(VueCookies, { expires: '7d' })
app.use(store)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.use(MasonryWall)
app.use(router)
app.use(ElementPlus)
app.use(VueMasonryPlugin)
app.mount('#app')
