<template>
    <div>
        <el-page-header @back="this.$router.go(-1)">
            <template #content>
                <div class="flex items-center">
                    <span class="text-large font-600 mr-3">文件处理</span>
                </div>
            </template>
            <!-- 编辑表格 -->
            <div>
                <el-table :data="tableData.data" style="width: 100%">
                    <el-table-column type="expand">
                        <template #default="props">
                            <h3>这里可以增加一些图书详情，方便检查。</h3>
                            <p m="t-0 b-2">BookId: {{ props.row.bookId }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" prop="filename" />
                    <el-table-column align="right">
                        <template #header>
                            操作
                            <!-- <el-input v-model="search" size="small" placeholder="Type to search" /> -->
                        </template>
                        <template #default="scope">
                            <el-button size="small" type="danger" @click="handleBook(scope.row.id, 3)">禁止</el-button>
                            <el-button size="small" type="success" @click="handleBook(scope.row.id, 2)">通过</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </el-page-header>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
    name: 'ileUploadProcessView',
    data: function () {
        return {
            tableData: []
        }
    },
    methods: {
        loadTableData: function () {
            this.axios.get('/api/admin/book/file/upload').then((res) => {
                this.tableData = res.data
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
        this.loadTableData()
    }
}
</script>