<template lang="pug">
    v-card.elevation-0.custom-card
        v-snackbar(v-model="snackbar" :timeout="3000" :multi-line="$vuetify.breakpoint.smAndDown" color="success" :top="true").mt-2
            | Комментарий успешно добавлен
            v-btn(flat @click="snackbar = false") ОК
        v-toolbar(flat)
            v-toolbar-title.font-weight-light Комментарии
        v-divider
        v-card-text
            v-layout(row wrap)
                v-flex.xs12.px-0.pt-0
                    template(v-if="isAuthenticated")
                        app-comments-dialog(v-slot="data" @send="commentSended" :post="post")
                            v-btn(block depressed large color="secondary" @click="data.open" :ripple="{ center: true }").pa-0.mx-0.mt-2.custom-rounded
                                v-icon(left) add_comment
                                | Добавить комментарий
                    template(v-else)
                        v-alert(:value="true" type="info").custom-alert Оставлять комментарии может только авторизованный пользователь!
                v-flex.xs12.pa-2.mb-2(v-if="comments.length == 0")
                    span.subheading.font-weight-light Нет комментариев. Станьте первым!
                v-flex.xs12(v-for="comment in commentsTree" :key="`comment-id-${comment.id}`").mb-2.comment-card
                    v-flex.xs12.pb-0
                        v-layout
                            v-flex.shrink
                                v-avatar(size="36px")
                                    v-img(:src="comment.author_avatar_urls[96]")
                            v-flex.grow
                                strong {{comment.author_name}}
                                br
                                span {{getHumanDate(comment.date)}}
                            app-comments-dialog(v-slot="data" @send="commentSended" v-bind="{comment,post}").d-flex.shrink
                                v-btn(icon small @click="data.open" ).ma-0
                                    v-icon(color="grey" small) reply
                    v-flex.xs12(v-html="comment.content.rendered").comment-content
                    template(v-if="comment.children && comment.children.length")
                        v-flex.xs12.pb-0.inner-comment(v-for="childComment in comment.children" :key="`comment-id-${childComment.id}`")
                            v-flex.xs12.pb-0
                                v-layout
                                    v-flex.shrink
                                        v-avatar(size="36px")
                                            v-img(:src="childComment.author_avatar_urls[96]")
                                    v-flex.grow
                                        strong {{childComment.author_name}}
                                        br
                                        span {{getHumanDate(comment.date)}}
                            v-flex.xs12(v-html="childComment.content.rendered").comment-content
</template>

<script>
    import ApiService from "../common/api.service"
    import moment from 'moment'
    import {mapState} from 'vuex'
    import AppCommentsDialog from "./appCommentsDialog";

    export default {
        name: "appComments",
        components: {AppCommentsDialog},
        props: {
            post: {
                type: Object,
                required: true
            }
        },
        data(){
            return {
                comments: [],
                snackbar: false
            }
        },
        computed: {
            ...mapState('auth',['isAuthenticated']),
            commentsTree(){
                const comments = this.comments

                let commentsTree = []
                let commentsKey = []

                let i = 0
                for(;i < comments.length; i++){
                    let item = comments[i]
                    item.children = []
                    if(!item.parent){
                        commentsTree.push(item)
                        commentsKey[item.id] = i
                    }else {
                        let parentKey = commentsKey[item.parent]
                        commentsTree[parentKey].children.push(item)
                    }
                }
                return commentsTree
            }
        },
        methods: {
            loadComments(){
                const {post:{id}} = this
                ApiService.get('wp/v2/comments/',{
                    post: id,
                    orderby: 'parent',
                    per_page: 100,
                    order: 'asc'
                })
                .then(resp => {
                    this.comments = resp.data
                })
            },
            getHumanDate(date){
                return moment(date).locale('ru').format('LLL')
            },
            commentSended(){
                this.snackbar = true
                this.loadComments()
            }
        },
        created() {
            this.loadComments()
        }
    }
</script>

<style scoped>

</style>