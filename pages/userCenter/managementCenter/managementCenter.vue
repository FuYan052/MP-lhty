<template>
	<view class="managementCenter">
		<view class="whiteBg menuBox" v-for="(item,index) in menuList" :key='index' @click="handle(item)">
			<view class="iconBox">
				<image :src="item.img" style="width: 100%; height: 100%;" mode=""></image>
			</view>
			<view class="title">{{item.title}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuList: []
			}
		},
		created() {
			this.menuList = [
				{
					title: '发布活动',
					img: 'https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/manageIcon1.png',
					path: '/pages/groupOwnerManage/publishActivities/publishActivities'
				},
				{
					title: '编辑活动',
					img: 'https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/manageIcon2.png',
					path: '/pages/userCenter/publishActivities/publishActivities'
				},
				{
					title: '签到管理',
					img: 'https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/manageIcon4.png',
					path: '/pages/userCenter/publishActivities/publishActivities'
				},
				{
					title: '活动结算',
					img: 'https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/manageIcon3.png',
					path: '/pages/userCenter/publishActivities/publishActivities'
				},
				{
					title: '现场收费',
					img: 'https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/manageIcon5.png',
					path: '/pages/userCenter/publishActivities/publishActivities'
				},
				{
					title: '会费管理',
					img: 'https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/manageIcon6.png',
					path: '/pages/userCenter/publishActivities/publishActivities'
				},
				{
					title: '会员管理',
					img: 'https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/manageIcon7.png',
					path: '/pages/userCenter/publishActivities/publishActivities'
				},
				{
					title: '收支明细',
					img: 'https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/manageIcon8.png',
					path: '/pages/userCenter/publishActivities/publishActivities'
				},
			]
		},
		methods: {
			handle(item) {
				uni.navigateTo({
				  url: item.path
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.managementCenter{
		width: 100%;
		min-height: 100vh;
		background-color: #f4f4f4;
		box-sizing: border-box;
		padding: 0 16rpx;
		overflow: hidden;
		padding-bottom: 20rpx;
		.menuBox{
			height: 160rpx;
			margin-top: 15rpx;
			display: flex;
			align-items: center;
			.iconBox{
				width: 94rpx;
				height: 95rpx;
				margin-left: 33rpx;
			}
			.title{
				height: 95rpx;
				flex: 1;
				margin-left: 33rpx;
				font-size: 31rpx;
			}
		}
	}
</style>