<template>
	<view class="searchMember">
		<!-- 搜索框 -->
		<view class="searchBg">
			<view class="searchBox">
				<van-field
					placeholder="输入用户名"
					:border="false"
					left-icon="search"
					@change="onChange"
				/>
			</view>
		</view>
		<view class="contentBox">
			<view class="itemBox" v-for="(item,index) in list" :key='index' @click="handleClick(item)">
				<view class="detail">
					<view class="top">
						<view class="imgBox">
							<image style="width: 100%; height: 100%; border-radius: 50%;"
								src="http://f1.haiqq.com/allimg/3831982416/2817233822.jpg" mode="">
							</image>
						</view>
						<view class="info">
							<view class="name">文艺青年(男)</view>
							<view class="phone">18334531374</view>
						</view>
						<view class="levelBox">
							<view class="role">会长</view>
							<view class="level">高级</view>
						</view>
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
				list: [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}],
				searchText: ''
			}
		},
		methods: {
			onChange(v) {
				this.searchText = v.detail
				console.log(this.searchText)
			},
			handleClick(item) {
				uni.redirectTo({
					url: '/pages/groupOwnerManage/addMember/addMember?id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.searchMember{
		width: 100%;
		min-height: 100vh;
		background: #f4f4f4;
		box-sizing: border-box;
		padding: 0 25rpx;
		padding-top: 84rpx;
		padding-bottom: 40rpx;
		.searchBg{
			width: 100%;
			height: 114rpx;
			box-sizing: border-box;
			padding: 20rpx 25rpx;
			padding-top: 10rpx;
			position: fixed;
			top: 0;
			left: 0;
			background: #f4f4f4;
			z-index: 9;
			.searchBox{
				width: 100%;
				height: 84rpx;
				border: 1rpx solid #ffc931;
				border-radius: 30rpx;
				background: #faf2e1;
				box-sizing: border-box;
				/deep/ .van-cell{
					height: 80rpx;
					border-radius: 30rpx;
					background: none;
					padding-top: 0rpx;
					padding-bottom: 0rpx;
					display: flex;
					align-items: center;
					.van-field__input{
						font-size: 28rpx;
					}
				}
				/deep/ .van-cell__left-icon{
					font-size: 32rpx;
				}
			}
		}
		.contentBox{
			width: 100%;
			overflow: auto;
			box-sizing: border-box;
			padding-bottom: 60rpx;
			flex: 1;
			.itemBox{
				width: 100%;
				height: 160rpx; 
				margin-top: 23rpx;
				.detail{
					width: 100%;
					height: 160rpx;
					background: #fff;
					border-radius: 15rpx;
					box-sizing: border-box;
					padding: 0 32rpx;
					.top{
						width: 100%;
						height: 160rpx;
						display: flex;
						align-items: center;
						.imgBox{
							width: 88rpx;
							height: 88rpx;
							border: 50%;
						}
						.info{
							width: 360rpx;
							font-size: 27rpx;
							height: 88rpx;
							margin-left: 40rpx;
							.name{
								line-height: 50rpx;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
							.phone{
								line-height: 36rpx;
							}
						}
						.levelBox{
							width: 140rpx;
							height: 88rpx;
							font-size: 22rpx;
							color: #ffbb00;
							margin-left: 15rpx;
							.role{
								line-height: 46rpx;
							}
							.level{
								font-size: 25rpx;
								color: #000;
								line-height: 44rpx;
							}
						}
					}
				}
			}
		}
	}
</style>