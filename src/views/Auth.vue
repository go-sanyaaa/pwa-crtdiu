<template lang="pug">
    v-app#inspire
        v-content
            v-container.fluid.fill-height
                v-layout(align-center justify-center)
                    v-flex.xs12.sm8.md4
                        v-card.elevation-24
                            v-toolbar(card color="#FFF" flat height="52")
                                v-avatar(:size="30" tile)
                                    img( :src="require('../assets/logo.png')")
                                v-toolbar-title
                                    | ЦРТДиЮ
                            v-flex(v-if="errors" xs-5 shrink)
                                ul
                                    li(v-for="(error,i) in errors" :key="`auth-error-${i}`")
                                        p(v-html="error")
                            v-flex(xs-5 shrink)
                                v-form
                                    v-card-text
                                        v-text-field(label="Логин" round type="text" v-model="username")
                                        v-text-field(label="Пароль" type="password" v-model="password")
                                        v-btn(color="primary" depressed round @click="auth") Войти
                                        v-btn(color="red" dark depressed round) Регистрация
</template>

<script>
    // import {myLoginRoutine} from "@/api/auth"
    import {mapState} from 'vuex'
    import {AUTH_LOGIN} from "@/store/actions.type";

    export default {
        name: "Auth",
        data: function () {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            auth() {
                const {username, password} = this
                this.$store.dispatch(AUTH_LOGIN, {username, password})
                    .then(() => {
                        this.$router.push('/')
                    })
            },
            // logout() {
            //     this.$store.dispatch(AUTH_LOGOUT)
            //         .then(() => {
            //             this.$router.push('/auth')
            //         })
            // }
        },
        computed: {
            ...mapState({
                errors: state => state.auth.errors
            })
        }
    }
</script>

<style scoped>

</style>