<template>
    <div class="library-book-favs">
        <!-- 收藏编辑 -->
        <div>
            <el-table :data="favList" style="width: 100%">
                <el-table-column label="预览" type="left">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <BookCard :thumbnail="scope.row.thumbnail"></BookCard>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="书名" prop="bookName">

                </el-table-column>
                <el-table-column align="right">
                    <template #header>
                        操作
                        <!-- <el-input v-model="search" size="small" placeholder="Type to search" /> -->
                    </template>
                    <template #default="scope">
                        <el-button size="small" type="danger" @click="handleBook(scope.row.book_id)">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
  
<script>
import BookCard from '@/components/BookCard.vue'
import { ElMessage } from 'element-plus'

export default {
    name: 'BookFavsView',
    components: {
        BookCard
    },
    data: () => {
        return {
            favList: []
        }
    },
    methods: {
        getFavList() {
            this.axios.get("/api/fav?size=10").then((res) => {
                this.favList = res.data.data
            })
        },
        handleBook(id) {
            this.axios.delete("/api/fav/" + id).then((res) => {
                if (res.data.code == 0) {
                    ElMessage.success("删除成功")
                    this.favList = this.favList.filter((v) => {
                        if (v.bookId != id) {
                            return v
                        }
                    })
                } else {
                    if (res.data.message.length > 0) {
                        ElMessage.success(res.data.message)
                    } else {
                        ElMessage.error('遇到错误,删除失败')
                    }
                }
            }).finally(()=>{
                this.getFavList()
            })
        }
    },
    created: function () {
        this.getFavList()
    }
}
</script>
  
<style></style>
  
  