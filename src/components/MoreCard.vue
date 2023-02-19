<template>
    <el-card :body-style="{ padding: '0px', border: '0px' }" class="book-card">
        <div class="text-box">
            <div>
                <p class="book-title">更多</p>
                <div>
                    <p class="book-more">
                        <el-icon><More /></el-icon>
                    </p>
                </div>

            </div>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'MoreCard',
    props: {
    },
    data() {
        return {
            loading: true
        }
    },
    computed: {
        
    },
    methods: {
        
    },
    mounted() {
        
    },
}
</script>

<style scoped>
.book-card {
    text-align: center;
    background: linear-gradient(140deg, #a6b2b5 60%, #fdfdfd 100%);
}

.book-card .book-image {
    width: 100%;
    display: block;
}

.book-card .text-box {
    height: 0;
    padding-bottom: 125%;
    border: 2px #000405;
    position: relative;
}

.book-card .text-box .book-title {
    margin: 30px 10px 0px 10px;
}

.book-card .text-box .box-item {
    width: 110px;
    margin-top: 10px;
}
</style>
