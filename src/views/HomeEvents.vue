<template lang="pug">
    v-layout.row.wrap.ma-0
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3.px-0(v-if="errors")
            v-alert(type="error" icon="new_releases" :value="errors").custom-alert
                template(v-for="error in errors") {{error}}
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3.px-0(v-for="event in records" :key="event.id")
            app-event-card(:event="event" :categories="categories").custom-elevation
        v-flex.text-xs-center.xs12(
            v-if="(isLoading && !eventsEmpty) || canLoad"
            )
            v-btn(flat @click="fetch" :loading="isLoading") Загрузить еще
</template>

<script>
    import {mapState} from 'vuex'
    import {FETCH_EVENTS, INIT_RECORDS, LOAD_EVENTS} from "../store/actions.type";
    const AppEventCard = () => import("../components/appEventCard")

    export default {
        name: "HomeEvents",
        props: ['id'],
        data(){
            return {
                offline: false
            }
        },
        created() {
            this.init()
        },
        provide: {
            shareAvailable: navigator.share !== undefined ? true : false
        },
        computed: {
            ...mapState('events',['errors','total','pagination','isLoading','categories','records']),
            canLoad(){
                const {pagination:{page,per_page},total} = this
                return per_page * page < total
            },
            eventsEmpty(){
                return this.records.length === 0
            }
        },
        methods: {
            init(){
                if(this.eventsEmpty) this.$store.dispatch(`events/${INIT_RECORDS}`)

            },
            load(){
                this.$store.dispatch(`events/${LOAD_EVENTS}`)
            },
            fetch(){
                this.$store.dispatch(`events/${FETCH_EVENTS}`)
            }
        },
        components: {
            AppEventCard
        }
    }
</script>

<style lang="scss">
    .event-link{
        text-decoration: none;
    }
</style>