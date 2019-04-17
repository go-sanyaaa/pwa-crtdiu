<template lang="pug">
    v-toolbar.elevation-0(app dark tabs clipped color="primary" height="52px" prominent)
        slot(name='slide-icon')
        v-scroll-x-transition(hide-on-leave)
            v-btn(icon @click.stop="$router.go(-1)")
                v-icon arrow_back
        v-toolbar-title Новость
        v-spacer
        v-btn(icon v-if="$root.shareAvailable")
            v-icon share
</template>

<script>
    export default {
        name: "HomeEventToolbar"
    }
</script>

<style scoped>

</style>