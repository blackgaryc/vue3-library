<template>
    <div>
        <el-dialog v-model="dialogVisible" :title="title[type]">
            <div>
                <el-form :model="form" :rules="rules" label-width="120px" status-icon>
                    <el-form-item label="父级分类名称" prop="parentName">
                        <el-input v-model="parentName" disabled />
                    </el-form-item>
                    <el-form-item label="分类名称" prop="name">
                        <el-input v-model="form.name" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitForm">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { getcategoryInfo as getInfo, updatecategoryInfo as updateInfo, addCategory as addItem } from '@/api/admin/category'
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
                parentId: undefined,
                name: undefined,
                id: undefined
            },
            rules: {

            },
            parentName: undefined
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
                this.initAddForm(data)
            }
        },
        initEditForm(data) {
            this.loadOriginData(data)
            this.dialogVisible = true
        },
        initAddForm(data) {
            this.dialogVisible = true
            this.form.parentId = data
            getInfo(data).then(res => {
                this.parentName = res.data.data.name
            })
            this.form.name = undefined
            this.form.id = undefined
        },
        loadOriginData(data) {
            getInfo(data).then(res => {
                this.form = res.data.data
            }).finally(() => {
                getInfo(this.form.parentId).then(res => {
                    this.parentName = res.data.data.name
                })
            })
        },
        submitForm() {
            if (this.type == 'edit') {
                updateInfo(this.form.id,this.form).then(() => {
                    ElMessage.success('修改成功')
                }).catch(() => {
                    ElMessage.error('修改失败')
                }).finally(() => {
                    this.dialogVisible = false
                    this.$emit('reloadData')
                })

            } else {
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