<template>
    <div>
        <el-dialog v-model="dialogVisible" :title="title[type]">
            <div>
                <el-form :model="form" :rules="rules" label-width="120px" status-icon>
                    <el-form-item label="书名" prop="title">
                        <el-input v-model="form.title" />
                    </el-form-item>
                    <el-form-item label="作者" prop="author">
                        <el-input v-model="form.author" />
                    </el-form-item>
                    <el-form-item label="预览图" prop="thumbnail">
                        <el-input v-model="form.thumbnail" />
                    </el-form-item>
                    <el-form-item label="出版社" prop="publisherId">
                        <el-select v-model="form.publisherId" placeholder="请选择出版社">
                            <el-option v-for="(item, index) in option.publisher" :key="index" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="语言" prop="language">
                        <el-select v-model="form.language" placeholder="请选择语言">
                            <el-option label="中文" value="中文" />
                            <el-option label="英语" value="英语" />
                            <el-option label="俄语" value="俄语" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="isbn" prop="isbn13">
                        <el-input v-model="form.isbn13" />
                    </el-form-item>
                    <el-form-item label="isbn（旧）" prop="isbn10">
                        <el-input v-model="form.isbn10" />
                    </el-form-item>
                    <el-form-item label="分类" prop="categoryId">
                        <el-cascader v-model="form.categoryId" placeholder="请选择分类" :options="option.category"
                            :show-all-levels="false" :props="{ emitPath: false }" />
                    </el-form-item>
                    <el-form-item label="标签" prop="tags">
                        <el-select multiple v-model="form.tags" placeholder="请选择标签">
                            <el-option v-for="(item, index) in option.tag" :key="index" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-input v-model="form.description" type="textarea" />
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
import { getBookInfo as getInfo, updateBookInfo as updateInfo } from '@/api/admin/book'
import { getPublisherSelectData } from '@/api/admin/publisher'
import { getCategorySelectData } from '@/api/admin/category'
import { getTagSelectData } from '@/api/admin/tag'

import { ElMessage } from 'element-plus'

export default {
    name: 'mainForm',
    data: function () {
        return {
            title: {
                edit: "编辑图书",
                add: "添加图书"
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
            const that = this
            function initPublisher() {
                getPublisherSelectData().then(res => {
                    that.option.publisher = res.data.data
                })
            }
            function initCategory() {
                getCategorySelectData().then(res => {
                    that.option.category = res.data.data
                })
            }
            function initTag() {
                getTagSelectData().then(res => {
                    that.option.tag = res.data.data
                })
            }
            initCategory()
            initPublisher()
            initTag()
        },
        initEditForm(data) {
            this.id=data
            this.loadOriginData(data)
            this.dialogVisible = true
        },
        initAddForm() {
            this.dialogVisible = true
        },
        loadOriginData(data) {
            console.log(data)
            getInfo(data).then(res => {
                this.form = res.data.data
            })
        },
        submitForm() {
            if (this.type == 'edit') {
                updateInfo(this.id,this.form).then(() => {
                    ElMessage.success('修改成功')
                }).catch(() => {
                    ElMessage.error('修改失败')
                })
            }
            this.dialogVisible = false
            this.$emit('reloadData')
        }
    }
}
</script>