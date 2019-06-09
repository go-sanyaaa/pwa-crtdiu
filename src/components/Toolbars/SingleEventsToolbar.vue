<template lang="pug">
    v-toolbar(app light clipped color="#FFF" height="56px" prominent :scroll-off-screen="$vuetify.breakpoint.smAndDown").custom-elevation
        slot(name='slide-icon')
        v-scroll-x-transition(hide-on-leave)
            v-btn(icon @click.stop="$router.go(-1)")
                v-icon arrow_back
        v-toolbar-title(:class="{'ml-0':$vuetify.breakpoint.smAndDown}"  v-html="event ? event.title.rendered : 'Загрузка...'")
        v-progress-linear(:active="isLoading" indeterminate absolute bottom height="3").toolbar-progress
        v-spacer
        v-btn(icon v-if="shareAvailable && news" @click="shareNews(news)")
            v-icon share
</template>

<script>
    import {GET_RECORD} from "../../store/actions.type";
    import {mapState, mapGetters} from 'vuex'

    export default {
        props: ['id'],
        name: "HomeEventToolbar",
        data(){
            return {
                event: false,
                shareAvailable: navigator.share !== undefined ? true : false
            }
        },
        computed: {
            ...mapGetters({getEventById: 'events/eventById'}),
            ...mapState('events',['isLoading'])
        },
        mounted() {
            const {id} = this
            this.event = this.getEventById(id) || this.loadSingleEvent(id)
            // Check share api
            if(navigator.share !== undefined){
                this.shareAvailable = true
            }
        },
        methods: {
            loadSingleEvent(id){
                this.$store.dispatch(`events/${GET_RECORD}`,{id})
                    .then(resp => {
                        this.event = resp
                    })
            }
        }
    }
</script>

<style scoped>

</style>