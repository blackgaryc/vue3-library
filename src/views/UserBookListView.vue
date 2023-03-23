<template>
    <div class="library-book-favs">
        <!-- 收藏编辑 -->
        <div>
            <el-table :data="formData" style="width: 100%">
                <!-- 展开行 -->
                <el-table-column type="expand">
                    <template #default="props">
                        <div m="4" @click="loadBookListBooks(props.row.id)">
                            <h3>书籍列表</h3>
                            <el-table :data="currentBooksInBookList" :border="childBorder">
                                <el-table-column label="预览图" prop="thumbnail" width="120">
                                    <template #default="scope">
                                        <div style="display: flex; align-items: center">
                                            <el-image :src="scope.row.thumbnail" />
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="书名" prop="title" />
                            </el-table>
                            <el-button style="width: 100%;">添加新的书</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="书单名称" prop="name">
                </el-table-column>
                <el-table-column label="公开" prop="published" width="70">
                    <template #default="scope">
                        <el-tag :type="scope.row.published === 1 ? 'success' : 'primary'">
                            {{ scope.row.published ? "公开" : "私有" }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="right">
                    <template #header>
                        操作
                        <!-- <el-input v-model="search" size="small" placeholder="Type to search" /> -->
                    </template>
                    <template #default="scope">
                        <el-button size="small" type="primary" @click="handleBook(scope.row.bookId)">修改</el-button>
                        <el-button size="small" type="danger" @click="handleBook(scope.row.bookId)">移除</el-button>
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
        }
    },
    created: function () {
        getUserBookList().then((res) => {
            this.formData = res.data.data
        })
    }
}
</script>
  
<style></style>
  
  