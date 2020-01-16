<template>
	<view class="membershipManage">
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
		<view class="sectionTitle" v-show="isShowTitle1">管理组</view>
		<view class="contentBox" :class="{contentChange : !isShowTitle}">
			<view class="itemBox" v-for="(item,index) in list1" :key='index'>
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
					<view class="bottom">
						<view class="left"></view>
						<view class="right">
							<view class="btn btn1" @click="editUser(item)" v-show="">修改</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="sectionTitle" v-show="isShowTitle2">普通会员</view>
		<view class="contentBox">
			<view class="itemBox" v-for="(item,index) in list2" :key='index'>
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
					<view class="bottom">
						<view class="left"></view>
						<view class="right">
							<view class="btn btn1" @click="editUser(item)" v-show="item.userId != currUserId">修改</view>
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
				isShowTitle: true,
				list1: [],
				list2: [],
				currUserId: uni.getStorageSync('userInfo').userId
			}
		},
		computed: {
			isShowTitle1() {
				return this.isShowTitle && this.list1.length > 0
			},
			isShowTitle2() {
				return this.isShowTitle && this.list2.length > 0
			},
		},
		onLoad() {
			
		},
		onShow() {
			this.getCateList()
		},
		methods: {
			getCateList() {
				this.$http.get({
					url: '/v1/rest/club/clubMembersInfo',
					data: {
						clubId: 3
					}
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						this.list1 = resp.data.clubMembersA
						this.list2 = this.list2.concat(resp.data.clubMembersE).concat(resp.data.clubMembersD).concat(resp.data.clubMembersC).concat(resp.data.clubMembersB)
					}
				})
			},
			onChange(v) {
				this.searchValue = v.detail
				if(this.searchValue !== '') {
					this.isShowTitle = false
					this.$http.get({
						url: '/v1/rest/club/clubMembersInfokeyWord',
						data: {
							clubId: 3,
							keyWord: this.searchValue
						}
					}).then(resp => {
						console.log(resp)
						if(resp.status == 200) {
							this.list2 = []
							this.isShowTitle = false
							this.list1 = resp.data
						}
					})
				}else{
					this.isShowTitle = true
					this.getCateList()
				}
			},
			editUser(item) {
				// console.log(item)
				uni.navigateTo({
					url: '/pages/groupOwnerManage/editMemberInfo/editMemberInfo?item=' + encodeURIComponent(JSON.stringify(item))
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.membershipManage{
		width: 100%;
		min-height: 100vh;
		background: #f4f4f4;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0 24rpx;
		padding-bottom: 60rpx;
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
			flex: 1;
			.itemBox{
				width: 100%;
				height: auto;
				margin-bottom: 23rpx;
				background: #fff;
				border-radius: 15rpx;
				.detail{
					width: 100%;
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
									background-size: 24rpx auto;
								}
								.sex2{
									background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/wIcon.png') no-repeat center;
									background-size: 22rpx auto;
								}
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
							justify-content: flex-end;
							.btn{
								width: 122rpx;
								height: 40rpx;
								text-align: center;
								line-height: 40rpx;
								font-size: 23rpx;
								color: #feba00;
								border: 1rpx solid #ffbc01;
								border-radius: 10rpx;
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
		.sectionTitle{
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			box-sizing: border-box;
			padding-left: 6rpx;
			font-size: 30rpx;
		}
	}
</style>