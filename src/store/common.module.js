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
        updateLayout(state,layout){
            state.layout = layout
        },
    },

    actions: {
        updateTitle({commit}, title){
            commit('updateTitle',title)
        },
        updateLayout({commit}, layout){
            commit('updateLayout',layout)
        }
    }
}