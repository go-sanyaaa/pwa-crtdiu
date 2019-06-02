<template lang="pug">
    v-app-bar.elevation-0(app light clipped color="#FFF" elevate-on-scroll)
        slot(name='slide-icon')
        v-text-field(solo autofocus hide-details flat
            type="search"
            label="Поиск"
            prepend-icon="arrow_back"
            v-if="searchActive"
            v-model="searchText"
            ref="searchInput"
            :append-outer-icon="searchText.length > 0 ? 'backspace' : ''"
            @keyup.enter="search"
            @click:prepend="toggleSearch"
            @click:append-outer="clear"
        )
        v-toolbar-title(v-show="!searchActive") {{$route.meta.title}}
        v-spacer(v-show="!searchActive")
        v-dialog(v-model="dialog" :fullscreen="$vuetify.breakpoint.xsOnly" max-width="600px")
            template(v-slot:activator="{on}")
                v-badge(color="accent" overlap v-show="!searchActive")
                    template(v-slot:badge v-if="filterCount > 0") {{filterCount}}
                    v-btn(icon v-show="!searchActive" v-on="on")
                        v-icon filter_list
            v-card
                v-toolbar(flat color="primary" dark)
                    v-toolbar-title Фильтр событий
                v-divider
                v-container()
                    v-layout.row.wrap
                        v-flex.xs12
                           v-select(
                               clearable label="Категория событий" placeholder="Все"
                               :items="categories" item-text="name" item-value="id" v-model="event_cat"
                           )
                        v-flex.xs12
                            v-dialog(ref="dialogAfter" v-model="dialogDateAfter" lazy width="290px" :return-value.sync="after")
                                template(v-slot:activator="{on}")
                                    v-text-field(v-model="after" readonly v-on="on" label="Дата (от)" hide-details clearable)
                                v-date-picker(v-model="after" scrollable no-title locale="ru-ru" first-day-of-week="1")
                                    v-btn(text color="primary" @click="dialogDateAfter = false") Отменить
                                    v-spacer
                                    v-btn(text color="primary" @click="$refs.dialogAfter.save(after)" ) Принять
                        v-flex.xs12
                            v-dialog(ref="dialogBefore" v-model="dialogDateBefore" lazy width="290px" :return-value.sync="before")
                                template(v-slot:activator="{on}")
                                    v-text-field(v-model="before" readonly v-on="on" label="Дата (до)" hide-details clearable)
                                v-date-picker(v-model="before" scrollable no-title locale="ru-ru" first-day-of-week="1")
                                    v-btn(text color="primary" @click="dialogDateBefore = false") Отменить
                                    v-spacer
                                    v-btn(text color="primary" @click="$refs.dialogBefore.save(before)") Принять
                v-divider
                v-card-actions
                    v-btn(text @click="dialog = false" :ripple="{ class: 'red--text' }") Отменить
                    v-spacer
                    v-btn(text color="primary" @click="setFilter" :loading="filtering") Применить
        v-btn(v-show="!searchActive" icon @click="toggleSearch")
            v-icon search
        v-progress-linear(:active="isLoading" indeterminate absolute bottom color="secondary")
</template>

<script>
    import moment from 'moment'
    import {mapGetters} from 'vuex'
    import {UPDATE_FILTERS} from "../../store/actions.type";

    export default {
        name: "HomeEventsToolbar",
        data(){
            return {
                isEditing: false,
                event_cat: '',
                dialogDateBefore: false,
                dialogDateAfter: false,
                dialog: false,
                filtering: false,
                before: '',
                after: '',
                searchActive: false,
                searchText: '',
                filterCount: 0
            }
        },
        created(){
            const {event_cat = false, before = false, after = false} = this.filters
            this.event_cat = event_cat && ++this.filterCount ? event_cat : '';
            this.before = before && ++this.filterCount  ? moment(before).format('YYYY-MM-DD') : '';
            this.after = after && ++this.filterCount ? moment(after).format('YYYY-MM-DD') : '';
        },
        computed:{
            ...mapGetters({categories:'events/categories',filters: 'events/filters', isLoading: 'events/isLoading'})
        },
        methods:{
            toggleSearch(){
                this.searchActive = !this.searchActive
            },
            search(){
                this.searchLoading = true
                this.$refs.searchInput.blur()
                this.$store.dispatch(`events/${UPDATE_FILTERS}`,{...this.filters,'search':this.searchText})
            },
            clear(){
                this.searchText = '';
                this.search()
            },
            setFilter(){
                const {event_cat,before,after} = this
                this.filtering = true
                this.filterCount = 0
                let filters = {}

                if(before) (filters.before = moment(before).format()) && this.filterCount++;
                if(after) (filters['after'] = moment(after).format()) && this.filterCount++;
                if(event_cat) (filters['event_cat'] = event_cat) && this.filterCount++;

                this.$store.dispatch(`events/${UPDATE_FILTERS}`,filters)
                    .then(resp => {
                            this.filtering = false
                            this.dialog = false
                            window.scrollTo(0,0);
                    })
            }
        }
    }
</script>

<style lang="sass" scoped>
    .v-btn--active
        padding-top: 0 !important

</style>