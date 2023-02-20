<template>
    <div>
        <h3>用户信息</h3>
        <el-form ref="form" :model="userinfo" label-width="auto" label-position="left">
            <el-form-item label="帐号id">
                <el-input v-model="userinfo.id" :disabled="true" />
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="userinfo.nickname" :disabled="true" />
            </el-form-item>
            <el-form-item label="头像">
                <!-- <el-input v-model="userinfo.avatar" disabled="true" /> -->
                <!-- <el-avatar :src="userinfo.avatar"></el-avatar> -->
                <el-upload class="avatar-uploader" :show-file-list="false" :http-request="functionUpload"
                    :on-success="handleAvatarSuccess" :submit="uploadMinioFile" :auto-upload="true"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="userinfo.avatar" :src="userinfo.avatar" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
                <input type="file" />
            </el-form-item>
            <el-form-item label="邮箱" disabled>
                <el-input v-model="userinfo.email" :disabled="true" />
            </el-form-item>
            <el-form-item label="手机" disabled>
                <el-input v-model="userinfo.phone" :disabled="true" />
            </el-form-item>
        </el-form>
        <el-button @click="uploadMinioFile">aaaaa</el-button>
    </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';
// const stream = require('stream')
// export function toBlob(base64Data) {
//     let byteString = base64Data
//     if (base64Data.split(',')[0].indexOf('base64') >= 0) {
//         byteString = window.atob(base64Data.split(',')[1]) // base64 解码
//     } else {
//         byteString = unescape(base64Data.split(',')[1])
//     }
//     let mimeString = base64Data.split(';')[0].split(":")[1] // mime类型
//     let uintArr = new Uint8Array(byteString.length) // 创建视图
//     for (let i = 0; i < byteString.length; i++) {
//         uintArr[i] = byteString.charCodeAt(i)
//     }
//     const blob = new Blob([uintArr], {
//         type: mimeString
//     })
//     return blob
// }

// import minioClient from '@/minio';

export default {
    name: 'UserInfoEditView',
    data: function () {
        return {
            userinfo: new Object,
            avatarUploadUrl: '',
            selectedFile: null
        }
    },
    created: function () {
        axios.get('/api/user/info').then((response) => {
            console.log(response)
            this.userinfo = response.data.data
        })
        axios.get('/api/file/user/info/avatar').then((response) => {
            console.log(response.data.data)
            this.avatarUploadUrl = response.data.data
        });
    },
    methods: {
        handleAvatarSuccess(response, uploadFile) {
            console.log(response, uploadFile)
        },
        beforeAvatarUpload(rawFile) {
            if (!rawFile.type.match("^image/[a-z]*")) {
                ElMessage.error('Avatar picture must be image file!')
                return false
            } else if (rawFile.size / 1024 / 1024 > 2) {
                ElMessage.error('Avatar picture size can not exceed 2MB!')
                return false
            }
            return true
        },
        functionUpload(UploadRequestOptions) {
            console.log(UploadRequestOptions)
        },
        // uploadMinioFile() {
        //     axios.get('/api/user/sts/generate').then((response) => {
        //         console.log(response.data.data)
        //         var Minio = require('minio')
        //         const res = response.data.data
        //         console.log(res)
        //         var minioClient = new Minio.Client({
        //             endPoint: 'minio.v2ry.top',
        //             accessKey: res.accessKey,
        //             secretKey: res.secretKey,
        //             sessionToken: res.sessionToken
        //         });
        //         console.log(minioClient)

        //         const file = this.selectedFile
        //         const fileName = file.name;
        //         const mineType = file.type;
        //         const fileSize = file.size;
        //         let metadata = {
        //             "content-type": mineType,
        //             "content-length": fileSize,
        //         };
        //         console.log("fileName", fileName);

        //         let reader = new FileReader();
        //         console.log(reader);
        //         reader.readAsDataURL(file);
        //         reader.onloadend = function (e) {
        //             console.log("ee", e);
        //             const dataurl = e.target.result;
        //             //base64转blob
        //             const blob = toBlob(dataurl);
        //             //blob转arrayBuffer
        //             let reader2 = new FileReader();
        //             reader2.readAsArrayBuffer(blob);
        //             reader2.onload = function (ex) {
        //                 //定义流
        //                 let bufferStream = new stream.PassThrough();
        //                 //将buffer写入
        //                 bufferStream.end(Buffer.from(ex.target.result));
        //                 minioClient.putObject('library', 'user/' + this.userinfo.id + '/info/avatar',
        //                     bufferStream,
        //                     fileSize,
        //                     metadata,
        //                     function (err, etag) {
        //                         // console.log("dddddd");
        //                         if (err == null) { // 为空则代表上传成功
        //                             console.log(err, etag)
        //                             // let res = {
        //                             //     path: `http://192.168.0.226:30014/${backetName}/${path}/${fileDate}/${fileName}`,
        //                             //     result: 1,
        //                             // };
        //                             // // 成功生成url后调用
        //                             // // 调用传进来的this的的方法，然后通过该方法把成功事件发送出去
        //                             // vm.handleAvatarSuccess(res, vm.filedname);
        //                             // vm.fileName = fileName;
        //                             // vm.$message({
        //                             //     message: "上传成功！",
        //                             //     type: "success",
        //                             // });
        //                         }
        //                     }
        //                 )
        //             }
        //         }
        //     });
        //     console.log('uploadMinioFile')
        //     // console.log(minioClient)
        // }
    }
}
</script>