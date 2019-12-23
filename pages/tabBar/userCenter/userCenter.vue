<template>
	<view class="userCenter">
		<view class="topWrap">
			<view class="userInfo">
				<view class="left">
					<view class="imgBox">
						<image :lazy-load='false' style="width: 100%; height: 100%; border-radius: 50%;"
							src="http://f1.haiqq.com/allimg/3831982416/2817233822.jpg" mode="">
						</image>
					</view>
					<view class="nickName">
						<view class="name">幸运Lucky</view>
						<view class="role">群主</view>
					</view>
				</view>
				<view class="right">
					<view class="iconBox"></view>
				</view>
			</view>
			<view class="walletWrap" @click="toMyWallet">
				<view class="left">我的钱包</view>
				<view class="right">2536<text>元</text></view>
			</view>
		</view>
		<!-- 菜单部分 -->
		<view class="menuWrap">
			<view class="menuItem" v-for="(item,index) in menuList" :key='index'>
				<van-cell
				  :title="item.title"
					:border='false'
					size='large'
					is-link
				  link-type="navigateTo"
				  :url="'/' + item.path"
				/>
			</view>
		</view>
	</view> 
</template>

<script>
	export default {
		data() {
			return {
				menuList: [{title:'我的活动',path: 'pages/userCenter/myActivities/myActivities'},
									{title:'俱乐部',path: 'pages/userCenter/club/club'},
									// {title:'我的数据',path: 'pages/userCenter/myData/myData'},
									{title:'管理中心',path: 'pages/userCenter/managementCenter/managementCenter'},
									{title:'新俱乐部入驻',path: 'pages/userCenter/joinClub/joinClub'},
									{title:'常见问题',path: 'pages/userCenter/commonProblem/commonProblem'},]
				}
		},
		methods: {
			// 我的钱包
			toMyWallet() {
				uni.navigateTo({
				  url: '/pages/userCenter/myWallet/myWallet'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userCenter{
		width: 100%;
		min-height: 100vh;
		background: #fff;
		.topWrap{
			width: 100%;
			height: 338rpx;
			box-sizing: border-box;
			padding: 0 24rpx;
			background: #444444;
			overflow: hidden;
			.userInfo{
				width: 100%;
				height: 150rpx;
				margin-top: 40rpx;
				border-radius: 10rpx;
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/userCenterBg.png') no-repeat center;
				background-size: contain;
				box-sizing: border-box;
				padding-left: 40rpx;
				padding-right: 60rpx;
				.left{
					width: 515rpx;
					height: 150rpx;
					float: left;
					.imgBox{
						width: 96rpx;
						height: 96rpx;
						border-radius: 50%;
						float: left;
						margin-top: 28rpx;
					}
					.nickName{
						height: 150rpx;
						float: left;
						margin-left: 20rpx;
						.name{
							font-size: 34rpx;
							line-height: 34rpx;
							color: #4b4416;
							margin-top: 45rpx;
						}
						.role{
							font-size: 24rpx;
							line-height: 24rpx;
							color: #4b4416;
							margin-top: 18rpx;
						}
					}
				}
				.right{
					width: 80rpx;
					height: 150rpx;
					float: right;
					.iconBox{
						width: 66rpx;
						height: 32rpx;
						margin-top: 60rpx;
						background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/editUserInfo.png') no-repeat center;
						background-size: contain;
					}
				}
			}
			.walletWrap{
				width: 100%;
				height: 52rpx;
				margin-top: 64rpx;
				line-height: 52rpx;
				.left{
					width: 210rpx;
					height: 38rpx;
					line-height: 38rpx;
					float: left;
					box-sizing: border-box;
					padding-left: 54rpx;
					padding-right: 30rpx;
					font-size: 28rpx;
					border-right: 3rpx solid #999999;
					float: left;
					color: #969696;
					margin-top: 8rpx;
					background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/walletIcon.png') no-repeat left center;
					background-size: 26rpx auto;
					background-position: 13rpx center;
				}
				.right{
					height: 52rpx;
					float: left;
					margin-left: 30rpx;
					line-height: 52rpx;
					font-size: 45rpx;
					color: #fbcc02;
					text{
						font-size: 26rpx;
						color: #969696;
						line-height: 52rpx;
						padding-left: 5rpx;
					}
				}
			}
		}
		.menuWrap{
			width: 100%;
			height: auto;
			box-sizing: border-box;
			padding-left: 24rpx;
			padding-right: 40rpx;
			.menuItem{
				width: 100%;
				height: 98rpx;
				box-sizing: border-box;
				padding-left: 42rpx;
				border-top: 2rpx solid #f4f4f4;
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/activieIcon.png') no-repeat left center;
				background-size: 35rpx auto;
				/deep/ .van-cell--large{
					height: 96rpx;
				}
				/deep/ .van-cell__title,.van-cell__value{
					font-size: 28rpx;
					color: #51504c;
				}
				/deep/ .van-icon{
					font-size: 26rpx;
					color: #636362;
				}
			}
			.menuItem:nth-of-type(2) {
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/teamIcon.png') no-repeat left center;
				background-size: 36rpx auto;
			}
			// .menuItem:nth-of-type(3) {
			// 	background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/dataIcon.png') no-repeat left center;
			// 	background-size: 32rpx auto;
			// }
			.menuItem:nth-of-type(3) {
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/managementIcon.png') no-repeat left center;
				background-size: 30rpx auto;
			}
			.menuItem:nth-of-type(4) {
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/joinIcon.png') no-repeat left center;
				background-size: 34rpx auto;
			}
			.menuItem:nth-of-type(5) {
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/problemIcon.png') no-repeat left center;
				background-size: 34rpx auto;
			}
		}
	}
</style>
<style>
	
</style>