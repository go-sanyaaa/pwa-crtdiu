<template lang="pug">
    v-layout.row.wrap
        div.text-xs-center.pa-5(v-if="isLoading")
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
                    v-chip(flat small outline color="secondary") Академия ЮИД
                    v-spacer
                    v-btn(flat small :ripple="{ class: 'red--text' }").body-2.text-none.grey--text.text--darken-1 Поделиться
                        v-icon(right size="22px") share
</template>

<script>
    import {mapGetters} from 'vuex'
    import {LOAD_NEWS} from "../store/actions.type";
    import moment from 'moment'

    export default {
        name: "NewsCards",
        computed:{
            ...mapGetters(['news','isLoading'])
        },
        mounted() {
            this.$store.dispatch(LOAD_NEWS)
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
                    return 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>