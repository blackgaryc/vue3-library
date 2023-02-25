<template>
    <el-card :body-style="{ padding: '0px', border: '0px' }" class="book-card">

        <div v-if="showImage">
            <el-skeleton style="" animated :loading="loading">
                <template #template>
                    <el-skeleton-item variant="image" style="height: 150px;">

                    </el-skeleton-item>
                </template>
                <template #default>
                    <img :src="thumbnail" class="book-image" />
                </template>
            </el-skeleton>
            <div style="height: 0px;">
                <el-image :src="thumbnail" @load="onImgLoad"></el-image>
            </div>
        </div>
        <div class="text-box" v-else>
            <div>
                <p class="book-title">{{ title.substring(0, title.length > 16 ? 16 : title.length) }}</p>
                <div>
                    <!-- <el-tooltip class="box-item" content="" placement="top">
                                <p class="book-authors">
                                    {{ authorList }}
                                </p>
                            </el-tooltip> -->
                    <p class="book-authors">
                        {{ authorList }}
                    </p>
                </div>

            </div>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'BookCard',
    props: {
        thumbnail: String,
        authors: Array,
        title: String,
        max_authors_length: Number,
        index: Number
    },
    data() {
        return {
            loading: true,
            showImage: true
        }
    },
    computed: {
        authorList() {
            let max_authors_length = this.max_authors_length > 0 ? max_authors_length : 10
            if (!this.authors || this.authors.length == 0) {
                return "佚名"
            }
            let authorstr = ''
            for (const key in this.authors) {
                if (Object.hasOwnProperty.call(this.authors, key)) {
                    const element = this.authors[key];
                    authorstr += element + ','
                }
            }
            return authorstr.substring(0, authorstr.length <= max_authors_length ? authorstr.length - 1 : max_authors_length)
        }
    },
    methods: {
        //延迟最大不要超过5000
        onImgLoad() {
            let timeout = this.index ? this.index : 1;
            setTimeout(() => {
                this.loading = false
            }, timeout < 50 ? 120 * timeout : 5000)
        }
    },
    mounted() {
        //延迟400去检查缩略图是否存在，如果不存在则取消加载图片
        setTimeout(() => {
            if (!this.thumbnail || this.thumbnail.length <= 0) {
                this.showImage = false;
            }
        }, 400)
        //如果图片8000ms后还没有加载成功，则取消加载图片
        setTimeout(() => {
            if (this.loading === true)
                this.showImage = false;
        }, 8000)
    },
}
</script>

<style scoped>
.book-card {
    text-align: center;
    background: linear-gradient(140deg, #8fcddb 60%, #a8e6f4 100%);
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
    font-size: 0.7em;
}

.book-card .text-box .box-item {
    width: 110px;
    margin-top: 10px;
}

.book-card .text-box .book-authors {
    position: absolute;
    width: 100%;
    bottom: 0px;
    font-size: 0.8em;
}
</style>
