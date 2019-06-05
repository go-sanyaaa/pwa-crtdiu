<template lang="pug">
    v-toolbar.elevation-8(app light clipped color="#FFF" height="56px" prominent :scroll-off-screen="$vuetify.breakpoint.xsOnly")
        slot(name='slide-icon')
        v-scroll-x-transition(hide-on-leave)
            v-btn(icon @click.stop="$router.go(-1)")
                v-icon arrow_back
        v-toolbar-title(:class="{'ml-0':$vuetify.breakpoint.smAndDown}") {{$route.meta.title}}
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