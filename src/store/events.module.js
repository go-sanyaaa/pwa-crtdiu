import ApiService from '../common/api.service'


import {
    GET_RECORD,
    FETCH_EVENTS,
    FETCH_EVENTS_CAT,
    LOAD_EVENTS,
    SUBSCRIBE_ON_EVENT,
    UNSUBSCRIBE_ON_EVENT,
    INIT_RECORDS,
    UPDATE_FILTERS,
    FETCH_MY_EVENTS
} from "./actions.type";

import {
    SET_EVENTS_CAT,
    UPDATE_EVENT_SUBSCRIBE, LOAD_START, LOAD_END, FETCH_END, FETCH_START, SET_FILTERS, SET_PAGE, SET_MY_EVENTS
} from "./mutations.type";

const state = {
    total: 0,
    isLoading: false,
    filters: {},
    pagination: {
        per_page: 10,
        page: 1
    },
    categories: [],
    records: [],
    myEvents: []
}

const getters = {
    catCount: state => state.categories.length,
    records: state =>  state.records,
    categories: state => state.categories,
    total: state => state.total,
    isLoading: state => state.isLoading,
    filters: state => state.filters,
    pagination: state => state.pagination,
    myEvents: state => state.myEvents,
}

const actions = {
    // [GET_RECORD](context,params){
    //     const {event_id} = params;
    //     return new Promise((res,rej)=>{
    //         ApiService.get(`wp/v2/events/${event_id}`)
    //             .then(resp => {
    //                 context.commit(SET_EVENT,resp.data)
    //                 res({status:resp.status,text: resp.statusText})
    //             })
    //     })
    // },
    [INIT_RECORDS](context){
        context.commit(LOAD_START);
        return Promise.all([
            context.dispatch(FETCH_EVENTS_CAT),
            context.dispatch(LOAD_EVENTS)
        ]).then(resp => {
            return resp.every(({status}) => status === 200 )
        })
    },
    [LOAD_EVENTS](context){
        context.commit(FETCH_START)
        context.commit(SET_PAGE,1)
        const filters = context.getters.filters
        const pagination = context.getters.pagination

        return new Promise((res,rej) => {
            ApiService.get('wp/v2/events',{...filters,...pagination})
                .then(resp => {
                    const total = Number(resp.headers['x-wp-total']);
                    const records = resp.data;
                    context.commit(LOAD_END,{records,total});
                    res({status:resp.status,text: resp.statusText})
                })
        })
    },

    [FETCH_EVENTS](context,params = {}){
        context.commit(FETCH_START);
        const filters = context.getters.filters
        const pagination = context.getters.pagination
        context.commit(SET_PAGE,++pagination.page)
        return new Promise((res,rej) => {
            ApiService.get('wp/v2/events',{...filters,...pagination})
                .then(resp => {
                    const records = resp.data;
                    context.commit(FETCH_END,{records})
                    res({status:resp.status,text: resp.statusText})
                })
        })
    },

    [FETCH_MY_EVENTS]({commit},data = {}){
        const {params} = data
        return new Promise((res,rej) => {
            ApiService.get('wp/v2/users/me/events',params)
                .then(resp => {
                    const {data} = resp
                    if(data.status == false){
                        commit(SET_MY_EVENTS,[])
                        rej(data)
                    }
                    commit(SET_MY_EVENTS,data)
                    res()
                })
        })
    },

    [UPDATE_FILTERS](context,filters){
        context.commit(SET_FILTERS, filters)
        return context.dispatch(LOAD_EVENTS)
    },

    [FETCH_EVENTS_CAT](context){
        return new Promise((res,rej) => {
            ApiService.get('wp/v2/event_cat')
                .then(resp => {
                    context.commit(SET_EVENTS_CAT,resp.data)
                    res({status:resp.status,text: resp.statusText})
                })
        })
    },
    [SUBSCRIBE_ON_EVENT](context,event_id){
        console.log(`Subscribe on ${event_id}`)
        return new Promise((res,rej) => {
            ApiService.post(`wp/v2/events/${event_id}`)
                .then(resp => {
                    const {data} = resp
                    if(data.status){
                        context.commit(UPDATE_EVENT_SUBSCRIBE,{event_id})
                    }
                    res(data)
                })
        })
    },
    [UNSUBSCRIBE_ON_EVENT](context,event_id){
        console.log(`unSubscribe on ${event_id}`)
        return new Promise((res,rej) => {
            ApiService.delete(`wp/v2/events/${event_id}`)
                .then(resp => {
                    console.log(resp)
                    const {data} = resp
                    if(data.status){
                        context.commit(UPDATE_EVENT_SUBSCRIBE,{event_id})
                    }
                    res(data)
                })
        })
    },
}

const mutations = {
    [LOAD_START](state){
        state.isLoading = true
    },
    [LOAD_END](state,{records, total}){
        state.total = total;
        state.records = records;
        state.isLoading = false;
    },

    [FETCH_START](state){
        state.isLoading = true
    },
    [FETCH_END](state,{records}){
        state.records = [...state.records,...records];
        state.isLoading = false
    },

    [SET_FILTERS](state, data){
        state.filters = {...data};
    },

    [SET_EVENTS_CAT](state,data){
        state.categories = data
    },

    [SET_PAGE](state,data){
        state.pagination.page = data
    },

    [UPDATE_EVENT_SUBSCRIBE](state,data){
        const {event_id} = data
        const event_i = state.records.findIndex(event => event.id === event_id)
        state.records[event_i].is_register = !state.records[event_i].is_register
    },

    [SET_MY_EVENTS](state,data){
        state.myEvents = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}