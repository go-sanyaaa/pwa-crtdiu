<template lang="pug">
    v-layout.row.wrap.ma-0
        v-flex.text-xs-center.py-5(v-if="isLoading && newsEmpty")
            v-progress-circular(indeterminate color="primary")
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3(v-else v-for="item in news" :key="item.id")
            v-card(outlined)
                router-link(:to="`/events/${item.id}`")
                    v-img(:src="getPostImages(item)" height="240px")
                        v-container(fill-height align-start justify-content-center).fluid
                            v-layout(row wrap)
                                v-chip(small outlined color="secondary") Академия ЮИД
                v-card-title(primary-title)
                    div
                        span.title.font-weight-black.grey--text.text--darken-2 {{item.title.rendered}}
                v-card-text.py-0
                    div.text--accent-1(v-html="item.excerpt.rendered")
                v-card-actions.px-3.pb-4
                    v-spacer
                    v-btn(text small).body-2.text-none.grey--text.text--darken-1 Поделиться
                        v-icon(right size="22px") share
                v-divider
                v-card-actions.px-3
                    span.caption.grey--text.font-weight-medium {{getHumanDate(item.date)}}
                    v-spacer
                    v-btn(small text).grey--text.caption подробнее
        v-flex.text-xs-center.xs12.mb-2(
            v-if="(isLoading && !newsEmpty) || canLoad"
            )
            v-btn(text @click="fetchNews" :loading="isLoading").text-uppercase Еще
</template>

<script>
    import {mapGetters} from 'vuex'
    import {LOAD_NEWS, CHANGE_PAGE} from "../store/actions.type";
    import {DEFAULT_IMG_URL} from "../common/config";
    import moment from 'moment'

    export default {
        name: "NewsCards",
        data(){
            return {
            }
        },
        computed:{
            ...mapGetters({
                news:'news/records',
                isLoading: 'news/isLoading',
                filters: 'news/filters',
                total: 'news/total',
                pagination: 'news/pagination'
            }),
            canLoad(){
                const {pagination:{page,per_page},total} = this
                return per_page * page < total
            },
            newsEmpty(){
                return this.news.length === 0
            }
        },
        created() {
            if(this.newsEmpty) this.loadNews({})
        },
        methods: {
            getHumanDate(date){
                return moment(date).locale('ru').format('LLL')
            },
            getPostImages(post){
                if(post.better_featured_image){
                    var images = post.better_featured_image.media_details.sizes;
                    var max_size = Object.keys(images).pop()
                    return images[max_size].source_url
                }else{
                    return DEFAULT_IMG_URL
                }
            },
            loadNews(){
                this.$store.dispatch(`news/${LOAD_NEWS}`,1)
            },
            fetchNews(){
                this.$store.dispatch(`news/${CHANGE_PAGE}`)
            },
        },
        watch:{
            filters: function (filters) {
                this.loadNews()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>