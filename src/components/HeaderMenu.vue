<template>
    <el-menu :default-active="'1'" class="page-menu" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-menu-item index="0">
            <div class="user-avatar-div"><el-avatar class="user-avatar" :size="''" :src="computedUserAvatar" /></div>
        </el-menu-item>
        <div class="flex-grow"></div>
        <!-- <el-menu-item index="1" @click="handleClick">主页</el-menu-item> -->
        <el-menu-item index="1">主页</el-menu-item>
        <el-sub-menu index="2">
            <template #title>其他</template>
            <el-menu-item index="2-1">探索</el-menu-item>
            <el-menu-item index="2-2">贡献</el-menu-item>
            <el-menu-item index="2-3">项目</el-menu-item>
            <!-- <el-sub-menu index="2-4">
                                    <template #title>test</template>
                                    <el-menu-item index="2-4-1">item one</el-menu-item>
                                    <el-menu-item index="2-4-2">item two</el-menu-item>
                                    <el-menu-item index="2-4-3">item three</el-menu-item>
                                </el-sub-menu> -->
        </el-sub-menu>
    </el-menu>
</template>

<script>
export default {
    name: 'HeaderMenu',
    methods: {
        handleSelect: function (key, keyPath) {
            console.log(key, keyPath)
            if(this.menu[key]&&this.menu[key].name)
            this.$router.push({name:this.menu[key].name})
        },
        handleClick(item) {
            console.log(item)
        }
    },
    props: {
        userAvatar: String
    },
    computed: {
        computedUserAvatar() {
            if (this.userAvatar && this.userAvatar.length > 0) {
                return this.userAvatar
            }
            return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
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