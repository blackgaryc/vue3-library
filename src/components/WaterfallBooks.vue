<template>
    <ul class="container">
        <li class="card" v-for="(item,index) in books" :key="index">
            <BookCard :title="item.title" :thumbnail="item.thumbnail"></BookCard>
        </li>
    </ul>
</template>
<script>
import BookCard from './BookCard.vue';

export default {
    name: 'WaterfallBooks',
    props: {
        books: Array
    },
    components: {
        BookCard,
    }
}
</script>

<style>
body {
    margin: 0;
}

.container {
    list-style: none;
    column-gap: 5px;
    padding: 0;
    column-count: 1;
}

.card {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    /* border: 1px solid #333; */
    break-inside: avoid;
}

@media (min-width: 320px) and (max-width: 759.5px) {
    .container {
        column-count: 3;
    }
}

@media (min-width: 760px) and (max-width: 979.5px) {
    .container {
        column-count: 6;
    }
}

@media (min-width: 980px) and (max-width: 1023.5px) {
    .container {
        column-count: 8;
    }
}

@media (min-width: 1024px) {
    .container {
        column-count: 8;
    }
}
</style>