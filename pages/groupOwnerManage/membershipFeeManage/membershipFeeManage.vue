<template>
	<view class="membershipFeeManage">
		<!-- 搜索框 -->
		<view class="searchBg">
			<view class="searchBox">
				<van-field
					placeholder="搜索成员"
					:border="false"
					left-icon="search"
					@change="onChange"
				/>
			</view>
		</view>
		<view class="contentBox">
			<view class="itemBox" v-for="(item,index) in list" :key='index'>
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
					<view class="bottom">
						<view class="left">
							余额：100元
						</view>
						<view class="right">
							<view class="btn btn1">会费明细</view>
							<view class="btn btn2">调整会费</view>
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
				searchText: '',
				list: [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}],
			}
		},
		methods: {
			onChange(v) {
				this.searchText = v.detail
				console.log(this.searchText)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.membershipFeeManage{
		width: 100%;
		min-height: 100vh;
		background: #f4f4f4;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0 24rpx;
		padding-bottom: 40rpx;
		.searchBox{
			width: 100%;
			height: 84rpx;
			border-radius: 30rpx;
			background: #fad57a;
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
			/deep/ .van-icon{
				font-size: 34rpx;
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
				// height: 240rpx; 
				height: auto;
				margin-top: 23rpx;
				background: #fff;
				border-radius: 15rpx;
				.detail{
					width: 100%;
					// height: 160rpx;
					height: auto;
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
							width: 420rpx;
							font-size: 27rpx;
							height: 88rpx;
							margin-left: 40rpx;
							.name{
								line-height: 40rpx;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
							.phone{
								line-height: 48rpx;
							}
						}
						.levelBox{
							width: 80rpx;
							height: 88rpx;
							font-size: 22rpx;
							color: #ffbb00;
							margin-left: 25rpx;
							.role{
								line-height: 35rpx;
							}
							.level{
								font-size: 25rpx;
								color: #000;
								line-height: 50rpx;
							}
						}
					}
					.bottom{
						width: 100%;
						height: 76rpx;
						border-top: 1rpx dashed #e6e6e6;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.left{
							font-size: 22rpx;
							color: #242424;
							margin-left: 10rpx;
						}
						.right{
							width: 270rpx;
							margin-right: 25rpx;
							display: flex;
							justify-content: space-between;
							.btn{
								width: 122rpx;
								height: 40rpx;
								text-align: center;
								line-height: 40rpx;
								font-size: 23rpx;
								color: #0d81e4;
								border: 1rpx solid #0d81e4;
								border-radius: 10rpx;
							}
							.btn2{
								color: #fdbc00;
								border: 1rpx solid #ffbc00;
							}
						}
					}
				}
			}
		}
	}
</style>