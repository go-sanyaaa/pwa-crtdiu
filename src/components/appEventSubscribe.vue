<template lang="pug">
    div(:style="{display: 'inline-block'}" v-show="!completed")
        slot(:open="openDialog"  v-on="on")
        v-snackbar(v-model="snackbar" :timeout="3000" :multi-line="$vuetify.breakpoint.smAndDown" :color="color" :top="true")
            | {{text}}
            v-btn(flat @click="snackbar = false") ОК
        v-dialog(width="500" v-model="dialog")
            template(v-if="isAuthenticated")
                v-card(v-if="!event.is_register")
                    v-toolbar(flat light)
                        v-toolbar-title Подтверждение участия
                    v-divider
                    v-card-text
                        | Вы действительно хотите принять участие?
                        br
                        | Мероприятие - {{event.title.rendered}}  состоится {{getHumanDate(event.event_date,"LL")}}
                    v-divider
                    v-card-actions
                        v-btn.caption(@click="dialog = false" flat) Закрыть
                        v-spacer
                        v-btn.caption(color="green" depressed dark @click="subscribe") Подтверждаю
                v-card(v-else)
                    v-toolbar(flat dark color="green")
                        v-toolbar-title Вы учавствуете!
                    v-divider
                    v-card-text
                        | В данный момент вы зарегистрированны на мероприятие.
                        br
                        | Вы действительно хотите отменить эту запись?
                    v-divider
                    v-card-actions
                        v-btn.caption(@click="dialog = false" flat) Закрыть
                        v-spacer
                        v-btn.caption(color="accent" depressed @click="unSubscribe") Отменить запись!
            template(v-else)
                v-card(color="error" dark)
                    v-card-text
                        | Принять участие может только авторизованный пользователь!
                        br
                        | Войдити в свою учетную запись или создйте новую.
                    v-divider(light)
                    v-card-actions
                        v-btn.caption(color="#FFF" flat @click="dialog = false") Отмена
                        v-spacer
                        v-btn(depressed color="#FFF" outline :to="{ name: 'account'}") Войти
</template>

<script>
    import {checkEvent} from "./mixins/events";
    import {SUBSCRIBE_ON_EVENT,UNSUBSCRIBE_ON_EVENT} from "../store/actions.type";
    import moment from "moment"
    import {mapState} from "vuex"

    export default {
        props: ['event'],
        name: "appEventSubscribe",
        data(){
            return {
                dialog: false,
                snackbar: false,
                color: '',
                text: ''
            }
        },
        computed:{
            ...mapState('auth',['isAuthenticated']),
        },
        methods: {
            openDialog(){
                this.dialog = true
            },
            getHumanDate(date,format = "LLL"){
                return moment(date).locale('ru').format(format)
            },
            subscribe(){
                this.dialog = false;
                this.loading = true;
                const {id} = this.event;
                this.$store.dispatch(`events/${SUBSCRIBE_ON_EVENT}`,id)
                    .then((data) => {
                        this.loading = false
                        this.color = 'success'
                        this.text = 'Вы успешно записаны на мероприятие'
                        this.snackbar = true
                        this.$emit('updated',data)
                    })
            },
            unSubscribe(){
                this.dialog = false;
                this.loading = true;
                const {id} = this.event;
                this.$store.dispatch(`events/${UNSUBSCRIBE_ON_EVENT}`,id)
                    .then((data) => {
                        this.color = 'error'
                        this.text = 'Запись на мероприятие отменена'
                        this.snackbar = true
                        this.$emit('updated',data)
                    })
            }
        },
        mixins: [checkEvent]
    }
</script>

<style scoped>

</style>