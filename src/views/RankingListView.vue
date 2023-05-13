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
      ]
    }
  },
  created: function () {
    this.loadData('month')
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
      
    },
  },
  watch:{
    type:function(newV,oldV){
      console.log(oldV,newV)
      this.loadData(newV)
    }
  }
}
</script>