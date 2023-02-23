<template>
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
            <el-button @click="resetForm(form)">注册</el-button>
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
        <el-button>前往主页</el-button>
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
    }, methods: {
        submitForm(form){
            console.log(form)
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
                    const last_login_process_url = localStorage.getItem('last_login_process_url')
                    if(last_login_process_url){
                        localStorage.removeItem('last_login_process_url')
                        this.$router.push({path:last_login_process_url})
                    }else{
                        router.push({ name: 'home' })
                    }
                } else {
                    alert(response.data.message)
                }
            })
        }, resetForm: (form) => {
            form.account = '';
            form.password = '';
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