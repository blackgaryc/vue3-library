<template>
    <div>
        <p>图书管理后台</p>
        <RouterLink to="/admin/manage/book">系统配置</RouterLink>
        <br>
        <br>
        <br>
        <RouterLink to="/admin/manage/book">管理图书</RouterLink>
        <br>
        <br>
        <br>
        <RouterLink to="/admin/manage/book">管理用户</RouterLink>
    </div>
</template>

<script>
export default {
    name: 'HomeView',
    data: function () {
        return {

        }
    },
    methods: {

    },
    computed: {

    }
}
</script>