<template>
    <div class="library-book-favs">
        <div class="main-op">
        </div>
        <!-- 收藏编辑 -->
        <div>
            <el-table :data="formData" :rules="formProp" style="width: 100%">
                <el-table-column label="书籍" prop="title">
                </el-table-column>
                <el-table-column label="预览图" prop="thumbnail" width="120">
                    <template #default="scope">
                        <BookCard :thumbnail="scope.row.thumbnail"></BookCard>
                    </template>
                </el-table-column>
                <el-table-column align="right" label="操作" prop="op">
                    <template #default="scope">
                        <!-- <el-button size="small" type="" @click="handle(scope.row.bookId,'show')">查看</el-button> -->
                        <el-button size="small" type="danger" @click="handle(scope.row.bookId,'remove')">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
  
<script>
import BookCard from '@/components/BookCard.vue'
import { listBookInBookList } from '../api/book-list'
export default {
    name: 'UserBookListView',
    components: {
    BookCard
},
    data: () => {
        return {
            bookListId: undefined,
            formData: []
        }
    },
    methods: {
        loadBookListBooks(id) {
            listBookInBookList(id).then((res) => {
                this.formData = res.data.data
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
        console.log(this.$route.params.id)
        this.loadBookListBooks(this.$route.params.id)
    }
}
</script>
  
<style scoped>
.main-op{
    display: flex;
    flex-direction: row;
}
</style>
  
  