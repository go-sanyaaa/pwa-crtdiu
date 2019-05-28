<template lang="pug">
    v-toolbar.elevation-0(app dark tabs clipped color="primary" height="52px" prominent :scroll-off-screen="$vuetify.breakpoint.xsOnly")
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