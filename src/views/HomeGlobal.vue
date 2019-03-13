<template lang="pug">
    v-app#inspire
        transition(name="slide")
            router-view
        v-bottom-nav.elevation-5(app clipped fixed :active.sync="bottom_nav" :value="bottom_nav_show")
            v-btn(
            v-for="menu in bottom_menu"
            flat color="primary" :value="menu.href" :to="menu.href" :key="menu.href"
            )
                span.mt-1 {{menu.name}}
                v-icon.ma-0 {{menu.icon}}
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
                    {icon: 'web_asset', href: '/', name: 'Лента'},
                    {icon: 'event', href: '/events', name: 'События'},
                    {icon: 'notifications', href: '/notify', name: 'Уведомления'},
                    {icon: 'menu', href: '/main', name: 'Меню'}
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
