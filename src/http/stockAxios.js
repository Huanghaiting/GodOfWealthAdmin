// import promise from 'es6-promise'
import axios from 'axios'

// promise.polyfill()
const Axios = axios.create({
  baseURL: process.env.VUE_APP_STOCK_BASE_URL,
  // withCredentials: true,
  timeout: 10000
})
export default {
  // eslint-disable-next-line space-before-function-paren
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$stock', {
      value: Axios
    })
  }
}
