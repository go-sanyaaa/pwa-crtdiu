<template lang="pug">
    div#app
        router-view
</template>

<script>

export default {
    name: 'App',
    mounted () {
        // Update page title.
        this.$store.watch((state) => {
            return state.common.title
        }, (title) => {
            document.title = title
        }, {
            deep: true
        })
    }
}
</script>

<style lang="scss">
    .tag{
        text-decoration: none;
    }
</style>
