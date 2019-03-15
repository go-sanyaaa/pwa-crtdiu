<template lang="pug">
    v-btn(icon @click.stop="$router.go(-1)")
        v-icon arrow_back
</template>

<script>
    export default {
        name: "EventsToolbar"
    }
</script>

<style scoped>

</style>