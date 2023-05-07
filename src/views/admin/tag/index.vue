<template>
    <div>
        <div class="admin-page-title">{{ title }}</div>
        <!-- 搜索 -->
        <el-form ref="form" :model="form" label-width="auto" style="display: flex;">
            <el-button @click="addRow">
                添加
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
                            <el-button type="primary" size="small" @click="editRow(scope.row.value)">
                                编辑
                            </el-button>
                            <el-button type="danger" size="small" @click="deleteRow(scope.row.value)">
                                删除
                            </el-button>
                        </div>
                        <div v-else>{{ scope.row[item.prop] }}</div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination style="margin-top: 10px;" background layout="total, sizes, prev, pager, next, jumper"
                :default-current-page="1" :page-count="table.totalPage" :page-size="table.size" :current-page="table.page"
                :total="table.totalResult" :page-sizes="[5, 10, 15, 20, 25, 30, 40]" @update:current-page="pageChange"
                @update:page-size="pageSizeChange" />
            <MainForm ref="mainForm" @reloadData="reloadData"></MainForm>
        </div>
    </div>
</template>

<script>
// import { ElMessage } from 'element-plus'
// import { Edit } from '@element-plus/icons-vue';
import { getListData, deletetag as deleteItem } from '../../../api/admin/tag';
import MainForm from './form/MainForm.vue';
// import { ref } from 'vue'

export default {
    name: "userIndex",
    data: function () {
        return {
            title: "标签管理",
            form: {

            },
            table: {
                prop: [
                    {
                        prop: "label",
                        label: "标签名称",
                        width: "200",
                        type: ""
                    },
                ],
                data: [],
                page: 1,
                size: 10,
                totalPage: 1,
                totalResult: 1
            }
        };
    },
    methods: {
        initTable: function () {
            let op = {
                prop: "tableOperations",
                label: "操作",
                width: "270",
                type: ""
            };
            this.table.prop.push(op);
        },
        loadTableData: function () {
            getListData(this.table.page, this.table.size).then((res) => {
                this.table.data.splice(0);
                this.table.data = res.data.data;
                this.table.page = res.data.page;
                this.table.size = res.data.size;
                this.table.totalPage = res.data.totalPage;
                this.table.totalResult = res.data.totalResult;
            });
        },
        reloadData: function () {
            this.loadTableData();
        },
        deleteRow(id) {
            deleteItem(id).then(res => {
                const data = res.data;
                const messageType = data.code == 0 ? "success" : "error";
                this.$message[messageType](data.message);
            }).finally(() => {
                this.reloadData();
            });
        },
        addRow() {
            this.$refs.mainForm.initForm('add')
        },
        enableRow(id) {
            console.log(id)
            // enableItem(id).then(res => {
            //     const data = res.data;
            //     const messageType = data.code == 0 ? "success" : "error";
            //     this.$message[messageType](data.message);
            // }).finally(() => {
            //     this.reloadData();
            // });
        },
        editRow(id) {
            // const mainForm = ref() 
            this.$refs.mainForm.initForm('edit', id)
        },
        pageChange(num) {
            this.table.page = num
            this.reloadData()
        },
        pageSizeChange(num) {
            this.table.size = num
            this.reloadData()
        }
    },
    computed: {},
    mounted() {
        this.initTable();
        this.loadTableData();
    },
    components: { MainForm }
}
</script>