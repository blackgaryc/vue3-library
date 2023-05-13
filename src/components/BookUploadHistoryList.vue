<template>
    <div>
        <el-table :data="data" stripe style="width: 100%">
            <el-table-column type="expand">
                <template #default="props">
                    <el-row :gutter="20" justify="center">
                        <el-col :span="18">
                            <div class="">
                                <span>消息</span>
                                <p>
                                    {{ props.row.message }}
                                </p>
                                <el-button @click="linkTo(props.row.bookId)">查看书籍</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column prop="filename" label="名称" />
            <el-table-column prop="status" label="状态" width="100">
                <template #default="props">
                    <el-button link :type="statusCodeType[props.row.statusCode]" plain>{{ props.row.status }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-block">
            <el-pagination layout="prev, pager, next" :total="totalResult" :current-page="page"
                @update:current-page="pageChange" :prev-click="pageChange" :next-click="pageChange" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '@/router';

export default {
    name: "BookUploadHistoryList",
    data: function () {
        return {
            data: [],
            page: 1,
            totalPage: 1,
            totalResult: 11,
            pageSize: 10,
            statusCodeType: {
                '0': "info",
                '1': "primary",
                '2': "success",
                '3': "danger",
            }
        }
    },
    methods: {
        getHistoryBooksUploadList(size, page) {
            this.pageSize = size;
            this.page = page;
            axios.get(`/api/file/upload/history/book?page=${page}&size=${size}`).then((res) => {
                this.data = res.data.data
                this.page = res.data.page
                this.totalPage = res.data.totalPage
                this.totalResult = res.data.totalResult
                this.pageSize = res.data.pageSize
            })
        },
        pageChange(page) {
            this.getHistoryBooksUploadList(10, page);
        },
        linkTo(bookId) {
            router.push({
                name: 'book_detail', params: {
                    id: bookId
                }
            })
        },
        reloadData(){
            this.getHistoryBooksUploadList(this.pageSize, this.page)
        }
    },
    mounted() {
        this.getHistoryBooksUploadList(10, 1)
    },
    computed: {
        getBookList() {
            return this.data
        }
    }
}
</script>