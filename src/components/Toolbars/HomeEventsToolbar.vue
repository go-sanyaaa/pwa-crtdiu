<template lang="pug">
    v-toolbar.elevation-0(app dark tabs clipped color="primary" height="52px" prominent)
        slot(name='slide-icon')
        v-toolbar-items
            v-tabs(color="transparent" :centered="$vuetify.breakpoint.xsOnly" slider-color="#FFFFFF")
                v-tab Скоро
                v-tab Участник
                v-tab Архив
</template>

<script>
    export default {
        name: "HomeEventsToolbar"
    }
</script>

<style scoped>

</style>