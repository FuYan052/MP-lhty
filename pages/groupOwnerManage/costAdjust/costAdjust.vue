<template>
	<view class="costAdjust">
		<view class="box1">
			<van-field
				value="35"
				input-align="right"
				 placeholder="请输入金额"
				label="余额"
				:border='false'
				type='number'
				@change='inputMoney'
			/>
		</view>
		<view class="myButton" @click="sureAdd">
			确认调整
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
		methods: {
			inputMoney(v) {
				this.inputMoneyValue = v.detail
			},
		}
	}
</script>

<style lang="scss" scoped>
	.costAdjust{
		width: 100%;
		height: 100vh;
		background: #f4f4f4;
		box-sizing: border-box;
		padding: 0 36rpx;
		overflow: hidden;
		.box1{
			margin-top: 20rpx;
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
			margin-top: 530rpx;
		}
	}
</style>
