<template>
	<view class="signInDetails">
		<view class="contentBox">
			<view class="itemBox" v-for="(item,index) in 10" :key='index'>
				<view class="detail">
					<view class="top">
						<view class="imgBox">
							<image style="width: 100%; height: 100%; border-radius: 50%;"
								src="http://f1.haiqq.com/allimg/3831982416/2817233822.jpg" mode="">
							</image>
						</view>
						<view class="info">
							<view class="name">文艺青年(男)</view>
							<view class="phone">18334531374</view>
						</view>
						<view class="money">支付金额：32元</view>
					</view>
					<view class="bottom">
						<view>支付方式：微信支付</view>
						<view>报名时间：2019年8月18日</view>
						<view>12:00</view>
					</view>
				</view>
				<view class="chekcBox"></view>
			</view>
		</view>
		<view class="btnBox">
			<view class="allChoice">
				<view class="text">全选</view>
				<view class="checkBox"></view>
			</view>
			<view class="btn">签到</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	.signInDetails{
		width: 100%;
		height: 100vh;
		background: #f4f4f4;
		flex-direction: column;
		display: flex;
		.contentBox{
			width: 100%;
			overflow: auto;
			box-sizing: border-box;
			padding: 0 16rpx;
			flex: 1;
			.itemBox{
				width: 100%;
				height: 218rpx; 
				margin-top: 23rpx;
				display: flex;
				align-items: center;
				.detail{
					width: 622rpx;
					height: 218rpx;
					background: #fff;
					border-radius: 15rpx;
					box-sizing: border-box;
					padding: 0 32rpx;
					.top{
						width: 100%;
						height: 154rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.imgBox{
							width: 88rpx;
							height: 88rpx;
							border: 50%;
						}
						.info{
							max-width: 222rpx;
							font-size: 27rpx;
							height: 86rpx;
							.name{
								line-height: 50rpx;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
							.phone{
								line-height: 36rpx;
							}
						}
						.money{
							width: 180rpx;
							font-size: 22rpx;
							color: #ffbc01;
						}
					}
					.bottom{
						width: 100%;
						height: 56rpx;
						border-top: 1rpx dashed #c8c8c8;
						display: flex;
						font-size: 18rpx;
						align-items: center;
						color: #5e5e5e;
						view{
							margin: 0 20rpx;
						}
					}
				}
				.chekcBox{
					width: 36rpx;
					height: 36rpx;
					border-radius: 50%;
					border: 1rpx solid #8b8b8b;
					margin-left: 24rpx;
				}
			}
		}
		.btnBox{
			width: 100%;
			height: 170rpx;
			display: flex;
			flex-direction: column;
			.allChoice{
				width: 100%;
				height: 70rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.text{
					font-size: 27rpx;
				}
				.checkBox{
					width: 36rpx;
					height: 36rpx;
					border: 1rpx solid #ffbd05;
					border-radius: 50%;
					margin-right: 52rpx;
					margin-left: 26rpx;
				}
			}
			.btn{
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				background: #ffbc01;
				font-size: 32rpx;
				color: #000000;
			}
		}
	}
</style>