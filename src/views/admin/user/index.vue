<template>
    <div>
        <span>{{ title }}</span>
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
                            <el-button v-if="scope.row.disabled == false" type="danger" size="small"
                                @click="deleteRow(scope.row.id)">
                                禁止登陆
                            </el-button>
                            <el-button v-else type="success" size="small" @click="enableRow(scope.row.id)">
                                启用账户
                            </el-button>
                        </div>
                        <div v-else>{{ scope.row[item.prop] }}</div>
                    </template>
                </el-table-column>
            </el-table>
            
            <el-pagination style="margin-top: 10px;" background layout="prev, pager, next" :total="this.table.totalResult" />

        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { getListData, deleteItem, enableItem } from '../../../api/admin/user';

export default {
    name: 'userIndex',
    data: function () {
        return {
            title: '用户管理',
            table: {
                prop: [
                    {
                        prop: 'account', label: '账户', width: '120', type: ''
                    }, {
                        prop: 'avatar', label: '头像', width: '120', type: 'avatar'
                    }, {
                        prop: 'nickname', label: '昵称', width: '120', type: ''
                    }, {
                        prop: 'email', label: '邮箱', width: '180', type: ''
                    }, {
                        prop: 'githubId', label: 'GITHUB ID', width: '150', type: ''
                    }, {
                        prop: 'disabled', label: '状态', width: '120', type: 'tag', tag: {
                            type: { 'false': 'success', 'true': 'danger' },
                            label: { 'false': '正常', 'true': '禁止' },
                        }
                    }
                ],
                data: [{
                    account: '1111',
                    avatar: '1111',
                    nickname: '1111',
                    email: '1111',
                    githubId: '1111',
                    disabled: false
                },
                {
                    account: '1111',
                    avatar: '1111',
                    nickname: '1111',
                    email: '1111',
                    githubId: '1111',
                    disabled: false
                }],
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
                prop: 'tableOperations', label: '操作', width: '150', type: ''
            }
            this.table.prop.push(op)
        },
        loadTableData: function () {
            getListData().then((res) => {
                this.table.data = res.data.data
                this.table.page = res.data.page
                this.table.size = res.data.size
                this.table.totalPage = res.data.totalPage
                this.table.totalResult = res.data.totalResult
                console.log(this.table.data)
            })
        },
        reloadData: function () {
            this.loadTableData()
        },
        deleteRow(id) {
            deleteItem(id).then(res => {
                const data = res.data
                const messageType = data.code == 0 ? 'success' : 'error';
                this.$message[messageType](data.message)
            })
            this.reloadData()
        },
        enableRow(id) {
            enableItem(id).then(res => {
                const data = res.data
                const messageType = data.code == 0 ? 'success' : 'error';
                this.$message[messageType](data.message)
            })
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