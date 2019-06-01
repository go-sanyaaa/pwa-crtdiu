<template lang="pug">
    v-app-bar(app light clipped color="#FFF" elevate-on-scroll)
        slot(name='slide-icon')
        v-text-field(solo flat autofocus hide-details text
            type="search"
            label="Поиск"
            prepend-icon="arrow_back"
            v-if="searchActive"
            v-model="searchText"
            ref="searchInput"
            append-outer-icon="close"
            @keyup.enter="search"
            @click:prepend="toggleSearch"
            @click:append-outer="clear"
            )
        v-toolbar-title(v-show="!searchActive") {{$route.meta.title}}
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
                this.$refs.searchInput.blur()
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