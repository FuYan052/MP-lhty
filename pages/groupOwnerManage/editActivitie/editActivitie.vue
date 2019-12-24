<template>
	<view class="editActivitie">
		<view class="orderItem" v-for="(item,index) in 6" :key='index'>
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
				<view class="btn btn1">编辑</view>
				<view class="btn btn2">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		created() {
			
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
	.editActivitie{
		width: 100%;
		min-height: 100vh;
		background: #ebebeb;
		padding-bottom: 20rpx;
		overflow: hidden;
		.orderItem{
			width: 100%;
			height: auto;
			background: #fff;
			margin-bottom: 20rpx;
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
					color: #a6e185;
					border: 1rpx solid #8dff8d;
					margin-right: 18rpx;
				}
			}
		}
	}
</style>