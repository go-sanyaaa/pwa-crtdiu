<template lang="pug">
    v-layout.row.wrap.ma-0.align-start
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3.px-0
            v-card.custom-elevation
                v-responsive
                    v-img(:src="require('../assets/logo.svg')" height="150" contain).mt-3
                v-card-text.text-xs-center
                    v-layout.column
                        span.font-weight-bold.subheading  Центр развития творчества детей и юношества Кировского района
                        span.caption.font-weight-medium.grey--text гор. Кемерово
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3.px-0
            v-card.custom-elevation
                v-list(two-line)
                    v-list-tile(avatar href="https://crtdiu-app.ru/"  v-ripple="{class:'blue--text'}")
                        v-list-tile-avatar
                            v-icon(outlined).blue.white--text language
                        v-list-tile-content
                            template
                                v-list-tile-title.body-2.grey--text.text--darken-2 Сайт школы
                                v-list-tile-sub-title.caption.grey--text.text--lighten-1 Оффициальный сайт "ЦРТДиЮ"
                    v-divider
                    v-list-tile(avatar :to="{name:'app-info'}"  v-ripple="{class:'orange--text'}")
                        v-list-tile-avatar
                            v-icon(outlined).orange.white--text info
                        v-list-tile-content
                            template
                                v-list-tile-title.body-2.grey--text.text--darken-2 О приложении
                                v-list-tile-sub-title.caption.grey--text.text--lighten-1 Информация о приложении
</template>

<script>
    export default {
        name: "HomeInfo"
    }
</script>

<style scoped>

</style>