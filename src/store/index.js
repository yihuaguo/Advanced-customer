import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            lesson: {
                url: '',
                id: undefined
            },
            directoryList: [],
            documentId: undefined,
        }
    },
    getters: {},
    mutations: {
        setLesson(state, payload) {
            state.lesson = payload || undefined
        },
        setDocumentId(state, payload) {
            state.documentId = payload || undefined
        },
        setDirectoryList(state, payload) {
            state.directoryList = payload || []
        },
    },
    actions: {
        increment({ commit }, payload) {
            setTimeout(() => {
                const newCount = payload.count + 1
                commit('increment', {
                    count: newCount
                })
            }, 1000)
        }
    },
})

export default store