<template lang="pug">
    v-layout.row.wrap.ma-0.align-start
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3.px-0
            v-card(flat).custom-elevation
                v-card-text
                    span.subheading.font-weight-medium.grey--text.text--darken-2 Прогрессивное web-приложения "Центра развития творчества детей и юношетсва Кировского района"
                    v-divider.my-3
                    p Данное приложение было разработано в рамках заказа "IT Биржы КемГУ" в 2019 г.
                    span Руководитель проекта:
                    v-list(three-line)
                        v-list-tile(avatar).custom-tile
                            v-list-tile-avatar
                                v-icon(dark).red.white-text.lighten-1 account_circle
                            v-list-tile-content
                                v-list-tile-title.body-2 Карабцев Сергей Николаевич
                                v-list-tile-sub-title.caption.grey--text канд. физ.-мат. наук, доцент кафедры ЮНЕСКО по ИВТ
                    span Разработчики проекта - студенты КемГУ направления "фундаментальная информатика и информационные технологии":
                    v-list(two-line)
                        v-list-tile(avatar).custom-tile
                            v-list-tile-avatar
                                v-icon(dark).orange.white-text.lighten-1 account_circle
                            v-list-tile-content
                                v-list-tile-title.body-2 Щетников Александр Е.
                                v-list-tile-sub-title.caption.grey--text hi.sanyaaa@ya.ru
                        v-divider
                        v-list-tile(avatar).custom-tile
                            v-list-tile-avatar
                                v-icon(dark).orange.white-text.lighten-1 account_circle
                            v-list-tile-content
                                v-list-tile-title.body-2 Фисенко Владимир П.
                                v-list-tile-sub-title.caption.grey--text hi.sanyaaa@ya.ru
                        v-divider
                        v-list-tile(avatar).custom-tile
                            v-list-tile-avatar
                                v-icon(dark).orange.white-text.lighten-1 account_circle
                            v-list-tile-content
                                v-list-tile-title.body-2 Новиков Михаил С.
                                v-list-tile-sub-title.caption.grey--text hi.sanyaaa@ya.ru
</template>

<script>
    export default {
        name: "InfoApp.vue"
    }
</script>

<style lang="sass" scoped>
    .custom-tile
        margin: 0 -16px
</style>