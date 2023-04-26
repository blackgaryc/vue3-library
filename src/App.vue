<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderMenu :userAvatar="this.$store.getters.getUserAcatar"></HeaderMenu>
      </el-header>
      <el-container>
        <el-aside v-if="this.$route.path.startsWith('/admin')" style="width:150px;">
          <el-scrollbar>
            <el-menu @select="handleSelect" :router="true">
              <el-menu-item index="/admin/home"><el-icon>
                  <setting />
                </el-icon>主页</el-menu-item>
              <el-menu-item index="/admin/user"><el-icon>
                  <setting />
                </el-icon>用户管理</el-menu-item>
              <el-sub-menu index="/admin/book">
                <template #title>
                  <el-icon>
                    <location />
                  </el-icon>
                  <span>图书管理</span>
                </template>
                <el-menu-item-group title="图书">
                  <el-menu-item index="/admin/book/index">图书管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="文件">
                  <el-menu-item index="/admin/book/file">文件管理</el-menu-item>
                  <el-menu-item index="/admin/book/file/upload">文件审核</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分类">
                  <el-menu-item index="/admin/tag">标签管理</el-menu-item>
                  <el-menu-item index="/admin/category">分类管理</el-menu-item>
                  <el-menu-item index="/admin/publisher">出版社管理</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-menu-item index="/admin/booklist"><el-icon>
                  <setting />
                </el-icon>书单管理</el-menu-item>
              <!-- <el-menu-item index="/admin/search"><el-icon>
                  <setting />
                </el-icon>搜索管理</el-menu-item> -->
              <el-menu-item index="/admin/announcement"><el-icon>
                  <setting />
                </el-icon>公告管理</el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-container>
          <el-main>
            <!-- <el-row class="row-bg" justify="center"> -->
            <!-- <el-col :xs="24" :sm="24" :md="20" :lg="16" :xl="16"> -->
            <router-view style=" margin-top: 15px;" />
            <!-- </el-col> -->
            <!-- </el-row> -->
          </el-main>
          <el-footer style="text-align: center;margin-top: 100px;">2023@blackgaryc</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
  <!-- message box  -->
  <div>
    <el-row justify="end">
      <el-col :span="4">
        <el-affix position="bottom" :offset="20" style="margin-top: 50px;">
          <el-button @click="openMessageDrawer">
            <el-badge :value="12" class="item">
              <el-icon size="large">
                <ChatDotRound />
              </el-icon>
            </el-badge>
          </el-button>
        </el-affix>
      </el-col>
    </el-row>
  </div>
  <div>
    <el-drawer v-model="drawer" direction="rtl" size="50%">
      <template #header>
        <h4>消息</h4>
      </template>
      <template #default>
        <div>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import { inject } from 'vue';
import HeaderMenu from './components/HeaderMenu.vue';
import store from './store';

export default {
  name: "App",
  setup() {
    const $cookies = inject("$cookies");
    const token = "token";
    const axios = inject('axios')
    if (localStorage.getItem(token) || $cookies.get(token)) {
      // 检查login status
      axios.get('/api/user/login/info').then((response) => {
        console.log(response)
        if (response.data.code === 0 && response.data.data.isLogin) {
          //设置store登陆状态
          store.commit("doLoginSuccess");
          axios.get('/api/user/info').then((response) => {
            const nickname = response.data.data.nickname
            const avatar = response.data.data.avatar
            store.commit('updateUserInfo', { nickname, avatar })
          })
        }
      })
    }
  },
  components: { HeaderMenu },
  methods: {
    openMessageDrawer() {
      this.drawer = true
    },
    handleSelect(index, indexPath, item, routeResult) {
      console.log(index, indexPath, item, routeResult)
    }
  },
  data: function () {
    return {
      drawer: false
    }
  }
}
</script>