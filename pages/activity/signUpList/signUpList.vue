<template>
	<view class="signUpList">
		<view class="userItem" v-for="(item,index) in peopleList" :key='index'>
			<view class="left">
				<view class="imgBox">
					<image :src="item.headPortrait" style="width: 100%; height: 100%; border-radius: 50%;" mode=""></image>
				</view>
				<view class="name">
					<view class="text">
						{{item.nickName}}
					</view>
					<view class="sex">
						<view class="sexIcon sex1" v-if="item.sex == 1"></view>
						<view class="sexIcon sex2" v-else></view>
					</view>
				</view>
			</view>
			<view class="right">{{item.level}}</view>
		</view>
		<!-- 缺省页 -->
		<view class="noData" v-show="isShowNoData"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				actId: null,
				peopleList: [],
				isShowNoData: false
			}
		},
		onLoad(options) {
			this.actId = options.actId
			this.$http.get({
				url: '/v1/rest/home/activitiesEnrolled',
				data: {
					activitiesId: this.actId
				}
			}).then(resp => {
				// console.log(resp)
				if(resp.status == 200) {
					this.peopleList = resp.data
					if(this.peopleList.length == 0) {
						this.isShowNoData = true
					}else{
						this.isShowNoData = false
					}
				}
			})
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
			.right{
				font-size: 24rpx;
				margin-right: 41rpx;
			}
		}
		.noData{
			width: 100%;
			height: 500rpx;
			background: url(~@/static/imgs/noData.png) no-repeat center;
			background-size: 460rpx auto;
			z-index: 9;
			margin-top: 150rpx;
		}
	}
</style>