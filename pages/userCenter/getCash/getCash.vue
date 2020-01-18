 <template>
 	<view class="getCash">
		<view class="cashWrap1">
			<view class="account">
				<view class="title">到账账户</view>
				<view class="accountName">{{accout}}</view>
			</view>
			<view class="time">72小时内到账</view>
		</view>
		<view class="cashWrap2">
			<view class="wrap2Title">提现金额</view>
			<view class="inputBox">
				<view class="left">￥</view>
				<view class="right">
					<van-field
						:value='cashMoney'
						:border="false"
						@change="onChange"
						type='digit'
					/>
				</view>
			</view>
			<view class="tipsBox">
				<view class="tipMoney" v-show="showTips1">当前可提现金额{{hasMoney}}元,<text @click="cashTotal">全部提现</text></view>
				<view class="errTips" v-show="!showTips1">输入金额超过可提现金额</view>
			</view>
			<view class="btnBox myButton" @click="handleGetCash">
				提现
			</view>
		</view>
		<van-popup :show="isShow">
			<view class="box">
				<view class="titl1"><van-icon name="warning-o" size='30rpx' color='#ffbc01' />首次提现需要验证您的真实姓名</view>
				<van-field
					:border='false'
					placeholder="请输入您的真实姓名"
					bind:change="onChange"
					input-align='center'
					@change='inputName'
				/>
				<view class="btn" @click="submitName">提交</view>
			</view>
		</van-popup>
 	</view>
 </template>
 
 <script>
 	export default {
 		data() {
			return {
				cashMoney: '',
				hasMoney: 869.5,
				isShow: false,
				realName: '',
				accout: '',
				initTransfer: null,
				type: null,
				clubId: ''
			}
		},
		computed: {
			showTips1() {
				if(Number(this.cashMoney) > Number(this.hasMoney)) {
					return false
				}else{
					return true
				}
			}
		},
		onLoad(options) {
			this.type = options.type //上一页传过来的提现类型，0为用户提现，1为俱乐部会长提现
			if(this.type == 1) {
				this.clubId = uni.getStorageSync('clubId')
			}
		},
		onShow() {
			this.$http.get({
				url: '/v1/rest/userwallet/transferDetails',
				data: {
					type: this.type,  //0为用户提现，1为俱乐部会长提现
					clubId: this.clubId,
					userId: uni.getStorageSync('userInfo').userId
				}
			}).then(resp => {
				console.log(resp)
				if(resp.status == 200) {
					this.isShow = resp.data.initTransfer
					this.accout = resp.data.account
					this.hasMoney = resp.data.totalPrice
					this.realName = resp.data.userName
					this.initTransfer = resp.data.initTransfer
				}
			})
		},
		methods: {
			onChange(v) {
				this.cashMoney = v.detail
			},
			cashTotal() {
				this.cashMoney = this.hasMoney
			},
			inputName(v) {
				this.realName = v.detail
			},
			submitName() {
				this.isShow = false
			},
			handleGetCash() {
				this.$http.post({
					url: '/v1/rest/pay/transferPay',
					data: {
						clubId: this.clubId,
						initTransfer: this.initTransfer,
						totalPrice: Number(this.cashMoney),
						type: this.type,
						userId: uni.getStorageSync('userInfo').userId,
						userName: this.realName
					}
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						const that = this
						if(resp.data.errCode == 'NAME_MISMATCH') {
							uni.showModal({
								content: '真实姓名不一致，是否重新填写？',
								success: function (res) {
									if (res.confirm) {
										that.isShow = true
									} else if (res.cancel) {}
								}
							});
						}else{
							uni.showToast({
								title: resp.data.msg,
								duration: 4000,
								icon: 'none'
							})
						}
					}
				})
			}
		}
 	}
 </script>
 
 <style lang="scss" scoped>
	.getCash{
		width: 100%;
		height: 100vh;
		background: #ededed;
		box-sizing: border-box;
		padding: 0 30rpx;
		padding-top: 60rpx;
		.cashWrap1{
			width: 100%;
			height: 168rpx;
			background: #f7f7f7;
			overflow: hidden;
			.account{
				display: flex;
				font-size: 24rpx;
				line-height: 24rpx;
				margin-top: 47rpx;
				letter-spacing: 2rpx;
				.title{
					width: 145rpx;
					margin-left: 58rpx;
				}
				.accountName{
					color: #495e8d;
					letter-spacing: 1rpx;
				}
			}
			.time{
				font-size: 23rpx;
				color: #a8a8a8;
				margin-top: 28rpx;
				margin-left: 204rpx;
			}
		}
		.cashWrap2{
			width: 100%;
			height: 445rpx;
			background: #fff;
			box-sizing: border-box;
			padding: 0 57rpx;
			overflow: hidden;
			.wrap2Title{
				font-size: 25rpx;
				line-height: 25rpx;
				margin-top: 40rpx;
				letter-spacing: 3rpx;
			}
			.inputBox{
				width: 100%;
				height: 138rpx;
				border-bottom: 1rpx solid #dedede;
				margin-top: 8rpx;
				display: flex;
				align-items: center;
				.left{
					width: 110rpx;
					height: 75rpx;
					font-size: 48rpx;
					font-weight: 800;
				}
				.right{
					/deep/ .van-cell{
						height: 138rpx;
						padding: 0;
						display: flex;
						align-items: center;
						.van-field__input{
							font-weight: 800;
							font-size: 75rpx;
							height: 80rpx;
							line-height: 80rpx;
						}
					}
				}
			}
			.tipsBox{
				.tipMoney{
					font-size: 23rpx;
					color: #b7b7b7;
					height: 86rpx;
					line-height: 86rpx;
					letter-spacing: 2rpx;
					text{
						font-size: 24rpx;
						color: #485e8d;
					}
				}
				.errTips{
					font-size: 24rpx;
					color: #ff0000;
					line-height: 86rpx;
				}
			}
			.btnBox{
				color: #fff;
				margin-top: 30rpx;
			}
		}
		/deep/ .van-popup--center{
			top: 35%;
		}
		.box{
			width: 600rpx;
			height: 420rpx;
			box-sizing: border-box;
			padding: 0 36rpx;
			.titl1{
				width: 100%;
				height: 110rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 26rpx;
				color: #333333;
				/deep/ .van-icon{
					padding-right: 10rpx;
				}
			}
			/deep/ .van-cell{
				margin-top: 40rpx;
				border-bottom: 1rpx solid #999999;
			}
			.btn{
				width: 60%;
				height: 62rpx;
				text-align: center;
				color: #fff;
				font-size: 26rpx;
				line-height: 62rpx;
				background: #ffbc01;
				margin: 0 auto;
				margin-top: 70rpx;
				border-radius: 15rpx;
			}
		}
	}
 </style>