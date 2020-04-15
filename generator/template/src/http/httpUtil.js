import axios from 'axios'
import Util from '@/assets/js/util'

export default {
  /*
    getAction, postAction参数说明
    * @param {string} url
    * @param {function} commit vuex 默认
    * @param {string} mutation vuex mutation
    * @param {Object} params 接口参数
    * @param {Object} options 接口参数
    * @param {string} option.loadTarget 指定loading的dom目标，默认body
    * @param {string} option.showLoading：是否启动loading 默认true
    * @return Promise
  */
  getAction(url, commit, mutation = '', params, options = {}) {
    // 重新非指定域名时，重新拼接url
    if (url.indexOf('https://') === -1) {
      url = Util.getDomainAddress() + url
    }
    return axios.get(url, { params }, options).then((response) => {
      mutation && commit(mutation, response.data)
      return Promise.resolve(response.data)
    }, (error) => {
      return Promise.reject(error)
    })
  },
  postAction (url, commit, mutation = '', params, options) {
    // 重新非指定域名时，重新拼接url
    if (url.indexOf('https://') === -1) {
      url = Util.getDomainAddress() + url
    }
    return axios.post(url, { data: params }, params, options)
      .then(response => {
        mutation && commit(mutation, response.data)
        return Promise.resolve(response.data)
      }, (error) => {
        return Promise.reject(error)
      })
  },
  // 南基url 不走资源池url配置，默认执行baseURL + url
  getNJAction(url, commit, mutation = '', params, options = {}) {
    return axios.get(url, { params }, options).then((response) => {
      mutation && commit(mutation, response.data)
      return Promise.resolve(response.data)
    }, (error) => {
      return Promise.reject(error)
    })
  },
  // 南基url 不走资源池url配置，默认执行baseURL + url
  postNJAction (url, commit, mutation = '', params, options) {
    return axios.post(url, { data: params }, params, options)
      .then(response => {
        mutation && commit(mutation, response.data)
        return Promise.resolve(response.data)
      }, (error) => {
        return Promise.reject(error)
      })
  }
}
