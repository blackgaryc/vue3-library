<template>
    <div>
        <el-dialog v-model="dialogVisible" :title="title[type]">
            <div>
                <el-form :model="form" :rules="rules" label-width="120px" status-icon>
                    <el-form-item label="标签名称" prop="name">
                        <el-input v-model="form.name" />
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
import { gettagInfo as getInfo, updatetagInfo as updateInfo, addItem as addItem } from '@/api/admin/tag'
import { ElMessage } from 'element-plus'

export default {
    name: 'mainForm',
    data: function () {
        return {
            title: {
                edit: "编辑标签",
                add: "添加标签"
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
            this.form = { name: undefined }
        },
        loadOriginData(data) {
            getInfo(data).then(res => {
                this.form = res.data.data
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