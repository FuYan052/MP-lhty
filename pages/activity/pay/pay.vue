<template>
	<view class="pay">
		<view class="whiteBg box1">
			<view class="left">
				<view class="time">{{actDetail.timeStart}}</view>
				<view class="date">{{actDetail.time}}</view>
			</view>
			<view class="right">
				<view class="title">{{actDetail.title}}</view>
				<view class="text club">俱乐部：{{actDetail.clubName}}</view>
				<view class="text place">场&nbsp;&nbsp;&nbsp;&nbsp;馆：{{actDetail.venueName}}</view>
			</view>
		</view>
		<view class="tilte">报名选择</view>
		<view class="whiteBg box2">
			<view class="sexBox man" @click="choiceSex1">
			 	<view class="left">男</view>
				<view class="right" :class="{choiceSex: isMen}"></view>
			</view>
			 <view class="sexBox women" @click="choiceSex2">
			 	<view class="left">女</view>
				<view class="right" :class="{choiceSex: isWomen}"></view>
			 </view>
		</view>
		<view class="tilte">支付方式</view>
		<view class="whiteBg box3 box3_1">
			<view class="radioBox" :class="{currPay: payType == 0}" @click="choicePay(1)"></view>
			<view class="center">
				<view class="title">会费支付</view>
				<view class="huifei">
					余额：<text class="text1">{{actDetail.memberMoney}}元</text><text class="text2" @click="Recharge">去充值</text>
				</view>
			</view>
			<view class="price">
				<view class="priceMan">男&nbsp;{{actDetail.moneyMan}}元/人</view>
				<view class="priceWomen">女&nbsp;{{actDetail.moneyWomen}}元/人</view>
			</view>
		</view>
		<view class="whiteBg box3 box3_2">
			<view class="radioBox" :class="{currPay: payType == 1}" @click="choicePay(2)"></view>
			<view class="center">微信支付</view>
			<view class="price">{{actDetail.temporaryMoney}}元/人</view>
		</view>
		<view class="whiteBg box3 box3_2">
			<view class="radioBox" :class="{currPay: payType == 2}" @click="choicePay(3)"></view>
			<view class="center">线下支付</view>
			<view class="price">{{actDetail.temporaryMoney}}元/人</view>
		</view>
		<view class="whiteBg box3 box3_1">
			<view class="radioBox" :class="{currPay: payType == 3}" @click="choicePay(4)"></view>
			<view class="center">
				<view class="title">我的钱包</view>
				<view class="huifei">
					余额：<text class="text1">{{actDetail.walletMoney}}元</text>
				</view>
			</view>
			<view class="price">{{actDetail.walletPayMoney}}元/人</view>
		</view>
		
		<!-- 合计 -->
		<view class="countBox">
			合计：<text>{{payMoney}}</text>元
		</view>
		<view class="btnBox">
			<view class="myButton" @click="submit">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isMen: false,  
				isWomen: false,
				payType: -1,  //支付类型 0为会费支付，1为微信支付，2位线下支付，3为钱包支付
				activityId: '',
				actDetail: '',
				payMoney: 0,
				mNumber: 0,
				gNumber: 0,
				clubId: null,
				orderNo: null
			}
		},
		onLoad(options) {
			console.log(options)
			this.activityId = options.actId
			this.$http.get({
				url: '/v1/rest/home/signUpDetails',
				data: {
					activitiesId: options.actId,
					userId: uni.getStorageSync('userInfo').userId
				}
			}).then(resp => {
				console.log(resp)
				if(resp.status == 200) {
					this.actDetail = resp.data
					this.clubId = resp.data.clubId
				}
			})
		},
		methods: {
			// 选择性别男
			choiceSex1() {
				this.isMen = !this.isMen
				this.isWomen = false
				this.gNumber = 0
				this.mNumber = 1
			},
			// 选择性别女
			choiceSex2() {
				this.isWomen = !this.isWomen
				this.isMen = false
				this.gNumber = 1
				this.mNumber = 0
			},
			// 选择支付方式
			choicePay(v) {
				switch(v) {
					case 1:
						this.payType = 0
						if(this.isMen) {
							this.payMoney = this.actDetail.moneyMan
						}else{
							this.payMoney = this.actDetail.moneyWomen
						}
						break;
					case 2:
						this.payType = 1
						this.payMoney = this.actDetail.temporaryMoney
						break;
					case 3:
						this.payType = 2
						this.payMoney = this.actDetail.temporaryMoney
						break;
					case 4:
						this.payType = 3
						this.payMoney = this.actDetail.walletPayMoney
						break;
				}
			},
			// 充值
			Recharge() {
				uni.navigateTo({
					url: '/pages/userCenter/recharge/recharge?clubId' + this.clubId
				})
			},
			// 提交报名
			submit() {
				const that = this
				if((!this.isMen) && (!this.isWomen)) {
					uni.showToast({
						title: '请选择性别！',
						duration: 2000,
						icon: 'none'
					});
				}else if(this.payType <0){
					uni.showToast({
						title: '请选择支付方式！',
						duration: 2000,
						icon: 'none'
					});
				}else{
					const params = {
						clubId: this.clubId,
						payType: this.payType,
						gNumber: this.gNumber,
						mNumber: this.mNumber,
						productId: this.activityId,
						totalPrice: this.payMoney,
						userId: uni.getStorageSync('userInfo').userId,
					}
					console.log(params)
					//微信支付
					if(this.payType === 1) {  
						console.log('微信支付')
						this.$http.post({
							url: '/v1/rest/pay/payUpper',
							data: params
						}).then(resp => {
							console.log(resp)
							if(resp.status == 200) {
								this.orderNo = resp.data.orderNo
								uni.requestPayment({
									provider: 'wxpay',
									timeStamp: resp.data.timeStamp,
									nonceStr: resp.data.nonceStr,
									package: resp.data.package,
									signType: resp.data.signType,
									paySign: resp.data.paySign,
									success: function (res) {
										// 支付成功回调
										that.$http.get({
											url: '/v1/rest/pay/wechatPayCallback',
											data: {
												type: 'success',
												orderNo: that.orderNo,
												clubId: that.clubId
											}
										}).then(resp => {
											console.log(resp)
											if(resp.status == 200) {
												uni.showToast({
													title: resp.data.message,
													duration: 2000,
													icon: 'none'
												}); 
											}
										})
									},
									fail: function (err) {
										// 支付取消回调
										that.$http.get({
											url: '/v1/rest/pay/wechatPayCallback',
											data: {
												type: 'fail',
												orderNo: that.orderNo,
												clubId: that.clubId
											}
										}).then(resp => {
											console.log(resp)
											if(resp.status == 200) {
												uni.showToast({
													title: resp.data.message,
													duration: 2000,
													icon: 'none'
												});
											}
										})
									}
								});
							}
						})
					}else{  //非微信支付-线下支付
						this.$http.post({
							url: '/v1/rest/pay/payLower',
							data: params
						}).then(resp => {
							console.log(resp)
							if(resp.status == 200) {
								uni.showToast({
									title: resp.data.message,
									duration: 2000,
									icon: 'none'
								});
							}
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pay{
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0 16rpx;
		padding-bottom: 40rpx;
		.box1{
			height: 214rpx;
			box-sizing: border-box;
			padding-left: 32rpx;
			overflow: hidden;
			margin-top: 16rpx;
			.left{
				width: 154rpx;
				height: 102rpx;
				border-right: 2rpx solid #e8e8e8;
				float: left;
				margin-top: 58rpx;
				.time{
					font-size: 32rpx;
					color: #ffbc00;
					font-weight: bold;
					line-height: 56rpx;
				}
				.date{
					font-size: 24rpx;
					color: #8a8a8a;
					line-height: 38rpx;
				}
			}
			.right{
				width: 510rpx;
				height: 156rpx;
				float: left;
				margin-top: 40rpx;
				box-sizing: border-box;
				padding-left: 38rpx;
				.title{
					width: 100%;
					height: 36rpx;
					font-size: 32rpx;
					line-height: 36rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis; 
				}
				.text{
					font-size: 24rpx;
					color: #515151;
					line-height: 54rpx;
				}
				.club{
					margin-top: 12rpx;
				}
			}
		}
		.tilte{
			width: 100%;
			height: 98rpx;
			line-height: 98rpx;
			font-size: 34rpx;
			color: #fff;
			margin-top: 16rpx;
			box-sizing: border-box;
			padding-left: 16rpx;
			letter-spacing: 4rpx;
		}
		.box2{
			height: auto;
			box-sizing: border-box;
			padding: 0 32rpx;
			.sexBox{
				width: 100%;
				height: 103rpx;
				.left{
					width: 90rpx;
					height: 103rpx;
					float: left;
					line-height: 104rpx;
					text-align: right;
					font-size: 28rpx;
					color: #4f4f4f;
				}
				.right{
					width: 44rpx;
					height: 44rpx;
					float: right;
					border-radius: 50%;
					border: 1rpx solid #868686;
					margin-top: 28rpx;
				}
				.choiceSex{
					border: 1rpx solid #fed461;
					background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/circleBg.png') no-repeat center;
					background-size: 20rpx auto;
				}
			}
			.man{
				border-bottom: 1rpx solid #ebebeb;
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/manIcon.png') no-repeat left center;
				background-size: 35rpx auto;
			}
			.women{
				border-bottom: 1rpx solid #ebebeb;
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/womenIcon.png') no-repeat left center;
				background-size: 35rpx auto;
			}
		}
		.box3{
			margin-bottom: 8rpx;
			box-sizing: border-box;
			padding: 0 32rpx;
			.radioBox{
				width: 44rpx;
				height: 44rpx;
				float: left;
				border-radius: 50%;
				border: 1rpx solid #868686;
			}
			.currPay{
				border: 1rpx solid #fed461;
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/circleBg.png') no-repeat center;
				background-size: 20rpx auto;
			}
		}
		.box3_1{
			height: 150rpx;
			.radioBox{
				margin-top: 52rpx;
			}
			.center{
				float: left;
				margin-left: 28rpx;
				.title{
					font-size: 29rpx;
					line-height: 29rpx;
					margin-top: 36rpx;
				}
				.huifei{
					line-height: 26rpx;
					margin-top: 25rpx;
					font-size: 22rpx;
					.text1{
						color: #feba03;
						padding-right: 20rpx;
					}
					.text2{
						color: #feba03;
						font-size: 24rpx;
						text-decoration: underline  #fdcb63;
						// border-bottom: 1rpx solid #fdcb63;
					}
				}
			}
			.price{
				float: right;
				font-size: 22rpx;
				line-height: 150rpx;
				.priceMan{
					line-height: 22rpx;
					margin-top: 46rpx;
				}
				.priceWomen{
					line-height: 22rpx;
					margin-top: 20rpx;
				}
			}
		}
		.box3_2{
			height: 96rpx;
			.radioBox{
				margin-top: 27rpx;
				float: left;
			}
			.center{
				line-height: 96rpx;
				float: left;
				font-size: 29rpx;
				margin-left: 28rpx;
			}
			.price{
				font-size: 22rpx;
				float: right;
				line-height: 96rpx;
			}
		}
		.countBox{
			width: 100%;
			height: 40rpx;
			box-sizing: border-box;
			padding-left: 20rpx;
			font-size: 28rpx;
			color: #fff;
			line-height: 40rpx;
			margin-top: 42rpx;
			text{
				font-size: 36rpx;
				color: #f0b102;
				padding-right: 5rpx;
			}
		}
		.btnBox{
			margin-top: 32rpx;
		}
	}
</style>
