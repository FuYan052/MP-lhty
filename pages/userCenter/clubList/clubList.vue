<template>
	<view class="clubList">
		<view class="listItem" v-for="(item,index) in list" :key='index'>
			<view class="top" @click="toDetail(item)">
				<view class="imgBox">
					<image :src="item.logo" mode="" style="width: 100%; height: 100%;"></image>
				</view>
				<view class="detail">
					<view class="title">{{item.clubName}}</view>
					<view class="times">参加活动{{item.inCount}}次</view>
				</view>
				<van-icon name="arrow" size='28rpx' color='#b1b1b1'/>
			</view>
			<view class="bottom">
				<view class="btn btn1" @click="toMoneyDetail(item)">会费详情</view>
				<view class="btn btn2" @click="toclubRecharge(item)">会费充值</view>
			</view>
		</view>
		<!-- 缺省页 -->
		<view class="noData" v-show="isShowNoData"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				isShowNoData: false
			}
		},
		onLoad() {
			this.$http.get({
				url: '/v1/rest/club/clubList',
				data: {
					userId: uni.getStorageSync('userInfo').userId
				}
			}).then(resp => {
				// console.log(resp)
				if(resp.status == 200) {
					this.list = resp.data
					if(this.list.length == 0) {
						this.isShowNoData = true
					}else{
						this.isShowNoData = false
					}
				}
			})
		},
		methods: {
			// 活动详情
			toDetail(item) {
				// console.log(item)
				uni.navigateTo({
					url: '/pages/club/homePage/homePage?clubId=' + item.clubId
				})
			},
			// 会费详情
			toMoneyDetail(item) {
				uni.navigateTo({
					url: '/pages/club/clubMoney/clubMoney?clubId=' + item.clubId
				})
			},
			// 会费充值
			toclubRecharge(item) {
				uni.navigateTo({
					url: '/pages/userCenter/membershipFeeRecharge/membershipFeeRecharge?clubId=' + item.clubId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.clubList{
		width: 100%;
		min-height: 100vh;
		background: #f2f2f2;
		overflow: hidden;
		box-sizing: border-box;
		padding-bottom: 60rpx;
		.listItem{
			width: 100%;
			height: 220rpx;
			background: #fff;
			margin-top: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.top{
				width: 100%;
				height: 126rpx;
				box-sizing: border-box;
				padding: 0 20rpx;
				display: flex;
				align-items: center;
				.imgBox{
					width: 88rpx;
					height: 88rpx;
				}
				.detail{
					width: 580rpx;
					height: 88rpx;
					margin-left: 20rpx;
					.title{
						width: 575rpx;
						font-size: 30rpx;
						line-height: 50rpx;
						overflow: hidden;
						white-space: normal;
						text-overflow: ellipsis;
					}
					.times{
						font-size: 22rpx;
						line-height: 22rpx;
						color: #999999;
						margin-top: 10rpx;
					}
				}
			}
			.bottom{
				width: 100%;
				height: 68rpx;
				border-top: 1rpx solid #f4f4f4;
				border-bottom: 1rpx solid #f4f4f4;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.btn{
					box-sizing: bord er-box;
					width: 50%;
					text-align: center;
					font-size: 26rpx;
					line-height: 68rpx;
				}
				.btn2{
					color: #f3a833;
					border-left: 1rpx solid #f4f4f4;
				}
			}
		}
		.noData{
			width: 100%;
			height: 500rpx;
			background: url(~@/static/imgs/noData.png) no-repeat center;
			background-size: 460rpx auto;
			z-index: 9;
			margin-top: 150rpx;
		}
	}
</style>