// import promise from 'es6-promise'
import axios from 'axios'
// import {
//   MessageBox
// } from 'element-ui'
// import router from '@/router'

// promise.polyfill()
const Axios = axios.create({
  baseURL: process.env.VUE_APP_QY_BASE_URL,
  // withCredentials: true,
  timeout: 10000
})

/**
 * http request    拦截器
 */
Axios.interceptors.request.use(config => {
  if (localStorage.UK && !config.url.endsWith('account/loginCode')) {
    config.url += ('?UK=' + localStorage.UK)
  }
  return config
}, error => {
  alert('错误的传参')
  return Promise.reject(error)
})

/**
 * http response   拦截器
 * Promise.reject  返回接口返回的错误信息
 */
Axios.interceptors.response.use(res => {
  switch (res.data.state) {
    case 1:
      return res.data
    case 100001: // 用户未登录
      //   // Notification.success({ message: res.data.msg, duration: 3000 })
      // Dialog.confirm({
      //   message: '用户未登录'
      // }).then(() => {
      //   // on confirm
      //   router.push('/Login')
      // }).catch(() => {
      //   // on cancel
      // })
      return Promise.reject(res)
    case 10001002:
      alert('密码错误')
      return Promise.reject(res)
      // case 0:
      //   alert('验证码错误')
      //   return Promise.reject(res)
      // case 10001008:
      //   alert('密码错误')
      //   return Promise.reject(res)
      // case 500:
      //   // Notification.error({ message: res.data.msg, duration: 3000 })
      //   return Promise.reject(res)
      // case 50002:
      //   // Notification.error({ message: res.data.result, duration: 3000 })
      //   return Promise.reject(res)
    default:
      if (res.data.info != null) {
        // Dialog.alert({
        //   message: res.data.info
        // }).then(() => {
        //   // on close
        // })
        // alert(111)
      }
      return res.data
  }
}, error => {
  if (!error.response) {
    // Notification.error({ message: '系统异常', duration: 3000 })
    return Promise.reject(error)
  } else if (error.response.status === 404) {
    // Notification.error({ message: '请求地址有误', duration: 3000 })
    // Dialog.alert({
    //   message: '页面不存在'
    // }).then(() => {
    //   // on close
    // })
  } else if (error.response.status === 535) {
    // Notification.error({ message: error.data.msg, duration: 3000 })
    // Dialog.alert({
    //   message: '系统错误'
    // }).then(() => {
    //   // on close
    // })
  }
  // 返回 response 里的错误信息
  return Promise.reject(error.response.data)
})
export default {
  // eslint-disable-next-line space-before-function-paren
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', {
      value: Axios
    })
  }
}
