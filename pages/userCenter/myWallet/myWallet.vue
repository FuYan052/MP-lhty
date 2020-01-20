<template>
	<view class="myWallet">
		<view class="card">
			<view class="text1">总金额(元)</view>
			<view class="money">{{total}}<text>元</text></view>
			<view class="btnBox">
				<view class="btn recharge" @click="handleRecharge">充值</view>
				<view class="btn cash" @click="cash">提现</view>
			</view>
		</view>
		<view class="menuBox">
			<van-cell
			  is-link
			  title="账户明细"
			  link-type="navigateTo"
			  url="/pages/dashboard/index"
				@click='toDetail'
			/>
			<van-cell
			  is-link
				:border='false'
			  title="常见问题"
			  link-type="navigateTo"
			  url="/pages/dashboard/index"
			/>
		</view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				total: ''
			}
		},
		created() {
			
		},
		onShow() {
			this.$http.get({
				url: '/v1/rest/personalCenter/personalCenter',
				data:{
					userId: uni.getStorageSync('userInfo').userId,
				}
			}).then(resp => {
				// console.log(resp)
				if(resp.status == 200) {
					this.total = resp.data.totalMoney
				}
			})
		},
		methods: {
			// 充值
			handleRecharge() {
				uni.navigateTo({
				  url: '/pages/userCenter/recharge/recharge'
				});
			},
			// 提现
			cash() {
				uni.navigateTo({
				  url: '/pages/userCenter/getCash/getCash?type=' + 0
				});
			},
			toDetail() {
				uni.navigateTo({
					url: '/pages/userCenter/accountDetails/accountDetails'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>    
	.myWallet{
		width: 100%;
		height: 100vh;
		background: #f4f4f4;
		overflow: hidden;
		.card{
			width: 690rpx;
			height: 402rpx;
			background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/qianbao.png') no-repeat center;
			background-size: cover;
			margin: 0 auto;
			overflow: hidden;
			margin-top: 50rpx;
			.text1{
				margin-left: 60rpx;
				color: #fff;
				font-size: 30rpx;
				margin-top: 52rpx;
				letter-spacing: 1rpx;
			}
			.money{
				width: 100%;
				text-align: center;
				font-size: 60rpx;
				color: #e1b423;
				line-height: 60rpx;
				margin-top: 50rpx;
				text{
					color: #fff;
					font-size: 28rpx;
					padding-left: 10rpx;
				}
			}
			.btnBox{
				width: 204rpx;
				height: 34rpx;
				margin-left: 200rpx;
				margin-top: 40rpx;
				.btn{
					 font-size: 28rpx;
					 line-height: 30rpx;
					 color: #fff;
					 border-bottom: 2rpx solid white;
					 float: left;
				}
				.cash{
					float: right;
					position: relative;
				}
				.cash::before{
					content: '';
					display: inline-block;
					width: 102rpx;
					height: 25rpx;
					position: absolute;
					right: 0;
					top: 4rpx;
					border-left: 2rpx solid #cbcbcb;
				}
			}
		}
		.menuBox{
			width: 100%;
			margin-top: 20rpx;
			box-sizing: border-box;
			padding-left: 10rpx;
			/deep/ .van-cell{
				background: none;
				.van-cell__title{
					font-size: 26rpx;
				}
			}
			/deep/ .van-cell::after{
				border-bottom: 1px solid #e7e7e7;
			}
		}
	}
</style>