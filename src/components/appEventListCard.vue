<template lang="pug">
    v-card.elevation-0(
        max-height="280px" dark color="grey darken-2"
        :img="getPostImages(event)"
        :style="{borderRadius: '8px'}"
    )
        v-container.fill-height.fluid.bottom-gradient
            v-layout.row.wrap(align-center)
                v-flex.xs12
                    span.title.font-weight-medium(v-html="event.post_title")
                v-flex.shrink.pt-0
                    v-chip(light small label color="white").ml-0.font-weight-medium.mr-3
                        | 14 мая 2019
                    v-chip(dark small color="success").green.ml-0.font-weight-medium
                        v-avatar(:size="`14px`").mr-2.pl-3
                            v-icon(small) access_time
                        | 10:00 - 14:00
</template>

<script>
    import post from "../components/mixins/post"

    export default {
        data(){
            return {
            }
        },
        props: {
            event: {
                type: Object,
                required: true
            }
        },
        mixins: [post],
        name: "appEventListCard",
    }
</script>

<style scoped>

</style>