<template>
	<view class="addMember">
		<view class="whiteBg box1">
			<van-cell title="昵称" :value="item.nickName" />
			<van-cell title="手机号" :value="item.phone" />
			<van-cell title="性别" :value="sex" />
		</view>
		<view class="box2">
			<van-field
				input-align="right"
				 placeholder="请输入费用"
				label="费用"
				:border='false'
				type='digit'
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
				inputMoneyValue: '',
				item: '',
				sex: '',
				gNumber: 0,
				mNumber: 0,
			}
		},
		onLoad(options) {
			this.item = JSON.parse(decodeURIComponent(options.item))
			// console.log(this.item)
			if(this.item.sex == 1) {
				this.sex = '男'
				this.mNumber = 1
				this.gNumber = 0
			}else{
				this.sex = '女'
				this.gNumber = 1
				this.mNumber = 0
			}
		},
		methods: {
			inputMoney(v) {
				this.inputMoneyValue = v.detail
			},
			sureAdd() {
				this.$http.post({
					url: '/v1/rest/manage/sceneChargeAddMember',
					data: {
						clubId: uni.getStorageSync('clubId'),
						gNumber: this.gNumber,
						mNumber: this.mNumber,
						payType: 2,
						productId: uni.getStorageSync('addActId'),
						totalPrice: this.inputMoneyValue,
						userId: this.item.userId
					}
				}).then(resp => {
					// console.log(resp)
					if(resp.status == 200) {
						uni.showToast({
							title: '添加成功！',
							duration: 2000,
							icon: 'none'
						});
						uni.navigateBack()
					}else{
						uni.showToast({
							title: '操作失败！',
							duration: 2000,
							icon: 'none'
						});
					}
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