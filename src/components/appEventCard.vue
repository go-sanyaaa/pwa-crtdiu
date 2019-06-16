<template lang="pug">
    v-card.elevation-0
        router-link.event-link(:to="`/events/${event.id}`")
            v-img(
                :src="getPostImages(event)" height="200px"
                gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
            )
                v-layout.fluid.pl-2.align-end.fill-height
                    v-flex.white--text
                        v-flex
                            v-layout.column
                                v-flex.pb-0
                                    strong.text-uppercase.font-weight-medium {{getHumanDate(event.event_date,"MMMM YYYY")}}
                                v-flex.py-0
                                    strong.display-2.font-weight-regular.font-weight-black {{getHumanDate(event.event_date,"DD")}}
                        v-flex.column.justify-center.pt-1
                            v-chip(dark :class="{'green': !completed}").ml-0.font-weight-medium.mr-2
                                v-avatar.mr-2.pl-3
                                    v-icon access_time
                                | {{getHumanDate(event.event_date,"LT")}} - {{getHumanDate(event.event_date_end,"LT")}}
                            v-tooltip(bottom v-if="!completed")
                                template(v-slot:activator="{on}")
                                    v-chip(v-on="on" color="#FFF" outline dark).font-weight-medium
                                        v-avatar.mr-2.pl-3
                                            v-icon people
                                        | {{event.persons}} ({{event.place_free}})
                                span Количество участников: всего (свободно)
                            v-chip(dark v-if="completed").error.font-weight-medium
                                | Завершено
        v-card-title(primary-title)
            v-layout.row(justify-space-between align-start)
                v-flex
                    div.title.mb-2.blue-grey--text.text--darken-2.font-weight-bold(v-html="event.title.rendered")
                    template(v-for="cat in getEventCats(event.event_cat)")
                        v-chip.ml-0(color="blue" outline small dark) {{cat.name}}
                v-flex.shrink.row.no-wrap.pt-0
                    app-event-subscribe(v-slot="{open}" :event="event")
                        v-btn(icon text @click="open").ma-0.grey--text
                            v-icon(v-if="!event.is_register") person_add
                            v-icon(v-else color="green") check_circle_outline
                    v-btn(icon @click="show = !show").ma-0.grey--text
                        v-icon {{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
        v-expand-transition
            div(v-show="show")
                v-card-text(v-html="event.excerpt.rendered").pt-0.event-excerpt
</template>

<script>
    import post from "./mixins/post"
    import {checkEvent} from "./mixins/events";
    import {mapState} from "vuex"
    import AppEventSubscribe from "./appEventSubscribe";

    export default {
        name: "appEventCard",
        components: {AppEventSubscribe},
        props: ['event','categories'],
        data(){
            return {
                show: false,
                dialog: false,
                isRegister: false,
                loading: false,
            }
        },
        computed:{
            ...mapState('auth',['isAuthenticated']),
        },
        methods: {
            getEventCats(cat_array){
                const event_cats = [...cat_array]
                return this.categories.filter(category => event_cats.some((cat_id,i) => category.id == cat_id && delete event_cats[i]))
            },

        },
        mixins: [post, checkEvent]
    }
</script>

<style lang="sass">
    .event-excerpt > *
        margin: 0
</style>