<template lang="pug">
    v-toolbar.elevation-0(app dark tabs clipped color="primary" height="52px" prominent)
        slot(name='slide-icon')
        v-text-field(solo-inverted autofocus hide-details flat clearable
            type="search"
            label="Поиск"
            prepend-inner-icon="arrow_back"
            v-if="searchActive"
            v-model="searchText"
            @keyup.enter="search"
            @click:prepend-inner="toggleSearch"
            @click:clear="clear"
            )
        v-toolbar-title(v-show="!searchActive") Новости
        //v-menu(offset-y right transition="slide-y-reverse-transition")
            template(#activator="{on}")
                v-toolbar-title(v-show="!searchActive" v-on="on")
                    span {{currentSubPage}}
                    v-icon(dark right) arrow_drop_down
            v-list(flat)
                v-list-tile(v-for="item in subPages" :key="item.param" @click="changePage(item)")
                    v-list-tile-title {{item.name}}
        v-spacer(v-show="!searchActive")
        v-btn(v-show="!searchActive" icon @click="toggleSearch")
            v-icon search
        //v-toolbar-items

</template>

<script>
    import {mapGetters} from 'vuex'
    import {UPDATE_FILTERS} from "../../store/actions.type";

    export default {
        name: "HomeFeedToolbar",
        data(){
            return{
                searchText: '',
                searchActive: false,
                currentSubPage: 'Все',
                subPages: [
                    {name: 'Все', param: 'home'},
                    {name: 'Новости', param: 'news'}
                ]
            }
        },
        computed:{
            ...mapGetters({filters: 'news/filters'})
        },
        methods: {
            changePage(page){
                this.currentSubPage = page.name
            },
            toggleSearch(){
                this.searchActive = !this.searchActive
            },
            search(){
                this.$store.dispatch(`news/${UPDATE_FILTERS}`,{'search':this.searchText})
            },
            clear(){
                this.searchText = '';
                this.search()
            }
        }
    }
</script>

<style scoped>

</style>