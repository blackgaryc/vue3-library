<template>
    <div class="library-book-favs">
        <div class="main-op">
            <div class="add">
                <el-button>添加书单</el-button>
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
                        <el-button size="small" type="" @click="handle(scope.row.bookId,'show')">查看</el-button>
                        <el-button size="small" type="danger" @click="handle(scope.row.bookId,'remove')">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
  
<script>
import { getUserBookList, listBookInBookList } from '../api/book-list'
export default {
    name: 'UserBookListView',
    components: {
    },
    data: () => {
        return {
            formData: [],
            formProp:[],
            currentBooksInBookList: []
        }
    },
    methods: {
        getBookList() {
            this.axios.get("/api/fav?size=10").then((res) => {
                this.favList = res.data.data
            })
        },
        loadBookListBooks(id) {
            listBookInBookList(id).then((res) => {
                console.log(res)
                this.currentBooksInBookList = res.data.data
            })
        },
        handle(data,type){
            if(type=='remove'){
                console.log('remove')
            }else if(type=='show'){
                console.log('show')
            }
        }
    },
    created: function () {
        getUserBookList().then((res) => {
            this.formData = res.data.data
        })
    }
}
</script>
  
<style scoped>
.main-op{
    display: flex;
    flex-direction: row;
}
</style>
  
  