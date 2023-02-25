<template>
  <HeaderMenu :userAvatar="this.$store.getters.getUserAcatar"></HeaderMenu>

  
  <el-row class="row-bg" justify="center">
    <el-col :xs="24" :sm="24" :md="20" :lg="16" :xl="16">
      <router-view style=" margin-top: 15px;" />
    </el-col>
  </el-row>



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
    openMessageDrawer(){
      this.drawer = true
    }
  },
  data: function () {
    return {
      drawer: false
    }
  }
}
</script>