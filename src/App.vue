<template lang="pug">
    #app
        v-app#inspire
            v-navigation-drawer(v-if="$vuetify.breakpoint.mdAndUp"
                    v-model="drawer" fixed app disable-resize-watcher
                )
                v-list
                    v-list-tile(v-for="(item, i) in navMenu" :key="`navitem${i}`" append :to="item.route")
                        v-list-tile-action
                            v-icon {{item.icon}}
                        v-list-tile-content
                            v-list-tile-title {{item.title}}
            router-view(name='toolbar')
                template(#slide-icon)
                    v-toolbar-side-icon(v-if="$vuetify.breakpoint.mdAndUp" @click.stop="drawer = !drawer")
            v-content
                v-container.fluid.grid-list-lg.px-0(:pt-0="$vuetify.breakpoint.xsOnly")
                    router-view
            v-bottom-nav.elevation-24(v-if="$vuetify.breakpoint.smAndDown" app clipped fixed
                    :active.sync="bottom_nav" :value="bottom_nav_show"
                    :height="iphoneX ? '72px' : '56px'" :style="{paddingBottom: iphoneX ? '20px' : ''}" light
                )
                v-btn(v-for="menu in navMenu"
                    flat :value="menu.href" color="blue" :to="menu.route" :key="menu.route" :ripple="{ center: true }"
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
            drawer: this.$vuetify.breakpoint.lgAndUp,
            navMenu: [
                {icon: 'web_asset', route: '/', title: 'Новости', badge: 0},
                {icon: 'event', route: '/events', title: 'События', badge: 0},
                {icon: 'account_circle', route: '/account', title: 'Аккаунт', badge: 0},
                {icon: 'more_horiz', route: '/info', title: 'Еще', badge: 0}
            ]
        }
    },
    created() {
        this.$store.watch((state) => {
            return state.common.title
        }, (title) => {
            document.title = title
        }, {
            deep: true
        })

        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        var ratio = window.devicePixelRatio || 1;

        var screen = {
            width : window.screen.width * ratio,
            height : window.screen.height * ratio
        };

        if (iOS && (screen.width == 1125 || screen.width == 828) && (screen.height === 2436 || screen.height === 1792)) {
            this.iphoneX = true;
        }
    }
}
</script>

<style lang="scss">
    .tag{
        text-decoration: none !important;
    }
    .v-toolbar .v-badge__badge{
        top: -3px !important;
        right: -3px !important;
    }
    .outlined{
        border: 1px solid #e6e6e6 !important;
    }
    .toolbar-progress{
        position: absolute !important;
        left: 0 !important;
        bottom: 0 !important;
        margin: 0 !important;
    }
    .inner-progress{
        margin: 0 !important;
        border-radius: 10px;
    }
    .custom-alert{
        border: none !important;
        border-radius: 12px !important;
        margin: 0 !important;
    }
    .custom-elevation{
        box-shadow: 0 0 10px 2px rgba(0,0,0,0.1) !important;
    }
    .custom-card{
        box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.1) !important;
    }
    .comment-content *{
        margin: 0 !important;
    }
    .comment-card{
        border: 1px solid #e6e6e6 !important;
        border-radius: 10px;
        &:last-child{
            margin-bottom: 0 !important;
        }
    }
    .inner-comment{
        &:nth-child(2n-1){
            background: #f5f5f5;
        }
        border-radius: 12px;
    }
    .custom-rounded{
        border-radius: 12px !important;
    }
    .bottom-gradient {
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 100%, transparent 100px);
     }

    .custom-link{
        text-decoration: none;
    }
</style>
