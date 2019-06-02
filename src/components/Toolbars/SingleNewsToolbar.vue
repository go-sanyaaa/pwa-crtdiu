<template lang="pug">
    v-app-bar.elevation-0(app light clipped color="#FFF" elevate-on-scroll)
        slot(name='slide-icon')
        v-btn(icon @click.stop="$router.go(-1)")
            v-icon arrow_back
        v-toolbar-title.pl-0 {{$route.meta.title}}
        v-progress-linear(:active="isLoading" indeterminate absolute bottom color="secondary")
</template>

<script>
    import {mapGetters} from "vuex"
    export default {
        name: "SingleNewsToolbar",
        computed:{
            ...mapGetters({isLoading: 'news/isLoading',})
        }
    }
</script>

<style scoped>

</style>