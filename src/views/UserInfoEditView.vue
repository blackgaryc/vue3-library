<template>
    <div>
        <h3>用户信息</h3>
        <el-form ref="form" :model="userinfo" label-width="auto" label-position="left">
            <el-form-item label="头像">
                <el-upload class="avatar-uploader" style="width: 50%;" :show-file-list="false" action="/api/file/upload" :disabled="!edit"
                    :on-success="handleAvatarSuccess" :auto-upload="true" :data="{ 'type': 'user_info_avatar' }"
                    :before-upload="beforeAvatarUpload">
                    <el-image v-if="userinfo.avatar" :src="userinfo.avatar" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="帐号id">
                <el-input v-model="userinfo.id" :disabled="true" />
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="userinfo.nickname" :disabled="!edit" />
            </el-form-item>
            <el-form-item label="邮箱" disabled>
                <el-input v-model="userinfo.email" :disabled="true" />
            </el-form-item>
            <el-form-item label="手机" disabled>
                <el-input v-model="userinfo.phone" :disabled="true" />
            </el-form-item>
        </el-form>

        <el-button @click="toggleEdit">{{ !edit ? '编辑' : '保存' }}</el-button>
    </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import store from '@/store';

export default {
    name: 'UserInfoEditView',
    data: function () {
        return {
            userinfo: new Object,
            edit: false
        }
    },
    created: function () {
        axios.get('/api/user/info').then((response) => {
            console.log(response)
            this.userinfo = response.data.data
        })
    },
    methods: {
        handleAvatarSuccess(response, uploadFile) {
            console.log(response, uploadFile)
            let url = response.data
            if (!url.startsWith('http')) {
                url = 'http://minio.v2ry.top/library/' + url
            }
            this.userinfo.avatar = url
        },
        beforeAvatarUpload(rawFile) {
            if (!rawFile.type.match("^image/[a-z]*")) {
                ElMessage.error('Avatar picture must be image file!')
                return false
            } else if (rawFile.size / 1024 / 1024 > 2) {
                ElMessage.error('Avatar picture size can not exceed 2MB!')
                return false
            }
            return true
        },
        toggleEdit() {
            if (this.edit == true) {
                //save
                console.log(this.userinfo)
                axios.post('/api/user/info/update', this.userinfo).then((res) => {
                    if (res.data.code == 0) {
                        ElMessage.success('保存成功')
                        let nickname = this.userinfo.nickname
                        let avatar = this.userinfo.avatar
                        store.commit('updateUserInfo', { nickname, avatar })
                    }
                })
            }
            this.edit = !this.edit
        }
    }
}
</script>