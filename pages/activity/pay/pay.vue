<template>
	<view class="pay">
		<view class="whiteBg box1">
			<view class="left">
				<view class="time">18:00</view>
				<view class="date">2019-12-31</view>
			</view>
			<view class="right">
				<view class="title">波利18点高级场-波利羽毛球训练馆</view>
				<view class="text club">俱乐部：神羽联盟</view>
				<view class="text place">场&nbsp;&nbsp;&nbsp;&nbsp;馆：波利羽毛球训练馆</view>
			</view>
		</view>
		<view class="tilte">报名选择</view>
		<view class="whiteBg box2">
			<view class="sexBox man" @click="choiceSex1">
			 	<view class="left">男</view>
				<view class="right" :class="{choiceSex: isMen}"></view>
			</view>
			 <view class="sexBox women" @click="choiceSex2">
			 	<view class="left">女</view>
				<view class="right" :class="{choiceSex: isWomen}"></view>
			 </view>
		</view>
		<view class="tilte">支付方式</view>
		<view class="whiteBg box3 box3_1">
			<view class="radioBox" :class="{currPay: payType == 10}" @click="choicePay(1)"></view>
			<view class="center">
				<view class="title">会费支付</view>
				<view class="huifei">
					余额：<text class="text1">66.6元</text><text class="text2">去充值</text>
				</view>
			</view>
			<view class="price">
				<view class="priceMan">男&nbsp;33.0元/人</view>
				<view class="priceWomen">女&nbsp;33.0元/人</view>
			</view>
		</view>
		<view class="whiteBg box3 box3_2">
			<view class="radioBox" :class="{currPay: payType == 20}" @click="choicePay(2)"></view>
			<view class="center">微信支付</view>
			<view class="price">33.0元/人</view>
		</view>
		<view class="whiteBg box3 box3_2">
			<view class="radioBox" :class="{currPay: payType == 30}" @click="choicePay(3)"></view>
			<view class="center">线下支付</view>
			<view class="price">33.0元/人</view>
		</view>
		<view class="whiteBg box3 box3_1">
			<view class="radioBox" :class="{currPay: payType == 40}" @click="choicePay(4)"></view>
			<view class="center">
				<view class="title">我的钱包</view>
				<view class="huifei">
					余额：<text class="text1">66.6元</text>
				</view>
			</view>
			<view class="price">33.0元/人</view>
		</view>
		
		<!-- 合计 -->
		<view class="countBox">
			合计：<text>70.0</text>元
		</view>
		<view class="btnBox">
			<view class="myButton" @click="submit">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isMen: false,  
				isWomen: false,
				payType: '',  //支付类型 10为会费支付，20为微信支付，30位线下支付，40为钱包支付
			}
		},
		methods: {
			// 选择性别男
			choiceSex1() {
				this.isMen = !this.isMen
				this.isWomen = false
			},
			// 选择性别女
			choiceSex2() {
				this.isWomen = !this.isWomen
				this.isMen = false
			},
			// 选择支付方式
			choicePay(v) {
				switch(v) {
					case 1:
						this.payType = 10
						break;
					case 2:
						this.payType = 20
						break;
					case 3:
						this.payType = 30
						break;
					case 4:
						this.payType = 40
						break;
				}
			},
			submit() {
				if((!this.isMen) && (!this.isWomen)) {
					uni.showToast({
						title: '请选择性别！',
						duration: 2000,
						icon: 'none'
					});
				}else if(this.payType == ''){
					uni.showToast({
						title: '请选择支付方式！',
						duration: 2000,
						icon: 'none'
					});
				}else{
					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pay{
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0 16rpx;
		padding-bottom: 40rpx;
		.box1{
			height: 214rpx;
			box-sizing: border-box;
			padding-left: 32rpx;
			overflow: hidden;
			margin-top: 16rpx;
			.left{
				width: 154rpx;
				height: 102rpx;
				border-right: 2rpx solid #e8e8e8;
				float: left;
				margin-top: 58rpx;
				.time{
					font-size: 32rpx;
					color: #ffbc00;
					font-weight: bold;
					line-height: 56rpx;
				}
				.date{
					font-size: 24rpx;
					color: #8a8a8a;
					line-height: 38rpx;
				}
			}
			.right{
				width: 510rpx;
				height: 156rpx;
				float: left;
				margin-top: 40rpx;
				box-sizing: border-box;
				padding-left: 38rpx;
				.title{
					width: 100%;
					height: 36rpx;
					font-size: 32rpx;
					line-height: 36rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis; 
				}
				.text{
					font-size: 24rpx;
					color: #515151;
					line-height: 54rpx;
				}
				.club{
					margin-top: 12rpx;
				}
			}
		}
		.tilte{
			width: 100%;
			height: 98rpx;
			line-height: 98rpx;
			font-size: 34rpx;
			color: #fff;
			margin-top: 16rpx;
			box-sizing: border-box;
			padding-left: 16rpx;
			letter-spacing: 4rpx;
		}
		.box2{
			height: auto;
			box-sizing: border-box;
			padding: 0 32rpx;
			.sexBox{
				width: 100%;
				height: 103rpx;
				.left{
					width: 90rpx;
					height: 103rpx;
					float: left;
					line-height: 104rpx;
					text-align: right;
					font-size: 28rpx;
					color: #4f4f4f;
				}
				.right{
					width: 44rpx;
					height: 44rpx;
					float: right;
					border-radius: 50%;
					border: 1rpx solid #868686;
					margin-top: 28rpx;
				}
				.choiceSex{
					border: 1rpx solid #fed461;
					background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/circleBg.png') no-repeat center;
					background-size: 20rpx auto;
				}
			}
			.man{
				border-bottom: 1rpx solid #ebebeb;
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/manIcon.png') no-repeat left center;
				background-size: 35rpx auto;
			}
			.women{
				border-bottom: 1rpx solid #ebebeb;
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/womenIcon.png') no-repeat left center;
				background-size: 35rpx auto;
			}
		}
		.box3{
			margin-bottom: 8rpx;
			box-sizing: border-box;
			padding: 0 32rpx;
			.radioBox{
				width: 44rpx;
				height: 44rpx;
				float: left;
				border-radius: 50%;
				border: 1rpx solid #868686;
			}
			.currPay{
				border: 1rpx solid #fed461;
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/circleBg.png') no-repeat center;
				background-size: 20rpx auto;
			}
		}
		.box3_1{
			height: 150rpx;
			.radioBox{
				margin-top: 52rpx;
			}
			.center{
				float: left;
				margin-left: 28rpx;
				.title{
					font-size: 29rpx;
					line-height: 29rpx;
					margin-top: 36rpx;
				}
				.huifei{
					line-height: 26rpx;
					margin-top: 25rpx;
					font-size: 22rpx;
					.text1{
						color: #feba03;
						padding-right: 20rpx;
					}
					.text2{
						color: #feba03;
						font-size: 24rpx;
						text-decoration: underline  #fdcb63;
						// border-bottom: 1rpx solid #fdcb63;
					}
				}
			}
			.price{
				float: right;
				font-size: 22rpx;
				line-height: 150rpx;
				.priceMan{
					line-height: 22rpx;
					margin-top: 46rpx;
				}
				.priceWomen{
					line-height: 22rpx;
					margin-top: 20rpx;
				}
			}
		}
		.box3_2{
			height: 96rpx;
			.radioBox{
				margin-top: 27rpx;
				float: left;
			}
			.center{
				line-height: 96rpx;
				float: left;
				font-size: 29rpx;
				margin-left: 28rpx;
			}
			.price{
				font-size: 22rpx;
				float: right;
				line-height: 96rpx;
			}
		}
		.countBox{
			width: 100%;
			height: 40rpx;
			box-sizing: border-box;
			padding-left: 20rpx;
			font-size: 28rpx;
			color: #fff;
			line-height: 40rpx;
			margin-top: 42rpx;
			text{
				font-size: 36rpx;
				color: #f0b102;
				padding-right: 5rpx;
			}
		}
		.btnBox{
			margin-top: 32rpx;
		}
	}
</style>
