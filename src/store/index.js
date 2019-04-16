import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth.module'
import common from './common.module'
import news from './news.module'
import events from '@/store/events.module'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        common, auth, news, events
    }
})
