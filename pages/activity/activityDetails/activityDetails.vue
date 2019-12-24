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
						<image :src="item.imgUrl" style="width: 100%; height: 100%; border-radius: 12rpx;" @click="clickBanner(item)" mode=""></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 标题及报名情况 -->
		<view class="titleBox">
			<view class="titleText">神羽联盟俱乐部周五晚19:00</view>
			<view class="people">
				<text class="span1">￥<text class="b">20</text>/人</text>
				<text class="span2">3/15</text>
			</view>
		</view>
		<!-- 俱乐部 -->
		<view class="whiteBg club">
			<view class="imgBox">
				<image src="http://f1.haiqq.com/allimg/3831982416/2817233822.jpg" style="width: 100%; height: 100%; border-radius: 7rpx;" alt="">
			</view>
			<view class="clubName">神羽联盟俱乐部</view>
			<van-icon class="arrowIcon" name="arrow" size="26rpx" color='#000000'/>
		</view>
		<!-- 详细时间等信息 -->
		<view class="whiteBg dateBox">
			<view class="common date">
				<text class="span1">时间</text>
				<text class="span2">2019-12-31</text>
				<text class="span3">19:00-21:00</text>
			</view>
			<view class="common place" @click="toMap">
				<text class="span1">地点</text>
				<text class="span2">波利杰喜美羽毛球俱乐部</text>
				<text class="span4"></text>
			</view>
			<view class="common owner">
				<text class="span1">组织</text>
				<text class="span2">鲨鱼</text>
				<text class="span3">19983067289</text>
			</view>
			<view class="common guarantee">
				<text class="span1">保障</text>
				<text class="span2">活动开始前可取消</text>
			</view>
			<!-- 已报名会员 -->
			<view class="people" @click="toList">
				<view class="p">已报名会员<van-icon class="arrowIcon" name="arrow" size="26rpx" color='#000000'/></view>
				<view class="headImgBox" v-show="showPeopleImg">
					<view class="left">
						<view 
							class="imgItem" v-for="(it,ind) in list" 
							:key="ind"
							>
							<image :src="it" style="width:100%; height: 100%; border-radius: 50%;" alt=""/>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 活动介绍 -->
		<view class="whiteBg introduction">
			<view class="title">活动介绍</view>
			<view class="introducText">
				目前 nvue 在App端，还不支持 --status-bar-height变量，替代方案是在页面onLoad时通过uni.getSystemInfoSync().statusBarHeight获取状态栏高度，然后通过style绑定方式给占位view设定高度。下方提供了示例代码
			</view>
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
				list: [],
				content: '',  //倒计时内容
				isChecked: false,  //是否勾选免责条款
				endTime: "2019-12-31 19:00"
			}
		},
		created() {
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
			this.list = [
				"http://f1.haiqq.com/allimg/3831982416/2817233822.jpg",
				"http://f1.haiqq.com/allimg/3831982416/2817233822.jpg",
				"http://f1.haiqq.com/allimg/3831982416/2817233822.jpg",
				"http://f1.haiqq.com/allimg/3831982416/2817233822.jpg",
				"http://f1.haiqq.com/allimg/3831982416/2817233822.jpg",
				"http://f1.haiqq.com/allimg/3831982416/2817233822.jpg",
			]
			const _endTime = (new Date(this.endTime.replace(/-/g,'/')).getTime()) / 1000
			this.countdowm(_endTime) //执行倒计时函数
		},
		computed: {
			showPeopleImg() {
				return this.list.length > 0
			}
		},
		methods: {
			toList() {
				
			},
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
					console.log(...this)
					this.callback(...this);
				}
			},
			submit() {
				
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
		padding-bottom: 360rpx;
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
			height: 320rpx;
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