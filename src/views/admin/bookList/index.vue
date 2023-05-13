<template>
    <div>
        <div class="admin-page-title">{{ title }}</div>

        <!-- 搜索 -->
        <el-form ref="form" :model="form" label-width="auto" style="display: flex;">
            <el-form-item label="公开">
                <el-select v-model="form.published" placeholder="请选择">
                    <el-option label="公开" value="1" />
                    <el-option label="私有" value="0" />
                </el-select>
            </el-form-item>
            <el-form-item label=" " style="width: 400px;">
                <el-input v-model="form.name" placeholder="请输入书单名称" />
            </el-form-item>
            <el-button @click="reloadData(this.form)">
                搜索
            </el-button>
        </el-form>

        <!-- 编辑表格 -->
        <div>
            <el-table :data="table.data" style="width: 100%" auto>
                <!-- <el-table-column fixed prop="date" label="Date" width="150" /> -->
                <el-table-column v-for="item in table.prop" :key="item.index" :prop="item.prop" :label="item.label"
                    :width="item.width">
                    <template #default="scope">
                        <div v-if="item.type == 'tag'">
                            <el-tag :type="item.tag.type[scope.row[item.prop]]">{{ item.tag.label[scope.row[item.prop]]
                            }}</el-tag>
                        </div>
                        <div v-else-if="item.type == 'image'">
                            <el-image :src="scope.row[item.prop]"></el-image>
                        </div>
                        <div v-else-if="item.type == 'avatar'">
                            <el-avatar :src="scope.row[item.prop]" />
                        </div>
                        <!-- 操作 -->
                        <div v-else-if="item.prop == 'tableOperations'">
                            <!-- <el-button type="primary" size="small" @click="updateItem(scope.row.id)">
                                编辑
                            </el-button> -->
                            <el-button type="primary" size="small" @click="updateItem(scope.row.id, 'show')">
                                查看内容
                            </el-button>
                            <el-button v-if="scope.row.status == 1" type="danger" size="small"
                                @click="deleteRow(scope.row.id)">
                                下架
                            </el-button>
                            <el-button v-else type="success" size="small" @click="updateItem(scope.row.id)">
                                上架
                            </el-button>
                            <!-- <el-button type="danger" size="small" @click="updateItem(scope.row.id)">
                                删除
                            </el-button> -->
                        </div>
                        <div v-else>{{ scope.row[item.prop] }}</div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="margin-top: 10px;" background layout="total, sizes, prev, pager, next, jumper"
                :default-current-page="1" :page-count="table.totalPage" :page-size="table.size" :current-page="table.page"
                :total="table.totalResult" :page-sizes="[5, 10, 15, 20, 25, 30, 40]" @update:current-page="pageChange"
                @update:page-size="pageSizeChange" />
            <MainForm ref="mainForm"></MainForm>
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { getListData, deleteItem, updateItem } from '../../../api/admin/booklist';

export default {
    name: 'bookIndex',
    data: function () {
        return {
            title: '书单管理',
            form: {},
            table: {
                prop: [
                    {
                        prop: 'name', label: '书单名称', width: '150', type: ''
                    }, {
                        prop: 'uid', label: '所属用户', width: '120', type: ''
                    },
                    {
                        prop: 'description', label: '描述', width: '400', type: ''
                    }, {
                        prop: 'published', label: '是否公开', width: '120', type: 'tag', tag: {
                            type: { '1': 'success', '2': 'danger', '3': 'danger' },
                            label: { '1': '公开', '0': '私有' },
                        }
                    }, {
                        prop: 'status', label: '状态', width: '120', type: 'tag', tag: {
                            type: { '1': 'success', '2': 'danger', '3': 'danger' },
                            label: { '1': '正常', '2': '下架' },
                        }
                    }
                ],
                data: [],
                page: 1,
                size: 10,
                totalPage: 0,
                totalResult: 0
            }
        }
    },
    methods: {
        initTable: function () {
            let op = {
                prop: 'tableOperations', label: '操作', width: '300', type: ''
            }
            this.table.prop.push(op)
        },
        loadTableData: function (form) {
            getListData(form).then((res) => {
                this.table.data = res.data.data
                this.table.page = res.data.page
                this.table.size = res.data.size
                this.table.totalPage = res.data.totalPage
                this.table.totalResult = res.data.totalResult
                console.log(this.table.data)
            })
        },
        reloadData: function (form) {
            this.loadTableData(form)
        },
        deleteRow(id) {
            deleteItem(id).then(res => {
                const data = res.data
                const messageType = data.code == 0 ? 'success' : 'error';
                this.$message[messageType](data.message)
            }).finally(() => {
                this.reloadData()
            })

        },
        updateItem(id, type) {
            if (type == 'update') {
                updateItem(id).then(res => {
                    const data = res.data
                    const messageType = data.code == 0 ? 'success' : 'error';
                    this.$message[messageType](data.message)
                }).finally(() => {
                    this.loadTableData()
                })
            } else if (type == 'show') {
                this.$router.push({ path: '/booklist/' + id })
            }


        },
        handleBook(requestId, resut) {
            let arr = new Array
            arr.push(requestId)
            this.axios.post('/api/admin/book/file/upload/update', {
                ids: arr,
                status: resut
            }).then((res) => {
                if (res.data.code == 0) {
                    ElMessage.success(res.data.message)
                    this.loadTableData()
                } else {
                    ElMessage.error(res.data.message)
                }
            })
        }
    },
    computed: {

    },
    mounted() {
        this.initTable()
        this.loadTableData()
    }
}
</script>