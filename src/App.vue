<template>
  <nav>
    <router-link to="/">主页</router-link> |
    <!-- <router-link to="/about">关于</router-link> -->
    <router-link to="/login">登陆</router-link>
  </nav>
  <el-row class="row-bg" justify="center">
    <el-col :xs="24" :sm="24" :md="20" :lg="16" :xl="16">
      <router-view />
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
export default {
  name: 'App',
  methods: {
  }
}
</script>