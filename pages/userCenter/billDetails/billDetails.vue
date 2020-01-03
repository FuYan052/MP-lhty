<template>
	<view class="billDetails">
		<view class="wrap whiteBg">
			<view class="top">+592.85</view>
			<view class="item item1">
				<view class="left">支付类型</view>
				<view class="right">收报名费</view>
			</view>
			<view class="item">
				<view class="left">支付会员</view>
				<view class="right">文艺青年-18575825654</view>
			</view>
			<view class="item">
				<view class="left">支付时间</view>
				<view class="right">2020-01-15&nbsp;&nbsp;&nbsp;18:00</view>
			</view>
			<view class="item">
				<view class="left">交易订单</view>
				<view class="right">82821568431355465632232</view>
			</view>
			<view class="item itemLast">
				<view class="left">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</view>
				<view class="right">羽毛球羽毛球毛球羽毛毛球羽毛</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	.billDetails{
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
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
			.top{
				width: 100%;
				height: 132rpx;
				line-height: 150rpx;
				text-align: center;
				font-size: 33rpx;
				color: #ea470e;
				font-weight: bold;
				border-bottom: 1rpx solid #f0f0f0;
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
	}
</style>