import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {VueMasonryPlugin} from 'vue-masonry';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import MasonryWall from '@yeger/vue-masonry-wall'

const app = createApp(App)
app.use(MasonryWall)
app.use(router)
app.use(ElementPlus)
app.use(VueMasonryPlugin)
app.mount('#app')
