<template lang="pug">
    v-toolbar.elevation-8(app light clipped color="#FFF" height="56px" prominent :scroll-off-screen="$vuetify.breakpoint.xsOnly")
        slot(name='slide-icon')
        v-toolbar-title {{$route.meta.title}}
</template>

<script>
    export default {
        name: "HomeDefaultToolbar"
    }
</script>

<style scoped>

</style>