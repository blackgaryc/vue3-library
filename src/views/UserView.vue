<template>
    <div class="library-user-view">
        <div class="user-acatar-div" @click="redirect('/user/info')">
            <div class="user-acatar-image">
                <el-avatar size="large" :src="computedUserAvatar" />
            </div>
            <p class="user-acatar-name">{{ computedUserNicknae }}</p>
        </div>
        <!-- <el-divider /> -->
        <!-- <div class="user-tiny-menu-div">
                <el-row justify="center">
                    <el-col :xs="20" :sm="12" :md="8" :lg="8" :xl="8">
                        <el-row :gutter="10">
                            <el-col class="user-tiny-menu-div-col" :span="6">
                                <div @click="redirect('/user/history/download')">
                                    <el-icon>
                                        <Download />
                                    </el-icon>
                                    <p>下载历史</p>
                                </div>
                            </el-col>
                            <el-col class="user-tiny-menu-div-col" :span="6">
                                <div @click="redirect('/user/favorite/book')">
                                    <el-icon>
                                        <StarFilled />
                                    </el-icon>
                                    <p>喜欢的书</p>
                                </div>
                            </el-col>
                            <el-col class="user-tiny-menu-div-col" :span="6">
                                <div @click="redirect('/user/booklist')">
                                    <el-icon>
                                        <Collection />
                                    </el-icon>
                                    <p>我的书单</p>
                                </div>
                            </el-col>
                            <el-col class="user-tiny-menu-div-col" :span="6">
                                <div @click="redirect('/user/bookrequest')">
                                    <el-icon>
                                        <DocumentAdd />
                                    </el-icon>
                                    <p>我的请求</p>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div> -->
        <el-divider />
        <div class="user-collapse-menu-div">
            <el-collapse v-model="activeNames">
                <el-collapse-item title="下载历史" name="1">
                    <el-row>
                        <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="3">
                            <BookCard title="a"></BookCard>
                        </el-col>
                        <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="3">
                            <BookCard title="a"></BookCard>
                        </el-col>
                        <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="3">
                            <BookCard title="a"></BookCard>
                        </el-col>
                        <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="3">
                            <BookCard title="a"></BookCard>
                        </el-col>
                        <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="3">
                            <BookCard title="a"></BookCard>
                        </el-col>
                        <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="3">
                            <BookCard title="a"></BookCard>
                        </el-col>
                        <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="3">
                            <BookCard title="a"></BookCard>
                        </el-col>
                        <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="3">
                            <MoreCard></MoreCard>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <el-collapse-item title="喜欢的书" name="2">
                    <el-row v-if="favList.length > 0">
                        <el-col class="fav-item" v-for="(item, index) in favList.filter((v,index)=>{if(index<3) return v})" :key="item.id" :xs="6" :sm="6" :md="4"
                            :lg="4" :xl="3">
                            <div v-if="index < (favList.length < 4 ? favList.length : favList.length - 1)">
                                <BookCard :title="item.bookName" :thumbnail="item.bookImg"
                                    @click="toBookDetailsView(item.bookId)"></BookCard>
                            </div>
                        </el-col>
                        <el-col class="fav-item" :xs="6" :sm="6" :md="4" :lg="4" :xl="3">
                            <MoreCard @click="toBookFavEditView">
                                <div>编辑</div>
                            </MoreCard>
                        </el-col>
                    </el-row>
                    <el-empty v-else :image-size="150" />
                </el-collapse-item>
                <el-collapse-item title="我的书单" name="3">
                    <el-empty :image-size="150" />
                </el-collapse-item>
                <!-- <el-collapse-item title="我的请求" name="4">
                    <el-empty :image-size="150" />
                </el-collapse-item> -->
            </el-collapse>
        </div>
    </div>
</template>

<script>
import BookCard from "@/components/BookCard.vue";
import MoreCard from "@/components/MoreCard.vue";
import router from "@/router"
import store from "@/store";

export default {
    name: "UserView",
    data: () => {
        return {
            // activeNames: ["1", "2", "3", "4"]
            activeNames: [],
            favList: []
        };
    },
    methods: {
        redirect(url) {
            router.push({ path: url });
        },
        getFavList() {
            this.axios.get("/api/fav?size=4").then((res) => {
                this.favList = res.data.data
            })
        },
        toBookDetailsView(id) {
            this.$router.push({
                name: 'book_detail', params: {
                    id: id
                }
            })
        },
        toBookFavEditView() {
            this.$router.push({
                name: 'book_favs'
            })
        }
    },
    components: { BookCard, MoreCard },
    computed: {
        computedUserAvatar() {
            return store.getters.getUserAcatar
        },
        computedUserNicknae() {
            return store.getters.getUserNickname
        },
        computedUserLoginStatus() {
            return store.getters.isLoggedIn
        }
    },
    created: function () {
        this.getFavList()
    }
}
</script>

<style>
.user-acatar-div {
    /* margin-top: 50px; */
    text-align: center;
}

.library-user-view .little-menu-row {
    margin: 20px;
}

.library-user-view .user-tiny-menu-div-col {
    border: 1px solid #050606;
    padding: 3px;
    border-radius: 5px;
}

.library-user-view .user-tiny-menu-div-col p {
    /* height: 0; */
    /* padding-bottom: 100%; */
    /* margin: 5px; */
    /* border: 1px solid black; */
    /* border-radius: 5px; */
    margin: 0px;
    font-size: 0.8rem;
}

.fav-item {}
</style>