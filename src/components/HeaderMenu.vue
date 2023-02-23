<template>
    <el-menu :default-active="'-1'" class="page-menu" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-menu-item index="0">
            <div class="user-avatar-div"><el-avatar class="user-avatar" :size="''" :src="computedUserAvatar" /></div>
        </el-menu-item>
        <div class="flex-grow"></div>
        <!-- <el-menu-item index="1" @click="handleClick">主页</el-menu-item> -->
        <el-menu-item index="1">主页</el-menu-item>
        <el-sub-menu index="2">
            <template #title>其他</template>
            <el-menu-item index="2-1">探索</el-menu-item>
            <!-- <el-menu-item index="2-2">贡献</el-menu-item> -->
            <el-menu-item index="2-3">项目</el-menu-item>
            <el-sub-menu index="2-2">
                <template #title>贡献</template>
                <el-menu-item index="2-4-1">上传</el-menu-item>
                <el-menu-item index="2-4-2">修改</el-menu-item>
                <el-menu-item index="2-4-3">建议</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
    </el-menu>
</template>

<script>
import store from '@/store'

export default {
    name: 'HeaderMenu',
    methods: {
        handleSelect: function (key, keyPath) {
            keyPath
            if (this.menu[key] && this.menu[key].name)
                this.$router.push({ name: this.menu[key].name })
        }
    },
    props: {
        userAvatar: String
    },
    computed: {
        computedUserAvatar() {
            return store.getters.getUserAcatar.length > 0 ? store.getters.getUserAcatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        },
        computedUserNicknae() {
            return store.getters.getUserNickname
        }
    },
    data: () => {
        return {
            menu: {
                '0': {
                    name: 'user'
                },
                '1': {
                    name: 'home'
                },
                '2-4-1': {
                    name: 'uploader'
                }
            }
        }
    }
}
</script>
<style>
.user-avatar {
    margin-bottom: 10px;
}

.flex-grow {
    flex-grow: 1;
}
</style>