<template lang="pug">
    div#app
        router-view
</template>

<script>

export default {
    name: 'App',
    data(){
        return {
            shareAvailable: false
        }
    },
    mounted () {
        // Update page title.
        this.$store.watch((state) => {
            return state.common.title
        }, (title) => {
            document.title = title
        }, {
            deep: true
        })

        // Check share api
        if(navigator.share !== undefined){
            this.shareAvailable = true
        }
    }
}
</script>

<style lang="scss">
    .tag{
        text-decoration: none;
    }
</style>
