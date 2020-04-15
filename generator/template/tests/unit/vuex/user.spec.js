import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
// import { cloneDeep } from 'lodash'
import userModuleClone from '@/store/modules/user'
import userInfo from 'root@/mocks/userInfo'

describe('vuex decorator', () => {
    let store
    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)
        const actions = {
            getUserInfo: jest.fn(({ commit }) => {
                commit('USER_INFO_REQUEST', userInfo)
            })
        }
        userModuleClone.actions = actions
        store = new Vuex.Store(userModuleClone)
    })
    
    test('getUserInfo mutaion', () => {
        const state = {
            username: ''
        }
        userModuleClone.mutations['USER_INFO_REQUEST'](state, userInfo)
        expect(state.username).toBe('test')
    })

    test('all vuex test', () => {
        expect(store.state.username).toBe('xxx')
        store.dispatch('getUserInfo')
        expect(store.state.username).toBe('test')
    })
})
