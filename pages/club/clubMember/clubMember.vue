<template>
	<view class="clubMember">
		<!-- 搜索框 -->
		<view class="searchBg">
			<view class="searchBox">
				<van-field
					placeholder="搜索成员"
					placeholder-style='color: #1e1e1e'
					:border="false"
					left-icon="search"
					@change="onChange"
				/>
			</view>
		</view>
		<!-- 管理组 -->
		<view class="sectionTitle" v-show="isShowTitle1">管理组</view>
		<view class="contentBox contentBox1" :class="{contentChange : !isShowTitle}" v-show="isShowTitle">
			<view class="itemBox" v-for="(item,index) in list1" :key='index' @click="toUserInfo(item)">
				<view class="detail">
					<view class="top">
						<view class="imgBox">
							<image style="width: 100%; height: 100%; border-radius: 50%;"
								:src="item.headPortrait" mode="">
							</image>
						</view>
						<view class="info">
							<view class="name">{{item.nickName}}</view>
							<text class="text1" v-if="item.sex == 1"></text><text class="text2" v-else></text>
						</view>
						<view class="levelBox">
							<view class="role">{{item.state}}</view>
							<view class="level">{{item.level}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 高级 -->
		<view class="sectionTitle" v-show="isShowTitle2">高级</view>
		<view class="contentBox contentBox2" :class="{contentChange : !isShowTitle}" v-show="isShowTitle">
			<view class="itemBox" v-for="(item,index) in list2" :key='index' @click="toUserInfo(item)">
				<view class="detail">
					<view class="top">
						<view class="imgBox">
							<image style="width: 100%; height: 100%; border-radius: 50%;"
								:src="item.headPortrait" mode="">
							</image>
						</view>
						<view class="info">
							<view class="name">{{item.nickName}}</view>
							<text class="text1" v-if="item.sex == 1"></text><text class="text2" v-else></text>
						</view>
						<view class="levelBox">
							<view class="role">{{item.state}}</view>
							<view class="level">{{item.level}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 中级 -->
		<view class="sectionTitle" v-show="isShowTitle3">中级</view>
		<view class="contentBox contentBox2" :class="{contentChange : !isShowTitle}" v-show="isShowTitle">
			<view class="itemBox" v-for="(item,index) in list3" :key='index' @click="toUserInfo(item)">
				<view class="detail">
					<view class="top">
						<view class="imgBox">
							<image style="width: 100%; height: 100%; border-radius: 50%;"
								:src="item.headPortrait" mode="">
							</image>
						</view>
						<view class="info">
							<view class="name">{{item.nickName}}</view>
							<text class="text1" v-if="item.sex == 1"></text><text class="text2" v-else></text>
						</view>
						<view class="levelBox">
							<view class="role">{{item.state}}</view>
							<view class="level">{{item.level}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 初级 -->
		<view class="sectionTitle" v-show="isShowTitle4">初级</view>
		<view class="contentBox contentBox2" :class="{contentChange : !isShowTitle}" v-show="isShowTitle">
			<view class="itemBox" v-for="(item,index) in list4" :key='index' @click="toUserInfo(item)">
				<view class="detail">
					<view class="top">
						<view class="imgBox">
							<image style="width: 100%; height: 100%; border-radius: 50%;"
								:src="item.headPortrait" mode="">
							</image>
						</view>
						<view class="info">
							<view class="name">{{item.nickName}}</view>
							<text class="text1" v-if="item.sex == 1"></text><text class="text2" v-else></text>
						</view>
						<view class="levelBox">
							<view class="role">{{item.state}}</view>
							<view class="level">{{item.level}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 菜鸟 -->
		<view class="sectionTitle" v-show="isShowTitle5">菜鸟</view>
		<view class="contentBox contentBox2" :class="{contentChange : !isShowTitle}" v-show="isShowTitle">
			<view class="itemBox" v-for="(item,index) in list5" :key='index' @click="toUserInfo(item)">
				<view class="detail">
					<view class="top">
						<view class="imgBox">
							<image style="width: 100%; height: 100%; border-radius: 50%;"
								:src="item.headPortrait" mode="">
							</image>
						</view>
						<view class="info">
							<view class="name">{{item.nickName}}</view>
							<text class="text1" v-if="item.sex == 1"></text><text class="text2" v-else></text>
						</view>
						<view class="levelBox">
							<view class="role">{{item.state}}</view>
							<view class="level">{{item.level}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 搜索结果列表 -->
		<view class="contentBox contentBox2" :class="{contentChange : !isShowTitle}" v-show="!isShowTitle">
			<view class="itemBox" v-for="(item,index) in list6" :key='index' @click="toUserInfo(item)">
				<view class="detail">
					<view class="top">
						<view class="imgBox">
							<image style="width: 100%; height: 100%; border-radius: 50%;"
								:src="item.headPortrait" mode="">
							</image>
						</view>
						<view class="info">
							<view class="name">{{item.nickName}}<text v-if="item.sex == 1">(男)</text><text v-else>(女)</text></view>
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
				list1: [],
				list2: [],
				list3: [],
				list4: [],
				list5: [],
				list6: [],
				searchValue: '',
				isShowTitle: true,
				clubId: ''
			}
		},
		computed: {
			isShowTitle1() {
				return this.isShowTitle && this.list1.length > 0
			},
			isShowTitle2() {
				return this.isShowTitle && this.list2.length > 0
			},
			isShowTitle3() {
				return this.isShowTitle && this.list3.length > 0
			},
			isShowTitle4() {
				return this.isShowTitle && this.list4.length > 0
			},
			isShowTitle5() {
				return this.isShowTitle && this.list5.length > 0
			},
		},
		onLoad(options) {
			this.clubId = options.clubId
			this.getCateList()
		},
		methods: {
			// 分组成员
			getCateList() {
				this.$http.get({
					url: '/v1/rest/club/clubMembersInfo',
					data: {
						clubId: this.clubId
					}
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						this.list1 = resp.data.clubMembersA
						this.list2 = resp.data.clubMembersE
						this.list3 = resp.data.clubMembersD
						this.list4 = resp.data.clubMembersC
						this.list5 = resp.data.clubMembersB
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
							clubId: this.clubId,
							keyWord: this.searchValue
						}
					}).then(resp => {
						console.log(resp)
						if(resp.status == 200) {
							this.list6 = resp.data
						}
					})
				}else{
					this.isShowTitle = true
					this.getCateList()
				}
			},
			toUserInfo(item) {
				uni.navigateTo({
					url: "/pages/club/clubMemberInfo/clubMemberInfo?userId=" + item.userId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.clubMember{
		width: 100%;
		min-height: 100vh;
		background: #1e1a19;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0 41rpx;
		padding-bottom: 40rpx;
		.searchBox{
			width: 100%;
			height: 84rpx;
			border-radius: 35rpx;
			background: #dfa923;
			box-sizing: border-box;
			color: #1E1E1E;
			margin-top: 30rpx;
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
			height: 98rpx;
			color: #e1e0e0;
			line-height: 98rpx;
			box-sizing: border-box;
			padding-left: 10rpx;
			font-size: 30rpx;
			font-weight: 600;
		}
		.contentBox{
			width: 100%;
			overflow: auto;
			box-sizing: border-box;
			flex: 1;
			.itemBox{
				width: 100%;
				height: auto;
				margin-bottom: 20rpx;
				background: #322e2f;
				border-radius: 15rpx;
				.detail{
					width: 100%;
					height: 160rpx;
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
							display: flex;
							align-items: center;
							.name{
								max-width: 370rpx;
								line-height: 88rpx;
								font-size: 31rpx;
								color: #e1e0e0;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
							.text1{
								display: block;
								width: 34rpx;
								height: 34rpx;
								margin-left: 12rpx;
								background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/mIcon.png') no-repeat center;
								background-size: 24rpx auto;
							}
							.text2{
								display: block;
								width: 34rpx;
								height: 34rpx;
								margin-left: 15rpx;
								background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/wIcon.png') no-repeat center;
								background-size: 22rpx auto;
							}
						}
						.levelBox{
							width: 80rpx;
							height: 88rpx;
							font-size: 22rpx;
							color: #6d6b6b;
							margin-left: 25rpx;
							.role{
								line-height: 35rpx;
							}
							.level{
								font-size: 24rpx;
								color: #e1e0e0;
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