<template lang="pug">
    #events
        v-toolbar.elevation-0(app color="primary" fixed dark clipped)
            v-spacer
            v-tabs(color="transparent" fixed-tabs)
                v-tab Все
                v-tab Участник
            v-spacer
        v-content
            v-container.fluid
                v-layout.row.wrap
                    v-flex.xs12.sm6.offset-sm3
                        v-card
                            v-img(src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px")
                    v-flex.xs12.sm6.offset-sm3
                        v-card
                            v-img(src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px")
                    v-flex.xs12.sm6.offset-sm3
                        v-card
                            v-img(src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px")
</template>

<script>

</script>