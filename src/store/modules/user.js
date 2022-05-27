// 非store根节点的数据
export const userModule = {
    namespaced: true,
    state() {
        return {
            userCount: 1
        }
    },
    getters: {
        getUserCount(state) {
            return state.userCount + 2
        }
    },
    mutations: {
        userIncrement(state, payload) {
            state.userCount += payload.userCount
        }
    },
    actions: {
        userIncrement({ commit }, payload) {
            setTimeout(() => {
                const newUserCount = payload.userCount + 1
                commit('userIncrement', {
                    userCount: newUserCount
                })
            }, 1000)
        }
    },
}
