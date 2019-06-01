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
                v-btn.caption(color="grey" text) Забыли пароль?
                v-spacer
                v-btn.caption(color="accent" text) Создать аккаунт
    v-layout.row.wrap.ma-0.align-start(v-else)
        v-flex.xs12.sm8.offset-sm2.md6.offset-md3
            v-card(outlined)
                v-list(two-line)
                    v-list-item
                        v-list-item-action.mr-2
                            v-avatar(size='56px')
                                img(v-if="user.avatar_urls" :src="user.avatar_urls['96']")
                        v-list-item-content.ml-3
                            v-list-item-title.font-weight-bold.text-upp
                                | {{user.name}}
                            v-list-item-subtitle.body-1.grey--text.text--darken-1 {{role}}
                    v-list-item(ripple color="primary")
                        v-list-item-action
                            v-icon(outlined) alternate_email
                        v-list-item-content
                            template
                                v-list-item-title.body-2.grey--text.text--darken-2 {{user.email}}
                                v-list-item-subtitle.caption.grey--text.text--lighten-1 Почтовый адрес
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
                    v-list-item(@click.stop="exitDialog = true" ripple)
                        v-list-item-action
                            v-icon exit_to_app
                        v-list-item-content
                            v-list-item-title Выйти
                    v-dialog(v-model="exitDialog" max-width="400px")
                        v-card
                            v-toolbar(flat)
                                v-toolbar-title Подтвердите действие
                            v-card-text Вы действительно хотите выйти из учетной записи?
                            v-card-actions
                                v-btn(text @click="exitDialog = false") Отменить
                                v-spacer
                                v-btn(color="primary" depressed @click="logout") Выйти
                    v-divider(inset)
                    v-list-item(@click.stop="openEditDialog" ripple)
                        v-list-item-action
                            v-icon edit
                        v-list-item-content
                            v-list-item-title Редактировать профиль
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
                                v-btn(text @click="editDialog = false") Отменить
                                v-spacer
                                v-btn(color="primary" :loading="userEditing" depressed @click="edit") Редактировать
                    v-divider(inset)
                    v-list-item( ripple)
                        v-list-item-action
                            v-icon lock
                        v-list-item-content
                            v-list-item-title Сменить пароль
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
                return this.user.role == 'administrator' ? 'Администратор' : 'Подписчик'
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