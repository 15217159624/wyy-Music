import Vue from 'vue'
import App from './App'

// 接口
import api from './api/index.js'
Vue.prototype.$api = api

// 请求
import request from './api/request.js'
Vue.prototype.$http = request

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()


