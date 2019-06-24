const defaults = {
    title: '',
    layout: 'DefaultLayout'
}

export default {
    namespaced: true,

    state: Object.assign({},defaults),

    mutations: {
        updateTitle(state,title){
            state.title = title
        },
    },

    actions: {
        updateTitle({commit}, title){
            commit('updateTitle',title)
        },
    }
}