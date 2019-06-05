<template lang="pug">
    v-layout.row.wrap.ma-0.fill-height(v-if="!isAuthenticated"
        :class="[alignContent]")
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3
            v-card-text
                v-form#form1(@submit.prevent="auth")
                    v-text-field(prepend-icon="alternate_email" name="login" label="Электронная почта" type="text" v-model="email" autocomplete="email")
                    v-text-field(prepend-icon="lock" name="password" label="Пароль" type="password" v-model="password" autocomplete="current-password")
            v-card-actions
                v-btn(color="primary" depressed block type="submit" form="form1") Войти
            v-card-actions
                v-btn.caption(color="grey" flat) Забыли пароль?
                v-spacer
                v-btn.caption(color="accent" flat) Создать аккаунт
    v-layout.row.wrap.ma-0.align-start(v-else)
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3
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
                    v-list-tile(ripple color="primary")
                        v-list-tile-action
                            v-icon(outlined) alternate_email
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
                                    v-flex.xs12.px-0
                                        v-alert(:value="true" icon="new_releases" type="info").custom-alert Вы не записаны ни на одно мероприятие
                                template(v-else)
                                    v-flex.xs12.px-0(v-for="event in lastActiveEvents.slice(0,3)" :key="`my-event-${event.ID}`")
                                        router-link.event-link(:to="`/events/${event.ID}`")
                                            v-card.elevation-0(
                                                max-height="280px" dark color="grey darken-2"
                                                img="https://crtdiu-app.ru/wp-content/uploads/2019/02/IMG_8931-02-02-19-10-25-2-1024x870.jpg"
                                                :style="{borderRadius: '12px'}"
                                            )
                                                v-container.fill-height.fluid.bottom-gradient
                                                    v-layout.row.wrap(align-center)
                                                        v-flex.xs12
                                                            span.title.font-weight-medium(v-html="event.post_title")
                                                        v-flex.shrink.pt-0
                                                            v-chip(dark small label color="secondary").ml-0.font-weight-medium.mr-3
                                                                | 14 мая 2019
                                                            v-chip(dark small color="success").green.ml-0.font-weight-medium
                                                                v-avatar(:size="`14px`").mr-2.pl-3
                                                                    v-icon(small) access_time
                                                                | 14:00 - 12:00
                                v-flex.xs12.py-0.text-xs-center(v-if="!eventsError")
                                    v-btn(flat small).caption Все мои события
                v-divider
                v-list(subheader)
                    v-subheader Действия
                    v-list-tile(@click.stop="openEditDialog" ripple)
                        v-list-tile-action
                            v-icon edit
                        v-list-tile-content
                            v-list-tile-title Редактировать профиль
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
                    v-list-tile(@click.stop="exitDialog = true" ripple)
                        v-list-tile-action
                            v-icon exit_to_app
                        v-list-tile-content
                            v-list-tile-title Выйти
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
    import moment from "moment"
    import {mapState} from 'vuex'
    import {AUTH_LOGOUT, AUTH_LOGIN, MODIFY_USER, FETCH_MY_EVENTS} from "../store/actions.type";
    export default {
        name: 'HomeAccount',
        data(){
            return {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                exitDialog: false,
                editDialog: false,
                userEditing: false,
                myEventsLoading: true,
                eventsError: false
            }
        },
        created(){
            this.getMyEvents()
        },
        computed: {
            ...mapState('auth',['user','isAuthenticated']),
            ...mapState('events',['myEvents']),
            alignContent(){
                return this.$vuetify.breakpoint.xsOnly ? 'align-end' : 'align-center'
            },
            role(){
                return this.user.role == 'administrator' ? 'Администратор' : 'Подписчик'
            },
            lastActiveEvents(){
                return this.myEvents.filter(event => true)
            }
        },
        methods: {
            logout(){
                this.$store.dispatch(`auth/${AUTH_LOGOUT}`)
            },
            auth() {
                const {email, password} = this
                this.$store.dispatch(`auth/${AUTH_LOGIN}`, {username: email, password})
                    .then(resp => {
                        this.$router.push('/')
                    })
                    .catch(err => {
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
            getMyEvents(){
                this.$store.dispatch(`events/${FETCH_MY_EVENTS}`)
                    .then(resp => {
                        this.myEventsLoading = false
                        this.eventsError = false
                    })
                    .catch(err => {
                        this.myEventsLoading = false
                        this.eventsError = err
                    })
            },
            getHumanDate(date,format = "LLL"){
                return moment(date).locale('ru').format(format)
            },
        }
    }
</script>

<style lang="scss">
    .event-link{
        text-decoration: none;
    }
    .bottom-gradient {
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100px);
    }
</style>