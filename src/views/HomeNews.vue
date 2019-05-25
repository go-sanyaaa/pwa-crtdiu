<template lang="pug">
    v-layout.row.wrap
        v-flex.text-xs-center.py-5(v-if="isLoading && newsEmpty")
            v-progress-circular(indeterminate color="primary")
        v-flex.xs12.sm6.offset-sm3(v-else v-for="item in news" :key="item.id")
            v-card
                router-link(:to="`/events/${item.id}`")
                    v-img(:src="getPostImages(item)" height="240px")
                v-card-title(primary-title)
                    div
                        router-link(:to="`/events/${item.id}`").title.font-weight-black.grey--text.text--darken-2 {{item.title.rendered}}
                            br
                        span.grey--text.font-weight-light {{getHumanDate(item.date)}}
                v-card-text.py-0
                    div.text--accent-1(v-html="item.excerpt.rendered")
                v-card-actions.px-3.pb-4
                    v-chip(flat small outline color="secondary" disabled) Академия ЮИД
                    v-spacer
                    v-btn(flat small :ripple="{ class: 'red--text' }").body-2.text-none.grey--text.text--darken-1 Поделиться
                        v-icon(right size="22px") share
        v-flex.text-xs-center.xs12(
            v-if="(isLoading && !newsEmpty) || canLoad"
            )
            v-btn(flat @click="fetchNews" :loading="isLoading") Загрузить еще
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