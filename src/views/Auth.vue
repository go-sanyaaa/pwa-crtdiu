<template lang="pug">
    v-app#inspire
        v-content
            v-container
                v-layout(column wrap align-content-center justify-center)
                    v-flex(mb-3)
                        v-img(
                            :src="require('../assets/logo.png')"
                            height="200"
                            contain
                        )
                    v-flex(xs-5 shrink body-2 mb-3 text-xs-center) Личный кабинет ЦРТДиЮ
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
                this.$store.dispatch(AUTH_LOGIN, {username, password}).then(() => {
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
    }
</script>

<style scoped>

</style>