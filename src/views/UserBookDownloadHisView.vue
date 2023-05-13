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
            </el-table>
        </div>
    </div>
</template>
  
<script>
import BookCard from '@/components/BookCard.vue'
import { getUserBookDownloadHis } from '@/api/user/downloadhis'

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
        getUserBookDownloadHis() {
            getUserBookDownloadHis().then((res) => {
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
        this.getUserBookDownloadHis()
    }
}
</script>
  
<style scoped>
.main-op{
    display: flex;
    flex-direction: row;
}
</style>
  
  