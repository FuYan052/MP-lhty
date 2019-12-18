<template>
	<view class="userCenter">
		<view class="menu1" @click="handle1">
			发布活动
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			handle1() {
				console.log('跳转')
				uni.navigateTo({
				   url: '/pages/userCenter/publishActivities/publishActivities'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userCenter{
		width: 100%;
		min-height: 100vh;
		background: #1e1e1e;
		.menu1{
			font-size: 30rpx;
			color: #fff;
		}
	}
</style>
