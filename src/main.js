import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import AxiosPlugin from './http/AxiosPlugin'
import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
// Vue.use(MessageBox)
// Vue.use(Message)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$message = Message
// const msgbox = MessageBox
// Vue.prototype.$msgbox = msgbox
// const confirm = MessageBox.confirm
// Vue.prototype.$confirm = confirm
// const message = Message
// Vue.prototype.$message = message
Vue.use(AxiosPlugin)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
