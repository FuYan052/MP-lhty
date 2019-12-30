<template>
	<view class="addMember">
		<view class="whiteBg box1">
			<van-cell title="昵称" value="文艺青年" />
			<van-cell title="手机号" value="18919127017" />
			<van-cell title="性别" value="男" />
		</view>
		<view class="box2">
			<van-field
				value="35"
				input-align="right"
				 placeholder="请输入费用"
				label="费用"
				:border='false'
				type='number'
				@change='inputMoney'
			/>
		</view>
		<view class="myButton" @click="sureAdd">
			添加
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputMoneyValue: ''
			}
		},
		onLoad(options) {
			console.log(options)
		},
		methods: {
			inputMoney(v) {
				this.inputMoneyValue = v.detail
			},
			sureAdd() {
				uni.redirectTo({
					url: '/pages/groupOwnerManage/spotChargeDetial/spotChargeDetial'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.addMember{
		width: 100%;
		min-height: 100vh;
		background: #f4f4f4;
		box-sizing: border-box;
		padding: 0 33rpx;
		padding-top: 20rpx;
		.box1{
			height: auto;
			border-radius: 12rpx;
			box-sizing: border-box;
			padding-right: 16rpx;
			/deep/ .van-cell{
				border-radius: 12rpx;
			}
			/deep/ .van-cell__title{
				font-size: 28rpx;
				color: #000;
				font-weight: 700;
			}
			/deep/ .van-cell__value{
				color: #404040;
			}
		}
		.box2{
			width: 100%;
			margin-top: 26rpx;
			border-radius: 12rpx;
			box-sizing: border-box;
			/deep/ .van-cell{
				border-radius: 12rpx;
			}
			/deep/ .van-cell__title{
				font-size: 28rpx;
				color: #000;
				font-weight: 700;
			}
			/deep/ .van-cell__value{
				color: #404040;
			}
			/deep/ .van-field__input{
				padding-right: 16rpx;
			}
		}
		.myButton{
			margin-top: 200rpx;
		}
	}
</style>