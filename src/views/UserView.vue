<template>
    <div class="library-user-view">
        <div class="user-acatar-div" @click="redirect('/user/info')">
            <div class="user-acatar-image">
                <el-avatar size="large" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </div>
            <p class="user-acatar-name">{{ 'username' }}</p>
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
                <el-collapse-item title="我的书单" name="3">
                    <el-empty :image-size="150" />
                </el-collapse-item>
                <el-collapse-item title="我的请求" name="4">
                    <el-empty :image-size="150" />
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
import BookCard from "@/components/BookCard.vue";
import MoreCard from "@/components/MoreCard.vue";
import router from "@/router"

export default {
    name: "UserView",
    data: () => {
        return {
            // activeNames: ["1", "2", "3", "4"]
            activeNames: []
        };
    },
    methods: {
        redirect(url) {
            router.push({ path: url });
        }
    },
    components: { BookCard, MoreCard }
}
</script>

<style>
.user-acatar-div {
    /* margin-top: 50px; */
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
</style>