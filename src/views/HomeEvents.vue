<template lang="pug">
    v-layout.row.wrap
        template(v-for="event in events")
            v-flex.xs12.sm6.offset-sm3
                v-card
                    router-link.event-link(:to="`/events/${event.id}`")
                        v-img(:src="getPostImages(event)" height="240px")
                    v-card-title(primary-title)
                        div.mb-3
                            span.grey--text {{getHumanDate(event.event_date,"LL")}}
                            div.title.mb-2.blue-grey--text.text--darken-2.font-weight-bold(v-html="event.title.rendered")
                            template(v-for="cat in getEventCats(event.event_cat)")
                                v-chip.mb-0.ml-0(color="blue" small flat outline disabled) {{cat.name}}
                        span.blue-grey--text.text--lighten-1(v-html="event.excerpt.rendered")
                        v-chip.white--text.green.lighten-1(disabled small).ml-0
                            v-avatar.mr-0
                                v-icon(small) access_time
                            | {{getHumanDate(event.event_date,"LT")}} - {{getHumanDate(event.event_date_end,"LT")}}
                        v-tooltip(bottom)
                            template(v-slot:activator="{on}")
                                v-chip(v-on="on").white.blue-grey--text.text--darken-1(disabled small)
                                    v-avatar.mr-0
                                        v-icon(small) people
                                    | {{event.persons}}
                            span Количество участников
                    v-card-actions.grey.lighten-4
                        v-dialog(width="500")
                            template(v-slot:activator="{on}")
                                v-btn.text-none.blue-grey--text.grey.lighten-2(flat v-on="on")
                                    | Принять участие
                            v-card
                                v-card-title.headline.grey.lighten-2(primary-title) Подтверждение участия
                                v-card-text Вы действительно хотите принять участие?
                                v-divider
                                v-card-actions
                                    v-spacer
                                    v-btn(color="primary" flat) Подтверждаю
                        v-spacer
                        v-btn.text-none.blue-grey--text(flat :to="`/events/${event.id}`") Подробнее
                        v-btn(icon @click="shareEvent(event)" v-if="shareAvailable")
                            v-icon(size="22px").blue-grey--text share
</template>

<script>
    import moment from 'moment'
    import {mapGetters} from 'vuex'
    import {LOAD_EVENTS} from "@/store/actions.type";

    export default {
        name: "HomeEvents",
        props: ['id'],
        data(){
            return {
                shareAvailable: false
            }
        },
        mounted() {
            this.$store.dispatch(LOAD_EVENTS)

            // Check share api
            if(navigator.share !== undefined){
                this.shareAvailable = true
            }
        },
        computed: {
            ...mapGetters(['events','categories']),
        },
        methods: {
            getPostImages(post){
                if(post.better_featured_image){
                    var images = post.better_featured_image.media_details.sizes;
                    var max_size = Object.keys(images).pop()
                    return images[max_size].source_url
                }else{
                    return 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
                }
            },
            getHumanDate(date,format = "LLL"){
                return moment(date).locale('ru').format(format)
            },
            getEventCats(cat_array){
                const event_cats = [...cat_array]
                return this.categories.filter(category => event_cats.some((cat_id,i) => category.id == cat_id && delete event_cats[i]))
            },
            shareEvent(event){
                navigator.share({
                    title: "Центр развития творчества детей и юношества Кировского района города Кемерово",
                    url: event.link
                })
            }
        }
    }
</script>

<style lang="scss">
    .event-link{
        text-decoration: none;
    }
</style>