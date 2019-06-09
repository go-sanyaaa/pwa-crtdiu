<template lang="pug">
    v-toolbar(app light clipped color="#FFF" height="56px" prominent).custom-elevation
        slot(name='slide-icon')
        v-scroll-x-transition(hide-on-leave)
            v-btn(icon @click.stop="$router.go(-1)")
                v-icon arrow_back
        v-toolbar-title(:class="{'ml-0':$vuetify.breakpoint.smAndDown}" v-html="news ? news.title.rendered : 'Загрузка...'")
        v-progress-linear(:active="isLoading" indeterminate absolute bottom height="3").toolbar-progress
        v-spacer
        v-btn(icon v-if="shareAvailable && news" @click="shareNews(news)")
            v-icon share
</template>

<script>
    import {GET_RECORD} from "../../store/actions.type";
    import {mapGetters} from "vuex"

    export default {
        name: "HomeEventToolbar",
        data(){
            return {
                isLoading: false,
                news: false,
                shareAvailable: navigator.share !== undefined ? true : false
            }
        },
        props: ['id'],
        computed:{
            ...mapGetters({getNewsById: 'news/newsById'})
        },
        mounted() {
            const {id} = this
            this.news = this.getNewsById(id) || this.loadSingleNews(id)
            // Check share api
            if(navigator.share !== undefined){
                this.shareAvailable = true
            }
        },
        methods: {
            loadSingleNews(id){
                this.isLoading = true
                this.$store.dispatch(`news/${GET_RECORD}`,{id})
                    .then(resp => {
                        this.news = resp
                        this.isLoading = false
                    })
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

<style scoped>

</style>