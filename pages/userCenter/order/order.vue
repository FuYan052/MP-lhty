<template>
	<view class="order">
		<view class="cateBox">
			<view class="cateItem" :class="{currCate: currIndex == index}" v-for="(item,index) in cateList" :key="index" @click="changeCate(index)">
				{{item}}
			</view>
		</view>
		<view class="orderItem" v-for="(item,index) in actList" :key='index'>
			<view class="titleBox">
				<view class="text">
					神羽联盟俱乐部12月31日晚19：00羽毛球神羽联盟俱乐部12月31日晚19：00羽毛球
				</view>
				<van-icon class="arrowIcon" name="arrow" size="28rpx" color='#3c3731'/>
			</view>
			<view class="content">
				<view class="imgBox">
					<image src="../../../static/logo.png" style="width: 100%; height: 100%;" mode=""></image>
				</view>
				<view class="detail">
					<view class="clubName">地点：波利羽毛球馆</view>
					<view class="date">日期：2019-12-31</view>
					<view class="time">时间：19:00-21:00</view>
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
	.order{
		width: 100%;
		min-height: 100vh;
		background: #ebebeb;
		padding-top: 92rpx;
		padding-bottom: 40rpx;
		.cateBox{
			width: 100%;
			height: 92rpx;
			background: #fff;
			display: flex;
			justify-content: space-around;
			position: fixed;
			top: 0;
			left: 0;
			.cateItem{
				font-size: 28rpx;
				line-height: 92rpx;
			}
			.currCate{
				color: #fdc101;
				border-bottom: 2rpx solid #ffc102;
			}
		}
		.orderItem{
			width: 100%;
			height: auto;
			background: #fff;
			margin-top: 20rpx;
			box-sizing: border-box;
			padding: 0 21rpx;
			.titleBox{
				width: 100%;
				height: 62rpx;
				border-bottom: 1rpx solid #ebebeb;
				display: flex;
				justify-content: space-between;
				.text{
					width: 85%;
					line-height: 62rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 26rpx;
					color: #000000;
				}
			}
			.content{
				width: 100%;
				height: 213rpx;
				border-bottom: 1rpx solid #ebebeb;
				display: flex;
				align-items: center;
				.imgBox{
					width: 180rpx;
					height: 180rpx;
				}
				.detail{
					flex: 1;
					height: 180rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding-left: 20rpx;
					font-size: 24rpx;
				}
			}
			.btnBox{
				width: 100%;
				height: 83rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.btn{
					width: 142rpx;
					height: 56rpx;
					text-align: center;
					line-height: 56rpx;
					font-size: 25rpx;
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
					color: #F1F1F1;
					border: 1rpx solid #bfbfbf;
					background: #bfbfbf;
				}
				.btn4{
					color: #6d6d6d;
					border: 1rpx solid #b1b1b1;
				}
				.btn5{
					margin-left: 20rpx;
				}
			}
		}
	}
</style>