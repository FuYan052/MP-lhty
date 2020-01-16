<template>
	<view class="clubRank">
		<view class="cateBox">
			<view class="cateItem" :class="{currCate : currIndex == index}" v-for="(item,index) in cateList" :key='index' @click="changeCate(index)">
				{{item}}
			</view>
		</view>
		<view class="userRankInfo" v-if="isShowOwner">
			<view class="imgBox">
				<image :lazy-load='false' style="width: 100%; height: 100%; border-radius: 50%;"
					:src="ownerImg">
				</image>
			</view>
			<view class="name">{{ownerName}}</view>
			<view class="myRank">
				<view class="title">我的排名</view>
				<view class="rankNum">{{ownerRank}}</view>
			</view>
			<view class="myRank">
				<view class="title">我的积分</view>
				<view class="rankNum">{{ownerScore}}</view>
			</view>
		</view>
		<view class="rankWrap">
			<view class="rankItem" v-for="(item,index) in rankList" :key='index' :class="'curr' + index" @click="toInfo(item)">
				<view class="number">{{item.rownum}}</view>
				<view class="imgBox">
					<image :lazy-load='false' style="width: 100%; height: 100%; border-radius: 50%;"
						:src="item.headPortrait">
					</image>
				</view>
				<view class="name">{{item.nickName}}</view>
				<view class="jifen">站内积分<text>{{item.score}}</text></view>
				<van-icon name="arrow" size='31rpx' color='#9a929d'/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['clubId'],
		data() {
			return {
				cateList: ['站内排名','俱乐部排名'],
				currIndex: 0,
				rankList: [],
				ownerName: '',
				ownerImg: '',
				ownerRank: '',
				ownerScore: '',
				type: 0
			}
		},
		computed: {
			isShowOwner() {
				return Number(uni.getStorageSync('userInfo').userId) > 0
			}
		},
		created() {
			this.getRank()
		},
		methods: {
			getRank() {
				this.$http.get({
					url: '/v1/rest/club/clubRanking',
					data: {
						type: this.type,
						clubId: this.clubId,
						userId: uni.getStorageSync('userInfo').userId || ''
					}
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						this.rankList = resp.data.clubRankingBackVoList,
						this.ownerName = resp.data.nickName,
						this.ownerImg = resp.data.headPortrait,
						this.ownerRank = resp.data.rownum,
						this.ownerScore = resp.data.score
					}
				})
			},
			changeCate(index) {
				this.currIndex = index
				this.type = index  //后端约定0为站内排名，1为俱乐部排名，刚好与index对应
				this.getRank()
			},
			toInfo(item) {
				uni.navigateTo({
					url: '/pages/club/clubMemberInfo/clubMemberInfo?userId=' + item.userId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.clubRank{
		width: 100%;
		min-height: 100vh;
		background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/rankBg.jpg') no-repeat center;
		background-size: 100% 100%;
		.cateBox{
			width: 100%;
			height: 94rpx;
			border-bottom: 2rpx solid #4c4d62;
			display: flex;
			align-items: center;
			.cateItem{
				width: 50%;
				height: 92rpx;
				text-align: center;
				line-height: 94rpx;
				font-size: 30rpx;
				color: #a7a7a7;
			}
			.currCate{
				color: #fac307;
				border-bottom: 5rpx solid #f9c307;
			}
		}
		.userRankInfo{
			width: 100%;
			height: 140rpx;
			display: flex;
			align-items: center;
			.imgBox{
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				border: 6rpx solid #223a46;
				margin-left: 50rpx;
			}
			.name{
				width: 202rpx;
				font-size: 27rpx;
				color: #fff;
				margin-left: 20rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				box-sizing: border-box;
				padding-right: 25rpx;
			}
			.myRank{
				width: 190rpx;
				height: 64rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				.title{
					font-size: 23rpx;
					color: #808082;
					line-height: 24rpx;
				}
				.rankNum{
					font-size: 32rpx;
					color: #fff;
					line-height: 32rpx;
					font-weight: bold;
				}
			}
		}
		.rankWrap{
			width: 100%;
			height: auto;
			overflow: hidden;
			box-sizing: border-box;
			padding: 0 30rpx;
			padding-bottom: 100rpx;
			.rankItem{
				width: 100%;
				height: 120rpx;
				border-bottom: 1rpx solid #453252;
				display: flex;
				align-items: center;
				.number{
					width: 114rpx;
					font-size: 57rpx;
					color: #676771;
					font-style: oblique;
					font-weight: bold;
					box-sizing: border-box;
					margin-left: 30rpx;
				}
				.imgBox{
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					border: 6rpx solid #2e1d3f;
				}
				.name{
					width: 160rpx;
					margin-left: 35rpx;
					font-size: 28rpx;
					color: #fff;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.jifen{
					width: 200rpx;
					font-size: 24rpx;
					color: #fff;
					font-style: oblique;
					margin-left: 35rpx;
					text{
						font-size: 30rpx;
						font-weight: bold;
						padding-left: 10rpx;
					}
				}
			}
			.curr0, 
			.curr1, 
			.curr2{
				height: 128rpx;
				border: none;
				background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/rankItemBg.png') no-repeat center;
				background-size: 100% 100%;
				margin-top: 12rpx;
				.number{
					font-size: 54rpx;
					color: #fff;
					padding-left: 15rpx;
				}
				.imgBox{
					border: 6rpx solid #af881f;
				}
			}
		}
	}
</style>