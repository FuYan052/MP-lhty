let baseUrl = '';
// 区分环境
if (process.env.NODE_ENV == 'development') {
    // baseUrl = 'http://192.168.0.116:8089/lhty' // 开发环境
    baseUrl = 'http://baogongxia.com/lhty/' // 开发环境
} else {
    baseUrl = 'http://baogongxia.com/lhty/' // 生产环境
}

function request(url,method,data,header={}){
  uni.showLoading({
    title: '加载中...'
  })
  return new Promise((resolve,reject) => {
    uni.request({
      url: baseUrl + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
				'token': uni.getStorageSync('userInfo').token || ''
      },
      success: function(resp) {
				// console.log(resp)
        uni.hideLoading();
				if (resp.data.status == 200) {
					resolve(resp.data);
				}else if(resp.data.status == 201) {
					resolve(resp.data);
					uni.showToast({
						title: resp.data.message,
						duration: 2500,
						icon: 'none'
					});
				}else if(resp.statusCode == 200) {
					resolve(resp);
					if(resp.data.code == -205) {  //token过期
						uni.showToast({
							title: resp.data.message,
							duration: 2000,
							icon: 'none'
						});
						uni.removeStorage({  //根据key值移除缓存数据
							key: 'isLogin'
						})
						uni.removeStorage({  //根据key值移除缓存数据
							key: 'clubId'
						})
						uni.removeStorage({  //根据key值移除缓存数据
							key: 'userType'
						})
						uni.removeStorage({  //根据key值移除缓存数据
							key: 'userInfo'
						})
						let timer = setTimeout(() => {
							uni.navigateTo({
								url: '/pages/login/login'
							})
							clearTimeout(timer)
						},1500)
					}else if(resp.data.code == 203) {  //微信授权
						console.log(resp.data.message)
					}else{
						uni.showToast({
							title: resp.data.message,
							duration: 4000,
							icon: 'none'
						});
					}
				}
      },
      fail: function(resp) {
				console.log(resp.data)
        uni.hideLoading();
        reject(resp);
      },
    })
  })
}

// 封装get方法
function get(obj) {
  return request(obj.url,'GET',obj.data)
}
// 封装post方法
function post(obj) {
  return request(obj.url,'POST',obj.data)
}

export default {
  request,
  get,
  post,
  baseUrl
}
  
