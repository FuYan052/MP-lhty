<template>
	<view class="badminton">
		<!-- 日期 -->
		<view class="dateWrap">
			<view class="dateBox">
				<view class="dateItem" v-for="(item,index) in dateList" :key='index' :class="{currDate:currIndex == index}" @click="changeDate(index)">{{item}}</view>
			</view>
		</view>
		<!-- banner -->
		<view class="bannerBox">
			<swiper class="swiper" 
				indicator-dots="indicatorDots" 
				:autoplay="true" 
				:interval="3000" 
				:circular='true'
				indicator-color='rgba(255,255,255,0.8)'
				indicator-active-color='#ffb200'
				easing-function="default"
				duration="1000">
				<swiper-item v-for="(item,index) in banners" :key='index'>
					<image :src="item.imgUrl" style="width: 100%; height: 100%; border-radius: 12rpx;" @click="clickBanner(item)" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="actBox">
			<view class="actItem" v-for="(item,index) in actList" :key='index'>
				<view class="title" @click="toClubId(item)">
					<view class="text">{{item.clubName}}</view>
					<van-icon class="arrowIcon" name="arrow" size="30rpx" color='#bcbcbe'/>
				</view>
				<view class="detail"  @click="toSignUp((item.activitiesId))">
					<view class="dateTime">
						{{item.time}}
						<text class="timeRange">{{item.timeStart}}-{{item.timeEnd}}</text>
						<text class="distance" v-show="isShowDiatance">{{item.distance}}km</text>
						<text></text>
					</view>
					 <view class="place">
						{{item.venueName}}<text class="text">￥<text class="text2">{{item.cost}}</text>/人</text>
					</view>
					<view class="ballType">{{item.ballType}}</view>
				</view>
				<view class="signUp">
					<view class="imgBox">
						<view 
							class="imgItem" 
							v-for="(it,ind) in item.enrolledVoList" 
							:key="ind"
							>
							<image :src="it.headPortrait" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
						</view>
					</view>
					<view class="peopleNUm">{{item.enrolled}}/{{item.totalPeople}}</view>
					<view class="signUpBtn" @click="toSignUp(item.activitiesId)" :class="'currbtnBg' + ind">正在报名</view>
				</view>
			</view>
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
				banners: [],
				actList: [],
				inWhiteList: true,
				isTwoLater: false,
				lat: '30.57447',
				lon: '103.92377',
				isShowDiatance: false
			}
		},
		created() {
			const that = this
			// 默认日期为当天日期
		 this.clickDate = this.$utils.findDate(0)
		 this.banners = [
			 {
				 imgUrl: 'https://weiliicimg6.pstatp.com/weili/l/255348441617793179.webp',
				 webUrl: 'https://www.laihu.baogongxia.com'
			 },
			 {
				 imgUrl: 'https://weiliicimg1.pstatp.com/weili/l/262282047841894496.webp',
				 webUrl: 'https://uniapp.dcloud.io/'
			 },
			 {
				 imgUrl: 'https://weiliicimg1.pstatp.com/weili/l/458286230512861820.webp',
				 webUrl: 'https://youzan.github.io/vant-weapp/#/intro'
			 },
			 {
				 imgUrl: 'https://icweiliimg6.pstatp.com/weili/l/328163178242899976.webp',
				 webUrl: 'https://www.baidu.com'
			 }
		 ]
		 // 获取用户地理位置
		 uni.getLocation({
		    type: 'wgs84',
		    success: function (res) {
					console.log(res)
					that.lat = res.latitude
					that.lon = res.longitude
					that.isShowDiatance = true
					that.getList()
		     },
				fail: function (){
					that.getList()
					that.isShowDiatance = false
				}
		 });
		 
		},
		methods: {
			// 获取活动列表
			getList() {
				this.$http.post({
					url: '/v1/rest/home/homeActivitiesList',
					data: {
						isTwoDaysLater: this.isTwoLater,
						lat: this.lat,
						lon: this.lon,
						time: this.clickDate,
					}
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						this.actList = resp.data
					}
				})
			},
			// 切换日期
			changeDate(index) {
				this.currIndex = index
				switch(index) {
					case 0: 
						this.clickDate = this.$utils.findDate(0)
						this.isTwoLater = false
						this.getList()
						break;
					case 1: 
						this.clickDate = this.$utils.findDate(1)
						this.isTwoLater = false
						this.getList()
						break;
					case 2: 
						this.clickDate = this.$utils.findDate(2)
						this.isTwoLater = false
						this.getList()
						break;
					case 3: 
						this.clickDate = this.$utils.findDate(3)
						this.isTwoLater = true
						this.getList()
						break;
				}
			},
			// 点击轮播图
			clickBanner(item) {
				console.log(item)
				if (this.inWhiteList) { //如果在小程序的网址白名单中，会走内置webview打开，否则会复制网址提示在外部浏览器打开
					uni.navigateTo({
						url: '/pages/out/out?url=' + item.webUrl
					});
				} else {
					uni.setClipboardData({
						data: item.webUrl
					});
					uni.showModal({
						content: '本网址无法直接在小程序内打开。已自动复制网址，请在手机浏览器里粘贴该网址',
						showCancel: false
					});
				}
			},
			// 点击去报名
			toSignUp(id) {
				uni.navigateTo({
					url: '/pages/activity/activityDetails/activityDetails?actId=' + id
				})
			},
			// 俱乐部
			toClubId(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/club/homePage/homePage?clubId=' + item.clubId
				})
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
		padding-bottom: 20rpx;
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
					font-size: 26rpx;
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
			width: 690rpx;
			height: 278rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			border-radius: 12rpx;
			.swiper{
				width: 690rpx;
				height: 278rpx;
				.swiper-item{
					width: 690rpx;
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
		.actBox{
			width: 690rpx;
			height: auto;
			margin: 0 auto;
			.actItem{
				width: 100%;
				height: 355rpx;
				border-radius: 15rpx;
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/actItemBg.png') no-repeat center;
				background-size: 100% 100%;
				margin-top: 20rpx;
				box-sizing: border-box;
				padding: 0 28rpx;
				.title{
					width: 100%;
					height: 71rpx;
					margin-top: 11rpx;
					border-bottom: 1rpx solid #585657;
					font-size: 32rpx;
					color: #fff;
					line-height: 68rpx;
					.text{
						width: 94%;
						float: left;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.arrowIcon{
						float: right;
						margin-top: 23rpx;
					}
				}
				.detail{
					width: 100%;
					height: 170rpx;
					border-bottom: 1rpx solid #585657;
					.dateTime{
						width: 100%;
						height: 66rpx;
						line-height: 66rpx;
						font-size: 26rpx;
						color: #f7f6f7;
						.timeRange{
							padding-left: 30rpx;
						}
						.distance{
							font-size: 24rpx;
							float: right;
							color: #e0dfdf;
						}
					}
					.place{
						width: 100%;
						line-height: 36rpx;
						color: #f7f7f7;
						font-size: 26rpx;
						.text{
							padding-left: 30rpx;
							color: #ffaf01;
							font-size: 24rpx;
							display: inline-block;
							float: right;
							.text2{
								font-weight: bold;
								font-size: 32rpx;
							}
						}
					}
					.ballType{
						width: 100%;
						line-height: 60rpx;
						font-size: 26rpx;
						color: #f7f5f6;
					}
				}
				.signUp{
					width: 100%;
					height: 100rpx;
					padding-left: 5rpx;
					.imgBox{
						width: 352rpx;
						height: 50rpx;
						box-sizing: border-box;
						float: left;
						margin-top: 26rpx;
						padding-left: 18rpx;
						padding-right: 35rpx;
						overflow: hidden;
						.imgItem{
							width: 44rpx;
							height: 44rpx;
							box-sizing: border-box;
							border: 1rpx solid #fff;
							border-radius: 50%;
							float: left;
							margin-left: -16rpx;
							margin-top: 5rpx;
						}
					}
					.peopleNUm{
						width: 102rpx;
						height: 100rpx;
						line-height: 100rpx;
						color: #e0dede;
						float: left;
						font-size: 24rpx;
					}
					.signUpBtn{
						width: 164rpx;
						height: 68rpx;
						border-radius: 8rpx;
						float: right;
						text-align: center;
						line-height: 66rpx;
						color: #fff;
						font-size: 30rpx;
						margin-top: 19rpx;
						background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/btnBg1.png') no-repeat center;
						background-size: 100% 100%;
					}
					.currbtnBg0{
						background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/btnBg1.png') no-repeat center;
						background-size: 100% 100%;
					}
					.currbtnBg1{
						background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/btnBg2.png') no-repeat center;
						background-size: 100% 100%;
					}
					.currbtnBg2{
						background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/btnBg3.png') no-repeat center;
						background-size: 100% 100%;
					}
					.currbtnBg4{
						background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/btnBg4.png') no-repeat center;
						background-size: 100% 100%;
					}
				}
			}
		}
	}
</style>
