import Vue from 'vue'
import App from './App'
import http from './request/http';
import utils from './common/util.js';
import store from './store/index'

Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.$utils = utils
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
  ...App
})
app.$mount()
