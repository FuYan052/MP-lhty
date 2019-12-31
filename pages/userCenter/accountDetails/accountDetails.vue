<template>
	<view class="accountDetails">
		<view class="topBox">
			<view class="date">2019年12月</view>
		</view>
		<view class="content whiteBg">
			
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	.accountDetails{
		width: 100%;
		min-height: 100vh;
		box-sizing: border-box;  
		padding: 0 32rpx;
		.topBox{
			width: 100%;
			height: 72rpx;
			border: 1rpx solid red;
			.date{
				color: #fff;
			}
		}
		.content{
			width:  100%;
			height: 500rpx;
		}
	}
</style>