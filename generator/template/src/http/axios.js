import axios from 'axios'
import Util from '@/assets/js/util'
import { Message, Loading } from 'element-ui'
// axios 默认配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = process.env.VUE_APP_API_PATH

let loading
let loadingCount = 0
function startLoading(target = 'body') {
  if (loadingCount === 0) {
    loading = Loading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(255,255,255,0.5)',
      target
    })
  }
  loadingCount++
}
function endLoading() {
  loadingCount--
  loading && loadingCount <= 0 && loading.close()
}
function errorHandler(error) {
  endLoading()
  if (!error.errorMessage) {
    error.errorMessage = '系统异常！'
  }
  Message.error(error.errorMessage)
  return Promise.reject(error)
}

// http request 拦截器
axios.interceptors.request.use(config => {
  config.crossDomain = true
  config.withCredentials = true
  config.timeout = 5000
  console.log('config data is ---------->', config)
  // 开始loading
  const { loadTarget, showLoading } = config
  showLoading !== false && startLoading(loadTarget)
  if (config.headers['Content-Type'] === undefined) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    config.transformRequest = [(data) => {
      return Util.jsonToString(data)
    }]
  }
  return config
}, error => {
  return errorHandler(error)
})

// http response 拦截器
axios.interceptors.response.use(response => {
  if (response.data && response.data.state === 'OK') {
    // 关闭loading
    endLoading()
    return Object.assign({
      success: true
    }, response)
  } else {
    return errorHandler(response)
  }
}, error => {
  return errorHandler(error)
})

export default axios
