<template>
	<view class="groupActivity">
		<view class="orderItem" v-for="(item,index) in activityList" :key='index'>
			<view class="titleBox" @click="toDetail(item)">
				<view class="text">
					{{item.title}}
				</view>
				<van-icon class="arrowIcon" name="arrow" size="28rpx" color='#3c3731'/>
			</view>
			<view class="content" @click="toDetail(item)">
				<view class="imgBox">
					<image :src="item.venueImage" style="width: 100%; height: 100%;" mode=""></image>
				</view>
				<view class="detail">
					<view class="clubName">地点：{{item.venueName}}</view>
					<view class="date">日期：{{item.time}}</view>
					<view class="time">时间：{{item.timeStart}}-{{item.timeEnd}}</view>
				</view>
			</view>
			<view class="btnBox">
				<view class="people">
					<text v-show="showPeople">共：{{signUpPeople}}人报名</text>
				</view>
				<view class="left">
					<view class="btn btn1" v-show="showBtn" @click="clickBtn1(item)">{{btn1Text}}</view>
					<view class="btn btn2" @click="clickBtn2(item)">{{btn2Text}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['showPeople', 'showBtn','btn1Text','btn2Text','signUpPeople','activityList'],
		data() {
			return {
				
			}
		},
		methods: {
			clickBtn1(index) {
				this.$emit('handle1',index)
			},
			clickBtn2(index) {
				this.$emit('handle2',index)
			},
			toDetail(item) {
				uni.navigateTo({
					url: '/pages/activity/activityDetails/activityDetails?actId=' + item.activitiesId
				})
			}
		}
	}
</script> 

<style lang="scss" scoped>
	.groupActivity{
		width: 100%;
		min-height: 100vh;
		background: #ebebeb;
		padding-bottom: 80rpx;
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
				justify-content: space-between;
				align-items: center;
				.people{
					font-size: 24rpx;
				}
				.left{
					display: flex;
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
	}
</style>