<template>
    <div>
        <el-dialog v-model="dialogVisible" :title="title[type]" width="100%">
            <div>
                <el-form :model="form" :rules="rules" status-icon>
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-input v-model="form.description" type="textarea" />
                    </el-form-item>
                    <el-form-item label="是否公开" prop="published">
                        <el-switch v-model="form.published" class="ml-2"
                            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitForm">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { getBookListInfo as getInfo, updateUserBookList as updateInfo,createUserBookList as addItem } from '@/api/user/booklist'

import { ElMessage } from 'element-plus'

export default {
    name: 'mainForm',
    data: function () {
        return {
            title: {
                edit: "编辑书单",
                add: "添加书单"
            },
            type: '',
            dialogVisible: false,
            id: undefined,
            form: {

            },
            rules: {

            },
            option: {
                publisher: {

                }
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
            this.initOption()
        },
        initOption() {
        },
        initEditForm(data) {
            this.id = data
            this.loadOriginData(data)
            this.dialogVisible = true
        },
        initAddForm() {
            this.dialogVisible = true
            this.form={
                published:false
            }
        },
        loadOriginData(data) {
            getInfo(data).then(res => {
                this.form = res.data.data
                this.form.published = this.form.published==1
            })
        },
        submitForm() {
            if (this.type == 'edit') {
                updateInfo(this.form).then(() => {
                    ElMessage.success('修改成功')
                }).catch(() => {
                    ElMessage.error('修改失败')
                }).finally(() => {
                    this.dialogVisible = false
                    this.$emit('reloadData')
                })
            }else{
                addItem(this.form).then(() => {
                    ElMessage.success('添加成功')
                }).catch(() => {
                    ElMessage.error('添加失败')
                }).finally(() => {
                    this.dialogVisible = false
                    this.$emit('reloadData')
                })
            }

        }
    }
}
</script>