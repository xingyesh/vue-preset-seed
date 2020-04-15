import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import axios from 'axios'
import {
    Table,
    TableColumn
} from 'element-ui'

import userModuleClone from '@/store/modules/user'
import userInfo from 'root@/mocks/userInfo'
import HomeComponent from '@/views/home.vue'

jest.mock('axios', () => ({
    get: jest.fn(),
}));
describe('header component test', () => {
    let store
    let localVue
    let wrapper
    beforeAll(async() => {
        
        localVue = createLocalVue()
        // 引入插件
        localVue.use(Vuex)
        localVue.prototype.axios = axios
        localVue.use(Table)
        localVue.use(TableColumn)

        // const userModuleClone = cloneDeep(userModule)
        // 覆盖actions
        const actions = {
            getUserInfo: jest.fn(({ commit }) => {
                commit('USER_INFO_REQUEST', userInfo)
            })
        }
        Object.assign(userModuleClone.actions, actions)
        // 增加decorator块state、处理mapstate
        userModuleClone.state.user = userModuleClone.state
        userModuleClone.state.bigdataAI = {
            IoTMenu: [],
            bigdataAI: []
        }
        store = new Vuex.Store(userModuleClone)
        axios.get.mockClear()
        axios.get.mockReturnValue(Promise.resolve({}))

        // 将wrapper前置，减少重复初始化
        wrapper = await shallowMount(HomeComponent, { store, localVue })
    })

    test("vue data instance", async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.test).toBe('xxx')
    })
    test("user name render", async () => {
        await wrapper.vm.$nextTick()
        expect(store.state.username).toBe('test')
        expect(wrapper.find('.username').text()).toBe('test')
    })
})
