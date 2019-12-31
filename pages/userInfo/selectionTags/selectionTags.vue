<template>
	<view class="selectionTags">
		<view class="topBox">
			<view class="skip" @click="skip">跳过></view>
			<!-- 男头像 -->
			<view class="imgBox imgBox1" v-if="isMan"></view>
			<!-- 女头像 -->
			<view class="imgBox imgBox2" v-else></view>
		</view>
		<view class="title">选择你的形象标签</view>
		<view class="tips">
			<text class="text">
				选择越多推荐的信息越精准
			</text>
		</view>
		<view class="tagsWrap">
			<view 
					class="tagItem" 
					v-for="(item,index) in tagsList" 
					:key='index'
					@click="handleSelect(item,index)"
					:class="{selected: selectedList.indexOf(item.value) >= 0}"
					>{{item.label}}</view>
		</view>
		<view class="submitBtn" @click="handleSure">我选好了</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isMan: true,
				tagsList: [],
				currindex: -1,
				selectedList: []
			}
		},
		onLoad(options) {
			console.log(options)
			if(options.sex == 1) {
				this.isMan = true
			}else{
				this.isMan = false
			}
		},
		created() {
			this.$http.get({
				url: '/v1/rest/public/findSysLabel',
				data:{}
			}).then(resp => {
				console.log(resp)
				if(resp.status == 200) {
					this.tagsList = resp.data
				}
			})
		},
		methods: {
			skip() {
				uni.navigateBack()
			},
			handleSelect(item,index) {
				this.currindex = index
				let selectedIndex = this.selectedList.indexOf(item.value)
				 if(selectedIndex >= 0) {
					this.selectedList.splice(selectedIndex, 1)
				}else{
					this.selectedList.push(item.value)
				}
			},
			handleSure() {
				this.$http.get({
					url: '/v1/rest/login/registerLabelSaveOne',
					data: {
						userId: '',
						labelId: this.selectedList.join(',')
					},
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						uni.navigateBack()
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.selectionTags{
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 20rpx;
		background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/labelBg.png') no-repeat center;
		background-size: 100% 100%;
		.topBox{
			width: 100%;
			height: 347rpx;
			box-sizing: border-box;
			padding: 0 70rpx;
			overflow: hidden;
			.skip{
				font-size: 28rpx;
				color: #dbdbdb;
				float: right;
			}
			.imgBox{
				width: 249rpx;
				height: 246rpx;
				margin: 0 auto;
				margin-top: 98rpx;
				background: url(https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/menIcon2.png) no-repeat center;
				background-size: cover;
			}
			.imgBox2{
				background: url(https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/womenIcon2.png) no-repeat center;
				background-size: cover;
			}
		}
		.title{
			width: 100%;
			color: #fff;
			font-size: 45rpx;
			text-align: center;
			line-height: 45rpx;
			margin-top: 70rpx;
		}
		.tips{
			width: 100%;
			text-align: center;
			margin-top: 23rpx;
			.text{
				display: inline-block;
				height: 40rpx;
				font-size: 26rpx;
				color: #6a6969;
				padding-left: 30rpx;
				background: url(https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/handIcon.png) no-repeat left top;
				background-size: 25rpx auto;
				background-position-y: 8rpx;
			}
		}
		.tagsWrap{
			width: 550rpx;
			height: 596rpx;
			overflow-y: auto;
			margin: 0 auto;
			margin-top: 65rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.tagItem{
				width: 260rpx;
				height: 88rpx;
				background: #3a3a3a;
				font-size: 28rpx;
				color: #fff;
				line-height: 88rpx;
				text-align: center;
				margin-bottom: 27rpx;
				border-radius: 5rpx;
			}
			.selected{
				background: #ffb400;
				color: #000000;
			}
		}
		.submitBtn{
			font-size: 56rpx;
			color: #fff;
			text-align: center;
			line-height: 58rpx;
			margin-top: 65rpx;
			margin-bottom: 30rpx;
		}
	}
</style>