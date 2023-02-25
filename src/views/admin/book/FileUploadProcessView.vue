<template>
    <div>
        <el-page-header @back="this.$router.go(-1)">
            <template #content>
                <div class="flex items-center">
                    <span class="text-large font-600 mr-3">文件处理</span>
                </div>
            </template>
            <!-- 编辑表格 -->
            <div>

            </div>

        </el-page-header>
    </div>
</template>

<script>
export default {
    name: 'ileUploadProcessView',
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