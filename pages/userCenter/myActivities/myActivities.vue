<template>
	<view class="myActivities">
		<view class="cateBox">
			<view class="cateItem" :class="{currCate: currIndex == index}" v-for="(item,index) in cateList" :key="index" @click="changeCate(index)">
				{{item}}
			</view>
		</view>
		<view class="orderItem" v-for="(item,index) in actList" :key='index'>
			<view class="content">
				<view class="imgBox">
					<image src="../../../static/logo.png" style="width: 100%; height: 100%;" mode=""></image>
				</view>
				<view class="detail">
					<view class="title">神羽联盟俱乐部12月31日晚19：00羽毛球神羽联盟俱乐部12月31日晚19：00羽毛球</view>
					<view class="clubName">2019-12-31<text class="time">19:00-21:00</text></view>
					<view class="place">
						<view class="money">￥<text class="cost">20</text>/人</view>
						<view class="name">波利羽毛球馆</view>
					</view>
				</view>
			</view>
			<view class="btnBox">
				<view class="btn btn1" v-if="item.state == 1">预约成功</view>
				<view class="btn btn2" v-else-if="item.state == 2">进行中</view>
				<view class="btn btn3" v-else-if="item.state == 3">已结束</view>
				<view class="btn btn4" v-else="item.state == 4">已取消</view>
				<view class="btn btn5" v-show="item.state == 1">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cateList: ['全部','已预约','进行中','已完成','已取消'],
				currIndex: 0,
				actList: []
			}
		},
		created() {
			this.actList = [
				{
					state: 1
				},
				{
					state: 3
				},
				{
					state: 2
				},
				{
					state: 1
				},
				{
					state: 4
				},
				{
					state: 2
				},
				{
					state: 1
				},
				{
					state: 3
				},
				{
					state: 4
				},
			]
		},
		methods: {
			// 切换分类
			changeCate(index) {
				this.currIndex = index
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
			height: 386rpx;
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
							.cost{
								font-size: 31rpx;
								font-weight: bold;
							}
						}
						.name{
							margin-left: 70rpx;
							width: 275rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							line-height: 26rpx;
						}
					}
				}
			}
			.btnBox{
				width: 100%;
				height: 132rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.btn{
					width: 164rpx;
					height: 68rpx;
					text-align: center;
					line-height: 68rpx;
					font-size: 28rpx;
					border-radius: 10rpx;
					border: 1rpx solid #ee4e5a;
					color: #f1757d;
				}
				.btn1{
					color: #fff;
					border: 1rpx solid #ffc102;
					background: #ffc102;
				}
				.btn2{
					color: #fff;
					border: 1rpx solid #84d948;
					background: #84d948;
				}
				.btn3{
					color: #fff;
					border: 1rpx solid #353535;
					background: #353535;
				}
				.btn4{
					color: #b1b1b1;
					border: 1rpx solid #b1b1b1;
				}
				.btn5{
					margin-left: 33rpx;
				}
			}
		}
	}
</style>