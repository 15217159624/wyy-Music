import Vue from 'vue'
import App from './App'
// import utils from './utils/index'
import config from './config/index'
Vue.prototype.$config = config
Vue.config.productionTip = false

// Vue.use(utils)


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()


