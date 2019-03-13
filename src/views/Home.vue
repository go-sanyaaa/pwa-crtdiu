<template lang="pug">
    v-container.fill-height
        news-cards
</template>

<script>
    import NewsCards from '@/components/NewsCards.vue'

    export default {
        name: "Home",
        components: {
            NewsCards
        }
    }
</script>

<style scoped>

</style>