<template>
  <masonry-wall :items="books" :ssr-columns="1" :column-width="100" :gap="16">
    <template #default="{ item, index }">
      <BookCard :title="item.title + index" :thumbnail="item.thumbnail"></BookCard>
    </template>
  </masonry-wall>
</template>

<script>
// @ is an alias to /src

import BookCard from '@/components/BookCard.vue';

export default {
  name: 'WaterfallBookList',
  props: {
    books: Array
  },
  components: {
    BookCard
  }
}
</script>

<style>

</style>

