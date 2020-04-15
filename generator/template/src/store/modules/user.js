import * as types from '../types'
import httpUtil from '@/http/httpUtil'

const state = {
  username: 'xxx'
}

const mutations = {
  [types.USER_INFO_REQUEST](state, payload) {
    state.username = payload.username
  }
}

const actions = {
  getUserInfo({ commit }, params) {
    return httpUtil.getAction('/api/userInfo',
      commit,
      types.USER_INFO_REQUEST,
      params,
      { showLoading: true, loadTarget: '#tableId' }
    )
  }
}

// const getters = {
//   username(state) {
//     return state.username + 'getter'
//   }
// }

export default {
  state,
  mutations,
  actions
}
