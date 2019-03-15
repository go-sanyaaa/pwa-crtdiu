<template lang="pug">
    v-app#inspire
        v-content
            v-container.fluid.fill-height
                v-layout(align-center justify-center)
                    v-flex.xs12.sm8.md4
                        v-card.elevation-0
                            v-avatar(:size="30" tile)
                                img( :src="require('../assets/logo.png')")
                            .font-weight-black
                                | ЦРТДиЮ
                            v-alert(v-if="errors" :value="errors" type="error")
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
            }
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