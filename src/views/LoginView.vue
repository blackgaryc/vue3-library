<template>
    <div>
        <el-page-header @back="() => { this.$router.push({ name: 'home' }) }">
            <template #content>
                <div class="flex items-center">
                    <span class="text-large font-600 mr-3">登陆</span>
                </div>
            </template>
        </el-page-header>
        <div style="margin: 50px;"></div>
        <el-form label-position="right" label-width="60px" :model="form" v-if="!computedUserLoginStatus">
            <el-form-item label="帐号">
                <el-input v-model="form.account" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" type="password" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(form)">登陆</el-button>
                <el-button @click="resetForm(form)">重置</el-button>
                <el-button @click="() => { this.$router.push({ name: 'register' }) }">注册</el-button>
            </el-form-item>
        </el-form>
        <div class="user-already-login" v-else>
            <p>已经登陆</p>
            <div class="user-acatar-div" @click="redirect('/user/info')">
                <div class="user-acatar-image">
                    <el-avatar size="large" :src="computedUserAvatar" />
                </div>
                <p class="user-acatar-name">{{ computedUserNicknae }}</p>
            </div>
            <el-button @click="handleContinueView">继续浏览</el-button>
        </div>
    </div>
</template>

<script>
import router from "@/router"
import { ElMessage } from 'element-plus'
import axios from "axios"
import store from "@/store"

export default {
    name: 'LoginView',
    components: {

    },
    data: () => {
        return {
            form: {
                account: '',
                password: ''
            }
        }
    },
    methods: {
        submitForm(form) {
            console.log(form)
            const key = 'last_login_process_url'
            // 处理因为刷新登陆的问题，方便直接跳转到上次的url
            axios.post('/api/user/login', form).then((response) => {
                console.log(response)
                if (0 === response.data.code) {
                    store.commit('doLoginSuccess')
                    axios.get('/api/user/info').then((response) => {
                        const nickname = response.data.data.nickname
                        const avatar = response.data.data.avatar
                        store.commit('updateUserInfo', { nickname, avatar })
                    })
                    ElMessage({
                        message: response.data.message,
                        type: 'success',
                    })
                    setTimeout(2000)
                    const last_login_process_url = localStorage.getItem(key)
                    if (last_login_process_url) {
                        localStorage.removeItem(key)
                        this.$router.push({ path: last_login_process_url })
                    } else {
                        router.push({ name: 'home' })
                    }
                } else {
                    alert(response.data.message)
                }
            })
        },
        resetForm: (form) => {
            form.account = '';
            form.password = '';
        },
        handleContinueView: function () {
            const key = 'last_login_process_url'
            let url = localStorage.getItem(key)
            if (url) {
                localStorage.removeItem(key)
                this.$router.push({ path: url })
            }
        }
    },
    computed: {
        computedUserAvatar() {
            return store.getters.getUserAcatar.length > 0 ? store.getters.getUserAcatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        },
        computedUserNicknae() {
            return store.getters.getUserNickname
        },
        computedUserLoginStatus() {
            return store.getters.isLoggedIn
        }
    }
}

</script>

<style>
.user-already-login {
    text-align: center;
}
</style>