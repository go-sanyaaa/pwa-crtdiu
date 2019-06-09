<template lang="pug">
    v-layout.row.wrap.ma-0
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3.px-0(v-for="item in records" :key="item.id")
            v-card(flat).custom-elevation
                router-link.news-link(:to="`/news/${item.id}`")
                    v-img(:src="getPostImages(item)" height="240px")
                        v-container
                            v-layout(row wrap align-content-start)
                                template(v-for='cat in getRecordCats(item.categories)')
                                    v-chip(small dark color="secondary").d-flex.shrink {{cat.name}}
                v-card-title(primary-title)
                    v-layout.row(justify-space-between align-start)
                        v-flex
                            span.title.font-weight-black.grey--text.text--darken-2 {{item.title.rendered}}
                        v-flex.shrink(v-if="shareAvailable").pt-0
                            v-btn(icon flat @click="shareNews(item)").grey--text.ma-0
                                v-icon share
                v-card-text.py-0
                    div.text--accent-1(v-html="item.excerpt.rendered")
                v-divider
                v-card-actions.px-3
                    span.caption.grey--text.font-weight-medium {{getHumanDate(item.date)}}
                    v-spacer
                    v-btn(small flat :to="`/news/${item.id}`").grey--text.caption подробнее
        v-flex.text-xs-center.xs12.mb-2(
            v-if="(isLoading && !newsEmpty) || canLoad"
        )
            v-btn(flat @click="fetchNews" :loading="isLoading").text-uppercase Еще
</template>

<script>
    import {mapState} from 'vuex'
    import {LOAD_NEWS, CHANGE_PAGE, INIT_RECORDS} from "../store/actions.type";
    import {DEFAULT_IMG_URL} from "../common/config";
    import moment from 'moment'

    export default {
        name: "HomeNews",
        data(){
            return {
                shareAvailable: navigator.share !== undefined
            }
        },
        computed:{
            ...mapState('news',['categories', 'records','total','filters','isLoading','pagination']),
            canLoad(){
                const {pagination:{page,per_page},total} = this
                return per_page * page < total
            },
            newsEmpty(){
                return this.records.length === 0
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
                this.$store.dispatch(`news/${INIT_RECORDS}`)
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
            getRecordCats(record_cats){
                return record_cats.map(cat_id => this.categories.find(cat => cat.id === cat_id))
            },
        }
    }
</script>

<style lang="scss" scoped>
    .news-link{
        text-decoration: none;
    }
</style>