<template>
  <!-- <nav>
    <router-link to="/">主页</router-link> |
    <router-link to="/user" v-if="this.$store.getters.isLoggedIn">username</router-link>
    <router-link to="/login" v-else>登陆</router-link>
  </nav> -->
  <HeaderMenu></HeaderMenu>
  <el-row class="row-bg" justify="center">
    <el-col :xs="24" :sm="24" :md="20" :lg="16" :xl="16">
      <router-view style=" margin-top: 50px;" />
    </el-col>
  </el-row>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
    methods: {},
    setup() {
        const $cookies = inject("$cookies");
        const token = "token";
        if (localStorage.getItem(token) || $cookies.get(token)) {
            //检查login status
            //get
            //设置store登陆状态
            store.commit("doLoginSuccess");
        }
    },
    components: { HeaderMenu }
}
</script>