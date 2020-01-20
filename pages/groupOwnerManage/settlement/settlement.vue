<template>
	<view class="settlment">
		<view class="title">活动支出</view>
		<view class="whiteBg topBox1">
			<view class="item1">
				<van-field
					label="场地费"
					size='large'
					type='digit'
					title-width='212rpx'
					@change='change1'
				/>
				<view class="text">元</view>
			</view>
			<view class="item1">
				<van-field
					label="羽毛球"
					:border="true"
					type='digit'
					size='large'
					title-width='212rpx'
					@change='change2'
				/>
				<view class="text">元</view>
			</view>
			<view class="item1">
				<van-field
					label="其他"
					:border="false"
					type='digit'
					size='large'
					title-width='212rpx'
					@change='change3'
				/>
				<view class="text">元</view>
			</view>
		</view>
		<view class="title">会费收入</view>
		<view class="whiteBg topBox2">
			<view class="item1">
				<van-field
					label="男"
					:value='money4'
					title-width='212rpx'
					type='digit'
					:border="true"
					size='large'
					readonly
				/>
			</view>
			<view class="item1">
				<van-field
					:value='money5'
					label="女"
					title-width='212rpx'
					type='digit'
					:border="false"
					size='large'
					readonly
				/>
			</view>
		</view>
		<!-- 合计 -->
		<!-- <view class="countBox">
			总支出：<text>{{total}}</text>元
		</view> -->
		<view class="btnBox">
			<view class="myButton" @click="handleSubmit">结算</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				actId: '',
				clubId: '',
				money1: '',
				money2: '',
				money3: '',
				money4: '',
				money5: '',
				
			}
		},
		computed: {
			total() {
				return Number(this.money1) + Number(this.money2) + Number(this.money3)
			}
		},
		onLoad(options) {
			// console.log(options)
			this.actId = options.actId
			this.$http.get({
				url: '/v1/rest/manage/settlementIncome',
				data: {
					activitiesId: this.actId
				}
			}).then(resp => {
				// console.log(resp)
				if(resp.status == 200) {
					this.money4 = resp.data.moneyMan + '/人'
					this.money5 = resp.data.moneyWomen + '/人'
				}
			})
		},
		methods: {
			change1(v) {
				this.money1 = v.detail
			},
			change2(v) {
				this.money2 = v.detail
			},
			change3(v) {
				this.money3 = v.detail
			},
			change4(v) {
				this.money4 = v.detail
			},
			change5(v) {
				this.money5 = v.detail
			},
			handleSubmit() {
				this.$http.post({
					url: '/v1/rest/manage/settlementDetails',
					data: {
						activitiesId: this.actId,
						clubId: uni.getStorageSync('clubId'),
						badmintonFee: this.money2,
						moneyMan: this.money4,
						moneyWomen: this.money5,
						operatorId: uni.getStorageSync('userInfo').userId,
						otherFee: this.money3,
						venueFee: this.money1,
					}
				}).then(resp => {
					// console.log(resp)
					if(resp.status == 200) {
						uni.showModal({
							title: '提示',
							showCancel: false,
							content: `${resp.data.message}\n支出：${resp.data.expenditure}元\n收入：${resp.data.income}元`,
							success: function (res) {
								if (res.confirm) {
									uni.navigateBack()
								} 
							}
						});
					}
				})
			}
		}
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
				width: 106rpx;
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
