<template>
	<view class="badminton">
		<!-- 日期 -->
		<view class="dateWrap">
			<view class="dateBox">
				<view class="dateItem" v-for="(item,index) in dateList" :key='index' @click="changeDate(index)">{{item}}</view>
			</view>
		</view>
		<!-- banner -->
		<view class="bannerBox">
			<swiper class="swiper" 
				:indicator-dots="indicatorDots" 
				:autoplay="true" 
				:interval="2000" 
				:circular='true'
				:easing-function='easeOutCubic'
				duration="duration">
				<swiper-item>
						<view class="swiper-item item1 uni-bg-red">A</view>
				</swiper-item>
				<swiper-item>
						<view class="swiper-item item2 uni-bg-green">B</view>
				</swiper-item>
				<swiper-item>
						<view class="swiper-item item3 uni-bg-blue">C</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dateList: ['今天','明天','后天','两天后'],
				currIndex: 0,
				clickDate: '',
			}
		},
		created() {
			// 默认日期为当天日期
		 this.clickDate = this.$utils.findDate(0)
		},
		methods: {
			// 切换日期
			changeDate(index) {
				this.currIndex = index
				switch(index) {
					case 0: 
						this.clickDate = this.$utils.findDate(0)
						break;
					case 1: 
						this.clickDate = this.$utils.findDate(1)
						break;
					case 2: 
						this.clickDate = this.$utils.findDate(2)
						break;
					case 3: 
						this.clickDate = this.$utils.findDate(3)
						break;
				}
				console.log(this.clickDate)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.badminton{
		width: 100%;
		min-height: 100vh;
		background: #000000;
		box-sizing: border-box;
		padding-top: 76rpx;
		.dateWrap{
			width: 100%;
			height: 76rpx;
			background: #1b1b1b;
			position: fixed;
			top: 0;
			z-index: 9;
			box-sizing: border-box;
			padding-left: 60rpx;
			overflow: hidden;
			.dateBox{
				width: 430rpx;
				height: 76rpx;
				display: flex;
				justify-content: space-between;
				.dateItem{
					font-size: 24rpx;
					color: #e1e1e1;
					line-height: 60rpx;
				}
				.currDate{
					font-size: 34rpx;
					color: #fff;
					font-weight: bold;
					position: relative;
				}
				.currDate::after{
					content: '';
					display: inline-block;
					width: 70rpx;
					height: 30rpx;
					background: #ffb001;
					border-radius: 10rpx;
					position: absolute;
					bottom: -23rpx;
					left: 0;
				}
				.currDate:nth-of-type(4)::after{
					content: '';
					display: inline-block;
					width: 102rpx;
					height: 30rpx;
					background: #ffb001;
					border-radius: 10rpx;
					position: absolute;
					bottom: -23rpx;
					left: 0;
				}
			}
		}
		.bannerBox{
			width: 680rpx;
			height: 278rpx;
			margin: 0 auto;
			border: 1rpx solid red;
			.swiper{
				width: 680rpx;
				height: 278rpx;
				.swiper-item{
					width: 680rpx;
					height: 278rpx;
					background: #dedede;
				}
				.item1{
					background: #007AFF;
				}
				.item2{
					background: #2C405A;
				}
				.item3{
					background: #F0AD4E;
				}
			}
		}
	}
</style>
