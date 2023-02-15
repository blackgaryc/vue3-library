<template>
  <masonry-wall :items="books" :ssr-columns="1" :column-width="150" :gap="16">
    <template #default="{ item, index }">
      <BookCard :title="item.title+index" :thumbnail="item.thumbnail" ></BookCard>
    </template>
  </masonry-wall>
</template>

<script>
// @ is an alias to /src

import BookCard from '@/components/BookCard.vue';

export default {
  name: 'HomeView2',
  components: {
    BookCard
}, data: () => {
    return {
      books: [
        { title: 'book1', thumbnail: 'https://lib-zdzelpnteuk2vudvz3sfdgqk.must.wf/covers299/books/a1/66/bd/a166bd6a2d70459a72a65614f25d06ad.jpg' },
        { title: 'book1', thumbnail: 'https://lib-zdzelpnteuk2vudvz3sfdgqk.must.wf/covers299/books/34/e7/14/34e714bdfa5d3829eab5f08392f6c2d6.jpg' },
        { title: 'book1', thumbnail: 'https://lib-zdzelpnteuk2vudvz3sfdgqk.must.wf/covers299/books/a8/05/1c/a8051c8e5eaf9564c9a4f4fd539c4440.jpg' },
        { title: 'book1', thumbnail: 'https://lib-zdzelpnteuk2vudvz3sfdgqk.must.wf/covers299/books/34/e7/14/34e714bdfa5d3829eab5f08392f6c2d6.jpg' },
        { title: 'book1', thumbnail: 'https://lib-zdzelpnteuk2vudvz3sfdgqk.must.wf/covers299/books/a1/66/bd/a166bd6a2d70459a72a65614f25d06ad.jpg' },
        { title: 'book1', thumbnail: 'https://lib-zdzelpnteuk2vudvz3sfdgqk.must.wf/covers299/books/a5/b7/e7/a5b7e70b6854831c9be35664a02d199a.jpg' },
        { title: 'book1' },
        { title: 'book1', thumbnail: 'https://lib-zdzelpnteuk2vudvz3sfdgqk.must.wf/covers299/books/34/e7/14/34e714bdfa5d3829eab5f08392f6c2d6.jpg' },
        { title: 'book1', thumbnail: 'https://lib-zdzelpnteuk2vudvz3sfdgqk.must.wf/covers299/books/a1/66/bd/a166bd6a2d70459a72a65614f25d06ad.jpg' },
        { title: 'book1', thumbnail: 'https://lib-zdzelpnteuk2vudvz3sfdgqk.must.wf/covers299/books/34/e7/14/34e714bdfa5d3829eab5f08392f6c2d6.jpg' },
        { title: 'book1' },
        { title: 'book1', thumbnail: 'https://lib-zdzelpnteuk2vudvz3sfdgqk.must.wf/covers299/books/34/e7/14/34e714bdfa5d3829eab5f08392f6c2d6.jpg' },
        { title: 'book1', thumbnail: 'https://lib-zdzelpnteuk2vudvz3sfdgqk.must.wf/covers299/books/a5/b7/e7/a5b7e70b6854831c9be35664a02d199a.jpg' },
        { title: 'book1', thumbnail: 'https://lib-zdzelpnteuk2vudvz3sfdgqk.must.wf/covers299/books/34/e7/14/34e714bdfa5d3829eab5f08392f6c2d6.jpg' },
        { title: 'book1', thumbnail: 'https://lib-zdzelpnteuk2vudvz3sfdgqk.must.wf/covers299/books/a5/b7/e7/a5b7e70b6854831c9be35664a02d199a.jpg' },
        { title: 'book1', thumbnail: 'https://lib-zdzelpnteuk2vudvz3sfdgqk.must.wf/covers299/books/34/e7/14/34e714bdfa5d3829eab5f08392f6c2d6.jpg' },
        { title: 'book1' },
        { title: 'book1', thumbnail: 'https://lib-zdzelpnteuk2vudvz3sfdgqk.must.wf/covers299/books/34/e7/14/34e714bdfa5d3829eab5f08392f6c2d6.jpg' }
      ]
    }
  }
}
</script>

<style>

</style>

