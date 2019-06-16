<template lang="pug">
    div
        slot(:open="openDialog" v-on="on")
        v-dialog(v-model="dialog" :fullscreen="$vuetify.breakpoint.xsOnly" width="600px")
            v-card
                v-toolbar(color="secondary" dark flat)
                    v-toolbar-title Комментирование
                    v-spacer
                    v-btn(icon)
                        v-icon(@click="dialog = false") close
                v-card-text(v-html="`Комментирий к записи - ${post.title.rendered}`").caption
                v-divider
                v-card-text
                    v-layout(row wrap)
                        v-flex.xs12(v-if="Object.keys(comment).length > 0").comment-card.pa-3.mb-3
                            v-flex.xs12.pb-2
                                v-layout
                                    v-flex.shrink.pr-3
                                        v-avatar(size="36px")
                                            v-img(:src="comment.author_avatar_urls[96]")
                                    v-flex.grow
                                        strong {{comment.author_name}}
                                        br
                                        span {{getHumanDate(comment.date)}}
                            v-flex.xs12(v-html="comment.content.rendered").comment-content
                        v-flex.xs12.mb-3
                            v-alert(:value="error" type="error").custom-alert {{error}}
                        v-flex.xs12
                            v-textarea(box auto-grow label="Комментарий" rows="1" color="secondary" v-model="content")
                        v-flex.text-xs-right
                            v-btn(color="secondary" depressed @click="send" :loading="isSending").ma-0 Отправить
</template>

<script>
    import moment from "moment"
    import ApiService from "../common/api.service"

    export default {
        name: "appCommentsDialog",
        props: {
            post: {type: Object, required: true},
            comment: {type: Object, required: false, default: () => {return {}}},
        },
        data(){
            return {
                dialog: false,
                content: '',
                isSending: false,
                error: false
            }
        },
        methods:{
            openDialog(){
                this.dialog = true
            },
            getHumanDate(date){
                return moment(date).locale('ru').format('LLL')
            },
            send(){
                this.isSending = true
                const {content,post:{id: post}} = this
                const parent = Object.keys(this.comment).length > 0 ? this.comment.id : 0
                ApiService.post('wp/v2/comments',{post,parent,content})
                    .then(resp => {
                        console.log(resp)
                        this.isSending = false
                        this.error = false
                        this.content = ''
                        this.dialog = false
                        this.$emit('send',resp.data.status)
                    })
                    .catch(err => {
                        this.isSending = false
                        this.error = err.response.data.message
                    })
            }
        }
    }
</script>

<style scoped>

</style>