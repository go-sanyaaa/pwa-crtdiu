<template lang="pug">
    #app
        v-app#inspire
            v-navigation-drawer(v-if="$vuetify.breakpoint.mdAndUp" v-model="drawer" fixed app disable-resize-watcher)
                v-list
                    v-list-item(v-for="(item, i) in navMenu" :key="`navitem${i}`" append :to="item.route")
                        v-list-item-action
                            v-icon {{item.icon}}
                        v-list-item-content
                            v-list-item-title {{item.title}}
            router-view(name='toolbar')
                template(#slide-icon)
                    v-app-bar-nav-icon(v-if="$vuetify.breakpoint.mdAndUp" @click.stop="drawer = !drawer")
                        v-icon menu
            v-content
                v-container.fluid.grid-list-lg(:pa-0="$vuetify.breakpoint.xsOnly")
                    router-view
            v-bottom-navigation.elevation-24(v-if="$vuetify.breakpoint.smAndDown" app grow v-model="bottom_nav" :value="bottom_nav_show"
                :height="iphoneX ? '72px' : '52px'" :style="{paddingBottom: iphoneX ? '20px' : ''}")
                v-btn(v-for="menu in navMenu"
                    text color="primary" :value="menu.href" :to="menu.route" :key="menu.route" :ripple="true"
                )
                    span.mt-1 {{menu.title}}
                    v-badge(v-if="menu.badge" color="accent")
                        template(#badge)
                            span 3
                        v-icon.ma-0 {{menu.icon}}
                    v-icon.ma-0(v-else) {{menu.icon}}
</template>

<script>

export default {
    name: 'App',
    data: function () {
        return {
            iphoneX: false,
            bottom_nav_show: true,
            bottom_nav: '',
            drawer: false,
            // drawer: this.$vuetify.breakpoint.lgAndUp,
            navMenu: [
                {icon: 'web_asset', route: '/', title: 'Новости', badge: 0},
                {icon: 'event', route: '/events', title: 'События', badge: 0},
                //{icon: 'notifications', route: '/notify', title: 'Уведомления', badge: 4},
                {icon: 'account_circle', route: '/account', title: 'Аккаунт', badge: 0}
            ]
        }
    },
    created() {
        // Update page title.

        this.$store.watch((state) => {
            return state.common.title
        }, (title) => {
            document.title = title
        }, {
            deep: true
        })

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
    }
}
</script>

<style lang="scss">
    .v-toolbar .v-badge__badge{
        top: -4px !important;
        right: -4pxs !important;
    }
</style>
