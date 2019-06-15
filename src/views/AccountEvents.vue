<template lang="pug">
        v-tabs-items(v-model="tabs")
            v-tab-item(:key="1")
                v-layout.row.wrap.ma-0
                    v-flex(
                        v-for="event in allEvents" :key="`all-events-${event.id}`"
                    ).xs12.sm8.offset-sm2.md6.offset-md3.px-0.fill-height
                        router-link(:to="`/events/${event.ID}`").custom-link
                            app-event-list-card(:event="event" :style="{borderRadius: '0px'}")
            v-tab-item(:key="2")
                v-card(flat).custom-elevation
                    v-card-text
                        h2 Tab {{activeTab}}
            v-tab-item(:key="3")
                v-card(flat).custom-elevation
                    v-card-text
                        h2 Tab {{activeTab}}
</template>

<script>
    import appEventListCard from "../components/appEventListCard"
    import {mapGetters,mapState} from "vuex"
    import {loadMyEvents} from "../components/mixins/events";

    export default {
        name: "AccountEvents",
        data(){
            return {
                activeTab: 0
            }
        },
        computed:{
            ...mapGetters({
                upcomingEvents:`events/upcomingEvents`,
                completedEvents:`events/completedEvents`,
            }),
            ...mapState('events',{allEvents: 'myEvents'}),
            tabs:{
                set:function (newValue) {
                    this.$router.replace({query:{tab:newValue}})
                    this.activeTab = newValue;
                },
                get: function () {
                    return this.activeTab;
                }
            }
        },
        watch:{
            $route ({query}){
                this.activeTab = query['tab'];
            }
        },
        components: {appEventListCard},
        mixins: [loadMyEvents]
    }
</script>

<style scoped>

</style>