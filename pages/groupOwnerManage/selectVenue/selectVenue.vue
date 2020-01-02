<template>
	<view class="selectVenue">
		<!-- 搜索框 -->
		<view class="searchBg">
			<view class="searchBox">
				<van-field
					placeholder="请输入搜索关键字"
					:border="false"
					left-icon="search"
					@change="onChange"
				/>
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item,index) in venueList" :key='index' @click="selectVenue(item)">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				venueList: []
			}
		},
		created() {
			this.$http.get({
				url: '/v1/rest/venue/getVenueInfo',
				data: {
					name: ''
				}
			}).then(resp => {
				console.log(resp)
				if(resp.status == 200) {
					this.venueList = resp.data
				}
			})
		},
		methods: {
			onChange(v) {
				this.$http.get({
					url: '/v1/rest/venue/getVenueInfo',
					data: {
						name: v.detail
					}
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						this.venueList = resp.data
					}
				})
			},
			selectVenue(item) {
				const selected = {
					name: item.name,
					id: item.id
				}
				uni.setStorage({
					key: 'venue',
					data: selected
				})
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.selectVenue{
		width: 100%;
		min-height: 100vh;
		background: #f4f4f4;
		overflow: hidden;
		.searchBox{
			width: 92%;
			height: 84rpx;
			margin:  0 auto;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			border-radius: 30rpx;
			/* background: #fad57a; */
			background: #fff;
			box-sizing: border-box;
			/deep/ .van-cell{
				height: 84rpx;
				border-radius: 35rpx;
				background: none;
				padding-top: 0rpx;
				padding-bottom: 0rpx;
				display: flex;
				align-items: center;
				.van-field__input{
					font-size: 28rpx;
				}
			}
			/deep/ .van-field__body{
				padding-left: 13rpx;
			}
			/deep/ .van-icon{
				font-size: 34rpx;
				color: #feaf01;
				font-weight: bold;
			}
		}
		.list{
			width: 100%;
			height: auto;
			background: #fff;
			.item{
				width: 100%;
				height: 98rpx;
				line-height: 98rpx;
				box-sizing: border-box;
				padding-left: 30rpx;
				font-size: 28rpx;
				border-top: 1rpx solid #e1e1e1;
			}
			.item:nth-of-type(1) {
				border: none;
			}
		}
	}
</style>