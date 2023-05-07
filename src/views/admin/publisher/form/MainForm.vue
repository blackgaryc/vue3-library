<template>
    <div>
        <el-dialog v-model="dialogVisible" :title="title[type]">
            <div>
                <el-form :model="form" :rules="rules" label-width="120px" status-icon>
                    <el-form-item label="出版社名称" prop="name">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="城市" prop="city">
                        <el-input v-model="form.city" />
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                        <el-input v-model="form.type" />
                    </el-form-item>
                    <el-form-item label="ISBN-国家代码" prop="isbnCode">
                        <el-input v-model="form.isbnCode" />
                    </el-form-item>
                    <el-form-item label="ISBN-出版社代码" prop="isbnPublisher">
                        <el-input v-model="form.isbnPublisher" />
                    </el-form-item>
                    <el-form-item label="中国统一书号" prop="chinaUnionPublisherId">
                        <el-input v-model="form.chinaUnionPublisherId" />
                    </el-form-item>
                    <el-form-item label="注释" prop="comments">
                        <el-input v-model="form.comments" type="textarea" />
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
import { getPublisherInfo as getInfo, updatePublisherInfo as updateInfo ,addPublisher as addItem} from '@/api/admin/publisher'
import { ElMessage } from 'element-plus'

export default {
    name: 'mainForm',
    data: function () {
        return {
            title: {
                edit: "编辑出版社",
                add: "添加出版社"
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
            this.form = {

            }
        },
        loadOriginData(data) {
            getInfo(data).then(res => {
                this.form = res.data.data
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