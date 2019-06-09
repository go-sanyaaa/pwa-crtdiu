<template lang="pug">
    div(:style="{display: 'inline-block'}")
        slot(:open="openDialog"  v-on="on")
        v-dialog(width="500" v-model="dialog" :fullscreen="$vuetify.breakpoint.xsOnly")
            v-card
                v-toolbar(flat color="primary" dark)
                    v-toolbar-title Регистрация
                    v-spacer
                    v-btn(icon @click="dialog = false")
                        v-icon(close) close
                v-stepper(v-model="e1").elevation-0.custom-elevation
                    v-stepper-header.elevation-0.custom-elevation
                        v-stepper-step(:complete="e1 > 1" step="1")
                        v-divider
                        v-stepper-step(:complete="e1 > 2" step="2")
                        v-divider
                        v-stepper-step(:complete="e1 > 3" step="3")
                    v-stepper-items
                        v-stepper-content(step="1")
                            p Заполните необходимые данные и нажмите далее
                            v-form(@submit.prevent="checkMail" v-model="f1")
                                v-text-field(outline v-model="email" type="email" :rules="emailRules" label="Электронная почта (e-mail) *" placeholder="pochta@mail.ru" required)
                                v-layout.row.justify-end
                                    v-btn(depressed type="submit" color="blue" dark).mr-0 Далле
                        v-stepper-content(step="2")
                            p Заполните необходимые данные и нажмите далее, вы почти закончили.
                            v-form(@submit.prevent="f2 && e1++" v-model="f2")
                                v-text-field(outline v-model="first_name" label="Ваше имя *" placeholder="Иван" required)
                                v-text-field(outline v-model="last_name" label="Ваше фамилия *" placeholder="Иванов" required)
                                v-layout.row.justify-space-between
                                    v-btn(depressed color="grey" dark @click="e1--").ml-0 Назад
                                    v-btn(depressed color="blue" type="submit" dark @click="e1++").mr-0 Далле
                        v-stepper-content(step="3")
                            p Вам осталось придумать пароль.
                            v-form(@submit.prevent="f3" v-model="f2")
                                v-text-field(outline v-model="password" type="password" label="Пароль *")
                                v-text-field(outline v-model="rePassword" type="password" label="Повторите пароль *")
                                v-layout.row.justify-space-between
                                    v-btn(depressed color="grey" dark @click="e1--").ml-0 Назад
                                    v-btn(depressed color="blue" type="submit" dark @click="e1++").mr-0 Завершить

</template>

<script>
    import ApiService from "../common/api.service";

    export default {
        name: "appRegistration",
        data(){
            return {
                f1: false,
                f2: false,
                f3: false,
                email: '',
                first_name: '',
                last_name: '',
                password: '',
                rePassword: '',
                e1: '',
                dialog: false,
                emailRules: [
                    v => !!v || 'Это поле обязательно',
                    v => /.+@.+/.test(v) || 'Электронная почта должна быть правильная'
                ]
            }
        },
        methods:{
            openDialog(){
                this.dialog = true
            },
            checkMail(){
                const {email} = this;
                ApiService.get('/wp/v2/users',{search: email})
                    .then(resp=>{
                        // return resp.data.length ? throw "Error" : this.e1++;
                    })
                    .catch(err =>{
                        console.log('Что то пошло не так')
                    })
            }
        }
    }
</script>

<style scoped>

</style>