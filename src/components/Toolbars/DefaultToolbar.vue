<template lang="pug">
    v-toolbar(app light clipped color="#FFF" height="56px" prominent :scroll-off-screen="$vuetify.breakpoint.smAndDown").custom-elevation
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