import ApiService from '../common/api.service'
import moment from "moment"

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
    UPDATE_EVENT_SUBSCRIBE, LOAD_START, LOAD_END, FETCH_END, FETCH_START, SET_FILTERS, SET_PAGE, SET_MY_EVENTS, SET_ERROR, UPDATE_EVENTS_SUBSCRIBES, RESET_EVENTS_SUBSCRIBES
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
    myEvents: [],
    errors: false
}

const getters = {
    eventById: state => id =>  state.records.find(event => event.id === Number(id)),
    completedEvents: state => state.records.filter(event => moment().isAfter(event.event_date_end)),
    upcomingEvents: state => state.records.filter(event => !moment().isAfter(event.event_date_end))
}

const actions = {
    [GET_RECORD](context,{id}){
        context.commit(LOAD_START)
        return Promise.all([
            ApiService.get(`wp/v2/events/${id}`),
            context.dispatch(FETCH_EVENTS_CAT)
        ])
            .then(resp => {
                const {data} = resp[0]
                context.commit(LOAD_END,{})
                return data
            })
    },
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
        context.commit(LOAD_START)
        context.commit(SET_PAGE,1)
        const filters = context.state.filters
        const pagination = context.state.pagination

        return new Promise((res,rej) => {
            ApiService.get('wp/v2/events',{...filters,...pagination})
                .then(resp => {
                    const total = Number(resp.headers['x-wp-total']);
                    const records = resp.data;
                    context.commit(LOAD_END,{records,total});
                    res({status:resp.status,text: resp.statusText})
                })
                .catch(err => {
                    context.commit(SET_ERROR,`Не удалось загрузить данные с сервера: ${err.message}`)
                })
        })
    },

    [FETCH_EVENTS](context){
        context.commit(LOAD_START);
        const filters = context.state.filters
        const pagination = context.state.pagination
        context.commit(SET_PAGE,++pagination.page)
        return new Promise((res,rej) => {
            ApiService.get('wp/v2/events',{...filters,...pagination})
                .then(resp => {
                    const records = resp.data;
                    context.commit(FETCH_END,{records})
                    res({status:resp.status,text: resp.statusText})
                })
                .catch(err => {
                    context.commit(SET_ERROR,`Не удалось загрузить данные с сервера: ${err.message}`)
                })
        })
    },

    [FETCH_MY_EVENTS]({commit}){
        return new Promise((res,rej) => {
            ApiService.get('wp/v2/users/me/events')
                .then(resp => {
                    const {data} = resp
                    if(data.length == 0){
                        commit(SET_MY_EVENTS,[])
                        rej({message: 'Вы не записаны ни на одно мероприятие'})
                    }
                    commit(SET_MY_EVENTS,data)
                    commit(UPDATE_EVENTS_SUBSCRIBES,data.map(val => Number(val.ID)))
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
                .catch(err => {
                    context.commit(SET_ERROR,`Не удалось загрузить данные с сервера: ${err.message}`)
                })
        })
    },
    [SUBSCRIBE_ON_EVENT](context,event_id){
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
        return new Promise((res,rej) => {
            ApiService.delete(`wp/v2/events/${event_id}`)
                .then(resp => {
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
    [LOAD_END](state,{records = [], total = 0}){
        state.errors = false
        state.total = total || state.total;
        state.records = records || state.records;
        state.isLoading = false;
    },

    [FETCH_END](state,{records}){
        state.errors = false
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

    [UPDATE_EVENTS_SUBSCRIBES](state,data){
        state.records = state.records.map(event => {
            event.is_register = data.indexOf(event.id) != -1
            return event
        })
    },

    [RESET_EVENTS_SUBSCRIBES](state){
        state.records = state.records.map(event => {
            event.is_register = false
            return event
        })
    },

    [SET_MY_EVENTS](state,data){
        state.myEvents = data
    },

    [SET_ERROR](state,data){
        state.isLoading = false
        state.errors = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}