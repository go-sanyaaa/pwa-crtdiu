import JwtService from '../common/jwt.service'
import ApiService from '../common/api.service'

import {AUTH_LOGIN, AUTH_LOGOUT, UPDATE_USER, CHECK_TOKEN, MODIFY_USER} from "./actions.type";
import {SET_TOKEN, PURGE_AUTH, SET_USER, SET_ERROR} from "./mutations.type";

const state = {
    isAuthenticated: !!JwtService.getToken(),
    token: '',
    user: {},
}

const getters = {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user
}

const mutations = {
    [SET_TOKEN](state, token){
        state.token = token;
        state.isAuthenticated = true
    },
    [SET_USER](state, user){
        state.user = user;
        state.errors = false
    },
    [PURGE_AUTH](state){
        state.token = ''
        state.user = {}
        state.errors = false
        state.isAuthenticated = false
        JwtService.destroyToken()
    }
}

const actions = {
    [AUTH_LOGIN](context,user){
        const {username, password} = user
        return new Promise((res,rej)=>{
            ApiService.post('jwt-auth/v1/token',{username,password})
                .then(resp => {
                    const token = resp.data.token;
                    context.commit(SET_TOKEN,token)
                    JwtService.saveToken(token)
                    ApiService.setHeader()
                    context.dispatch(UPDATE_USER)
                        .then(resp => {
                            res(resp)
                        })
                })
                .catch(err => {
                    rej({status:err.response.status,errors: "П"})
                })
        })
    },
    [UPDATE_USER](context){
        return new Promise((res,rej)=>{
            ApiService.post('wp/v2/users/me')
                .then(resp => {
                    const {id,name,email, avatar_urls, first_name, last_name, roles} = resp.data;
                    context.commit(SET_USER,{
                        id,
                        email,
                        name,
                        avatar_urls,
                        role: roles[0],
                        first_name,
                        last_name
                    })
                    res(resp)
                })
        })
    },
    [MODIFY_USER](context,params){
        return new Promise((res,rej) => {
            ApiService.post('wp/v2/users/me',params)
                .then(resp => {
                    const {id,name,email, avatar_urls, first_name, last_name, roles} = resp.data;
                    context.commit(SET_USER,{
                        id,
                        email,
                        name,
                        avatar_urls,
                        roles,
                        first_name,
                        last_name
                    })
                    res(resp)
                })
        })
    },
    [CHECK_TOKEN](context, token){
        return new Promise((res,rej) => {
            ApiService.setHeader()
            ApiService.post('jwt-auth/v1/token/validate')
                .then(resp => {
                    context.commit(SET_TOKEN,token)
                    res(resp)
                })
                .catch(err => {
                    context.commit(PURGE_AUTH)
                })
        })
    },
    [AUTH_LOGOUT](context){
        return new Promise((res,rej) => {
            context.commit(PURGE_AUTH)
            res()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}