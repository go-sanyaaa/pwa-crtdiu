<template lang="pug">
    v-layout.row.wrap.ma-0
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3(v-for="event in events" :key="event.id")
            event-card(:event="event" :categories="categories").custom-card
        v-flex.text-xs-center.xs12(
            v-if="(isLoading && !eventsEmpty) || canLoad"
            )
            v-btn(flat @click="fetch" :loading="isLoading") Загрузить еще
</template>

<script>
    import {mapGetters} from 'vuex'
    import {FETCH_EVENTS, INIT_RECORDS, LOAD_EVENTS} from "../store/actions.type";
    import EventCard from "../components/EventCard"

    export default {
        name: "HomeEvents",
        props: ['id'],
        data(){
            return {
            }
        },
        created() {
            this.init()
        },
        provide: {
            shareAvailable: navigator.share !== undefined ? true : false
        },
        computed: {
            ...mapGetters({
                events: 'events/records',
                categories: 'events/categories',
                isLoading: 'events/isLoading',
                pagination: 'events/pagination',
                total: 'events/total',
            }),
            canLoad(){
                const {pagination:{page,per_page},total} = this
                return per_page * page < total
            },
            eventsEmpty(){
                return this.events.length === 0
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
            EventCard
        }
    }
</script>

<style lang="scss">
    .event-link{
        text-decoration: none;
    }
</style>