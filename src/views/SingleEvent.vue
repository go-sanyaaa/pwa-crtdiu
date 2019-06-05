<template lang="pug">
    v-layout.row.wrap.ma-0
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3
            v-card.elevation-0.custom-card(v-show="event")
                v-img(v-if="event" :src="getPostImages(event)"  height="200px")
                    v-container(fill-height)
                        v-layout(row wrap).align-content-start
                            template(v-for='cat in getRecordCats(event.event_cat)')
                                v-chip(small dark color="secondary" disable).d-flex.shrink {{cat.name}}
                v-divider
                v-card-text(v-if="event")
                    span.caption.grey--text.font-weight-medium {{getHumanDate(event.date)}}
                v-divider
                v-card-text(v-if="event" v-html="event.content.rendered")#page__content
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3(v-if="event")
            app-comments(:post="event")
</template>

<script>
    import moment from 'moment'
    import {DEFAULT_IMG_URL} from "../common/config";
    import {GET_RECORD} from "../store/actions.type";
    import {mapGetters, mapState} from "vuex"
    import AppComments from "../components/appComments"

    export default {
        components: {AppComments},
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
            ...mapState('events',['categories'])
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
            getPostImages(post){
                if(post.better_featured_image){
                    var images = post.better_featured_image.media_details.sizes;
                    var max_size = Object.keys(images).pop()
                    this.getRecordCats(post.categories)
                    return images[max_size].source_url
                }else{
                    return DEFAULT_IMG_URL
                }
            },
            getHumanDate(date){
                return moment(date).locale('ru').format('LLL')
            },
            getRecordCats(record_cats = []){
                return record_cats.map(cat_id => this.categories.find(cat => cat.id === cat_id))
            },
        }
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