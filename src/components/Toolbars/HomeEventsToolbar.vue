<template lang="pug">
    v-toolbar.elevation-0(app dark clipped color="primary" height="52px" prominent)
        slot(name='slide-icon')
        v-toolbar-title События
        v-spacer
        v-btn(icon)
            v-icon filter_list
        v-btn(icon)
            v-icon search

        //template(v-slot:extension)
            v-tabs(v-model="tab" color="primary" :grow="$vuetify.breakpoint.xsOnly" slider-color="white" fixed-tabs)
                v-tab(href="#all") Все
                v-tab(href="#vcentrestart") #ВЦентRESTART
                v-tab(href="#subscribed") Участник
</template>

<script>
    export default {
        name: "HomeEventsToolbar",
        data(){
            return {
                tab: 'all'
            }
        }
    }
</script>

<style scoped>

</style>