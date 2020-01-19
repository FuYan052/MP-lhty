<template>
	<view class="costAdjust">
		<view class="box1">
			<van-field
				:value="money"
				placeholder="请输入金额"
				label="会费余额"
				input-align='right'
				:border='false'
				readonly
			/>
		</view>
		<view class="box2 whiteBg">
			<view class="item item1">
				<view class="left">调&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;整</view>
				<view class="right">
					<view class="btnWrap increase" :class="{increaseStyle: isIncrease}" @click="select(1)">
						<view class="btn"></view>
						<view class="text">增加</view>
					</view>
					<view class="btnWrap decrease" :class="{increaseStyle: !isIncrease}"  @click="select(2)">
						<view class="btn"></view>
						<view class="text">减少</view>
					</view>
				</view>
			</view>
			<view class="item item2">
				<view class="right">
					<van-field
						placeholder="请输入调整金额"
						input-align='right'
						label="调整金额"
						:border='false'
						@change='inputMoney'
						type='digit'
					/>
				</view>
			</view>
		</view>
		<view class="myButton" @click="sureChange">
			确认调整
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputMoneyValue: '',
				money: 35 + '元',
				isIncrease: true,
				userId: null
			}
		},
		onLoad(options) {
			const item = JSON.parse(decodeURIComponent(options.item))
			console.log(item)
			this.money = item.totalMoney + '元'
			this.userId = item.userId
		},
		methods: {
			inputMoney(v) {
				this.inputMoneyValue = v.detail
			},
			select(v) {
				console.log(v)
				if(v == 1) {
					this.isIncrease = true
				}else{
					this.isIncrease = false
				}
			},
			sureChange() {
				this.$http.post({
					url: '/v1/rest/manage/adjustmentMembershipFee',
					data: {
						clubId: uni.getStorageSync('clubId'),
						operatorId: uni.getStorageSync('userInfo').userId,
						userId: this.userId,
						algorithmType: this.isIncrease,
						totalMoney: Number(this.inputMoneyValue)
					}
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						uni.showToast({
							title: '调整成功！',
							duration: 2000,
							icon: 'none'
						});
						uni.navigateBack()
					}
				})
			}
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
		.box2{
			height: 200rpx;
			box-sizing: border-box;
			padding: 0 34rpx;
			margin-top: 20rpx;
			.item{
				width: 100%;
				height: 95rpx;
				display: flex;
				align-items: center;
				.left{
					font-size: 28rpx;
					color: #000;
					font-weight: 700;
				}
				.rigth{
					flex: 1;
				}
			}
			.item1{
				border-bottom: 1rpx solid #ebebeb;
				display: flex;
				justify-content: space-between;
				.right{
					width: 256rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.btnWrap{
						width: 104rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.btn{
							width: 30rpx;
							height: 30rpx;
							border-radius: 50%;
							border: 1rpx solid #d7d7d7;
							position: relative;
						}
						.btn::before{
							content: '';
							width: 18rpx;
							height: 18rpx;
							background: #a0a0a0;
							border-radius: 50%;
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							margin: auto;
						}
						.text{
							font-size: 27rpx;
							color: #404040;
						}
					}
					.increaseStyle{
						.btn{
							border: 1rpx solid #ffce41;
						}
						.btn::before{
							content: '';
							width: 18rpx;
							height: 18rpx;
							background: #ffbc01;
							border-radius: 50%;
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							margin: auto;
						}
					}
				}
			}
			.item2{
				height: 100rpx;
				.right{
					width: 100%;
					/deep/ .van-cell{
						border-radius: 12rpx;
						padding: 0;
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
			}
		}
		.myButton{
			margin-top: 530rpx;
		}
	}
</style>
