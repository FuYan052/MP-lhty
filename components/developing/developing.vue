<template>
	<view class="developing">
		<view class="imgBox"></view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	.developing{
		width: 100%;
		height: 100vh;
		background: #fff;
		overflow: hidden;
		.imgBox{
			width: 100%;
			height: 100vh;
			background: url(~@/static/imgs/deving.png) no-repeat;
			background-size: 560rpx auto;
			background-position: center 330rpx;
		}
	}
</style>