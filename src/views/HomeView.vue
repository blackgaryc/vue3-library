<template>
  <div class="home">
    <div class="home-search">
      <h1 class="title"> library </h1>
      <div class="mt-4">
        <el-input v-model="search_data" placeholder="请输入书名/作者或者md5值" class="input-with-select">
          <!-- <template #prepend>
              <el-select v-model="search_selected" placeholder="高级选项" style="width: 115px">
                <el-option label="MD5值" value="1" />
                <el-option label="作者" value="2" />
                <el-option label="书名" value="3" />
              </el-select>
            </template> -->
          <template #append>
            <el-button @click="searchBookData(search_data)"><el-icon>
                <Search />
              </el-icon></el-button>
          </template>
        </el-input>
      </div>
    </div>
    <WaterfallBookList :books="books"></WaterfallBookList>
  </div>
</template>

<script>
// @ is an alias to /src
import WaterfallBookList from '@/components/WaterfallBookList.vue';
import axios from 'axios';
import { Search } from '@element-plus/icons-vue'


export default {
  name: 'HomeView',
  components: {
    WaterfallBookList,
    Search
  },
  mounted: function () {
    //TODO recommand
    axios.get('api/book/latest').then((response) => {
      if (response.data.code === 0) {
        const dataList = response.data.data
        this.books = [...dataList]
      }
    })
  },
  data: () => {
    return {
      books: new Array,
      search_data: '',
      search_selected: ''
    }
  },
  methods: {
    searchBookData: function (data) {
      axios.get('/api/book/search?data=' + data).then((response) => {
        if (response.data.code === 0) {
          const dataList = response.data.data
          this.books = [...dataList]
        }
      })
    }
  }
}
</script>

<style>
.home-search {
  margin-bottom: 50px;
}

.home-search .title {
  font-size: 3rem;
}
h1 {
  text-align: center;
}
</style>

