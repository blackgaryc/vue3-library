<template>
    <div>
        <el-tabs class="" v-model="activeName" :stretch="true">
            <el-tab-pane label="上传文件" name="first">
                <el-upload class="upload-demo" drag action="/api/file/upload" :data="{ 'type': 'user_upload_book_file' }"
                    multiple :on-error="onUploadFileError" :on-preview="onUploadFilePreview"
                    :on-success="onUploadFileSuccess">
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        拖拽文件到这里 或者 <em>点击上传文件</em>
                    </div>
                    <template #tip>
                        <div class="el-upload__tip">
                            <ul>
                                <li>只允许小于30MB的文件上传</li>
                                <li>允许上传的文件类型有 .pdf</li>
                                <li>审核未完成的书籍，仅个人可以查看</li>
                                <li>上传文件的文件经过审核才能公开访问</li>
                                <li>应版权方要求您上传的文件可能会被下架。</li>
                            </ul>
                        </div>
                    </template>
                </el-upload></el-tab-pane>
            <el-tab-pane label="历史上传" name="second">
                <BookUploadHistoryList></BookUploadHistoryList>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import BookUploadHistoryList from '@/components/BookUploadHistoryList.vue'
import { ElMessage } from 'element-plus'

export default {
    name: "UploadBookView",
    data: () => {
        return {
            count: 0,
            historyUploadedBooks: new Object,
            activeName: 'first'
        };
    },
    methods: {
        onUploadFileError(error, uploadFile, uploadFiles) {
            console.log(JSON.stringify(error));
            console.log(uploadFile, uploadFiles);
        },
        onUploadFilePreview(uploadFile) {
            console.log("uploadFile", uploadFile);
            this.$router.push({
                name: "book_detail", params: {
                    id: uploadFile.response.data.id
                }
            });
        },
        onUploadFileSuccess(response, uploadFile, uploadFiles) {
            this.count++;
            console.log(response, uploadFile, uploadFiles);
            if (0 != response.code) {
                uploadFiles.pop();
                ElMessage.error(response.message);
            }
        }
    },
    components: { BookUploadHistoryList },
    computed: {

    }
}
</script>