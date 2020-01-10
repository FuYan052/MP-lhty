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
								:src="item.headPortrait" mode="">
							</image>
						</view>
						<view class="info">
							<view class="name">
								<view class="text">
									{{item.nickName}} <text v-show="item.roleName">-({{item.roleName}})</text>
								</view>
								<view class="sex">
									<view class="sexIcon sex1" v-if="item.sex == 1"></view>
									<view class="sexIcon sex2" v-else></view>
								</view>
							</view>
							<view class="phone">{{item.phone}}</view>
						</view>
						<view class="levelBox">
							<view class="role">{{item.state}}</view>
							<view class="level">{{item.level}}</view>
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
				list: [],
				searchText: ''
			}
		},
		onLoad() {
			this.$http.get({
				url: '/v1/rest/club/clubMembersInfo',
				data: {
					clubId: uni.getStorageSync('clubId')
				}
			}).then(resp => {
				console.log(resp)
				if(resp.status == 200) {
					this.list = this.list.concat(resp.data.clubMembersA).concat(resp.data.clubMembersE).concat(resp.data.clubMembersD).concat(resp.data.clubMembersC).concat(resp.data.clubMembersB)
				}
			})
		},
		methods: {
			onChange(v) {
				this.searchText = v.detail
				console.log(this.searchText)
			},
			handleClick(item) {
				uni.redirectTo({
					url: '/pages/groupOwnerManage/addMember/addMember?item=' + encodeURIComponent(JSON.stringify(item))
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
								width: 420rpx;
								display: flex;
								.text{
									max-width: 330rpx;
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
								}
								.sexIcon{
									display: block;
									width: 34rpx;
									height: 34rpx;
									margin-left: 15rpx;
									background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/mIcon.png') no-repeat center;
									background-size: 22rpx auto;
								}
								.sex2{
									background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/wIcon.png') no-repeat center;
									background-size: 20rpx auto;
								}
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