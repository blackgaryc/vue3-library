<template>
  <div>
    <el-tabs v-model="type" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="每日" name="day"></el-tab-pane>
      <el-tab-pane label="每周" name="week"></el-tab-pane>
      <el-tab-pane label="每月" name="month"></el-tab-pane>
    </el-tabs>
    <RankingList title="上传排行榜" :list="list"></RankingList>
  </div>
</template>
  
<script>
import RankingList from '@/components/RankingList.vue';
export default {
  name: 'RankingListView',
  data: function () {
    return {
      type: 'month',
      list: [
        {
          "name": "试试",
          "avatar": "http://minio.v2ry.top/library/user/2/info/avatar/2858a690f6d11b686b60256ab8db6201.jpg",
          "total": 210
        },
        {
          "name": "测试",
          "avatar": "http://minio.v2ry.top/library/user/5/info/avatar/919243e20757746cf8b081f4a3218c10.gif",
          "total": 1
        },
        {
          "name": "hello",
          "avatar": "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          "total": 1
        }
      ]
    }
  },
  created: function () {
    // this.loadData('month')
  },
  components: {
    RankingList
  },
  methods: {
    loadData: function (type) {
      this.axios.get('/api/rank/book/upload?type=' + type).then((res) => {
        this.list = res.data.data
      })
    },
    handleClick: function () {
      this.loadData(this.type)
    }
  }
}
</script>