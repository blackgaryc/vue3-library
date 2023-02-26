<template>
    <div>
        <div>
            <div>
                <h1>Library</h1>
            </div>
            <div style="margin: 100px;"></div>
            <el-button @click="handLocalToken" style="width: 100%;">退出登陆</el-button>
        </div>
    </div>
</template>

<script>
export default{
    name:'UserLogoutView',
    data:()=>{
        return {

        }
    },
    methods:{
        handLocalToken:function(){
            this.$cookies.remove("token")
            location.reload()
        }
    }
}
</script>