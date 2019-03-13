<template lang="pug">
    v-layout
        v-flex.xs12.sm6.offset-sm3
            div.text-xs-center.pa-5(v-if="isLoading")
                v-progress-circular(indeterminate color="primary")
            v-card.mb-4.elevation-1(v-else v-for="item in news" :key="item.id")
                v-img(:src="getPostImages(item)" height="240px")
                v-card-title
                    div
                        div.title.font-weight-black {{item.title.rendered}}
                        span.grey--text.font-weight-light {{getHumanDate(item.date)}}
                v-card-text
                    div.text--accent-1(v-html="item.excerpt.rendered")
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
            console.log('created')
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

<style scoped>

</style>