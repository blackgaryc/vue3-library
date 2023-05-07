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
            <div class="menu-items" v-for="(item,index) in menuItems" :key="index" @click="redirect(item.url)">
                <div class="name">{{ item.name }}</div>
                <div class="icon"><el-icon><ArrowRight /></el-icon></div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "@/store";
import {getUserBookList} from '../api/book-list'

export default {
    name: "UserView",
    data: () => {
        return {
            // activeNames: ["1", "2", "3", "4"]
            activeNames: [],
            favList: [],
            bookList: [],
            menuItems:[
                {name:'下载历史',url:'/user/book/downloads'},
                {name:'喜欢的书',url:'/user/book/fav'},
                {name:'我的书单',url:'/user/bookList'},
            ],
        };
    },
    methods: {
        onchange(v){
            console.log(v)
        },
        redirect(url) {
            console.log(url)
            this.$router.push({ path: url });
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
    components: {  },
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
        getUserBookList().then((res)=>{
            console.log(res.data)
        })
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

.menu-items{
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    height: 28px;
    border-bottom: 1px #cec9c9 solid;
    margin: 20px 0;
    box-sizing: border-box;
    padding: 20px 10px;
}
.menu-items:not(:first){
    border-top: none;
    
}
.menu-items .icon{
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: center;
}
.menu-items .name{
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: center;
}
</style>