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
        v-bottom-nav.elevation-24(v-if="$vuetify.breakpoint.xsOnly" app clipped fixed :active.sync="bottom_nav" :value="bottom_nav_show"
                :height="iphoneX ? '72px' : '52px'" :style="{paddingBottom: iphoneX ? '20px' : ''}")
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
                iphoneX: false,
                bottom_nav_show: true,
                bottom_nav: '',
                drawer: this.$vuetify.breakpoint.lgAndUp,
                navMenu: [
                    {icon: 'web_asset', route: '/', title: 'Новости', badge: 0},
                    {icon: 'event', route: '/events', title: 'События', badge: 0},
                    //{icon: 'notifications', route: '/notify', title: 'Уведомления', badge: 4},
                    {icon: 'account_circle', route: '/main', title: 'Аккаунт', badge: 0}
                ]
            }
        },
        created() {
            // Really basic check for the ios platform
            // https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
            var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

            // Get the device pixel ratio
            var ratio = window.devicePixelRatio || 1;

            // Define the users device screen dimensions
            var screen = {
                width : window.screen.width * ratio,
                height : window.screen.height * ratio
            };

            // iPhone X Detection
            if (iOS && (screen.width == 1125 || screen.width == 828) && (screen.height === 2436 || screen.height === 1792)) {

                // Set a global variable now we've determined the iPhoneX is true
                this.iphoneX = true;
                // // Adds a listener for ios devices that checks for orientation changes.
                // window.addEventListener('orientationchange', update);
                // update();
            }
        },
        computed: {
            // ...mapGetters(['currentUser']),
        }
    }
</script>

<style lang="sass">
    .v-toolbar .v-badge__badge
        top: 2px !important
        right: 0 !important
</style>

