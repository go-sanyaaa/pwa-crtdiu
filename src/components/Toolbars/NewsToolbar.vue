<template lang="pug">
    v-toolbar.elevation-8(app light clipped color="#FFF" height="56px" prominent :scroll-off-screen="$vuetify.breakpoint.xsOnly")
        slot(name='slide-icon')
        v-text-field(solo autofocus hide-details flat clearable
            type="search"
            label="Поиск"
            prepend-icon="arrow_back"
            v-if="searchActive"
            v-model="searchText"
            ref="searchInput"
            @keyup.enter="search"
            @click:prepend="toggleSearch"
            @click:clear="clear"
            )
        v-toolbar-title(v-show="!searchActive") {{$route.meta.title}}
        v-spacer(v-show="!searchActive")
        v-btn(v-show="!searchActive" icon @click="toggleSearch")
            v-icon search
        v-progress-linear(:active="isLoading" indeterminate absolute bottom height="3").toolbar-progress
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
            ...mapGetters({filters: 'news/filters', isLoading: 'news/isLoading'})
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