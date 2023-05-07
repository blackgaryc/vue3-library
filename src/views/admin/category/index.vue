<template>
    <div>
        <div class="admin-page-title">{{ title }}</div>
        <!-- 编辑表格 -->
        <div>
            <el-tree :data="table.data" node-key="value" :expand-on-click-node="false"
                :render-content="renderContent">
                <template #default="{ node, data }">
                    <span class="custom-tree-node">
                        <span>{{ node.label }}</span>
                        <span>
                            <a style="color: blue;" @click="appendNode(data)"> 添加 </a>
                            <a style="margin-left: 40px; color: blue;" @click="editNode(data)"> 编辑 </a>
                            <a style="margin-left: 40px;color: red;" @click="removeNode(node, data)"> 删除 </a>
                        </span>
                    </span>
                </template>
            </el-tree>
            <MainForm ref="mainForm" @reloadData="reloadData"></MainForm>
        </div>
    </div>
</template>

<script>
// import { ElMessage } from 'element-plus'
// import { Edit } from '@element-plus/icons-vue';
import { getCategorySelectData, deletecategory as deleteItem } from '../../../api/admin/category';
import MainForm from './form/MainForm.vue';
// import { ref } from 'vue'

export default {
    name: "categoryIndex",
    data: function () {
        return {
            title: "分类管理",
            form: {

            },
            table: {
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

        },
        loadTableData: function () {
            getCategorySelectData().then((res) => {
                this.table.data.splice(0);
                this.table.data = res.data.data;
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
        editRow(id) {
            // const mainForm = ref() 
            this.$refs.mainForm.initForm('edit', id)
        },
        appendNode(data) {
            console.log(data)
            this.$refs.mainForm.initForm('add', data.value)
        },
        editNode(data) {
            console.log(data)
            this.$refs.mainForm.initForm('edit', data.value)
        },
        removeNode(node, data) {
            console.log(node, data)
            deleteItem(data.value).then(res => {
                const data = res.data;
                const messageType = data.code == 0 ? "success" : "error";
                this.$message[messageType](data.message);
            }).finally(() => {
                this.reloadData();
            });
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