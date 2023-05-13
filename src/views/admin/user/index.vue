<template>
    <div>
        <div class="admin-page-title">{{ title }}</div>
         <!-- 搜索 -->
         <el-form ref="form" :model="form" label-width="auto" style="display: flex;">
            <el-form-item label=" " style="width: 400px;">
                <el-input v-model="form.name" placeholder="请输入用户昵称/账户/邮箱"/>
            </el-form-item>
            <el-button @click="loadTableData(form.name)">
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
import { getUserListData as getListData, disableUser as deleteItem, enableUser as enableItem } from '../../../api/admin/user';
import MainForm from './form/MainForm.vue';
// import { ref } from 'vue'

export default {
    name: "userIndex",
    data: function () {
        return {
            title: "用户管理",
            form:{

            },
            table: {
                prop: [
                    {
                        prop: "account",
                        label: "账户",
                        width: "200",
                        type: ""
                    },
                    {
                        prop: "avatar",
                        label: "头像",
                        width: "120",
                        type: "avatar"
                    },
                    {
                        prop: "nickname",
                        label: "昵称",
                        width: "120",
                        type: ""
                    },
                    {
                        prop: "email",
                        label: "邮箱",
                        width: "180",
                        type: ""
                    },
                    {
                        prop: "githubId",
                        label: "GITHUB ID",
                        width: "150",
                        type: ""
                    },
                    {
                        prop: "disabled",
                        label: "状态",
                        width: "120",
                        type: "tag",
                        tag: {
                            type: { "false": "success", "true": "danger" },
                            label: { "false": "正常", "true": "禁止" },
                        }
                    }
                ],
                data: [{
                    account: "1111",
                    avatar: "1111",
                    nickname: "1111",
                    email: "1111",
                    githubId: "1111",
                    disabled: false
                }, {
                    account: "1111",
                    avatar: "1111",
                    nickname: "1111",
                    email: "1111",
                    githubId: "1111",
                    disabled: false
                }],
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
        loadTableData: function (name) {
            getListData(this.table.page, this.table.size,name).then((res) => {
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
        enableRow(id) {
            enableItem(id).then(res => {
                const data = res.data;
                const messageType = data.code == 0 ? "success" : "error";
                this.$message[messageType](data.message);
            }).finally(() => {
                this.reloadData();
            });
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