<template>
    <div>
        <h1>已收录的出版社信息</h1>
        <el-row>
            <el-col v-for="item in publisher" :key="item.id" :xs="224" :sm="12" :md="8" :lg="8" :xl="6">
                <div @click="() => { this.$router.push({ name: 'publisher_details', params: { id: item.id } }) }">
                    <p class="publisher_title">{{ item.name }}</p>
                </div>
            </el-col>
        </el-row>
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
        this.axios.get('/api/publisher/list').then((res) => {
            this.publisher = res.data.data
        })
    }
}
</script>
<style>
.publisher_title{
    text-align: center;
}
</style>