<template>
	<view class="myActivities">
		<view class="cateBox">
			<view class="cateItem" :class="{currCate: currIndex == index}" v-for="(item,index) in cateList" :key="index" @click="changeCate(index)">
				{{item}}
			</view>
		</view>
		<view class="orderItem" v-for="(item,index) in actList" :key='index'>
			<view class="content" @click="toDetail(item)">
				<view class="imgBox">
					<image :src="item.venueImage" style="width: 100%; height: 100%;" mode=""></image>
				</view>
				<view class="detail">
					<view class="title">{{item.title}}</view>
					<view class="clubName">{{item.time}}<text class="time">{{item.timeStart}}-{{item.timeEnd}}</text></view>
					<view class="place">
						<view class="money">￥<text class="cost">{{item.totalFee}}</text>/人</view>
						<view class="name">{{item.venueName}}</view>
					</view>
				</view>
			</view>
			<view class="btnBox">
				<view class="btn" :class="'btn' + item.osStateId">{{item.osState}}</view>
				<view class="btn btn6" v-show="currIndex == 1" @click="handleCancel(item)">点击取消</view>
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
				cateList: ['全部','已预约','进行中','已完成','已取消'],
				cateState: 0,
				currIndex: 0,
				actList: [],
				isShowNoData: false
			}
		},
		created() {
			this.getList()
		},
		methods: {
			// 获取活动列表
			getList() {
				this.$http.get({
					url: '/v1/rest/personalCenter/myActivityList',
					data: {
						state: this.cateState,
						userId: uni.getStorageSync('userInfo').userId
					}
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						this.actList = resp.data
						if(this.actList.length == 0) {
							this.isShowNoData = true
						}else{
							this.isShowNoData = false
						}
					}
				})
			},
			// 切换分类
			changeCate(index) {
				this.isShowNoData = false
				this.currIndex = index
				this.cateState = index
				this.getList()
			},
			// 取消活动
			handleCancel(item) {
				const that = this
				uni.showModal({
					title: '提示',
					content: '确定要取消该条活动吗？',
					success: function (res) {
						if (res.confirm) {
							that.$http.post({
								url: '/v1/rest/pay/refund',
								data: {
									orderNo: item.orderNo
								}
							}).then(resp => {
								console.log(resp)
								if(resp.status == 200) {
									that.getList()
									uni.showToast({
										title: resp.data.msg,
										duration: 2000,
										icon: 'none'
									}); 
								}
							})
						} else if (res.cancel) {}
					}
				});
			},
			// 活动详情
			toDetail(item) {
				uni.navigateTo({
					url: '/pages/activity/activityDetails/activityDetails?actId=' + item.activitiesId
				})
			}
		}
	}
</script> 

<style lang="scss" scoped>
	.myActivities{
		width: 100%;
		min-height: 100vh;
		background: #f4f4f4;
		box-sizing: border-box;
		overflow: hidden;
		padding: 0 32rpx;
		padding-top: 90rpx;
		padding-bottom: 20rpx;
		.cateBox{
			width: 100%;
			height: 90rpx;
			background: #f4f4f4;
			display: flex;
			justify-content: space-around;
			position: fixed;
			top: 0;
			left: 0;
			.cateItem{
				height: 46rpx;
				font-size: 28rpx;
				line-height: 46rpx;
				color: #393939;
			}
			.currCate{
				color: #fdc101;
				border-bottom: 5rpx solid #ffc102;
			}
		}
		.orderItem{
			width: 100%;
			height: 366rpx;
			border-radius: 15rpx;
			background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/actItemBg.png') no-repeat center;
			background-size: 100% 100%;
			box-sizing: border-box;
			padding: 0 28rpx;
			margin-bottom: 28rpx;
			.content{
				width: 100%;
				height: 254rpx;
				border-bottom: 1rpx solid #686563;
				display: flex;
				align-items: center;
				.imgBox{
					width: 158rpx;
					height: 158rpx;
					margin-left: 10rpx;
				}
				.detail{
					width: 445rpx;
					height: 180rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding-left: 37rpx;
					font-size: 24rpx;
					line-height: 26rpx;
					color: #fff;
					.title{
						width: 100%;
						font-size: 32rpx;
						line-height: 34rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.clubName{
						.time{
							padding-left: 30rpx;
						}
					}
					.place{
						display: flex;
						.money{
							color: #feaf01;
							font-size: 22rpx;
							width: 150rpx;
							.cost{
								font-size: 31rpx;
								font-weight: bold;
							}
						}
						.name{
							width: 275rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							line-height: 26rpx;
						}
					}
				}
			}
			.btnBox{
				width: 100%;
				height: 102rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.btn{
					width: 124rpx;
					height: 50rpx;
					text-align: center;
					line-height: 50rpx;
					font-size: 25rpx;
					border-radius: 10rpx;
					border: 1rpx solid #ee4e5a;
					color: #f1757d;
				}
				.btn1{  //预约成功
					color: #fff;
					border: 1rpx solid #ffc102;
					background: #ffc102;
				}
				.btn2{  //预约成功
					color: #fff;
					border: 1rpx solid #ffc102;
					background: #ffc102;
				}
				.btn3{ //预约成功
					color: #fff;
					border: 1rpx solid #ffc102;
					background: #ffc102;
					// background: #84d948;
				}
				.btn5{  //已结束
					color: #fff;
					border: 1rpx solid #353535;
					background: #353535;
				}
				.btn4{  //进行中
					color: #fff;
					border: 1rpx solid #ffc102;
					background: #84d948;
				}
				.btn6{ //取消
					margin-left: 33rpx;
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