<template lang="pug">
    #app
        keep-alive
            router-view
        <!--keep-alive-->
            <!--component(:is="component")-->
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
