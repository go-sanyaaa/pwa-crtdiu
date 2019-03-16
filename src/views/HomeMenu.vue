<template lang="pug">
    v-layout.row.wrap
        v-flex.xs12.sm8.offset-sm2
            v-card
                v-list(two-line)
                    v-list-tile(avatar)
                        v-list-tile-action
                            v-avatar(size='56px')
                                v-img(:src="user.avatar_urls['96']")
                        v-list-tile-content.ml-3
                            v-list-tile-title.font-weight-bold.text-upp
                                | {{user.last_name + ' ' + user.first_name}}
                            v-list-tile-sub-title.body-1.grey--text.text--darken-1 Подписчик
                    v-list-tile(ripple)
                        v-list-tile-action
                            v-icon alternate_email
                        v-list-tile-content
                            v-list-tile-title.body-2.grey--text.text--darken-2 {{user.username}}
                            v-list-tile-sub-title.caption.grey--text.text--lighten-1 Имя пользователя
                    v-divider(inset)
                    v-list-tile(ripple)
                        v-list-tile-action
                            v-icon(outlined) mail
                        v-list-tile-content
                            v-list-tile-title.body-2.grey--text.text--darken-2 {{user.email}}
                            v-list-tile-sub-title.caption.grey--text.text--lighten-1 Почтовый адрес
        v-flex.xs12.sm8.offset-sm2
            v-card
                v-list(subheader)
                    v-subheader Действия
                    v-list-tile(@click.stop="logout" ripple)
                        v-list-tile-action
                            v-icon exit_to_app
                        v-list-tile-content
                            v-list-tile-title Выйти
</template>

<script>
    import {mapGetters} from 'vuex'
    import {AUTH_LOGOUT} from "@/store/actions.type";

    export default {
        name: 'HomeMenu',
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            logout(){
                this.$store.dispatch(AUTH_LOGOUT)
                    this.$router.push({name: 'auth'})

            }
        }
    }
</script>