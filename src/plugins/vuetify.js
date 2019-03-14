import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
// import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    "primary": "#d50000",
    "secondary": "#03a9f4",
    "accent": "#ef5350",
    "error": "#FF5252",
    "info": "#2196F3",
    "success": "#4CAF50",
    "warning": "#FB8C00"
  }
})
