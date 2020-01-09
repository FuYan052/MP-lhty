<template>
	<view class="membershipDetails">
		<view class="topBox">
			<view class="userInfo">
				<view class="imgBox">
					<image :lazy-load='false' style="width: 100%; height: 100%; border-radius: 50%;"
						:src="headImg" mode="">
					</image>
				</view>
				<view class="name">{{name}}<text v-show="roleName">({{roleName}})</text></view>
			</view>
			<view class="title">账户余额</view>
			<view class="moneyBox">
				<view class="num">{{money}}</view>
				<view class="btn" @click="handleAdjust">调整会费</view>
			</view>
		</view>
		<view class="detailBox">
			<view class="title">会费变更记录</view>
			<view class="detailItem" v-for="(item,index) in list" :key='index'>
				<view class="left">
					<view class="type">{{item.payState}}</view>
					<view class="date">日期：{{item.createTime}}</view>
				</view>
				<view class="right">
					<view class="number n1" v-if="item.algorithmType">+￥{{item.totalMoney}}</view>
					<view class="number n2" v-else>-￥{{item.totalMoney}}</view>
					<view class="name">{{item.nickName}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				userId: '',
				clubId: '',
				headImg: '',
				name: '',
				money: '',
				roleName: null,
				list: []
			}
		},
		onLoad(options) {
			this.userId = options.userId
			this.clubId = options.clubId
		},
		onShow() {
			this.$http.get({
				url: '/v1/rest/manage/membershipFeeDetailed',
				data: {
					userId: this.userId,
					clubId: this.clubId
				}
			}).then(resp => {
				console.log(resp)
				if(resp.status == 200) {
					this.headImg = resp.data.headPortrait
					this.name = resp.data.nickName
					this.roleName = resp.data.roleName
					this.money = resp.data.totalMoney
					this.list = resp.data.feeDetailedBackVoList
				}
			})
		},
		methods: {
			handleAdjust() {
				const item = {
					totalMoney: this.money,
					userId: this.userId
				}
				uni.navigateTo({
					url: '/pages/groupOwnerManage/costAdjust/costAdjust?item=' + encodeURIComponent(JSON.stringify(item))
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.membershipDetails{
		width: 100%;
		min-height: 100vh;
		background: #fff;
		box-sizing: border-box;
		padding-bottom: 80rpx;
		.topBox{
			width: 100%;
			height: 322rpx;
			background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/manageBg2.png') no-repeat center;
			background-size: cover;
			box-sizing: border-box;
			padding: 0 42rpx;
			.userInfo{
				width: 100%;
				height: 134rpx;
				display: flex;
				align-items: center;
				.imgBox{
					width: 66rpx;
					height: 66rpx;
					border-radius: 50%;
				}
				.name{
					font-size: 28rpx;
					color: #f4f4f4;
					margin-left: 22rpx;
				}
			}
			.title{
				font-size: 26rpx;
				color: #f4f4f4;
				line-height: 52rpx;
			}
			.moneyBox{
				width: 100%;
				height: 112rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.num{
					font-size: 54rpx;
					color: #f3b568;
					font-weight: bold;
				}
				.btn{
					font-size: 24rpx;
					color: #ede9e9;
					text-decoration: underline #c4c4c4;
					letter-spacing: 1rpx;
				}
			}
		}
		.detailBox{
			width: 100%;
			height: auto;
			box-sizing: border-box;
			padding: 0 42rpx;
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
					.n2{
						color: #2c2c2c;
					}
					.name{
						font-size: 24rpx;
						line-height: 44rpx;
						color: #8a8a8a;
						text-align: right;
					}
				}
			}
			.detailItem:nth-last-of-type(1) {
				border: none;
			}
		}
	}
</style>