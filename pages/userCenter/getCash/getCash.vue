 <template>
 	<view class="getCash">
		<view class="cashWrap1">
			<view class="account">
				<view class="title">到账账户</view>
				<view class="accountName">得之我信</view>
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
			<view class="btnBox myButton">
				提现
			</view>
		</view>
 	</view>
 </template>
 
 <script>
 	export default {
 		data() {
			return {
				cashMoney: '',
				hasMoney: 869.5
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
		methods: {
			onChange(v) {
				this.cashMoney = v.detail
			},
			cashTotal() {
				this.cashMoney = this.hasMoney
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
	}
 </style>