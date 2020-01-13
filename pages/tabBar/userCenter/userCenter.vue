<template>
	<view class="userCenter">
		<view class="topWrap">
			<view class="userInfo">
				<view class="left">
					<view class="imgBox">
						<image :lazy-load='false' style="width: 100%; height: 100%; border-radius: 50%;"
							:src="userData.headPortrait">
						</image>
					</view>
					<view class="nickName">
						<view class="name">{{userData.nickName}}</view>
						<!-- <view class="role">群主</view> -->
					</view>
				</view>
				<view class="right">
					<view class="iconBox"></view>
				</view>
			</view>
			<view class="walletWrap" @click="toMyWallet(userData.totalMoney)">
				<view class="left">我的钱包</view>
				<view class="right">{{userData.totalMoney}}<text>元</text></view>
				<van-icon class='rightIcon' name="arrow" size='29rpx' color='#cccccd'/>
			</view>
		</view>
		<!-- 菜单部分 -->
		<view class="menuWrap">
			<view class="menuItem" :class="'menu' + item.id" v-for="(item,index) in menuList" :key='index'>
				<van-cell
				  :title="item.title"
					:border='false'
					size='large'
					is-link
				  link-type="navigateTo"
				  :url="item.path"
				/>
			</view>
			<view class="menuItem menu6" @click="doLoginout">
				<van-cell
				  title="退出登录"
					:border='false'
					size='large'
					is-link
				  link-type="navigateTo"
				/>
			</view>
		</view>
		<van-dialog 
			id="van-dialog" 
			:show="showToLogin"
			title='提示'
			message='需要先登录后才可查看！'
			confirm-button-text='去登录'
			@confirm='toLogin'
			/>
			<van-dialog 
			id="van-dialog" 
			:show="showLoginOut"
			:showCancelButton='true'
			title='提示'
			message='确定要退出登录吗？'
			@confirm='handleConfirm'
			@cancel='handleCancel'
			/>
	</view> 
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				stateTab: false, //是否重新请求数据
				// loginState: null,
				showToLogin: false,
				showLoginOut: false,
				menuList: [{id: 1 , title:'我的活动',path: '/pages/userCenter/myActivities/myActivities'},
									{id: 2, title:'俱乐部',path: '/pages/userCenter/clubList/clubList'},
									{id: 3, title:'管理中心',path: '/pages/userCenter/managementCenter/managementCenter'},
									{id: 4, title:'新俱乐部入驻',path: '/pages/userCenter/clubEntry/clubEntry'},
									{id: 5,title:'常见问题',path: '/pages/userCenter/commonProblem/commonProblem'},],
				userData: {}
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),  //对全局变量hasLogin进行监控
		},
		created() {
			
		},
		onShow() {
			if(uni.getStorageSync('userInfo').userId > 0) {  //登录
				this.stateTab = true
			}else{  //未登录
				this.stateTab = false
				this.showToLogin = true
			}
			if(this.stateTab) {
				this.$http.get({
					url: '/v1/rest/personalCenter/personalCenter',
					data:{
						userId: uni.getStorageSync('userInfo').userId,
					}
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						this.userData = resp.data
						uni.setStorageSync('clubId', resp.data.clubId)
					}
				})
			}
		},
		methods: {
			...mapMutations(['logout']),  //对全局方法login进行监控
			// 我的钱包
			toMyWallet(value) {
				uni.navigateTo({
				  url: '/pages/userCenter/myWallet/myWallet?totalMoney=' + value
				});
			},
			toLogin() {
				uni.navigateTo({
				  url: '/pages/login/login'
				});
				this.showToLogin = false
			},
			// 退出登录
			doLoginout() {
				this.showLoginOut = true
			},
			handleConfirm() {
				this.logout()
				uni.removeStorage({  //根据key值移除缓存数据
					key: 'isLogin'
				})
				uni.removeStorage({  //根据key值移除缓存数据
					key: 'clubId'
				})
				this.userData = {}
				this.showToLogin = true
			},
			handleCancel() {
				this.showLoginOut = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userCenter{
		width: 100%;
		min-height: 100vh;
		background: #fff;
		.topWrap{
			width: 100%;
			height: 338rpx;
			box-sizing: border-box;
			padding: 0 24rpx;
			background: #444444;
			overflow: hidden;
			.userInfo{
				width: 100%;
				height: 150rpx;
				margin-top: 40rpx;
				border-radius: 10rpx;
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/userCenterBg.png') no-repeat center;
				background-size: contain;
				box-sizing: border-box;
				padding-left: 40rpx;
				padding-right: 60rpx;
				.left{
					width: 515rpx;
					height: 150rpx;
					float: left;
					.imgBox{
						width: 96rpx;
						height: 96rpx;
						border-radius: 50%;
						float: left;
						margin-top: 28rpx;
					}
					.nickName{
						height: 150rpx;
						float: left;
						margin-left: 20rpx;
						.name{
							font-size: 34rpx;
							line-height: 150rpx;
							color: #4b4416;
							// margin-top: 45rpx;
						}
						// .role{
						// 	font-size: 24rpx;
						// 	line-height: 24rpx;
						// 	color: #4b4416;
						// 	margin-top: 18rpx;
						// }
					}
				}
				.right{
					width: 80rpx;
					height: 150rpx;
					float: right;
					.iconBox{
						width: 66rpx;
						height: 32rpx;
						margin-top: 60rpx;
						background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/editUserInfo.png') no-repeat center;
						background-size: contain;
					}
				}
			}
			.walletWrap{
				width: 100%;
				height: 52rpx;
				margin-top: 64rpx;
				line-height: 52rpx;
				position: relative;
				.left{
					width: 210rpx;
					height: 38rpx;
					line-height: 38rpx;
					box-sizing: border-box;
					padding-left: 54rpx;
					padding-right: 30rpx;
					font-size: 28rpx;
					border-right: 3rpx solid #999999;
					float: left;
					color: #969696;
					margin-top: 8rpx;
					background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/walletIcon.png') no-repeat left center;
					background-size: 26rpx auto;
					background-position: 13rpx center;
				}
				.right{
					height: 52rpx;
					float: left;
					margin-left: 30rpx;
					line-height: 52rpx;
					font-size: 45rpx;
					color: #fbcc02;
					text{
						font-size: 26rpx;
						color: #969696;
						line-height: 44rpx;
						padding-left: 5rpx;
					}
				}
				/deep/ .van-icon{
					display: block;
					position: absolute;
					right: 48rpx;
					top: 15rpx;
				}
			}
		}
		.menuWrap{
			width: 100%;
			height: auto;
			box-sizing: border-box;
			padding-left: 24rpx;
			padding-right: 40rpx;
			.menuItem{
				width: 100%;
				height: 98rpx;
				box-sizing: border-box;
				padding-left: 42rpx;
				border-top: 2rpx solid #f4f4f4;
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/activieIcon.png') no-repeat left center;
				background-size: 35rpx auto;
				/deep/ .van-cell--large{
					height: 96rpx;
				}
				/deep/ .van-cell__title,.van-cell__value{
					font-size: 28rpx;
					color: #51504c;
				}
				/deep/ .van-icon{
					font-size: 26rpx;
					color: #636362;
				}
			}
			.menu2 {
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/teamIcon.png') no-repeat left center;
				background-size: 36rpx auto;
			}
			// .menuItem:nth-of-type(3) {
			// 	background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/dataIcon.png') no-repeat left center;
			// 	background-size: 32rpx auto;
			// }
			.menu3 {
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/managementIcon.png') no-repeat left center;
				background-size: 30rpx auto;
			}
			.menu4 {
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/joinIcon.png') no-repeat left center;
				background-size: 34rpx auto;
			}
			.menu5 {
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/problemIcon.png') no-repeat left center;
				background-size: 34rpx auto;
			}
			.menu6{
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/logoutIcon.png') no-repeat left center;
				background-size: 33rpx auto;
			}
		}
	}
</style>
<style>
	
</style>