import {
    FETCH_NEWS,
    LOAD_NEWS,
    UPDATE_FILTERS,
    CHANGE_PAGE,
    GET_RECORD,
    INIT_RECORDS, FETCH_RECORDS_CAT
} from "./actions.type";
import {LOAD_START, LOAD_END, SET_FILTERS, FETCH_END, SET_PAGE, SET_ERROR, SET_RECORDS_CAT} from "./mutations.type";
import ApiService, {NewsService} from "../common/api.service";

const state = {
    total: 0,
    isLoading: false,
    filters: {},
    pagination: {
        per_page: 10,
        page: 1
    },
    records: [],
    categories: [],
    errors: false
};

const mutations = {
    [LOAD_START](state){
        state.isLoading = true
    },
    [LOAD_END](state,{news = [],total = 0}){
        state.errors = false
        state.records = news || state.records
        state.total = total || state.total
        state.isLoading = false
    },
    [SET_FILTERS](state, data){
        state.filters = data;
    },
    [FETCH_END](state,data){
        state.errors = false
        state.records = [...state.records,...data]
        state.isLoading = false
    },
    [SET_PAGE](state,data){
        state.pagination.page = data
    },
    [SET_RECORDS_CAT](state,data){
        state.categories = data
    }
};

const actions = {
    [INIT_RECORDS](context){
        context.commit(LOAD_START);
        return Promise.all([
            context.dispatch(FETCH_RECORDS_CAT),
            context.dispatch(LOAD_NEWS)
        ]).then(resp => {
            return resp.every(({status}) => status === 200 )
        })
    },
    [LOAD_NEWS](context){
        context.commit(LOAD_START)
        const filters = context.state.filters
        const pagination = context.state.pagination
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
        const filters = context.state.filters
        const pagination = context.state.pagination
        NewsService.query({...filters,...pagination})
            .then(resp => {
                const news = resp.data
                context.commit(FETCH_END, news)
            })
    },
    [GET_RECORD](context,{id}){
        context.commit(LOAD_START)
        return Promise.all([
            ApiService.get(`wp/v2/posts/${id}`),
            context.dispatch(FETCH_RECORDS_CAT)
        ])
            .then(resp => {
                const {data} = resp[0]
                context.commit(LOAD_END,{})
                return data
            })
    },

    [FETCH_RECORDS_CAT](context){
        return new Promise((res,rej) => {
            ApiService.get('wp/v2/categories')
                .then(resp => {
                    context.commit(SET_RECORDS_CAT,resp.data)
                    res({status:resp.status,text: resp.statusText})
                })
                .catch(err => {
                    context.commit(SET_ERROR,`Не удалось загрузить данные с сервера: ${err.message}`)
                })
        })
    },

    [UPDATE_FILTERS](context,filters){
        context.commit(SET_FILTERS, filters)
        return context.dispatch(INIT_RECORDS)
    },
    [CHANGE_PAGE](context,page = ++context.state.pagination.page){
        context.commit(SET_PAGE,page)
        if(page === 1){
            context.dispatch(LOAD_NEWS)
        }else{
            context.dispatch(FETCH_NEWS)
        }
    }
};

const getters = {
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