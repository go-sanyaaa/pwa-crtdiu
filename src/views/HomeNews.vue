<template lang="pug">
    v-layout.row.wrap.ma-0
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3(v-for="item in news" :key="item.id")
            v-card(outlined)
                router-link.news-link(:to="`/news/${item.id}`")
                    v-img(:src="getPostImages(item)" height="240px")
                        v-container.grid-list-xs
                            v-layout(row wrap align-start)
                                v-flex.shrink
                                    v-chip(small color="secondary") Академия ЮИД
                v-card-title(primary-title)
                    v-layout.row(justify-space-between)
                        v-flex
                            span.title.font-weight-black.grey--text.text--darken-2 {{item.title.rendered}}
                        v-flex.shrink(v-if="shareAvailable")
                            v-btn(icon @click="shareEvent(event)")
                                v-icon share
                v-card-text.py-0
                    div.text--accent-1(v-html="item.excerpt.rendered")
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
                shareAvailable: navigator.share !== undefined ? true : false
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
            shareNews(news){
                navigator.share({
                    title: "Центр развития творчества детей и юношества Кировского района города Кемерово",
                    url: news.link
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .news-link{
        text-decoration: none;
    }
</style>