<template lang="pug">
    #app
        keep-alive
            component(:is="component")
</template>

<script>
import PublicLayout from '@/layouts/Public.vue'
import DefaultLayout from '@/layouts/Default.vue'

export default {
    name: 'App',
    components: {
        PublicLayout,
        DefaultLayout
    },
    computed: {
        component() {
            return this.$store.state.common.layout
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
    }
}
</script>
