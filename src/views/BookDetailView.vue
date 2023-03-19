<template>
    <div class="book-detail-body">
        <div v-if="message">
            <el-dialog v-model="message" title="错误" width="80%" :before-close="handleClose">
                <span>{{ message }}</span>
                <template #footer>
                    <span class="dialog-footer">
                        <!-- <el-button @click="dialogVisible = false">Cancel</el-button> -->
                        <el-button type="primary" @click="goBack">
                            返回
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
        <div v-else>
            <el-row :gutter="20" justify="center">
                <el-col :xs="22" :sm="22" :md="4" :lg="4" :xl="4">
                    <el-row justify="center">
                        <el-col :xs="12" :sm="12" :md="24" :lg="24" :xl="24">
                            <div class="book-detail-item">
                                <BookCard :title="book.title" :thumbnail="book.thumbnail"></BookCard>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="hidden-sm-and-up book-like-tool-div">
                        <div @click="addFav(book.id)">
                            <el-icon>
                                <StarFilled :color="liked ? 'read' : 'black'" />
                            </el-icon>标记喜欢
                        </div>
                        <el-icon>
                            <Comment />
                        </el-icon>0 条评论
                    </div>

                </el-col>
                <el-col :xs="22" :sm="22" :md="20" :lg="4" :xl="20">
                    <el-descriptions :column="1" :border="true">
                        <el-descriptions-item label="标题">
                            <el-tooltip class="box-item" effect="dark" :content="book.title" placement="top">
                                {{ title }}
                            </el-tooltip>
                        </el-descriptions-item>
                        <el-descriptions-item label="作者">
                            <el-link>作者1&nbsp;&nbsp;&nbsp;</el-link>
                            <el-link>作者1&nbsp;&nbsp;&nbsp;</el-link>
                            <el-link>作者1&nbsp;&nbsp;&nbsp;</el-link>
                        </el-descriptions-item>

                        <el-descriptions-item label="评分">
                            <el-rate v-model="book.rate" clearable />
                        </el-descriptions-item>
                        <el-descriptions-item label="种类">未分类</el-descriptions-item>
                        <el-descriptions-item label="语言">中文</el-descriptions-item>
                        <el-descriptions-item label="ISBN10">1234567890</el-descriptions-item>
                        <el-descriptions-item label="ISBN13">1234567890123</el-descriptions-item>
                        <el-descriptions-item label="出版社">我是一个出版社我是一个出版社</el-descriptions-item>
                    </el-descriptions>
                    <div style="padding: 10px;">
                        {{ book.description }}
                    </div>
                    <el-dropdown size="large" split-button type="primary" @click="handleClick"
                        :disabled="this.selectedDownloadFile ? false : true">
                        {{ fileDownloadSmallTitle }}
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="item, index in book.file" :key="index">{{
                                    getBookExtensionAndSizeHumanReadable(item) }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import BookCard from '@/components/BookCard.vue';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/display.css'

export default {
    name: "BookDetailView",
    data: function () {
        return {
            message: '',
            book: {
                title: 'aa',
                thumbnail: null,
                rate: 4.0
            },
            liked: true,
            defaultSizeUnit: [
                "B", "KB", "MB", "GB"
            ],
            selectedDownloadFile: null
        };
    },
    created: function () {
        this.loadBookData()
    },
    methods: {
        handleClick() {
            this.axios.get('/api/file/download?id=' + this.selectedDownloadFile.id).then((res) => {
                console.log(res)
                if (res.data.code != 0) {
                    ElMessage.error(res.data.message)
                } else {
                    window.open(res.data.data, '_blank')
                }
            })
        },
        goBack() {
            this.$router.push({ name: "home" });
        },
        loadBookData() {
            const bookId = this.$route.params.id;
            this.axios.get("/api/book/" + bookId).then((res) => {
                console.log(res)
                if (res.data.code !== 0) {
                    this.message = res.data.message;
                } else {
                    this.book = res.data.data
                    this.book.rate = 4.0
                    if (this.book.file) {
                        this.selectedDownloadFile = this.book.file[0]
                    }
                }
            });
        },
        getBookExtensionAndSizeHumanReadable(file) {
            let count = 0;
            let size = file.size;
            while (size > 1024) {
                size = size / 1024;
                count += 1
            }
            return '(' + file.extension + '/' + (Math.floor(size * 100) / 100) + this.defaultSizeUnit[count] + ')'
        },
        addFav(id) {
            this.axios.post("/api/fav?id=" + id).then((res) => {
                if (res.data.code == 0) {
                    ElMessage.success('添加成功')
                } else {
                    ElMessage.error(res.data.message)
                }
            })
        }
    },
    computed: {
        title: function () {
            // max = max ? max : 15
            let max = 15
            if (!this.book || !this.book.title) {
                return ''
            }
            if (this.book.title.length > max) {
                return this.book.title.substring(0, max)
            }
            return this.book.title
        },
        fileDownloadSmallTitle: function () {
            if (this.selectedDownloadFile) {
                return "下载" + this.getBookExtensionAndSizeHumanReadable(this.selectedDownloadFile)
            }
            return "无法下载"
        }
    },
    components: { BookCard }
}
</script>

<style>
.book-detail-body {
    margin: 10px;
}

.book-detail-item {
    margin: 0px;
    margin-bottom: 30px;
}

.book-like-tool-div {
    text-align: center;
    margin-bottom: 20px;
}
</style>