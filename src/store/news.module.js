import {FETCH_NEWS, LOAD_NEWS, UPDATE_FILTERS, CHANGE_PAGE, LOAD_EVENTS, GET_RECORD} from "./actions.type";
import {LOAD_START, LOAD_END, SET_FILTERS, FETCH_END, SET_PAGE} from "./mutations.type";
import ApiService, {NewsService} from "../common/api.service";

const state = {
    total: 0,
    isLoading: false,
    filters: {},
    pagination: {
        per_page: 10,
        page: 1
    },
    records: []
};

const mutations = {
    [LOAD_START](state){
        state.isLoading = true
    },
    [LOAD_END](state,{news = [],total = 0}){
        state.records = news || state.records
        state.total = total || state.total
        state.isLoading = false
    },
    [SET_FILTERS](state, data){
        state.filters = data;
    },
    [FETCH_END](state,data){
        state.records = [...state.records,...data]
        state.isLoading = false
    },
    [SET_PAGE](state,data){
        state.pagination.page = data
    }
};

const actions = {
    [LOAD_NEWS](context){
        context.commit(LOAD_START)
        const filters = context.getters.filters
        const pagination = context.getters.pagination
        pagination.page = 1
        return NewsService.query({...filters,...pagination})
            .then(resp => {
                const news = resp.data
                const total = Number(resp.headers['x-wp-total'])
                context.commit(LOAD_END,{news,total})
                return {status:resp.status,text: resp.statusText}
            })
    },
    [FETCH_NEWS](context){
        context.commit(LOAD_START)
        const filters = context.getters.filters
        const pagination = context.getters.pagination
        NewsService.query({...filters,...pagination})
            .then(resp => {
                const news = resp.data
                context.commit(FETCH_END, news)
            })
    },
    [GET_RECORD](context,{id}){
        context.commit(LOAD_START)
        return ApiService.get(`wp/v2/posts/${id}`)
            .then(resp => {
                const {data} = resp
                context.commit(LOAD_END,{})
                return data
            })
    },

    [UPDATE_FILTERS](context,filters){
        context.commit(SET_FILTERS, filters)
        return context.dispatch(LOAD_NEWS)
    },
    [CHANGE_PAGE](context,page = ++context.getters.pagination.page){
        context.commit(SET_PAGE,page)
        if(page === 1){
            context.dispatch(LOAD_NEWS)
        }else{
            context.dispatch(FETCH_NEWS)
        }
    }
};

const getters = {
    records: state => state.records,
    isLoading: state => state.isLoading,
    total: state => state.total,
    filters: state => state.filters,
    pagination: state => state.pagination,
    newsById: state => id =>  {
        return state.records.find(news => news.id === Number(id))
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}