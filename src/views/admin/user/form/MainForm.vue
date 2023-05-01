<template>
    <div>
        <el-dialog v-model="dialogVisible" :title="title[type]">
            <div>
                <el-form :model="form" :rules="rules" label-width="120px" status-icon>
                    <el-form-item label="账户" prop="account">
                        <el-input v-model="form.account" disabled />
                    </el-form-item>
                    <el-form-item label="邮箱" prop="name">
                        <el-input v-model="form.email" disabled />
                    </el-form-item>
                    <el-form-item label="昵称" prop="name">
                        <el-input v-model="form.nickname" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="submitForm">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { getUserInfo as getInfo, updateUserInfo as updateInfo } from '@/api/admin/user'
import { ElMessage } from 'element-plus'

export default {
    name: 'mainForm',
    data: function () {
        return {
            title: {
                edit: "编辑用户",
                add: "添加用户"
            },
            type: '',
            dialogVisible: false,
            form: {

            },
            rules: {

            }
        }
    },
    props: {

    },
    methods: {
        initForm(type, data) {
            if (type == null || type == undefined) {
                type = 'add'
            }
            if (type == 'edit') {
                this.type = 'edit'
                this.initEditForm(data)
            } else {
                this.type = 'add'
                this.initAddForm()
            }
        },
        initEditForm(data) {
            this.loadOriginData(data)
            this.dialogVisible = true
        },
        initAddForm() {
            this.dialogVisible = true
        },
        loadOriginData(data) {
            getInfo(data).then(res => {
                this.form = res.data.data
            })
        },
        submitForm() {
            updateInfo(this.form).then(() => {
                ElMessage.success('修改成功')
            }).catch(() => {
                ElMessage.error('修改失败')
            })
            this.dialogVisible = false
            this.$emit('reloadData')
        }
    }
}
</script>