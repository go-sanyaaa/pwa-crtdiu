import {FETCH_NEWS, LOAD_NEWS} from "./actions.type";
import {FETCH_START, FETCH_END} from "./mutations.type";
import {NewsService} from "../common/api.service";

const defaults = {
    isLoading: false,
    news: []
}

export default {
    state: Object.assign({},defaults),

    mutations: {
        [FETCH_START](state){
            state.isLoading = true
        },
        [FETCH_END](state,news){
            state.news = news
            state.isLoading = false
        }
    },

    actions: {
        [LOAD_NEWS](context){
            if(!context.getters.newsCount){
                context.dispatch(FETCH_NEWS)
            }
        },
        [FETCH_NEWS]({commit}){
            commit(FETCH_START)
            NewsService.query()
                .then(resp => {
                    const news = resp.data
                    commit(FETCH_END,news)
                })
        }
    },

    getters: {
        news(state){
            return state.news
        },
        isLoading(state){
            return state.isLoading
        },
        newsCount(state){
            return state.news.length
        }
    }
}