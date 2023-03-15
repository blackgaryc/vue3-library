<template>
    <div>
        <h1>{{ publisher.name }}</h1>
        <el-descriptions class="margin-top" title="详细信息" :column="1" size="default" border="border">
            <template #extra>
                <el-button type="primary" disabled>纠正</el-button>
            </template>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <location />
                        </el-icon>
                        地址
                    </div>
                </template>
                {{ publisher.city }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <Expand />
                        </el-icon>
                        类型
                    </div>
                </template>
                {{ publisher.type }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <tickets />
                        </el-icon>
                        ISBN 国家代码
                    </div>
                </template>
                {{ publisher.isbnCode }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <tickets />
                        </el-icon>
                        ISBN 出版社代码
                    </div>
                </template>
                <el-tag class="isbn-code" v-for="(item, index) in publisher.isbnPublisher.split(',')" :key="index">{{ item
                }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <tickets />
                        </el-icon>
                        中国联合出版社代码
                    </div>
                </template>
                <el-tag> {{ publisher.chinaUnionPublisherId }} </el-tag>

            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <tickets />
                        </el-icon>
                        备注
                    </div>
                </template>
                {{ publisher.comments }}
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>
export default {
    name: "PublisherListView",
    data: function () {
        return {
            publisher: [],
        };
    },
    methods: {

    },
    components: {

    },
    computed: {
    },
    beforeCreate() {
        this.axios.get('/api/publisher/' + this.$route.params.id).then((res) => {
            this.publisher = res.data.data
        })
    }
}
</script>

<style scoped>
.isbn-code {
    margin: 0 5px;
}
</style>