<template lang="pug">
    v-app-bar(app light clipped elevate-on-scroll)
        slot(name='slide-icon')
        v-text-field(solo flat autofocus hide-details
            type="search"
            label="Поиск"
            prepend-icon="arrow_back"
            v-if="searchActive"
            v-model="searchText"
            ref="searchInput"
            @keyup.enter="search"
            :append-outer-icon="searchText.length > 0 ? 'backspace' : ''"
            @click:prepend="toggleSearch"
            @click:append-outer="clear"
            )
        v-toolbar-title(v-show="!searchActive") {{$route.meta.title}}
        v-spacer(v-show="!searchActive")
        v-btn(v-show="!searchActive" icon @click="toggleSearch")
            v-icon search
        v-progress-linear(:active="isLoading" indeterminate absolute bottom color="secondary")

</template>

<script>
    import {mapGetters} from 'vuex'
    import {UPDATE_FILTERS} from "../../store/actions.type";

    export default {
        name: "HomeFeedToolbar",
        data(){
            return{
                searchText: '',
                searchActive: false
            }
        },
        computed:{
            ...mapGetters({filters: 'news/filters', isLoading: 'news/isLoading',})
        },
        methods: {
            toggleSearch(){
                this.searchActive = !this.searchActive
            },
            search(){
                this.searchLoading = true
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