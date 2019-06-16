<template lang="pug">
    v-toolbar(app light tabs clipped color="#FFF" height="56px" prominent :scroll-off-screen="$vuetify.breakpoint.smAndDown").custom-elevation
        slot(name='slide-icon')
        v-scroll-x-transition(hide-on-leave)
            v-btn(icon @click.stop="$router.go(-1)")
                v-icon arrow_back
        v-toolbar-title(:class="{'ml-0':$vuetify.breakpoint.smAndDown}") {{$route.meta.title}}
        template(v-slot:extension)
            v-tabs(v-model="tabs" grow color="#FFF")
                v-tabs-slider(color="secondary")
                v-tab(:key="1") Все
                v-tab(:key="2") Предстоящие
                v-tab(:key="3") Завершенные
</template>

<script>
    export default {
        props: [],
        name: "AccountEventsToolbar",
        data() {
            return {
                activeTab: 0
            }
        },
        computed:{
            tabs:{
                set:function (newValue) {
                    this.$router.replace({query:{tab:newValue}})
                    this.activeTab = newValue;
                },
                get: function () {
                    return this.activeTab;
                }
            }
        },
        watch:{
            $route ({query}){
                this.activeTab = query['tab'];
            }
        }
    }
</script>

<style scoped>

</style>