<template>
	<view class="noDataPage">
		<view class="naDataImg"></view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	.noDataPage{
		width: 100%;
		height: 100vh;
		background: #fff;
		overflow: hidden;
		.naDataImg{
			width: 100%;
			height: 100vh;
			background: url(~@/static/imgs/noData.png) no-repeat;
			background-size: 560rpx auto;
			background-position: center 400rpx;
		}
	}
</style>
