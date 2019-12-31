<template>
	<view class="bindPhone">
		<view class="title1">
				<text>绑定手机号</text>
			</view>
			<view class="inputWrap">
				<view class="inputBox inputBox1">
					<van-cell-group :border="false">
					  <van-field
							size='large'
							:value='userPhone'
					    placeholder="请输入手机号"
							placeholder-style="color: #b1b1b1;font-size: 28rpx;"
							type='number'
					    :border="false"
					    @change="onChangePhone"
					  />
					</van-cell-group>
				</view>
				<view class="inputBox inputBox2">
					<van-cell-group :border="false">
					  <van-field
							size='large'
							:value='checkCode'
					    placeholder="请输入验证码"
							placeholder-style="color: #b1b1b1;font-size: 28rpx;"
							type="number"
					    :border="false"
					    @change="onChange"
					  >
						</van-field>
					</van-cell-group>
				</view>
					<button class='codeBtn' size="mini" :plain='true' :disabled='disabled' @click="getCode">{{content}}</button>
			</view>	
			<view class="btnBox">
				<view class="myButton"  @click="handleBind">绑定</view>
			</view>
			<view class="tip">
				依《网络安全法》要求，账号需绑定手机号
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				userPhone: '18884027431',
				checkCode: '723186',
				disabled: false,
				content: '获取验证码',
				totalTime: 0,
			}
		},
		onLoad() {
		},
		methods: {
			...mapMutations(['login']),  //对全局方法login进行监控
			
			onChangePhone(v) {
				this.userPhone = v.detail
			},
			onChange(v) {
				this.checkCode = v.detail
			},
			// 获取验证码
			getCode() {
				let ruleValue = this.$utils.checkPhone(this.userPhone)
				if(ruleValue) {
					this.$http.get({
						url: '/v1/rest/public/authCode',
						data:{
							phone: this.userPhone,
						}
					}).then(resp => {
						console.log(resp)
					})
					this.totalTime = 60
					this.timer = setInterval(() => {
						this.totalTime--
						this.content = this.totalTime + '秒后重试'
						this.disabled = true
						if(this.totalTime <= 0){
							this.content = '获取验证码'
							this.disabled = false
							clearInterval(this.timer)
						}
					},1000)
				}else{
					uni.showToast({
						title: '请输入有效的手机号码！',
						duration: 2000,
						icon: 'none'
					});
				}
			},
			// 绑定
			handleBind() {
				const weixinUserInfo = uni.getStorageSync('weixinUserInfo')
				console.log(weixinUserInfo)
				let ruleValue = this.$utils.checkPhone(this.userPhone)
				if(!ruleValue){
					uni.showToast({
						title: '请输入有效的手机号码！',
						duration: 2000,
						icon: 'none'
					});
				}else if(this.checkCode == ''){
					uni.showToast({
						title: '请输入验证码！',
						duration: 2000,
						icon: 'none'
					});
				}else{
					this.$http.post({
						url: '/v1/rest/login/wxRegist',
						data:{
							phone: this.userPhone,
							authCode: this.checkCode,
							headPortrait: weixinUserInfo.avatarUrl,
							region: weixinUserInfo.province + weixinUserInfo.city,
							sex: weixinUserInfo.gender,
							nickName: weixinUserInfo.nickName,
							openId: uni.getStorageSync('openId')
						}
					}).then(resp => {
						console.log(resp)
						uni.removeStorageSync('openId')
						uni.removeStorageSync('weixinUserInfo')
						if(resp.status == 200) {
							const userInfo = {
								userPhone: resp.data.phone,
								userName: resp.data.nickName,
								userRole: resp.data.role,
								userId: resp.data.userId,
								token: resp.data.token
							}
							this.login(userInfo)
							uni.redirectTo({
								url: '/pages/userInfo/registerInfo/registerInfo'
							})
						}
					})
				}
			},
			// 微信登录
			getuserinfo(e){
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bindPhone{
		width: 100%;
		height: 100vh;
		// background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/loginBg.png') no-repeat center;
		// background-size: 100% auto;
		// overflow: hidden;
		.title1{
			width: 100%;
			height: 195rpx;
			box-sizing: border-box;
			font-size: 54rpx;
			color: #fff;
			font-weight: 400;
			padding-top: 80rpx;
			padding-left: 30rpx;
			.text2{
				margin-left: 22rpx;
			}
		}
		.title2{
			width: 100%;
			height: 40rpx;
			box-sizing: border-box;
			line-height: 36rpx;
			font-size: 34rpx;
			color: #f0f0f0;
			padding-left: 30rpx;
		}
		.inputWrap{
			width: 716rpx;
			height: 240rpx;
			margin-left: 17rpx;
			margin-top: 145rpx;
			background: rgba(255,255,255,0.2);
			border-radius: 13rpx;
			box-sizing: border-box;
			padding: 0 28rpx;
			position: relative;
			.inputBox{
				width: 100%;
				height: 120rpx;
				overflow: hidden;
				/deep/ .van-cell-group{
					.van-cell--large{
						margin-top: 12rpx;
						margin-left: -30rpx;
					}
					.van-cell{
						background: none;
						.van-field__input{
							font-size: 34rpx;
							color: #fff;
						}	
					}
				} 
			}
			.inputBox1{
				border-bottom: 1rpx solid #5f5f5f;
			}
			.codeBtn{
				color: #e4bb31;
				font-size: 24rpx;
				border: none;
				background: none;
				position: absolute;
				right: 10rpx;
				bottom: 30rpx;
				z-index: 999;
			}
			
		}
		.btnBox{
			width: 100%;
			height: 96rpx;
			margin-top: 16rpx;
			padding: 0 17rpx;
			box-sizing: border-box;
		}
		.loginTitle{
			width: 440rpx;
			height: 30rpx;
			margin: 0 auto;
			margin-top: 300rpx;
			text-align: center;
			font-size: 22rpx;
			color: #b8b8b8;
			line-height: 30rpx;
			position: relative;
		}
		.loginTitle::before{
			content: '';
			display: inline-block;
			width: 160rpx;
			height: 14rpx;
			border-bottom: 3rpx solid #b8b8ba;
			position: absolute;
			top: 0;
			left: 0;
		}
		.loginTitle::after{
			content: '';
			display: inline-block;
			width: 160rpx;
			height: 14rpx;
			border-bottom: 3rpx solid #b8b8ba;
			position: absolute;
			top: 0;
			right: 0;
		}
		.weixinBtn{
			width: 66rpx;
			height: 66rpx;
			border-radius: 50%;
			margin: 0 auto;
			margin-top: 33rpx;
			background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/weixinIcon.png') no-repeat center;
			background-size: 100% auto;
		}
		.wenxinText{
			width: 100%;
			line-height: 60rpx;
			text-align: center;
			font-size: 22rpx;
			color: #b8b8b8;
		}
		.tip{
			width: 100%;
			line-height: 30rpx;
			text-align: center;
			font-size: 22rpx;
			color: #b8b8b8;
			margin-top: 550rpx;
			text{
				color: #f6c92f;
			}
		}
	}
</style>
<style>
	.codeBtn,button[disabled]{
		color: #e4bb31;
		font-size: 22rpx;
		background: none;
		border: none;
	}
</style>
