<template lang="pug">
    v-toolbar(app light clipped color="#FFF" height="56px" prominent :scroll-off-screen="$vuetify.breakpoint.smAndDown").custom-elevation
        slot(name='slide-icon')
        v-scroll-x-transition(hide-on-leave)
            v-btn(icon @click.stop="$router.go(-1)")
                v-icon arrow_back
        v-toolbar-title(:class="{'ml-0':$vuetify.breakpoint.smAndDown}") {{$route.meta.title}}
</template>

<script>
    export default {
        name: "HomeDefaultBackToolbar"
    }
</script>

<style scoped>

</style>