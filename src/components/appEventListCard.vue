<template lang="pug">
    v-card.elevation-0(
        max-height="280px" dark color="grey darken-2"
        :img="getPostImages(event)"
        :style="{borderRadius: '8px'}"
    )
        v-container.fill-height.fluid.bottom-gradient
            v-layout.row.wrap(align-center)
                v-flex.xs12
                    span.title.font-weight-medium(v-html="event.title.rendered")
                v-flex.shrink.pt-0
                    v-chip(light small label color="white").ml-0.font-weight-medium.mr-3
                        | {{getHumanDate(event.event_date,"LL")}}
                    v-chip(dark small :class="{success: !completed}").ml-0.font-weight-medium
                        v-avatar(:size="`14px`").mr-2.pl-3
                            v-icon(small) access_time
                        | {{getHumanDate(event.event_date,"LT")}} - {{getHumanDate(event.event_date_end,"LT")}}
</template>

<script>
    import post from "../components/mixins/post"
    import {checkEvent} from "./mixins/events";

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
        mixins: [post, checkEvent],
        name: "appEventListCard",
    }
</script>

<style scoped>

</style>