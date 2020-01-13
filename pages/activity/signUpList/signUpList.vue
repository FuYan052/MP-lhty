<template>
	<view class="signUpList">
		<view class="userItem" v-for="(item,index) in 10" :key='index'>
			<view class="left">
				<view class="imgBox">
					<image src="../../../static/logo.png" style="width: 100%; height: 100%; border-radius: 50%;" mode=""></image>
				</view>
				<view class="name">
					<view class="text">
						清风徐来 <text v-show="item.roleName">-({{item.roleName}})</text>
					</view>
					<view class="sex">
						<view class="sexIcon sex1" v-if="sex == 1"></view>
						<view class="sexIcon sex2" v-else></view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sex: 2
			}
		}
	}
</script>

<style lang="scss" scoped>
	.signUpList{
		width: 100%;
		min-height: 100vh;
		box-sizing: border-box;
		overflow: hidden;
		padding: 0 24rpx;
		background: #f4f4f4;
		padding-top: 20rpx;
		padding-bottom: 50rpx;
		.userItem{
			width: 100%;
			height: 139rpx;
			background: #fff;
			border-radius: 15rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 19rpx;
			.left{
				display: flex;
				align-items: center;
				.imgBox{
					width: 88rpx;
					height: 88rpx;
					border-radius: 50%;
					margin-left: 31rpx;
				}
				.name{
					width: 400rpx;
					display: flex;
					margin-left: 40rpx;
					height: 40rpx;
					.text{
						height: 40rpx;
						max-width: 330rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						line-height: 40rpx;
					}
					.sexIcon{
						display: block;
						width: 22rpx;
						height: 40rpx;
						margin-left: 15rpx;
						background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/mIcon.png') no-repeat left center;
						background-size: 22rpx auto;
					}
					.sex2{
						height: 44rpx;
						background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/wIcon.png') no-repeat left center;
						background-size: 20rpx auto;
					}
				}
			}
			
		}
	}
</style>