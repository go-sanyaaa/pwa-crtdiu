<template lang="pug">
    v-app#inspire
        keep-alive
            router-view
        v-bottom-nav.elevation-5(app clipped fixed :active.sync="bottom_nav" :value="bottom_nav_show")
                v-btn(v-for="menu in bottom_menu"
                    flat color="primary" :value="menu.href" :to="menu.href" :key="menu.href"
                )
                    span.mt-1 {{menu.name}}
                    v-badge(v-if="menu.badge" color="red" overlap)
                        template(v-slot:badge)
                            span 3
                        v-icon.ma-0 {{menu.icon}}
                    v-icon.ma-0(v-else) {{menu.icon}}
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
        data: function () {
            return {
                user: {
                    username: this.$store.getters.user
                },
                bottom_nav_show: true,
                bottom_nav: 'main',
                bottom_menu: [
                    {icon: 'web_asset', href: '/', name: 'Лента', badge: false},
                    {icon: 'event', href: '/events', name: 'События', badge: false},
                    {icon: 'notifications', href: '/notify', name: 'Уведомления', badge: true},
                    {icon: 'menu', href: '/main', name: 'Еще', badge: false}
                ],
                drawerItems: [
                    {header: 'Меню'},
                    {title: 'Главная', to:'/', icon:'home'},
                    {divider: true, inset: true},
                    {title: 'crtdiu-app.ru', href:true, to:'https://crtdiu-app.ru', icon:'link'}
                ]
            }
        },
      computed: {
            ...mapGetters(['currentUser']),
      }
    }
</script>

<style lang="sass">
    .v-btn--active
        padding-top: 8px !important
        .v-btn__content
            font-size: 12px !important
</style>

