<template>
	<view class="clubMemberInfo">
		<view class="topBox">
			<view class="imgBox">
				<image src="../../../static/logo.png" style="width: 100%; height: 100%; border-radius: 50%;" mode=""></image>
			</view>
			<view class="name">
				<text class="text" v-if="sex == 1">清风徐来</text>
				<text class="text text2" v-else>清风徐来</text>
			</view>
			<view class="region">四川成都</view>
			<view class="number">
				<text class="num1">俱乐部：835</text>
				<text class="num2">活跃度：635</text>
			</view>
			<view class="currClub">
				<text>俱乐部：神羽联盟俱乐部</text>
			</view>
		</view>
		<view class="content">
			<view class="title">他的装备</view>
			<view class="itemBox">
				<van-cell title="球拍" :border='false' is-link value="未设置" />
				<van-cell title="球线" :border='false' is-link value="未设置" />
				<van-cell title="磅数" :border='false' is-link value="未设置" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sex: 1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.clubMemberInfo{
		width: 100%;
		min-height: 100vh;
		background: #fff;
		.topBox{
			width: 100%;
			height: 519rpx;
			background: #1e1e1e;
			overflow: hidden;
			.imgBox{
				width: 162rpx;
				height: 162rpx;
				border-radius: 50%;
				margin: 0 auto;
				margin-top: 7rpx;
			}
			.name{
				box-sizing: border-box;
				font-size: 30rpx;
				line-height: 30rpx;
				color: #e3e3e3;
				text-align: center;
				margin-top: 25rpx;
				.text{
					padding-right: 32rpx;
					background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/manIcon2.png') no-repeat right center;
					background-size: 22rpx 32rpx;
				}
				.text2{
					padding-right: 38rpx;
					background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/womenIcon3.png') no-repeat right center;
					background-size: 25rpx 31rpx;
				}
			}
			.region{
				text-align: center;
				font-size: 22rpx;
				line-height: 22rpx;
				color: #949494;
				margin-top: 19rpx;
			}
			.number{
				text-align: center;
				font-size: 26rpx;
				line-height: 26rpx;
				color: #fff;
				margin-top: 47rpx;
				text{
					display: inline-block;
				}
				.num1{
					box-sizing: border-box;
					padding-right: 25rpx;
					border-right: 2rpx solid #fff;
				}
				.num2{
					margin-left: 27rpx;
				}
			}
			.currClub{
				height: 34rpx;
				text-align: center;
				font-size: 28rpx;
				color: #8d8d8d;
				margin-top: 43rpx;
				text{
					box-sizing: border-box;
					padding-left: 47rpx;
					background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/clubIcon.png') no-repeat left center;
					background-size: 32rpx 33rpx;
				}
			}
		}
		.content{
			width: 100%;
			height: 690rpx;
			background: #fff;
			.title{
				width: 100%;
				height: 95rpx;
				line-height: 95rpx;
				box-sizing: border-box;
				padding-left: 53rpx;
				font-size: 30rpx;
				color: #525252;
				border-bottom: 1rpx solid #f5f5f5;
				font-weight: 600;
			}
			.itemBox{
				width: 100%;
				height: auto;
				box-sizing: border-box;
				padding: 0 45rpx;
				font-size: 28rpx;
				/deep/ .van-cell{
					padding: 0;
					height: 88rpx;
					line-height: 88rpx;
					border-bottom: 1rpx solid #f5f5f5;
					padding-left: 7rpx;
					display: flex;
					align-items: center;
					.van-cell__title{
						color: #4f4d4e;
						font-size: 28rpx;
					}
					.van-cell__value{
						font-size: 26rpx;
						color: #525252;
					}
					.van-icon{
						font-size: 26rpx;
						color: #363636;
					}
				}
			}
		}
	}
</style>