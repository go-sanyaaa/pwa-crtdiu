<template lang="pug">
    v-card.elevation-0
        router-link.event-link(:to="`/events/${event.id}`")
            v-img(
                :src="getPostImages(event)" height="200px"
                gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
                :style="{borderRadius: '12px 12px 0px 0px'}"
            )
                v-layout(fill-height align-end).fluid.pl-2
                    v-flex.white--text
                        v-flex
                            v-layout(column)
                                v-flex.pb-0
                                    strong.text-uppercase.font-weight-medium {{getHumanDate(event.event_date,"MMMM YYYY")}}
                                v-flex.py-0
                                    strong.display-2.font-weight-regular.font-weight-black {{getHumanDate(event.event_date,"DD")}}
                        v-flex(column justify-center).pt-1
                            v-chip(dark).green.ml-0.font-weight-medium.mr-2
                                v-avatar.mr-2.pl-3
                                    v-icon access_time
                                | {{getHumanDate(event.event_date,"LT")}} - {{getHumanDate(event.event_date_end,"LT")}}
                            v-tooltip(bottom)
                                template(v-slot:activator="{on}")
                                    v-chip(v-on="on" color="#FFF" outline dark).font-weight-medium
                                        v-avatar.mr-2.pl-3
                                            v-icon people
                                        | {{event.persons}}
                                span Количество участников
        v-card-title(primary-title)
            v-layout.row(justify-space-between align-start)
                v-flex
                    div.title.mb-2.blue-grey--text.text--darken-2.font-weight-bold(v-html="event.title.rendered")
                    template(v-for="cat in getEventCats(event.event_cat)")
                        v-chip.ml-0(color="blue" outline small dark) {{cat.name}}
                v-flex.shrink.row.no-wrap.pt-0
                    v-dialog(width="500" v-model="dialog")
                        template(v-slot:activator="{on}")
                            v-btn.caption(icon text v-on="on").ma-0.grey--text
                                v-icon(v-if="!event.is_register") person_add
                                v-icon(v-else color="green") check_circle_outline
                        v-card(v-if="!event.is_register")
                            v-toolbar(flat light)
                                v-toolbar-title Подтверждение участия
                            v-divider
                            v-card-text
                                | Вы действительно хотите принять участие?
                                br
                                | Мероприятие - {{event.title.rendered}}  состоится {{getHumanDate(event.event_date,"LL")}}
                            v-divider
                            v-card-actions
                                v-btn.caption(@click="dialog = false" flat) Закрыть
                                v-spacer
                                v-btn.caption(color="green" depressed dark @click="subscribe") Подтверждаю
                        v-card(v-else)
                            v-toolbar(flat dark color="green")
                                v-toolbar-title Вы учавствуете!
                            v-divider
                            v-card-text
                                | В данный момент вы зарегистрированны на мероприятие.
                                br
                                | Вы действительно хотите отменить эту запись?
                            v-divider
                            v-card-actions
                                v-btn.caption(@click="dialog = false" flat) Закрыть
                                v-spacer
                                v-btn.caption(color="accent" depressed @click="unSubscribe") Отменить запись!
                    v-btn(icon @click="show = !show").ma-0.grey--text
                        v-icon {{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
        v-snackbar(v-model="snackbar" :timeout="3000" :multi-line="$vuetify.breakpoint.smAndDown" :color="color")
            | {{text}}
            v-btn(flat @click="snackbar = false") ОК
        v-expand-transition
            div(v-show="show")
                v-card-text(v-html="event.excerpt.rendered").pt-0.event-excerpt
            //v-btn(icon @click="shareEvent(event)" v-if="shareAvailable")
                v-icon(size="22px").blue-grey--text share
</template>

<script>
    import moment from 'moment'
    import {DEFAULT_IMG_URL} from "../common/config";
    import {SUBSCRIBE_ON_EVENT,UNSUBSCRIBE_ON_EVENT} from "../store/actions.type";
    export default {
        name: "eventCard",
        props: ['event','categories'],
        data(){
            return {
                show: false,
                dialog: false,
                isRegister: false,
                loading: false,
                snackbar: false,
                color: '',
                text: ''
            }
        },
        inject: ['shareAvailable'],
        methods: {
            getPostImages(post){
                if(post.better_featured_image){
                    var images = post.better_featured_image.media_details.sizes;
                    var max_size = Object.keys(images).pop()
                    return images[max_size].source_url
                }else{
                    return DEFAULT_IMG_URL
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
            },
            subscribe(){
                this.dialog = false;
                this.loading = true;
                const {id} = this.event;
                this.$store.dispatch(`events/${SUBSCRIBE_ON_EVENT}`,id)
                    .then(resp => {
                        console.log(resp)
                        this.loading = false
                        this.color = 'success'
                        this.text = 'Вы успешно записаны на мероприятие'
                        this.snackbar = true
                    })
                    .catch(err => {
                        console.log('Event catch')
                    })
            },
            unSubscribe(){
                this.dialog = false;
                this.loading = true;
                const {id} = this.event;
                this.$store.dispatch(`events/${UNSUBSCRIBE_ON_EVENT}`,id)
                    .then(resp => {
                        this.color = 'error'
                        this.text = 'Запись на мероприятие отменена'
                        this.snackbar = true
                    })
            }
        }
    }
</script>

<style lang="sass">
    .event-excerpt > *
        margin: 0
</style>