<template lang="pug">
    v-layout.row.wrap.ma-0(v-if="!isAuthenticated")
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3.px-0
            v-card-text
                v-form#form1(@submit.prevent="auth")
                    v-text-field(prepend-icon="alternate_email" name="login" label="Электронная почта" type="text" v-model="email" autocomplete="email")
                    v-text-field(prepend-icon="lock" name="password" label="Пароль" type="password" v-model="password" autocomplete="current-password")
            v-card-actions
                v-btn(color="primary" depressed block type="submit" form="form1") Войти
            v-card-actions
                v-btn.caption(color="grey" flat) Забыли пароль?
                v-spacer
                app-registration(v-slot="{open}")
                    v-btn(color="accent" flat @click="open") Создать аккаунт
    v-layout.row.wrap.ma-0.align-start(v-else)
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3.px-0
            v-card.elevation-0.custom-card
                v-list(two-line)
                    v-list-tile
                        v-list-tile-action.mr-2
                            v-avatar(size='56px')
                                img(v-if="user.avatar_urls" :src="user.avatar_urls['96']")
                        v-list-tile-content.ml-3
                            v-list-tile-title.font-weight-bold.text-upp
                                | {{user.name}}
                            v-list-tile-sub-title.body-1.grey--text.text--darken-1 {{role}}
                    v-divider(inset)
                    v-list-tile(ripple color="primary" avatar)
                        v-list-tile-avatar
                            v-icon.blue.white--text.lighten-2 alternate_email
                        v-list-tile-content
                            template
                                v-list-tile-title.body-2.grey--text.text--darken-2 {{user.email}}
                                v-list-tile-sub-title.caption.grey--text.text--lighten-1 Почтовый адрес
                v-divider
                v-list(subheader)
                    v-subheader(v-if="!myEventsLoading") Ближайшие события с вашим участием:
                    v-container.fluid.pb-2(:class="{'pt-1':!myEventsLoading}")
                        v-layout.row.wrap
                            template(v-if="myEventsLoading")
                                v-flex.text-xs-center.xs12.pb-0.caption.grey--text Загрузка ваших событий...
                                v-flex.text-xs-center.xs8.offset-xs2
                                    v-progress-linear(indeterminate rounded color="secondary" height="6").inner-progress
                            template(v-else)
                                template(v-if="eventsError")
                                    v-flex.xs12
                                        v-alert(:value="true" icon="new_releases" type="info").custom-alert Вы не записаны ни на одно мероприятие
                                template(v-else)
                                    v-flex.xs12(v-for="event in lastActiveEvents.slice(0,3)" :key="`my-event-${event.ID}`")
                                        router-link(:to="`/events/${event.ID}`").custom-link
                                            app-event-list-card(:event="event")
                                v-flex.xs12.py-0.text-xs-center(v-if="!eventsError")
                                    v-btn(flat small :to="{name:'my-events'}").caption Все мои события
                v-divider
                v-list(subheader two-line)
                    v-subheader Действия
                    v-list-tile(@click.stop="openEditDialog" v-ripple="{class:'orange--text'}" avatar)
                        v-list-tile-avatar
                            v-icon.orange.white--text edit
                        v-list-tile-content
                            v-list-tile-title.body-2 Редактировать профиль
                            v-list-tile-sub-title.caption Изменить данные пользователя
                    v-dialog(v-model="editDialog" max-width="480px")
                        v-card
                            v-toolbar(flat)
                                v-toolbar-title Редактирование профиля
                            v-container
                                v-layout.row.wrap
                                    v-flex.xs12
                                        v-text-field(label="Имя" type="text" v-model="firstName")
                                        v-text-field(label="Фамилия" type="text" v-model="lastName")
                            v-card-actions
                                v-btn(flat @click="editDialog = false") Отменить
                                v-spacer
                                v-btn(color="primary" :loading="userEditing" depressed @click="edit") Редактировать
                    v-divider
                    v-list-tile(@click.stop="exitDialog = true" v-ripple="{class:'red--text'}"  avater)
                        v-list-tile-avatar
                            v-icon.red.white--text exit_to_app
                        v-list-tile-content
                            v-list-tile-title.body-2 Выйти
                            v-list-tile-sub-title.caption Выйти из учетной записи?
                    v-dialog(v-model="exitDialog" max-width="400px")
                        v-card
                            v-toolbar(flat)
                                v-toolbar-title Подтвердите действие
                            v-card-text Вы действительно хотите выйти из учетной записи?
                            v-card-actions
                                v-btn(flat @click="exitDialog = false") Отменить
                                v-spacer
                                v-btn(color="primary" depressed @click="logout") Выйти

</template>

<script>
    import {mapState} from 'vuex'
    import {AUTH_LOGOUT, AUTH_LOGIN, MODIFY_USER} from "../store/actions.type";
    import {RESET_EVENTS_SUBSCRIBES} from "../store/mutations.type";
    import AppRegistration from "../components/appRegistration";
    import AppEventListCard from "../components/appEventListCard"
    import {loadMyEvents} from "../components/mixins/events";

    export default {
        name: 'HomeAccount',
        components: {AppEventListCard, AppRegistration},
        data(){
            return {
                dialog: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                exitDialog: false,
                editDialog: false,
                userEditing: false
            }
        },
        computed: {
            ...mapState('auth',['user','isAuthenticated']),
            ...mapState('events',['myEvents']),
            role(){
                return this.user.role == 'administrator' ? 'Администратор' : 'Подписчик'
            },
            lastActiveEvents(){
                return this.myEvents.filter(event => true)
            }
        },
        methods: {
            logout(){
                this.$store.dispatch(`auth/${AUTH_LOGOUT}`).then(()=>{
                    this.$store.commit(`events/${RESET_EVENTS_SUBSCRIBES}`)
                    this.exitDialog = false
                })
            },
            auth() {
                const {email, password} = this
                this.$store.dispatch(`auth/${AUTH_LOGIN}`, {username: email, password}).then(() => {
                    this.getMyEvents()
                })
            },
            openEditDialog(){
                this.editDialog = true;
                this.firstName = this.user.first_name
                this.lastName = this.user.last_name
            },
            edit(){
                this.userEditing = true
                const {firstName: first_name, lastName: last_name} = this
                this.$store.dispatch(`auth/${MODIFY_USER}`,{first_name, last_name, name: first_name + " " + last_name})
                    .then( resp => {
                        this.userEditing = false
                        this.editDialog = false
                    })
            },
        },
        mixins: [loadMyEvents]
    }
</script>

<style lang="scss">
</style>