<template lang="pug">
    v-app-bar.elevation-0(app light clipped color="#FFF" elevate-on-scroll)
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