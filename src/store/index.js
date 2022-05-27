import { createStore } from 'vuex'
import { userModule } from './modules/index'

const store = createStore({
    // 根store的数据方法
    state() {
        return {
            count: 0
        }
    },
    // getters方法可以自定义逻辑获取vuex的state
    getters: {
        getCount(state) {
            return state.count + 1
        }
    },
    // 修改vuex的state值只有通过motations方法
    mutations: {
        increment(state, payload) {
            state.count += payload.count
        }
    },
    // mutation进行同步操作，异步操作使用actions
    // actions不能直接修改state，但是它可以通过commit触发mutations修改state
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
    modules: {
        userModule
    }
})

export default store