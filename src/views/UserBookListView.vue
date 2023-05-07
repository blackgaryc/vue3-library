<template>
    <div class="library-book-favs">
        <div class="main-op">
            <div class="add">
                <el-button @click="handle(null,'add')">添加书单</el-button>
            </div>
        </div>
        <!-- 收藏编辑 -->
        <div>
            <el-table :data="formData" :rules="formProp" style="width: 100%">
                <el-table-column label="书单名称" prop="name">
                </el-table-column>
                <el-table-column label="状态" prop="published" width="70">
                    <template #default="scope">
                        <el-tag :type="scope.row.published === 1 ? 'success' : 'info'">
                            {{ scope.row.published ? "公开" : "私有" }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="right" label="操作" prop="op">
                    <template #default="scope">
                        <el-button size="small" type="" @click="handle(scope.row.id,'show')">查看</el-button>
                        <el-button size="small" type="" @click="handle(scope.row.id,'edit')">编辑</el-button>
                        <el-button size="small" type="danger" @click="handle(scope.row.id,'remove')">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <MainForm ref="mainForm" @reloadData="reloadData"></MainForm>
    </div>
</template>
  
<script>
import { getUserBookList, listBookInBookList,deleteUserBookList } from '../api/book-list'
import MainForm from './user/booklist/MainForm.vue'
export default {
    name: 'UserBookListView',
    components: {
    MainForm
},
    data: () => {
        return {
            formData: {
                name: undefined,
                published:false,
                description:undefined
            },
            formProp:[],
            currentBooksInBookList: []
        }
    },
    methods: {
        loadBookListBooks(id) {
            listBookInBookList(id).then((res) => {
                console.log(res)
                this.currentBooksInBookList = res.data.data
            })
        },
        handle(data,type){
            if(type=='remove'){
                console.log('remove')
                deleteUserBookList(data).finally(()=>{
                    this.reloadData()
                })
            }else if(type=='show'){
                this.$router.push({path:"/booklist/"+data})
            }else if(type=='add'){
                this.$refs.mainForm.initForm('add')
            }else if(type=='edit'){
                this.$refs.mainForm.initForm('edit',data)
            }
        },
        reloadData(){
            getUserBookList().then((res) => {
            this.formData = res.data.data
        })
        }
    },
    created: function () {
        this.reloadData();
    }
}
</script>
  
<style scoped>

.main-op{
    display: flex;
    flex-direction: row;
}

.main-op .add{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-content: flex-end;
    align-self: flex-end;
}
</style>
  
  