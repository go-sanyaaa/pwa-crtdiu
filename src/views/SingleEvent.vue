<template lang="pug">
    v-layout.row.wrap.ma-0#scroll-target
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3.px-0(v-if="event")
            v-card(flat).custom-elevation
                v-img(:src="getPostImages(event)"  height="200px")
                    v-container.fill-height.pa-3
                        v-layout.row.fill-height.ma-0
                            v-flex.xs12.pa-0
                                v-layout.row.wrap.ma-0
                                    template(v-for='cat in getRecordCats(event.event_cat)')
                                        v-chip(small dark color="secondary" disable).d-flex.shrink {{cat.name}}
                v-list(three-line).py-0
                    v-list-tile(ripple avatar)
                        v-list-tile-avatar
                            v-icon(outlined).red.lighten-1.white--text calendar_today
                        v-list-tile-content
                            v-list-tile-title.body-2.grey--text.text--darken-2.font-weight-bold {{getHumanDate(event.event_date)}}
                            v-list-tile-sub-title
                                v-chip(small color="success" dark).ml-0.font-weight-medium
                                    v-avatar.mr-2.pl-3(size="12")
                                        v-icon access_time
                                    | {{getHumanDate(event.event_date,"LT")}} - {{getHumanDate(event.event_date_end,"LT")}}
                                v-tooltip(bottom)
                                    template(v-slot:activator="{on}")
                                        v-chip(v-on="on" color="#FFF" text-color="grey" disabled).font-weight-bold.mx-0
                                            v-icon people
                                            span.ml-1 {{event.persons}}
                                    span Количество участников
                v-divider
                v-list(two-line).py-0
                    app-event-subscribe(v-slot="{open}" :event="event").d-block
                        v-list-tile(icon text @click="open" avatar :class="{blue:!event.is_register}" v-ripple="{class: !event.is_register ? 'blue--text' : ''}").ma-0.lighten-5
                            v-list-tile-avatar
                                v-icon(v-if="!event.is_register").blue.lighten-1.white--text person_add
                                v-icon(v-else).green.white--text.lighten-2 check_circle_outline
                            v-list-tile-content
                                template(v-if="!event.is_register")
                                    v-list-tile-title.body-2.grey--text.text--darken-2 Принять участие
                                    v-list-tile-sub-title.caption.grey--text Записаться на мероприятие
                                template(v-else)
                                    v-list-tile-title.body-2.grey--text.text--darken-2 Вы учавствуете
                                    v-list-tile-sub-title.caption.grey--text.text--lighten-1 Отменить запись?
                v-divider
                v-card-text( v-html="event.content.rendered")#page__content
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3.px-0(v-if="event")
            app-comments(:post="event")
</template>

<script>
    import post from "../components/mixins/post"
    import {GET_RECORD} from "../store/actions.type";
    import {mapGetters, mapState} from "vuex"
    import AppComments from "../components/appComments"
    import AppEventSubscribe from "../components/appEventSubscribe";

    export default {
        components: {AppEventSubscribe, AppComments},
        props: ['id'],
        data(){
            return {
                event: false,
                errors: [],
            }
        },
        name: "singleEvent",
        computed: {
            ...mapGetters({getEventById: 'events/eventById'}),
            ...mapState('events',['categories']),
        },
        created() {
            const {id} = this
            this.event = this.getEventById(id) || this.loadSingleEvent(id)
        },
        methods: {
            loadSingleEvent(id){
                this.$store.dispatch(`events/${GET_RECORD}`,{id})
                    .then(resp => {
                        this.event = resp
                    })
            },
            getRecordCats(record_cats = []){
                return record_cats.map(cat_id => this.categories.find(cat => cat.id === cat_id))
            },
        },
        mixins: [post],
    }
</script>

<style lang="scss">
    %text{
        color: black;
        font-size: 14px;
        line-height: 20px;
        text-align: justify;
    }
    @mixin margin-block($size) {
        margin-block-start: $size;
        margin-block-end: $size;
    }
    #page__content {
        .gallery {
            display: none !important;
        }
        & > *:first-child {
            margin-top: 0 !important;
            margin-block-start: 0 !important;
        }
        & > *:last-child {
            margin-bottom: 0 !important;
            margin-block-end: 0 !important;
        }
        p {
            @extend %text;
            font-size: 14px !important;
            line-height: 26px !important;
            @include margin-block(1em)
        }
        h1,h2,h3,h4,h5,h6 {
            @include margin-block(0.8em);
        }
        h1 {
            font-size: 3em !important;
        }
        h2 {
            font-size: 2.4em !important;
        }
        h3 {
            font-size: 2em !important;
        }
        h4 {
            font-size: 1.6em !important;
        }
        h5 {
            font-size: 1.2em !important;
            @include margin-block(1em);
        }
        h6 {
            font-size: 0.8em !important;
            @include margin-block(1.1em);
        }
        pre.wp-block-preformatted{
            white-space: pre-wrap !important;
            &, > *{
                font-family: Menlo,Consolas,monaco,monospace !important;
            }
        }
        li {
            line-height: 1.5 !important;
            display: list-item !important;
            list-style-type: inherit !important;
        }
        ol, ul {
            padding-inline-start: 40px !important;
        }
        ul {
            list-style-type: disc !important;
        }
        ul ul, ol ul {
            list-style-type: circle !important;
        }
        ol ol ul, ol ul ul, ul ol ul, ul ul ul {
            list-style-type: square !important;
        }
        ol > li {
            list-style-type: decimal !important;
        }
        hr {
            height: 1px !important;
            width: 100% !important;
            @include margin-block(2em);
        }
        .wp-caption-text{
            font-size: 14px !important;
            font-weight: 600 !important;
        }
        .wp-block-gallery{
            padding-inline-start: 0 !important;
            list-style-type: none !important;
            margin-bottom: -16px !important;
        }
        img {border-radius: 8px !important; width: 100% !important;}
        img.alignright { float: right!important; margin: 0 0 1em 1em !important; }
        img.alignleft { float: left!important; margin: 0 1em 1em 0!important; }
        img.aligncenter { display: block!important; margin-left: auto!important; margin-right: auto!important; }
        .alignright { float: right!important; }
        .alignleft { float: left!important; }
        .aligncenter { display: block!important; margin-left: auto!important; margin-right: auto!important; }
        .gallery{
            width: 100% !important;
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            @include margin-block(2em);
            &-size-thumbnail{
                width: 100% !important;
                .gallery-item{
                    max-height: 150px !important;
                }
            }
            &-size-large{
            }
            .gallery-item{
                margin: 10px !important;
            }
            .gallery-icon{
                width: 100% !important;
                height: 100% !important;
                display: flex !important;
            }
            .gallery-icon a{
                width: 100% !important;
            }
            .gallery-icon img{
                width: 100% !important;
                height: 100% !important;
                object-fit: cover !important;
            }
            &-columns-2 .gallery-item{
                width: calc(100% / 12 * 6 - 20px) !important;
            }
            &-columns-3 .gallery-item{
                width: calc(100% / 12 * 4 - 20px) !important;
            }
            &-columns-4 .gallery-item{
                width: calc(100% / 12 * 3 - 20px) !important;
            }
            &-columns-5 .gallery-item{
                width: calc(100% / 10 * 2 - 20px)!important;
            }
            &-columns-6 .gallery-item{
                width: calc(100% / 12 * 2 - 20px)!important;
            }
        }
    }
</style>