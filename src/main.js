import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
// import Vuetify from 'vuetify'
import ApiService from './common/api.service'
import JwtService from '@/common/jwt.service'
import {CHECK_TOKEN, UPDATE_USER} from "./store/actions.type";
//
// Vue.use(Vuetify)

ApiService.init()

if(JwtService.getToken()){
  store.dispatch(`auth/${CHECK_TOKEN}`,JwtService.getToken()).then(resp => {
    store.dispatch(`auth/${UPDATE_USER}`)
  })
}

router.beforeEach((to,from,next) => {
  const {title} = to.meta;
  store.dispatch('common/updateTitle',title)
  next()
  // console.log(to)
  // if(to.matched.some(record => record.meta.requiresAuth)){
  //   if(!store.getters.isAuthenticated){
  //     next({
  //       name: 'auth',
  //       query: {redirect: to.fullPath}
  //     })
  //   }else{
  //     next()
  //   }
  // }else {
  //   next()
  // }
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
