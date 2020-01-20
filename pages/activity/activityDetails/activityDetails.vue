<template>
	<view class="activityDetails">
		<!-- 图片 -->
		<view class="topimg">
			<view class="img">
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
						<image :src="item.imgPath" style="width: 100%; height: 100%; border-radius: 12rpx;" @click="clickBanner(item)" mode=""></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 标题及报名情况 -->
		<view class="titleBox">
			<view class="titleText">{{actDetail.title}}</view>
			<view class="people">
				<text class="span1">￥<text class="b">{{actDetail.cost}}</text>/人</text>
				<text class="span2">{{actDetail.enrolled}}/{{actDetail.totalPeople}}</text>
			</view>
		</view>
		<!-- 俱乐部 -->
		<view class="whiteBg club" @click="toClub(actDetail.clubId)">
			<view class="imgBox">
				<image :src="actDetail.logo" style="width: 100%; height: 100%; border-radius: 7rpx;" alt="">
			</view>
			<view class="clubName">{{actDetail.clubName}}</view>
			<van-icon class="arrowIcon" name="arrow" size="26rpx" color='#000000'/>
		</view>
		<!-- 详细时间等信息 -->
		<view class="whiteBg dateBox">
			<view class="common date">
				<text class="span1">时间</text>
				<text class="span2">{{actDetail.time}}</text>
				<text class="span3">{{actDetail.timeStart}}-{{actDetail.timeEnd}}</text>
			</view>
			<view class="common place" @click="toMap">
				<text class="span1">地点</text>
				<text class="span2">{{actDetail.venueName}}</text>
				<text class="span4" @click="toMap"></text>
			</view>
			<view class="common owner" @click="hanleCall">
				<text class="span1">组织</text>
				<text class="span2">{{actDetail.nickName}}</text>
				<text class="span3">{{actDetail.phone}}</text>
				<text class="span4"></text>
			</view>
			<view class="common guarantee">
				<text class="span1">保障</text>
				<text class="span2" v-if='actDetail.isCancel'>活动开始前可取消</text>
				<text class="span2" v-else>无保障</text>
			</view>
			<!-- 已报名会员 -->
			<view class="people" @click="toList">
				<view class="p">已报名会员<van-icon class="arrowIcon" name="arrow" size="26rpx" color='#000000'/></view>
				<view class="headImgBox" v-show="showPeopleImg">
					<view class="left">
						<view 
							class="imgItem" v-for="(it,ind) in peopleList" 
							:key="ind"
							>
							<image :src="it.headPortrait" style="width:100%; height: 100%; border-radius: 50%;" alt=""/>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 活动介绍 -->
		<view class="whiteBg introduction">
			<view class="title">活动介绍</view>
			<view class="introducText">{{actDetail.content}}</view>
		</view>
		<!-- 底部按钮 -->
		<view class="signupWrap">
			<view class="p1">报名截止还有：<text>{{content}}</text></view>
			<view class="check">
				<text class="text" @click="toEscapeClause">我已同意《免责条款》</text>
				<view class="checkBox" @click="checked">
					<!-- <van-icon name="success" v-show="isChecked" size="22rpx"/> -->
					<icon class="myIcon" v-show="isChecked" type="success_no_circle" size="22rpx" color="#f1b202"/>
				</view>
			</view>
			<view class="myButton btn" @click="submit">立刻报名</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banners: [],
				peopleList: [],
				content: '',  //倒计时内容
				isChecked: false,  //是否勾选免责条款
				endTime: "2019-12-31 19:00",
				organizerPhone: '19983067289',
				venueName: '波力羽毛球馆',
				address: '四川省成都市武侯区新乐北街8号',
				lat: '30.610880',
				long: '104.040560',
				activityId: null,
				actDetail: null,
				clubId: null,
				state: null
			}
		},
		created() {
			// 获取banner
			this.$http.get({
				 url: '/v1/rest/home/homeNewsList',
				 data: {
					 region:''
				 }
			}).then(resp => {
				// console.log(resp)
				if(resp.status == 200) {
					this.banners = resp.data
				}
			})
		},
		onLoad(options) {
			// console.log(options)
			this.activityId = options.actId
			this.$http.get({
				url: '/v1/rest/home/homeActivitiesDetails',
				data: {
					activitiesId: options.actId
				}
			}).then(resp => {
				// console.log(resp)
				if(resp.status == 200) {
					this.actDetail = resp.data
					this.endTime = resp.data.endTime
					this.lat = resp.data.lat
					this.long = resp.data.lon
					this.venueName = resp.data.venueName
					this.address = resp.data.address
					this.organizerPhone = resp.data.phone
					this.clubId = resp.data.clubId
					this.state = resp.data.osStateId
					const _endTime = (new Date(this.endTime.replace(/-/g,'/')).getTime()) / 1000
					this.countdowm(_endTime) //执行倒计时函数
				}
			})
			// 获取报名列表
			this.$http.get({
				url: '/v1/rest/home/activitiesEnrolled',
				data: {
					activitiesId: this.activityId
				}
			}).then(resp => {
				if(resp.status == 200) {
					this.peopleList = resp.data
				}
			})
		},
		computed: {
			showPeopleImg() {
				return this.peopleList.length > 0
			}
		},
		methods: {
			toList() {
				uni.navigateTo({
					url: '/pages/activity/signUpList/signUpList?actId=' + this.activityId
				});
			},
			clickBanner(item) {
				// console.log(item)
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
			// 地图导航
			toMap() {
				const that = this
				uni.openLocation({
					latitude: Number(that.lat),
					longitude:Number( that.long),
					name: that.venueName,
					address: that.address,
					scale: 13,
					success: function () {
							// console.log('success');
					},
					fail: function () {
							// console.log('fail');
					}
				});
			},
			// 拨打电话
			hanleCall() {
				uni.makePhoneCall({
				    phoneNumber: this.organizerPhone
				});
			},
			// 点击俱乐部
			toClub(clubId) {
				uni.navigateTo({
					url: '/pages/club/homePage/homePage?clubId=' + clubId
				})
			},
			checked() {
				this.isChecked = !this.isChecked
			},
			toEscapeClause() {
				
			},
			 // 倒计时
			countdowm(timestamp) {
				// console.log(timestamp)
				let self = this
				let timer = setInterval(function() {
					let nowTime = new Date();
					// let endTime = new Date(timestamp * 1000);
					let endTime = timestamp * 1000;
					// console.log(endTime)
					let t = endTime - nowTime.getTime();
					if(t > 0) {
						let day = Math.floor(t / 86400000)
						let hour = Math.floor((t / 3600000) % 24)
						let min = Math.floor((t / 60000) % 60);
						let sec = Math.floor((t / 1000) % 60);
						hour = hour < 10 ? "0" + hour : hour;
						min = min < 10 ? "0" + min : min;
						sec = sec < 10 ? "0" + sec : sec;
						let format = '';
						if(day > 0){
							format = `${day}天${hour}小时${min}分${sec}秒`;
						} 
						if(day <= 0 && hour > 0 ){
							format = `${hour}小时${min}分${sec}秒`; 
						}
						if(day <= 0 && hour <= 0){
							format =`${min}分${sec}秒`;
						}
						self.content = format;
						self.isTosignUp = true
					} else{
						self.isTosignUp = false
						clearInterval(timer);
						self.content = '报名结束';
						self._callback();
					}
				},1000)
			},
			_callback(){
				if(this.callback && this.callback instanceof Function){
					// console.log(...this)
					this.callback(...this);
				}
			},
			submit() {
				// 判断活动是否可报名
				if(this.state == 2) {
					uni.showToast({
						title: '抱歉，名额已满！',
						duration: 2000,
						icon: 'none'
					});
				}else if(this.state == 3) {
					uni.showToast({
						title: '抱歉，报名已结束！',
						duration: 2000,
						icon: 'none'
					});
				}else{
					// 判断是否登录
					if(uni.getStorageSync('isLogin')) {  //已登录
						// 判断是否加入俱乐部
						this.$http.get({
							url: '/v1/rest/home/isClubMember',
							data: {
								userId: uni.getStorageSync('userInfo').userId,
								clubId: this.clubId
							}
						}).then(resp => {
							// console.log(resp)
							if(resp.status == 200) {
								if(resp.data.initClubMember) {  //已加入俱乐部
									if(this.isChecked) {  //已同意免责条款
										uni.navigateTo({
											url: '/pages/activity/pay/pay?actId=' + this.activityId
										})
									}else{  //未同意免责条款
										uni.showToast({
											title: '未同意《免责条款》！',
											duration: 2500,
											icon: 'none'
										});
									}
								}else{  //未加入俱乐部
									uni.showToast({
										title: '加入该俱乐部后方可报名！',
										duration: 2000,
										icon: 'none'
									});
									let timer = setTimeout(() => {
										uni.navigateTo({
											url: '/pages/club/homePage/homePage?clubId=' + this.clubId
										})
									},1500)
								}
							}
						})
					}else{  //未登录
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}
				}
			},
			// 分享
			onShareAppMessage(res) {
				// if (res.from === 'button') {// 来自页面内分享按钮
				// 	console.log(res.target)
				// }
				return {
					title: '邀你打球——波利羽毛球馆',
					path: '/pages/activity/activityDetails/activityDetails?actId=' + this.activityId
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.activityDetails{
		width: 100%;
		min-height: 100vh;
		box-sizing: border-box;
		padding: 0 16rpx;
		padding-bottom: 260rpx;
		.topimg{
			width: 100%;
			height: 383rpx;
			// margin-top: 16rpx;
			background: url('~@/static/imgs/acvDetailBg.png') no-repeat center bottom;
			background-size: 685rpx auto;
			border-radius: 12rpx;
			.img{
				width: 100%;
				height: 368rpx;
				border-radius: 12rpx;
				.swiper{
					width: 100%;
					height: 368rpx;
					border-radius: 12rpx;
				}
			}
		}
		.titleBox{
			width: 100%;
			min-height: 146rpx;
			margin-top: 20rpx;
			box-sizing: border-box;
			padding: 0 14rpx;
			letter-spacing: 1rpx;
			.titleText{
				font-size: 30rpx;
				line-height: 42rpx;
				color: #fff;
			}
			.people{
				width: 100%;
				height: 50rpx;
				margin-top: 18rpx;
				.span1{
					float: left;
					color: #fdb20f;
					line-height: 50rpx;
					font-size: 24rpx;
					.b{
						font-weight: bold;
						font-size: 32rpx;
					}
				}
				.span2{
					font-size: 24rpx;
					line-height: 50rpx;
					color: #fff;
					float: right;
				}
			}
		}
		.club{ 
			height: 110rpx;
			box-sizing: border-box;
			padding-left: 32rpx;
			.imgBox{
				width: 70rpx;
				height: 70rpx;
				float: left;
				margin-top: 19.5rpx;
			}
			.clubName{
				width: 535rpx;
				float: left;
				line-height: 110rpx;
				margin-left: 20rpx;
				font-size: 28rpx;
				color: #4f4d4e;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.arrowIcon{
				margin-top: 44rpx;
			}
		}
		.dateBox{
			// min-height: 490rpx;
			height: auto;
			box-sizing: border-box;
			margin-top: 13rpx;
			padding: 0 32rpx;
			overflow: hidden;
			.common{
				width: 100%;
				height: 96rpx;
				border-bottom: 1rpx solid #e5e5e5;
				font-size: 0;
				padding-left: 6rpx;
				text{
					font-size: 28rpx;
					line-height: 96rpx;
					display: inline-block;
					color: #474747;
				}
				.span2{
					margin-left: 59rpx;
				}
				.span3{
					margin-left: 40rpx;
				}
			}
			.place{
				width: 100%;
				padding-right: 4rpx;
				.span4{
					display: block;
					width: 38rpx;
					height: 96rpx;
					float: right;
					margin-right: 15rpx;
					background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/placeIcon.png') no-repeat center;
					background-size: 100% auto;
				}
			}
			.owner{
				.span4{
					display: block;
					width: 38rpx;
					height: 96rpx;
					float: right;
					margin-right: 12rpx;
					background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/phoneIcon.png') no-repeat center;
					background-size: 100% auto;
				}
			}
			.people{
				width: 100%;
				min-height: 66rpx;
				padding: 0 6rpx;
				.p{
					font-size: 28rpx;
					color: #474747;
					line-height: 30rpx;
					margin-top: 30rpx;
					.arrowIcon{
						float: right;
						line-height: 30rpx;
						margin-right: 20rpx;
					}
				}
				.headImgBox{
					width: 100%;
					height: 92rpx;
					margin-top: 20rpx;
					.left{
						width: 100%;
						height: 62rpx;
						overflow: hidden;
						float: left;
						margin-left: -10rpx;
						.imgItem{
							width: 60rpx;
							height: 60rpx;
							float: left;
							margin-left: 10rpx;
							border-radius: 50%;
							border: 1rpx solid #dedede;
						}
					}
				}
			}
		}
		.introduction{
			min-height: 240rpx;
			margin-top: 13rpx;
			box-sizing: border-box;
			padding: 0 32rpx;
			.title{
				width: 100%;
				height: 96rpx;
				line-height: 96rpx;
				border-bottom: 1rpx solid #e5e5e5;
				padding-left: 6rpx;
				font-size: 28rpx;
				color: #474747;
			}
			.introducText{
				padding-top: 25rpx;
				padding-bottom: 35rpx;
				font-size: 27rpx;
				color: #525252;
				line-height: 48rpx;
			}
		}
		.signupWrap{
			width: 100%;
			height: 250rpx;
			box-sizing: border-box;
			padding: 0 16rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			background: #1e1e1c;
			.p1{
				height: 72rpx;
				line-height: 72rpx;
				margin-left: 6rpx;
				font-size: 26rpx;
				color: #fff;
				text{
					font-size: 30rpx;
					color: #e6ab09;
				}
			}
			.check{
				width: 100%;
				height: 52rpx;
				.text{
					width: 250rpx;
					vertical-align: top;
					font-size: 25rpx;
					line-height: 28rpx;
					position: relative;
					color: #fff;
					float: right;
				}
				.text::after{
					content: '';
					width: 233rpx;
					height: 28rpx;
					display: inline-block;
					position: absolute;
					top: 0;
					left: 0;
					border-bottom: 1rpx solid #fff;
				}
				.checkBox{
					width: 22rpx;
					height: 22rpx;
					float: right;
					border: 1rpx solid #fff;
					margin-right: 5rpx;
					margin-top: 2rpx;
					line-height: 28rpx;
					position: relative;
					/deep/ .myIcon{
						position: absolute;
						top: 0;
						left: 0;
					}
				}
			}
		}
	}
</style>