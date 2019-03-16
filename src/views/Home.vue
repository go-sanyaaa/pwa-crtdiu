<template lang="pug">
    v-app#inspire
        v-navigation-drawer(v-if="$vuetify.breakpoint.smAndUp" v-model="drawer" fixed app disable-resize-watcher)
            v-list
                v-list-tile(v-for="(item, i) in navMenu" :key="`navitem${i}`" append :to="item.route")
                    v-list-tile-action
                        v-icon {{item.icon}}
                    v-list-tile-content
                        v-list-tile-title {{item.title}}
        router-view(name='toolbar')
            template(#slide-icon)
                v-toolbar-side-icon(v-if="$vuetify.breakpoint.smAndUp" @click.stop="drawer = !drawer")
        v-content
            v-container.fluid.grid-list-lg(:px-0="$vuetify.breakpoint.xsOnly")
                transition
                    router-view
        v-bottom-nav.elevation-24(v-if="$vuetify.breakpoint.xsOnly" app clipped fixed :active.sync="bottom_nav" :value="bottom_nav_show" height="52px")
                v-btn(v-for="menu in navMenu"
                    flat color="primary" :value="menu.href" :to="menu.route" :key="menu.route" :ripple="true"
                )
                    span.mt-1 {{menu.title}}
                    v-badge(v-if="menu.badge" color="accent")
                        template(#badge)
                            span 3
                        v-icon.ma-0 {{menu.icon}}
                    v-icon.ma-0(v-else) {{menu.icon}}
</template>
<script>
  import {mapGetters} from 'vuex'

    export default {
        name: 'Home',
        data: function () {
            return {
                bottom_nav_show: true,
                bottom_nav: '',
                drawer: this.$vuetify.breakpoint.lgAndUp,
                navMenu: [
                    {icon: 'web_asset', route: '/', title: 'Лента', badge: 0},
                    {icon: 'event', route: '/events', title: 'События', badge: 0},
                    {icon: 'notifications', route: '/notify', title: 'Уведомления', badge: 4},
                    {icon: 'menu', route: '/main', title: 'Еще', badge: 0}
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

