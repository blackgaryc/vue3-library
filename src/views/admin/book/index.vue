<template>
    <div>
        <span>{{ title }}</span>

        <!-- 搜索 -->
        <el-form ref="form" :model="form" label-width="auto" style="display: flex;">
            <el-form-item label="出版社">
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label=" " style="width: 400px;">
                <el-input v-model="form.name" placeholder="请输入书名"/>
            </el-form-item>
            <el-button>
                搜索
            </el-button>
        </el-form>

        <!-- 编辑表格 -->
        <div>
            <el-table :data="table.data" style="width: 100%" auto>
                <!-- <el-table-column fixed prop="date" label="Date" width="150" /> -->
                <el-table-column v-for="item in table.prop" :key="item.index" :prop="item.prop" :label="item.label"
                    :width="item.width">
                    <template #default="scope">
                        <div v-if="item.type == 'tag'">
                            <el-tag :type="item.tag.type[scope.row[item.prop]]">{{ item.tag.label[scope.row[item.prop]]
                            }}</el-tag>
                        </div>
                        <div v-else-if="item.type == 'image'">
                            <el-image :src="scope.row[item.prop]"></el-image>
                        </div>
                        <div v-else-if="item.type == 'avatar'">
                            <el-avatar :src="scope.row[item.prop]" />
                        </div>
                        <!-- 操作 -->
                        <div v-else-if="item.prop == 'tableOperations'">
                            <el-button type="primary" size="small" @click="updateItem(scope.row.id)">
                                编辑
                            </el-button>
                            <el-button v-if="scope.row.status == 1" type="danger" size="small"
                                @click="deleteRow(scope.row.id)">
                                下架
                            </el-button>
                            <el-button v-else type="success" size="small" @click="updateItem(scope.row.id)">
                                上架
                            </el-button>
                            <el-button type="danger" size="small" @click="updateItem(scope.row.id)">
                                删除
                            </el-button>
                        </div>
                        <div v-else>{{ scope.row[item.prop] }}</div>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination style="margin-top: 10px;" background layout="prev, pager, next"
                :total="this.table.totalResult" />

        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { getListData, deleteItem, updateItem } from '../../../api/admin/book';

export default {
    name: 'bookIndex',
    data: function () {
        return {
            title: '图书管理',
            form:{},
            table: {
                prop: [
                    {
                        prop: 'title', label: '书名', width: '200', type: ''
                    }, {
                        prop: 'author', label: '作者', width: '120', type: ''
                    }, {
                        prop: 'language', label: '语言', width: '120', type: ''
                    }, {
                        prop: 'isbn13', label: 'ISBN', width: '150', type: ''
                    }, {
                        prop: 'isbn10', label: 'ISBN(旧)', width: '150', type: ''
                    }, {
                        prop: 'status', label: '状态', width: '120', type: 'tag', tag: {
                            type: { '1': 'success', '2': 'danger', '3': 'danger' },
                            label: { '1': '正常', '2': '下架' },
                        }
                    }
                ],
                data: [
                    {
                        "id": 162,
                        "title": "数据结构与算法分析",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/9fcf80c1764fbf7249a44a4b81e5802b.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T19:38:35.000+00:00"
                    },
                    {
                        "id": 163,
                        "title": "组合数学",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/b79b874392b52e029501fdc60f09d9c4.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T19:38:39.000+00:00"
                    },
                    {
                        "id": 164,
                        "title": "具体数学-计算机基础",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/a5d46382e59ce444dc9f8ad9f275833a.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T19:38:39.000+00:00"
                    },
                    {
                        "id": 165,
                        "title": "十五个经典算法研究与总结",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/c87880a7cd67be40eb5d36c2926ef71a.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T19:38:42.000+00:00"
                    },
                    {
                        "id": 166,
                        "title": "计算机图形学的算法基础",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/a4932fac3b8a5139980af46bfaac022c.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T19:38:44.000+00:00"
                    },
                    {
                        "id": 167,
                        "title": "算法(第4版)",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/70f25c5f82fb2ce1a6c06566050f3280.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T20:49:15.000+00:00"
                    },
                    {
                        "id": 168,
                        "title": "算法精解 C语言描述",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/9f60ff97e7e6f64768e83d5ee9de5e8c.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:57:12.000+00:00"
                    },
                    {
                        "id": 169,
                        "title": "算法帝国",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/84d660985ba171d7c9056e98b2a748ec.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:57:13.000+00:00"
                    },
                    {
                        "id": 170,
                        "title": "宽容",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/d1caa91ec89364921c7cc0eadcec3a9d.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:57:49.000+00:00"
                    },
                    {
                        "id": 171,
                        "title": "历史研究",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/351f300123b73e02cfa6c2d65d4da28e.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:57:51.000+00:00"
                    },
                    {
                        "id": 172,
                        "title": "非暴力沟通",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/a06cdafb808e685ce078013a17c9cd5d.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:57:52.000+00:00"
                    },
                    {
                        "id": 173,
                        "title": "政府论 下篇",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/08ff11faca8b19b1dff0d7275dd18060.jpeg",
                        "status": 2,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:57:53.000+00:00"
                    },
                    {
                        "id": 174,
                        "title": "雪国",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/55785e8143ba1e145f02a44e527969bf.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:57:53.000+00:00"
                    },
                    {
                        "id": 175,
                        "title": "无价",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/c4519e383b13fa5bcc566b6830f9fc1d.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:57:54.000+00:00"
                    },
                    {
                        "id": 176,
                        "title": "红与黑",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/9aa5dd9edeb3c356c21d114a48eb17d2.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:57:55.000+00:00"
                    },
                    {
                        "id": 177,
                        "title": "战争论",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/cec7e50efc65fa92be74d28fb549273b.jpeg",
                        "status": 2,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:57:56.000+00:00"
                    },
                    {
                        "id": 178,
                        "title": "乌合之 众",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/8ae428e1963acacf13c176b1ea0af5b7.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:57:57.000+00:00"
                    },
                    {
                        "id": 179,
                        "title": "如何阅读一本书",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/53d1d6c5e51351f421ebde51a2c178b3.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:57:57.000+00:00"
                    },
                    {
                        "id": 180,
                        "title": "自私的基因",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/01bbabeb0800b7226446e98d4a008a86.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:57:58.000+00:00"
                    },
                    {
                        "id": 181,
                        "title": "麦肯锡方法",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/e75f630f0522c858e7602f5e4f174b10.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:57:58.000+00:00"
                    },
                    {
                        "id": 182,
                        "title": "伦理学",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/a3cde336ace8852f4141bf03fba84920.jpeg",
                        "status": 2,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:57:58.000+00:00"
                    },
                    {
                        "id": 183,
                        "title": "人月神话",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/eace326924d09244770b7787cf4aaffc.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:57:59.000+00:00"
                    },
                    {
                        "id": 184,
                        "title": "菊花与刀",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/91cba167040287cb0b340996184c71a5.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:57:59.000+00:00"
                    },
                    {
                        "id": 185,
                        "title": "社会契约论",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/0626d05edc70154cbb9f586271236a8e.jpeg",
                        "status": 2,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:58:00.000+00:00"
                    },
                    {
                        "id": 186,
                        "title": "策略思维",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/fe05ca12e4d22a91df92997d65c68ef0.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:58:00.000+00:00"
                    },
                    {
                        "id": 187,
                        "title": "老人与海",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/ce3285f0953f03f323ddd5053ffef1b5.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:58:00.000+00:00"
                    },
                    {
                        "id": 188,
                        "title": "人性的弱点",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/6fce9935e71f70d71f78cbe3867bc4d8.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T21:58:01.000+00:00"
                    },
                    {
                        "id": 189,
                        "title": "Elasticsearch服务器开发",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/1a4180c941beb0c681f57f46f15deb1d.jpeg",
                        "status": 1,
                        "createdUid": 1,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-24T22:06:20.000+00:00"
                    },
                    {
                        "id": 190,
                        "title": "GTK+程序设计中文版.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/440cc6a378b3aef5508b822ce7cf80c1.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-25T20:03:25.000+00:00"
                    },
                    {
                        "id": 191,
                        "title": "Hadoop深度学习.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/dc6dc95f358f86f86c028490a897726e.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T01:07:08.000+00:00"
                    },
                    {
                        "id": 192,
                        "title": "Hadoop数据分析.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/5ae0b077e526c25b92d28c630d4d588f.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T01:07:09.000+00:00"
                    },
                    {
                        "id": 193,
                        "title": "Hadoop应用架构.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/04700e092a9abd3722cf8fedfe6ecc71.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T01:07:10.000+00:00"
                    },
                    {
                        "id": 194,
                        "title": "[图灵程序设计丛书].TensorFlow深度学习【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/8271ab45c06b18968d273150f982bad9.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:44:16.000+00:00"
                    },
                    {
                        "id": 195,
                        "title": "[图灵程序设计丛书].Python数据分析基础教程：NumPy学习指南.第2版【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/14980b3c6de3271c408b9525c1d5f116.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:45:00.000+00:00"
                    },
                    {
                        "id": 196,
                        "title": "[图灵原创].人工智能简史【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/4f153ede2ea22ff04f050b665983c022.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:45:01.000+00:00"
                    },
                    {
                        "id": 197,
                        "title": "[图灵新知].宇宙的历程【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/90119183804744bc6a9753d79ab36cd1.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:45:03.000+00:00"
                    },
                    {
                        "id": 198,
                        "title": "[图灵交互设计丛书].亲爱的界面：让用户乐于使用、爱不释手【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/4066be22ee99ce9332b18349b3813236.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:45:04.000+00:00"
                    },
                    {
                        "id": 199,
                        "title": "[图灵程序设计丛书].Flink基础教程【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/8ffae1b772d1696c205f50c350ffa873.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:45:06.000+00:00"
                    },
                    {
                        "id": 200,
                        "title": "[图灵程序设计丛书].高效算法：竞赛、应试与提高必修128例【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/f3e28bb6e9d9d08b4ae672b64e3060aa.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:45:07.000+00:00"
                    },
                    {
                        "id": 201,
                        "title": "[图灵图书].社会工程：安全体系中的人性漏洞 【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/39b578fda52f501e5da785633668dbd6.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:45:08.000+00:00"
                    },
                    {
                        "id": 202,
                        "title": "[图灵新知].别拿相关当因果！因果关系简易入门【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/74942ea7225a2c1d1bf9c219419ada8e.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:45:10.000+00:00"
                    },
                    {
                        "id": 203,
                        "title": "[图灵图书].精通Django：Django 1.8 LTS全解【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/71db43526b5453202fadaf3d182f66d0.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:45:12.000+00:00"
                    },
                    {
                        "id": 204,
                        "title": "[图灵程序设计丛书].C#经典实例.第4版【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/6c00eed26f1492b40731c572b56a2dd9.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:45:17.000+00:00"
                    },
                    {
                        "id": 205,
                        "title": "[图灵程序设计丛书].程序员的算法趣题【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/6bb54de5691ea3d876790c041befa99a.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:45:18.000+00:00"
                    },
                    {
                        "id": 206,
                        "title": "[图灵原创].JavaScript设计模式与开发实践【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/ad587bec09e30383698bd4ddda88369d.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:45:20.000+00:00"
                    },
                    {
                        "id": 207,
                        "title": "[图灵程序设计丛书].代码的未来【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/e2283986025b403309bfc6988bd59d5f.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:45:21.000+00:00"
                    },
                    {
                        "id": 208,
                        "title": "[图灵原创].算法的乐趣.revise7【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/2f1b84acc201cd795f31b056ebb09b9f.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:45:23.000+00:00"
                    },
                    {
                        "id": 209,
                        "title": "[图灵程序设计丛书].你不知道的JavaScript（下卷）【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/4be65ba1fc1b1df10fdcddba1e2d57fa.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:45:25.000+00:00"
                    },
                    {
                        "id": 210,
                        "title": "[图灵程序设计丛书].jQuery基础教程.第4版【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/bbe4106d73690cddcc371867be75f079.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:45:27.000+00:00"
                    },
                    {
                        "id": 211,
                        "title": "[图灵程序设计丛书].Python数据挖掘入门与实践【neikuw.com】.pdf",
                        "author": null,
                        "description": "",
                        "language": "",
                        "categoryId": 0,
                        "thumbnail": "http://minio.v2ry.top/library/cover/dc2cf8da4061575d2d4b27cc8f6af56e.jpeg",
                        "status": 1,
                        "createdUid": 2,
                        "publisherId": 0,
                        "isbn10": "",
                        "isbn13": "",
                        "createTime": "2023-02-26T23:45:29.000+00:00"
                    }
                ],
                page: 1,
                size: 10,
                totalPage: 0,
                totalResult: 0
            }
        }
    },
    methods: {
        initTable: function () {
            let op = {
                prop: 'tableOperations', label: '操作', width: '250', type: ''
            }
            this.table.prop.push(op)
        },
        loadTableData: function () {
            getListData().then((res) => {
                this.table.data = res.data.data
                this.table.page = res.data.page
                this.table.size = res.data.size
                this.table.totalPage = res.data.totalPage
                this.table.totalResult = res.data.totalResult
                console.log(this.table.data)
            })
        },
        reloadData: function () {
            this.loadTableData()
        },
        deleteRow(id) {
            deleteItem(id).then(res => {
                const data = res.data
                const messageType = data.code == 0 ? 'success' : 'error';
                this.$message[messageType](data.message)
            })
            this.reloadData()
        },
        updateItem(id, form) {
            updateItem(id, form).then(res => {
                const data = res.data
                const messageType = data.code == 0 ? 'success' : 'error';
                this.$message[messageType](data.message)
            })
        },
        handleBook(requestId, resut) {
            let arr = new Array
            arr.push(requestId)
            this.axios.post('/api/admin/book/file/upload/update', {
                ids: arr,
                status: resut
            }).then((res) => {
                if (res.data.code == 0) {
                    ElMessage.success(res.data.message)
                    this.loadTableData()
                } else {
                    ElMessage.error(res.data.message)
                }
            })
        }
    },
    computed: {

    },
    mounted() {
        this.initTable()
        this.loadTableData()
    }
}
</script>