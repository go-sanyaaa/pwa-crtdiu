<template lang="pug">
    v-tabs(color="transparent" :centered="$vuetify.breakpoint.xsOnly" slider-color="#FFFFFF")
        v-tab Скоро
        v-tab Участник
        v-tab Архив
</template>

<script>
    export default {
        name: "EventsToolbar"
    }
</script>

<style scoped>

</style>