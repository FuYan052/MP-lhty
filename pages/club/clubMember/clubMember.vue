<template>
	<view class="clubMember">
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
		<view class="sectionTitle" v-show="isShowTitle">管理组</view>
		<view class="contentBox contentBox1" :class="{contentChange : !isShowTitle}">
			<view class="itemBox" v-for="(item,index) in list1" :key='index'>
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
		<view class="sectionTitle" v-show="isShowTitle">普通会员</view>
		<view class="contentBox contentBox2">
			<view class="itemBox" v-for="(item,index) in list2" :key='index'>
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
				list1: [{id:1},{id:2},{id:3},{id:4}],
				list2: [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}],
				searchValue: '',
				isShowTitle: true
			}
		},
		methods: {
			onChange(v) {
				this.searchValue = v.detail
				if(this.isShowTitle != '') {
					this.isShowTitle = false
				}else{
					this.isShowTitle = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.clubMember{
		width: 100%;
		min-height: 100vh;
		background: #f5f5f5;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0 24rpx;
		padding-bottom: 40rpx;
		.searchBox{
			width: 100%;
			height: 84rpx;
			border-radius: 35rpx;
			background: #fad57a;
			box-sizing: border-box;
			/deep/ .van-cell{
				height: 84rpx;
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
				font-size: 36rpx;
			}
		}
		.sectionTitle{
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			box-sizing: border-box;
			padding-left: 6rpx;
			font-size: 30rpx;
		}
		.contentBox{
			width: 100%;
			overflow: auto;
			box-sizing: border-box;
			flex: 1;
			.itemBox{
				width: 100%;
				// height: 240rpx; 
				height: auto;
				margin-bottom: 20rpx;
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
				}
			}
		}
		.contentChange{
			.itemBox:nth-of-type(1){
				margin-top: 20rpx;
			}
		}
	}
</style>