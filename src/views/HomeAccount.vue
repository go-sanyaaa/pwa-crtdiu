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
            v-card.elevation-24
                v-list(two-line)
                    v-list-tile(avatar)
                        v-list-tile-action
                            v-avatar(size='56px')
                                v-img(v-if="user.avatar_urls" :src="user.avatar_urls['96']")
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
                    v-subheader Ближайшие события с моим участием:
                    v-container
                        v-layout.row.wrap
                            v-flex.xs12
                                v-card(color="primary")
                v-divider
                v-list(subheader)
                    v-subheader Действия
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
                    v-divider(inset)
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
                    v-divider(inset)
                    v-list-tile( ripple)
                        v-list-tile-action
                            v-icon lock
                        v-list-tile-content
                            v-list-tile-title Сменить пароль
</template>

<script>
    import {mapGetters} from 'vuex'
    import {AUTH_LOGOUT, AUTH_LOGIN, MODIFY_USER} from "../store/actions.type";

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
                userEditing: false
            }
        },
        computed: {
            ...mapGetters({user: 'auth/user',isAuthenticated: 'auth/isAuthenticated'}),
            alignContent(){
                return this.$vuetify.breakpoint.xsOnly ? 'align-end' : 'align-center'
            },
            role(){
                return this.user.roles[0] == 'administrator' ? 'Администратор' : 'Подписчик'
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
            }
        }
    }
</script>