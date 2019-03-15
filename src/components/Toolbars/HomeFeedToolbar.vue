<template lang="pug">
    v-menu(offset-y right transition="slide-y-reverse-transition")
        template(v-slot:activator="{on}")
            v-btn.ma-0(flat v-on="on") {{currentSubpage}}
                v-icon(dark right) arrow_drop_down
        v-list(flat)
            v-list-tile(v-for="item in subpages" :key="item.param" @click="changePage(item)")
                v-list-tile-title {{item.name}}
</template>

<script>
    export default {
        name: "MainNav",
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