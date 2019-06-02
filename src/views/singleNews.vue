<template lang="pug">
    v-layout.row.wrap
        v-flex.xs12.sm6.offset-sm3
            v-card
                v-img(src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px")
        v-flex.xs12.sm6.offset-sm3
            v-card
                v-card-title {{id}}
                v-card-text(v-if="news" v-html="news.content.rendered")#page__content
</template>

<script>
    import {GET_RECORD} from "../store/actions.type";
    import {mapGetters} from "vuex"

    export default {
        props: ['id'],
        data(){
            return {
                news: false,
                errors: []
            }
        },
        name: "singleNews",
        computed: {
            ...mapGetters({getNewsById: 'news/newsById'})
        },
        created() {
            const {id} = this
            this.news = this.getNewsById(id) || this.loadSingleNews(id)
        },
        methods: {
            loadSingleNews(id){
                this.$store.dispatch(`news/${GET_RECORD}`,{id})
                    .then(resp => {
                        this.news = resp
                    })
            }
        }
    }
</script>

<style lang="scss">
    %text{
        color: black;
        font-size: 14px;
        line-height: 20px;
        text-align: justify;
        letter-spacing: 0.02em;
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
            font-size: 16px !important;
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