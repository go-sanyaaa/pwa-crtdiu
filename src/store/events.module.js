import ApiService from '../common/api.service'


import {
    FETCH_EVENTS,
    FETCH_EVENTS_CAT,
    FETCH_NEWS,
    LOAD_EVENTS,
    SUBSCRIBE_ON_EVENT,
    UNSUBSCRIBE_ON_EVENT
} from "./actions.type";
import {SET_EVENTS, SET_EVENTS_CAT, UPDATE_EVENT_SUBSCRIBE} from "./mutations.type";

const state = {
    events: [],
    categories: []
}

const getters = {
    catCount: state => state.categories.length,
    events: state =>  state.events,
    categories: state => state.categories,
    eventsCount: state => state.events.length,
}

const actions = {
    [LOAD_EVENTS](context){
        context.dispatch(FETCH_EVENTS_CAT)
        if(!context.getters.eventsCount){
            context.dispatch(FETCH_EVENTS)
        }
    },
    [FETCH_EVENTS](context,params = {}){
        return new Promise((res,rej) => {
            ApiService.get('wp/v2/events',params)
                .then(resp => {
                    context.commit(SET_EVENTS,resp.data)
                    res({status:resp.status,text: resp.statusText})
                })
        })
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
        return new Promise((res,rej) => {
            ApiService.post(`wp/v2/events/${event_id}`)
                .then(resp => {
                    const {data} = resp
                    if(data.status){
                        context.commit(UPDATE_EVENT_SUBSCRIBE,{event_id})
                    }
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
                })
        })
    }
}

const mutations = {
    [SET_EVENTS](state,data){
        const events = data
        state.events = [...state.events,...events]
    },
    [SET_EVENTS_CAT](state,data){
        const cats = data;
        state.categories = cats
    },
    [UPDATE_EVENT_SUBSCRIBE](state,data){
        const {event_id} = data
        const event_i = state.events.findIndex(event => event.id === event_id)
        state.events[event_i].is_register = !state.events[event_i].is_register
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}