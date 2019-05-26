<template lang="pug">
    v-toolbar.elevation-0(app dark tabs clipped color="primary" height="52px" prominent :scroll-off-screen="$vuetify.breakpoint.xsOnly")
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
        v-spacer(v-show="!searchActive")
        v-btn(v-show="!searchActive" icon @click="toggleSearch")
            v-icon search

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
            }
        },
        computed:{
            ...mapGetters({filters: 'news/filters'})
        },
        methods: {
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