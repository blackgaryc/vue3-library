<template>
    <div>
        <div class="admin-page-title">{{ title }}</div>

        <!-- 搜索 -->
        <el-form ref="form" :model="form" label-width="auto" style="display: flex;">
            <el-form-item label="出版社">
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label=" " style="width: 400px;">
                <el-input v-model="form.name" placeholder="请输入书名"/>
            </el-form-item>
            <el-button>
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
                            <el-button type="primary" size="small" @click="editRow(scope.row.id)">
                                编辑
                            </el-button>
                            <el-button v-if="scope.row.status == 1" type="danger" size="small"
                                @click="changeStatus(scope.row.id)">
                                下架
                            </el-button>
                            <el-button v-else type="success" size="small" @click="changeStatus(scope.row.id)">
                                上架
                            </el-button>
                            <el-button type="danger" size="small" @click="deleteRow(scope.row.id)">
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

        </div>
        <MainForm ref="mainForm" @reloadData="reloadData"></MainForm>
    </div>
</template>

<script>
import { getListData, deleteBook as deleteItem, updateBookInfo as updateItem,changeStatus } from '@/api/admin/book';
import MainForm from './form/MainForm.vue';

export default {
    name: "bookIndex",
    data: function () {
        return {
            title: "图书管理",
            form: {},
            table: {
                prop: [
                    {
                        prop: "title",
                        label: "书名",
                        width: "200",
                        type: ""
                    },
                    {
                        prop: "author",
                        label: "作者",
                        width: "120",
                        type: ""
                    },
                    {
                        prop: "language",
                        label: "语言",
                        width: "120",
                        type: ""
                    },
                    {
                        prop: "isbn13",
                        label: "ISBN",
                        width: "150",
                        type: ""
                    },
                    {
                        prop: "isbn10",
                        label: "ISBN(旧)",
                        width: "150",
                        type: ""
                    },
                    {
                        prop: "status",
                        label: "状态",
                        width: "120",
                        type: "tag",
                        tag: {
                            type: { "1": "success", "2": "danger", "3": "danger" },
                            label: { "1": "正常", "2": "下架" },
                        }
                    }
                ],
                data: [],
                page: 1,
                size: 10,
                totalPage: 0,
                totalResult: 0
            }
        };
    },
    methods: {
        initTable: function () {
            let op = {
                prop: "tableOperations",
                label: "操作",
                width: "250",
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
        updateItem(id, form) {
            updateItem(id, form).then(res => {
                const data = res.data;
                const messageType = data.code == 0 ? "success" : "error";
                this.$message[messageType](data.message);
            }).finally(() => {
                this.reloadData();
            });
        },
        editRow(id){
            this.$refs.mainForm.initForm('edit',id);
        },
        pageChange(num) {
            this.table.page = num;
            this.reloadData();
        },
        pageSizeChange(num) {
            this.table.size = num;
            this.reloadData();
        },
        changeStatus(id) {
            changeStatus(id).finally(() => {
                this.reloadData();
            });
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