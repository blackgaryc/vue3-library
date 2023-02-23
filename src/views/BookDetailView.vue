<template>
    <div>
        {{ id }}
    </div>
</template>
<script>
export default {
    name: "BookDetailView",
    data: function () {
        return {
            id: this.$route.params.id
        }
    }
}
</script>