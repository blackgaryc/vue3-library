<template>
    <el-card :body-style="{ padding: '0px', border: '0px' }" class="book-card">
        <div v-if="thumbnail">
            <el-skeleton style="" animated :loading="loading">
                <template #template>
                    <el-skeleton-item variant="image" style="height: 150px;">
                        <!-- <el-image :src="thumbnail" @load="onImgLoad"></el-image> -->
                    </el-skeleton-item>
                </template>
                <template #default>
                    <img :src="thumbnail" class="book-image" @load="onImgLoad" />
                    <!-- <el-image :src="thumbnail" @load="onImgLoad"></el-image> -->
                </template>
            </el-skeleton>
        </div>
        <div class="text-box" v-else>
            <div>
                <p class="book-title">{{ title }}</p>
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
        max_authors_length: Number
    },
    data() {
        return {
            loading: true
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
        onImgLoad() {
            console.log("image load")
            this.loading = false;
        }
    },
    mounted() {
        // if (this.height === undefined) {
        //     this.heightValue = (this.$refs.root.$el.clientWidth / 16 * 9) + "px";
        // }
        if (this.thumbnail) {
            let img = new Image();
            img.onload = () => {
                this.loading = false;
            };
            img.src = this.thumbnail;
        }
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
}

.book-card .text-box .box-item {
    width: 110px;
    margin-top: 10px;
}

.book-card .text-box .book-authors {
    position: absolute;
    width: 100%;
    bottom: 0px;
}
</style>
