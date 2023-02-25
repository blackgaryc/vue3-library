<template>
  <div>
    <masonry-wall :items="books" :ssr-columns="1" :column-width="100" :gap="16">
      <template #default="{ item, index }">
        <BookCard :index="index" :title="item.title + index" :thumbnail="item.thumbnail" @click="redirect2(item.id)">
        </BookCard>
      </template>
    </masonry-wall>
    <div v-if="!books || books.length==0">
      <el-empty description="没有数据" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import BookCard from '@/components/BookCard.vue';
import router from '@/router';

export default {
  name: 'WaterfallBookList',
  props: {
    books: Array
  },
  components: {
    BookCard
  },
  methods: {
    redirect2: function (id) {
      router.push({
        name: 'book_detail', params: {
          id: id
        }
      })
    }
  }
}
</script>

<style></style>

