<template lang="pug">
    #home
        v-toolbar.elevation-0(app color="primary" fixed dark clipped)
            v-layout
                v-flex.xs12.md6.offset-md3
                    v-menu(offset-y right)
                        template(v-slot:activator="{on}")
                                v-btn(flat v-on="on") {{currentSubpage}}
                                    v-icon(dark) arrow_drop_down
                        v-list(flat)
                            v-list-tile(v-for="item in subpages" :key="item.param" @click="changePage(item)")
                                v-list-tile-title {{item.name}}
                    v-spacer
        v-content
            v-container
                news-cards

</template>

<script>
    import NewsCards from '@/components/NewsCards.vue'

    export default {
        name: "Home",
        data(){
            return{
                currentSubpage: 'Все',
                subpages: [
                    {name: 'Все', param: 'home'},
                    {name: 'Новости', param: 'news'}
                ]
            }
        },
        components: {
            NewsCards
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