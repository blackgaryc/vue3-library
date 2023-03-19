<template>
  <div>
    <h2>{{ title }}</h2>
    <ol>
      <li v-for="(item, index) in list" :key="item.id">
        <span class="ranking">{{ index + 1 }}</span>
        <el-avatar class="avatar" :size="''" :src="item.avatar" />
        <span class="name">{{ item.name }}</span>
        <span class="score">{{ item.total }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'RankingList',
  props: {
    title: String,
    list: Array
  }
}
</script>

<style>
h2 {
  text-align: center;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.ranking {
  flex-basis: 10%;
  text-align: center;
}

.name {
  flex-basis: 40%;
  text-align: left;
}

.score {
  flex-basis: 30%;
  text-align: center;
}</style>
