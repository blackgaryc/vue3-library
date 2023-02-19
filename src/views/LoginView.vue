<template>
    <el-form label-position="right" label-width="100px" :model="form">
        <el-form-item label="account">
            <el-input v-model="form.account" />
        </el-form-item>
        <el-form-item label="password">
            <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(form)">Submit</el-button>
            <el-button @click="resetForm(form)">Reset</el-button>
        </el-form-item>
    </el-form>
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
        submitForm: (form) => {
            console.log(form)
            axios.post('/api/user/login', form).then((response) => {
                console.log(response)
                if (0 === response.data.code) {
                    store.dispatch('isLoggedIn',true)
                    ElMessage({
                        message: response.data.message,
                        type: 'success',
                    })
                    setTimeout(2000)
                    router.push({ path: '/' })
                } else {
                    alert(response.data.message)
                }
            })
        }, resetForm: (form) => {
            form.account = '';
            form.password = '';
        }
    }
}

</script>