<template>
	<view class="membershipFeeRecharge">
		<view class="whiteBg topBox">
			<van-cell title="充值俱乐部" :border='false' :value="clubName" title-width='190rpx' is-link size='large' @click='choiceClub'/>
			<view class="myCell account">
				<view class="title">充值账户</view>
				<view class="right">
					<text>{{userName}}</text>
					<view class="imgBox">
						<image style="width: 100%; height: 100%;" :src="headImg" mode=""></image>
					</view>
				</view>
			</view>
			<view class="myCell">
				<view class="title">支付方式</view>
				<view class="right">
					<text>微信支付</text>
					<view class="imgBox">
						<image style="width: 100%; height: 100%;" src="https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/weixinIcon2.png" mode=""></image>
					</view>
				</view>
			</view>
			<van-field
				:value="money"
				type='number'
				title-width='260rpx'
				:border='false'
				label="充值金额"
				placeholder="请输入您要充值的金额"
				placeholder-style='font-size:26rpx;'
				@change='inputMoney'
			/>
		</view>
		<view class="btnbox">
			<view class="myButton" type="primary" @click="submit">确认充值</view>
		</view>
		<!-- 选择器 -->
		<w-picker
			mode="selector" 
			:selectList="columns"
			@confirm="onConfirm" 
			ref="picker1" 
			themeColor="#ffbc01" 
		></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				columns: [{label: '',value: ''}],
				clubName: '请选择俱乐部',
				clubId: '',
				money: '',
				userName: '',
				headImg: ''
			}
		},
		created() {
			this.$http.get({
				url: '/v1/rest/club/clubMemberRecharge',
				data: {
					userId: uni.getStorageSync('userInfo').userId
				}
			}).then(resp => {
				console.log(resp)
				if(resp.status == 200) {
					this.headImg = resp.data.headPortrait
					this.userName = resp.data.account
					this.columns = resp.data.labelReturnVoList
				}
			})
		},
		methods: {
			choiceClub() {
				this.$refs.picker1.show()
			},
			onConfirm(v) {
				// console.log(v)
				this.clubId = v.checkArr.value
				this.clubName = v.checkArr.label
			},
			inputMoney(v) {
				this.money = v.detail
			},
			submit() {
				if(this.clubId == '') {
					uni.showToast({
						title: '请选择要充值的俱乐部',
						duration: 2000,
						icon: 'none'
					});
				}else if(Number(this.money) <= 0) {
					uni.showToast({
						title: '请输入您要充值的金额',
						duration: 2000,
						icon: 'none'
					});
				}else{
					const that = this
					this.$http.post({
						url: '/v1/rest/pay/pay',
						data: {
							userId: uni.getStorageSync('userInfo').userId,
							totalPrice: Number(this.money),
							clubOrUserWalletId: this.clubId,
							type: 1  //与后端约定钱包type为0，会费充值type为1
						}
					}).then(resp => {
						console.log(resp)
						if(resp.statusCode == 200) {
							uni.login({
							  provider: 'weixin',
							  success: function (loginRes) {
							    that.$http.get({
							    	url: '/v1/rest/login/updateOpenId',
							    	data:{
							    		code: loginRes.code,
											userId: uni.getStorageSync('userInfo').userId
							    	}
							    }).then(resp => {
										console.log(resp)
										that.submit()
									})
							  }
							});
						}else if(resp.status == 200) {
							this.orderNo = resp.data.orderNo
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: resp.data.timeStamp,
								nonceStr: resp.data.nonceStr,
								package: resp.data.package,
								signType: resp.data.signType,
								paySign: resp.data.paySign,
								success: function (res) {
									console.log(res)
									// 支付成功回调
									that.$http.get({
										url: '/v1/rest/pay/memberWechatPayCallback',
										data: {
											type: 'success',
											orderNo: that.orderNo,
											rechargeType: 1,
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
									console.log(err)
									// 支付取消回调
									that.$http.get({
										url: '/v1/rest/pay/memberWechatPayCallback',
										data: {
											type: 'fail',
											orderNo: that.orderNo,
											rechargeType: 1,
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
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.membershipFeeRecharge{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0 28rpx;
		.topBox{
			height: 376rpx;
			margin-top: 40rpx;
			box-sizing: border-box;
			padding-top: 6rpx;
			/deep/ .van-cell{
				height: 90rpx;
				border-radius: 12rpx;
				.van-cell__title{
					color: #504e4f;
					font-size: 28rpx;
				}
				.van-cell__value{
					font-size: 26rpx;
					color: #515151;
				}
				.van-icon{
					color: #3a3a3a;
				}
			}
			/deep/ .van-cell::after {
				right: 32rpx;
			}
			.myCell{
				width: 650rpx;
				height: 90rpx;
				margin: 0 auto;
				border-bottom: 1px solid #e8e8e8;
				.title{
					width: 190rpx;
					height: 90rpx;
					line-height: 90rpx;
					color: #504e4f;
					font-size: 28rpx;
					float: left;
					padding-left: 8rpx;
				}
				.right{
					float: right;
					text{
						display: block;
						float: right;
						text-align: right;
						line-height: 90rpx;
						font-size: 26rpx;
						color: #515151;
						padding-right: 15rpx;
					}
					.imgBox{
						display: block;
						float: right;
						margin-top: 4rpx;
						width: 37rpx;
						height: 35rpx;
						margin-right: 10rpx;
						line-height: 92rpx;
					}
				}	
			}
			.account{
				border-top: 1px solid #e8e8e8;
			}
			/deep/ .van-field__input{
				text-align: right;
				font-size: 34rpx;
			}
			/deep/ .van-cell__title{
				color: #504e4f;
				font-size: 28rpx;
			}
		}
		.btnbox{
			margin-top: 110rpx;
		}
	}
</style>