import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ApiService from './common/api.service'
import JwtService from './common/jwt.service'
import {CHECK_TOKEN, UPDATE_USER} from "./store/actions.type";


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
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
