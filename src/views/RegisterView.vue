<template>
    <div>
        <el-page-header @back="() => { this.$router.push({ name: 'login' }) }">
            <template #content>
                <div class="flex items-center">
                    <span class="text-large font-600 mr-3">注册新用户</span>
                </div>
            </template>
        </el-page-header>
        <div style="margin: 40px;"></div>
        <el-steps :active="active" finish-status="success" :align-center="true" style="margin: 30px 0 30px 0;">
            <el-step title="邮箱"></el-step>
            <el-step title="验证"></el-step>
            <el-step title="密码"></el-step>
        </el-steps>
        <div>
            <div v-if="active == 0">
                <el-form label-position="right" label-width="60px" :model="form">
                    <el-form-item label="邮箱">
                        <el-input v-model="form.account" type="email" />
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="active == 1">
                <el-form label-position="right" label-width="60px" :model="form">
                    <el-form-item label="验证码">
                        <el-input v-model="form.vcode">
                            <template #append>
                                <el-button @click="mailSendVcode" :disabled="mailSendButtonDisabled">
                                    <div v-if="mailSendTimeLimit">
                                        <el-countdown finish="onMailSendLimitTimeout" format="ss" title=""
                                            :value="mailSendTimeLimit" @finish="onMailSendLimitTimeout" />
                                    </div>
                                    <div v-else>
                                        <div v-if="mailSendTimes >= 1">{{ mailSendTimeLimit == null ?
                                            '重新发送' : mailSendTimeLimit }}
                                        </div>
                                        <div v-else>发送</div>
                                    </div>
                                </el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="active == 2">
                <el-form label-position="right" label-width="80px" :model="form">
                    <el-form-item label="设置密码">
                        <el-input v-model="form.password" type="password" />
                    </el-form-item>
                    <el-form-item label="重复密码">
                        <el-input v-model="form.conformPassword" type="password" />
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div style="margin-top: 20px;width: 100%;">
            <el-row :gutter="20" justify="center">
                <el-col :span="getPreButtonSpan"><el-button style="width: 100%;" @click="pre">
                        上一步</el-button>
                </el-col>
                <el-col :span="getNextButtonSpan">
                    <el-button style="width: 100%;" @click="next">
                        {{ active < 2 ? '下一步' : '完成' }} </el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
    name: 'UserRegisterView',
    data: () => {
        return {
            active: 0,
            form: {
                account: '',
                vcode: '',
                password: '',
                conformPassword: '',
            },
            mailSendTimeLimit: null,
            mailSendButtonDisabled: false,
            mailSendTimes: 0
        }
    },
    methods: {
        pre: function () {
            if (this.active > 0) {
                this.active--
            }
        },
        next: function () {
            switch (this.active) {
                case 0:
                    if (this.form.account.length > 5) {
                        break;
                    }
                    return;
                case 1:
                    if (this.form.vcode.length >= 6) {
                        break;
                    }
                    return;
                case 2:
                    if (this.form.password === this.form.conformPassword && this.form.password.length > 6) {
                        this.axios.post('/api/user/register', {
                            account: this.form.account,
                            password: this.form.password,
                            code: this.form.vcode,
                            type: 'EMAIL'
                        }).then((res) => {
                            if (res.data.code == 0) {
                                localStorage.setItem("must_reload", 'true')
                                this.$router.push({
                                    name: 'home', params: {
                                        reload: true
                                    }
                                })
                            } else {
                                ElMessage.error(res.data.message)
                                this.active = 0
                            }
                        })
                        break;
                    }
                    if (!(this.form.password === this.form.conformPassword)) {
                        ElMessage.info("两次密码输入不正确")
                    }
                    if (!(this.form.password.length > 6)) {
                        ElMessage.info("密码长度需要大于6位")
                    }
                    return;
                default:
                    console.log(this.form)
                    return;
            }
            if (this.active++ >= 2) {
                console.log(this.form)
                //rediect to home
                // this.$router.push({ name: 'login' })
            }
        },
        mailSendVcode: function () {
            this.axios.get('/api/user/register/vcode/send', {
                params: {
                    account: this.form.account
                }
            }).then((res) => {
                if (res.data.code === 0) {
                    this.mailSendTimes++
                    this.mailSendButtonDisabled = true
                    this.mailSendTimeLimit = Date.now() + 1000 * 60
                    console.log(this.mailSendTimeLimit)
                } else {
                    ElMessage.error(res.data.message)
                }
            })


        },
        onMailSendLimitTimeout() {
            this.mailSendButtonDisabled = false
            this.mailSendTimeLimit = null
        },
    },
    computed: {
        getPreButtonSpan: function () {
            if (this.active == 0) {
                return 0;
            }
            return 10
        },
        getNextButtonSpan: function () {
            if (this.active == 0) {
                return 24;
            }
            return 10
        }
    }
}
</script>