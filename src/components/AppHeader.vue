<template lang="pug">
    div#header
        v-navigation-drawer(v-if="$vuetify.breakpoint.smAndUp" v-model="drawer" fixed app disable-resize-watcher)
            v-list
                v-list-tile(v-for="(item, i) in navMenu" :key="`navitem${i}`" append replace :to="item.route")
                    v-list-tile-action
                        v-icon {{item.icon}}
                    v-list-tile-content
                        v-list-tile-title {{item.title}}
        v-toolbar.elevation-0(app dark tabs height='48px' clipped color="primary")
            v-toolbar-side-icon(v-if="$vuetify.breakpoint.smAndUp" @click.stop="drawer = !drawer")
            slot

</template>

<script>
    export default {
        name: "AppHeader",
        data() {
            return {
                drawer: this.$vuetify.breakpoint.lgAndUp,
                navMenu: [
                    {icon: 'web_asset', route: '/', title: 'Лента', badge: 0},
                    {icon: 'event', route: '/events', title: 'События', badge: 0},
                    {icon: 'notifications', route: '/notify', title: 'Уведомления', badge: 4},
                    {icon: 'menu', route: '/main', title: 'Еще', badge: 0}
                ]
            }
        }
    }
</script>

<style scoped>

</style>