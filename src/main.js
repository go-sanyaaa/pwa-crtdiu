import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
// import Vuetify from 'vuetify'
import ApiService from '@/common/api.service'
import JwtService from '@/common/jwt.service'
import {CHECK_TOKEN, UPDATE_USER} from "@/store/actions.type";
//
// Vue.use(Vuetify)

ApiService.init()

if(JwtService.getToken()){
  store.dispatch(CHECK_TOKEN,JwtService.getToken()).then(resp => {
    store.dispatch(UPDATE_USER)
  })
}

router.beforeEach((to,from,next) => {
  const {title, layout} = to.meta;
  next()
  store.dispatch('common/updateTitle',title)

  // if(to.matched.some(record => record.meta.requiresAuth)){
  //   if(!store.getters.isAuthenticated){
  //     next({
  //       name: 'auth',
  //       // query: {redirect: to.fullPath}
  //     })
  //   }else{
  //     next()
  //   }
  // }else {
  //   if(to.meta.authClosed && store.getters.isAuthenticated){
  //     next({
  //       name: 'home'
  //     })
  //   }else {
  //     next()
  //   }
  // }
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
