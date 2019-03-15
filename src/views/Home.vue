<template lang="pug">
    v-app#inspire
        app-header
            router-view(name='toolbar')
        v-content
            v-container.fluid.grid-list-lg
                transition
                    router-view
        v-bottom-nav.elevation-24(v-if="$vuetify.breakpoint.xsOnly" app clipped fixed :active.sync="bottom_nav" :value="bottom_nav_show" style="height: 52px;")
                v-btn(v-for="menu in bottom_menu"
                    flat color="primary" :value="menu.href" :to="menu.href" :key="menu.href" :ripple="true"
                )
                    span.mt-1 {{menu.name}}
                    v-badge(v-if="menu.badge" color="accent")
                        template(v-slot:badge)
                            span 3
                        v-icon.ma-0 {{menu.icon}}
                    v-icon.ma-0(v-else) {{menu.icon}}
</template>
<script>
  import {mapGetters} from 'vuex'
  import AppHeader from '@/components/AppHeader'

    export default {
        components: {AppHeader},
        data: function () {
            return {
                user: {
                    username: this.$store.getters.user
                },
                bottom_nav_show: true,
                bottom_nav: 'main',
                bottom_menu: [
                    {icon: 'view_day', href: '/', name: 'Лента', badge: false},
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
        component: {
            AppHeader
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

