import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {  //定义全局变量
		hasLogin: false,  //用户登录状态
		userInfo: {},  //用户账号数据
	},
	mutations: {  //定义全局方法
		login(state, provider) {  //改变登录状态
			state.hasLogin = true;
			state.userInfo.userId = provider.userId;
			state.userInfo.userPhone = provider.userPhone;  //将请求中的resp.data中的用户数据存入userInfo
			state.userInfo.token = provider.token; 
			uni.setStorage({            //把用户信息保存到本地缓存
				key: 'userInfo',
				data: provider
			})
			uni.setStorageSync('isLogin',true)
			console.log(state.userInfo)
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  //根据key值移除缓存数据
				key: 'userInfo'
			})
		}
	}
})

export default store