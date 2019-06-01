<template lang="pug">
    v-app-bar.elevation-0(app light clipped color="#FFF" elevate-on-scroll)
        slot(name='slide-icon')
        v-scroll-x-transition(hide-on-leave)
            v-btn(icon @click.stop="$router.go(-1)")
                v-icon arrow_back
        v-toolbar-title Новость
        v-spacer
        v-btn(icon v-if="shareAvailable")
            v-icon share
</template>

<script>
    export default {
        name: "HomeEventToolbar",
        data(){
            return {
                shareAvailable: false
            }
        },
        mounted() {
            // Check share api
            if(navigator.share !== undefined){
                this.shareAvailable = true
            }
        },
    }
</script>

<style scoped>

</style>