<template lang="pug">
    v-layout.column.wrap.justify-center.align-center(v-if="isLoading")
        v-flex.xs12.sm4.align-self-center
            v-progress-circular(:size='50'  color="primary" indeterminate)
    v-layout.row.wrap(v-else)
        v-flex.xs12.sm4.offset-sm4
            v-card.mb-4(flat v-for="item in news" :key="item.id")
                v-img(src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="240px")
                v-card-title
                    div
                        div.title.font-weight-black {{item.title.rendered}}
                        span.grey--text.font-weight-light {{getHumanDate(item.date)}}
                v-card-text
                    div.text--accent-1(v-html="item.excerpt.rendered")
</template>

<script>
    import {mapGetters} from 'vuex'
    import {FETCH_NEWS} from "../store/actions.type";
    import moment from 'moment'

    export default {
        name: "NewsCards",
        computed:{
            ...mapGetters(['news','isLoading'])
        },
        mounted() {
            this.$store.dispatch(FETCH_NEWS)
        },
        methods: {
            getHumanDate(date){
                return moment(date).locale('ru').format('LLL')
            }
        }
    }
</script>

<style scoped>

</style>