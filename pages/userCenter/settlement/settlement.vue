<template>
	<view class="settlment">
		<view class="title">活动支出</view>
		<view class="whiteBg topBox1">
			<view class="item1">
				<van-field
					label="场地费"
					size='large'
					type='number'
					title-width='212rpx'
				/>
				<view class="text">元</view>
			</view>
			<view class="item1">
				<van-field
					label="羽毛球"
					:border="true"
					type='number'
					size='large'
					title-width='212rpx'
				/>
				<view class="text">元</view>
			</view>
			<view class="item1">
				<van-field
					label="其他"
					:border="false"
					type='number'
					size='large'
					title-width='212rpx'
				/>
				<view class="text">元</view>
			</view>
		</view>
		<view class="title">会费支出</view>
		<view class="whiteBg topBox2">
			<view class="item1">
				<van-field
					label="男"
					type='number'
					:border="true"
					size='large'
				/>
				<view class="text">元</view>
			</view>
			<view class="item1">
				<van-field
					label="女"
					type='number'
					:border="false"
					size='large'
				/>
				<view class="text">元</view>
			</view>
		</view>
		<!-- 合计 -->
		<view class="countBox">
			合计：<text>70.0</text>元
		</view>
		<view class="btnBox">
			<view class="myButton">结算</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				columns: [],
				clubName: '请选择俱乐部',
				clubId: '',
				money: ''
			}
		},
	}
</script>

<style lang="scss" scoped>
	.settlment{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0 16rpx;
		.title{
			width: 100%;
			height: 92rpx;
			line-height: 92rpx;
			box-sizing: border-box;
			color: #fff;
			font-size: 28rpx;
			padding-left: 22rpx;
		}
		.topBox1{
			width: 100%;
			height: auto;
			box-sizing: border-box;
			padding-right: 30rpx;
			/deep/ .van-cell__title{
				color: #303030;
				font-size: 26rpx;
			}
		}
		.topBox2{
			height: auto;
			box-sizing: border-box;
			padding-right: 30rpx;
			/deep/ .van-cell__title{
				color: #303030;
				font-size: 26rpx;
			}
		}
		.item1{
			position: relative;
			.text{
				height: 96rpx;
				line-height: 96rpx;
				position: absolute;
				top: 0;
				right: 0;
				font-size: 24rpx;
				color: #838383;
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
			margin-top: 50rpx;
			text{
				font-size: 36rpx;
				color: #f0b102;
				padding-right: 5rpx;
			}
		}
		.btnBox{
			margin-top: 100rpx;
		}
	}
</style>
