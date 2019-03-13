import JwtService from '@/common/jwt.service'
import ApiService from '@/common/api.service'

import {AUTH_LOGIN, AUTH_LOGOUT, UPDATE_USER, CHECK_TOKEN} from "@/store/actions.type";
import {SET_TOKEN, PURGE_AUTH, SET_USER} from "@/store/mutations.type";

const state = {
    isAuthenticated: !!JwtService.getToken(),
    token: '',
    user: {}
}

const getters = {
    isAuthenticated(state) {
        return state.isAuthenticated;
    }
}

const mutations = {
    [SET_TOKEN](state, token){
        state.token = token;
        state.isAuthenticated = true
    },
    [SET_USER](state, user){
        state.user = user;
    },
    [PURGE_AUTH](state){
        state.token = ''
        state.user = {}
        JwtService.destroyToken()
    }
}

const actions = {
    [AUTH_LOGIN](context,payload){
        return new Promise((res,rej)=>{
            ApiService.post('jwt-auth/v1/token',{username:'admin',password:'Sasha2403271997'})
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
        })
    },
    [UPDATE_USER](context){
        return new Promise((res,rej)=>{
            ApiService.post('wp/v2/users/me')
                .then(resp => {
                    const {id,first_name,last_name,email} = resp.data;
                    const user = {
                        id,
                        first_name,
                        last_name,
                        email
                    }
                    context.commit(SET_USER,user)
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
                    rej(err)
                })
        })
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}