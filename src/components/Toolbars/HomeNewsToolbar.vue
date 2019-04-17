<template lang="pug">
    v-toolbar.elevation-0(app dark tabs clipped color="primary" height="52px" prominent)
        slot(name='slide-icon')
        v-menu(offset-y right transition="slide-y-reverse-transition")
            template(#activator="{on}")
                v-toolbar-title(v-on="on")
                    span {{currentSubpage}}
                    v-icon(dark right) arrow_drop_down
            v-list(flat)
                v-list-tile(v-for="item in subpages" :key="item.param" @click="changePage(item)")
                    v-list-tile-title {{item.name}}
        v-spacer
        v-btn(icon)
            v-icon search
        //v-toolbar-items

</template>

<script>
    export default {
        name: "HomeFeedToolbar",
        data(){
            return{
                currentSubpage: 'Все',
                subpages: [
                    {name: 'Все', param: 'home'},
                    {name: 'Новости', param: 'news'}
                ]
            }
        },
        methods: {
            changePage(page){
                this.currentSubpage = page.name
            }
        }
    }
</script>

<style scoped>

</style>