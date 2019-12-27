<template>
	<view class="capitalDetails">
		<view class="topBox">
			<view class="total">
				<view class="title">账户总额</view>
				<view class="num">576.00</view>
			</view>
			<view class="wrap">
				<view class="box">
					<view class="tit">线下金额：</view>
					<view class="num">35555943.00</view>
				</view>
				<view class="box">
					<view class="tit">线上金额：</view>
					<view class="num">6525.00</view>
				</view>
				<view class="btn">可提现</view>
			</view>
		</view>
		<view class="detailBox">
			<view class="title">明细</view>
			<view class="detailItem" v-for="(item,index) in 10" :key='index'>
				<view class="left">
					<view class="type">会员充值</view>
					<view class="date">日期：2019-12-31</view>
				</view>
				<view class="right">
					<view class="number">+￥200.00</view>
					<view class="name">张丽</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	.capitalDetails{
		width: 100%;
		min-height: 100vh;
		background: #fff;
		box-sizing: border-box;
		padding: 0 28rpx;
		padding-bottom: 80rpx;
		.topBox{
			width: 100%;
			height: 322rpx;
			border-radius: 10rpx;
			background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/manageBg1.png') no-repeat center;
			background-size: cover;
			box-sizing: border-box;
			padding: 0 40rpx;
			overflow: hidden;
			.total{
				width: 100%;
				height: 186rpx;
				overflow: hidden;
				.title{
					font-size: 26rpx;
					line-height: 28rpx;
					margin-top: 46rpx;
					font-weight: 600;
				}
				.num{
					font-size: 40rpx;
					font-weight: bold;
					line-height: 50rpx;
					margin-top: 20rpx;
				}
			}
			.wrap{
				height: 100rpx;
				display: flex;
				align-items: center;
				.box{
					width: 255rpx;
					font-size: 26rpx;
					.tit{
						font-size: 24rpx;
						line-height: 34rpx;
						font-weight: 600;
					}
					.num{
						font-size: 30rpx;
						line-height: 60rpx;
						font-weight: 600;
					}
				}
				.btn{
					width: 148rpx;
					height: 57rpx;
					line-height: 57rpx;
					text-align: center;
					font-size: 24rpx;
					color: #fff;
					border-radius: 26rpx;
					background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/cashBtnBg.png') no-repeat center;
					background-size: cover;
				}
			}
		}
		.detailBox{
			width: 100%;
			height: auto;
			box-sizing: border-box;
			padding: 0 16rpx;
			.title{
				width: 100%;
				height: 90rpx;
				border-bottom: 1rpx solid #e1e1e1;
				line-height: 90rpx;
				font-size: 28rpx;
			}
			.detailItem{
				width: 100%;
				height: 140rpx;
				border-bottom: 1rpx solid #f5f4f4;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left{
					.type{
						font-size: 26rpx;
						color: #343434;
						line-height: 44rpx;
					}
					.date{
						font-size: 24rpx;
						color: #9f9f9f;
						line-height: 44rpx;
					}
				}
				.right{
					.number{
						font-size: 26rpx;
						color: #e74d33;
						line-height: 46rpx;
						font-weight: 600;
					}
					.name{
						font-size: 24rpx;
						line-height: 44rpx;
						color: #8a8a8a;
					}
				}
			}
			.detailItem:nth-last-of-type(1) {
				border: none;
			}
		}
	}
</style>