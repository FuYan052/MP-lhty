<template>
	<view class="billDetails">
		<view class="wrap whiteBg">
			<view class="imgbox">
				<image :src="detail.headPortrait" style="width: 100%; height: 100%; border-radius: 50%;" mode=""></image>
			</view>
			<view class="top">
				<text class="text1" :class="{isNotIncome: !detail.algorithmType}"><text v-if="detail.algorithmType">+</text><text v-else>-</text>{{detail.totalMoney}}</text>
				</view>
			<view class="item item1">
				<view class="left">支付类型</view>
				<view class="right">{{detail.payType}}</view>
			</view>
			<view class="item">
				<view class="left">支付会员</view>
				<view class="right">{{detail.payUser}}-{{detail.phone}}</view>
			</view>
			<view class="item">
				<view class="left">支付时间</view>
				<view class="right">{{detail.createTime}}</view>
			</view>
			<view class="item">
				<view class="left">交易订单</view>
				<view class="right">{{detail.orderNo}}</view>
			</view>
			<view class="item itemLast">
				<view class="left">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</view>
				<view class="right">{{detail.remark}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				detail: ''
			}
		},
		onLoad(options) {
			console.log(options)
			this.id = options.id
			this.$http.get({
				url: '/v1/rest/userwallet/userWalletBillDetails',
				data: {
					userWalletBillId: this.id
				}
			}).then(resp => {
				console.log(resp)
				if(resp.status == 200) {
					this.detail = resp.data
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.billDetails{
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		// background: #dedede;
		background: #1E1E1E;
		box-sizing: border-box;
		padding: 0 32rpx;
		.whiteBg{
			width: 100%;
			min-height: 570rpx;
			margin-top: 40rpx;
			box-sizing: border-box;
			padding: 0 26rpx;
			overflow: hidden;
			padding-bottom: 50rpx;
			.imgbox{
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin: 10rpx auto;
				margin-top: 40rpx;
			}
			.top{
				width: 100%;
				height: 90rpx;
				line-height: 60rpx;
				text-align: center;
				font-size: 33rpx;
				color: #ea470e;
				font-weight: bold;
				border-bottom: 1rpx solid #f0f0f0;
				.text2{
					
				}
			}
			.item{
				width: 100%;
				min-height: 68rpx;
				display: flex;
				.left{
					width: 150rpx;
					font-size: 23rpx;
					color: #989898;
					line-height: 33rpx;
				}
				.right{
					flex: 1 ;
					font-size: 26rpx;
					color: #151515;
					line-height: 32rpx;
				}
			}
			.item1{
				margin-top: 28rpx;
			}
			.itemLast{
				.right{
					line-height: 40rpx;
				}
			}
		}
		.isNotIncome{
			color: #383838;
		}
	}
</style>