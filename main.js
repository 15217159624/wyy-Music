import Vue from 'vue'
import App from './App'
import fly from "@/utils/fly.js";
import { baseApiUrl, authApiUrl } from '@/utils/baseApiUrl'
import http from './api/index.js'
Vue.prototype.$http = http
import store from './store/index.js'
Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.prototype.fly = fly; //异步请求库
Vue.prototype.baseApiUrl = baseApiUrl; //接口基地址
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()


