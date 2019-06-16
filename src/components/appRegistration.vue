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
                            v-alert(:value="errors.f1" :type="'error'").mb-3 {{errors.f1}}
                            v-form(@submit.prevent="checkMail" v-model="f1")
                                v-text-field(box :loading="loading.f1" color="blue" @input="inputEmail" :append-icon="success.email ? 'check_circle' : ''" :success="success.email" v-model="email" type="email" :rules="[rules.email,rules.required]" label="Электронная почта (e-mail) *" placeholder="pochta@mail.ru" required)
                                v-layout.row.justify-end
                                    v-btn(depressed type="submit" color="blue" dark :loading="loading.f1").mr-0 Далле
                        v-stepper-content(step="2")
                            p Заполните необходимые данные и нажмите далее, вы почти закончили.
                            v-form(@submit.prevent="f2 && e1++" v-model="f2")
                                v-text-field(box ref="first_name" v-model="first_name" color="blue" :success="first_name.length > 0" :append-icon="first_name ? 'check_circle' : ''" :rules="[rules.required]" :type="'text'" label="Ваше имя *" placeholder="Иван" required)
                                v-text-field(box ref="last_name" v-model="last_name" color="blue" :success="last_name.length > 0" :append-icon="last_name ? 'check_circle' : ''" :rules="[rules.required]" :type="'text'" label="Ваше фамилия *" placeholder="Иванов" required)
                                v-layout.row.justify-space-between
                                    v-btn(depressed color="grey" dark @click="e1--").ml-0 Назад
                                    v-btn(depressed type="submit" color="blue" dark).mr-0 Далле
                        v-stepper-content(step="3")
                            p Вам осталось придумать пароль.
                            v-form(@submit.prevent="registration" v-model="f3")
                                v-text-field(box v-model="password" color="blue" @click:append="showPassword = !showPassword" :append-icon="showPassword ? 'visibility' : 'visibility_off'" :rules="[rules.required,rules.passLength]" :success="password.length >= 8" :type="showPassword ? 'text' : 'password'" label="Пароль *" loading required)
                                    template(v-slot:progress)
                                        v-progress-linear(:value="passwordProgress" height="2" :color="passwordColor")
                                v-text-field(box v-model="rePassword" color="blue" :error-messages="password !== rePassword ? 'Введенные пароли не совпадают' : ''" :success="password === rePassword && password.length >=8" :append-icon="password === rePassword && password.length >=8 ? 'check_circle' : ''" :rules="[rules.required]" type="password" label="Повторите пароль *" required)
                                v-layout.row.justify-space-between
                                    v-btn(depressed color="grey" dark @click="e1--").ml-0 Назад
                                    v-btn(depressed color="blue" type="submit" dark :loading="loading.f3").mr-0 Завершить
                        v-stepper-content(step="4")
                            v-alert(v-if="status.type" :value="true" :type="status.type").mb-3 {{status.message}}
                            div.text-xs-right
                                v-btn(depressed color="secondary" dark @click="close").ml-0 Ок

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
                status: {
                    type: '',
                    message: ''
                },
                success: {
                    email: false
                },
                errors: {
                    f1:false,
                    f2:false,
                    f3:false
                },
                loading: {
                    f1: false,
                    f2: false,
                    f3: false,
                    f4: false
                },
                showPassword: false,
                email: '',
                first_name: '',
                last_name: '',
                password: '',
                rePassword: '',
                e1: '',
                dialog: false,
                rules: {
                    email: v => /.+@.+\..+/.test(v) || 'Электронная почта должна быть правильная.',
                    required: value => !!value || 'Это поле обязтельно.',
                    passLength: value => value.length >= 8 || 'Пароль должен содержать более 8 символов'
                }
            }
        },
        computed: {
            passwordProgress(){
                return Math.min(100, this.password.length * 12.5)
            },
            passwordColor(){
                return ['error', 'warning', 'success'][Math.floor(this.passwordProgress / 50)]
            }
        },
        methods:{
            openDialog(){
                this.dialog = true
            },
            checkMail(){
                if(!this.f1) return false

                const {email} = this;

                this.loading.f1 = true
                ApiService.get('/wp/v2/users/check_mail',{email: email})
                    .then(resp=>{
                        this.loading.f1 = false
                        if(resp.data.status){
                            throw new Error('Пользователь с таким адресом уже существует. Попробуйте другой или восстановите пароль.')
                        }else{
                            this.success.email = true
                            this.errors.f1 = false
                            var {nextForm} = this
                            setTimeout(nextForm,800)
                        }
                    })
                    .catch(err =>{
                        this.loading.f1 = false
                        this.errors.f1 = err.message;
                    })
            },
            nextForm(){
                this.e1++
            },
            inputEmail(){
                this.success.email = false
            },
            registration(){
                if(!this.f3) return false

                this.loading.f3 = true

                const {email,last_name,first_name,password} = this

                console.log({
                    username: email, first_name, last_name, password, email
                })

                ApiService.post("wp/v2/users/register",{
                    username: email, first_name, last_name, password, email
                }).then(resp => {
                    this.status.type = 'success';
                    this.status.message = resp.data.message;
                    this.loading.f3 = false
                    this.e1++
                }).catch(err => {
                    this.status.type = 'error';
                    this.status.message = err.response.data.message;
                    this.loading.f3 = false
                    this.e1++
                })
            },
            close(){
                this.first_name = ''
                this.last_name = ''
                this.email = ''
                this.password = ''
                this.rePassword = ''
                this.e1 = 1
                this.dialog = false
            }
        }
    }
</script>

<style scoped>

</style>