<template>
	<view class="registerInfo">
		<view class="title">你的性别</view>
		<view class="contentBox">
			<view class="item section1" :class="{curr: index1 == index}" v-for="(item,index) in list1" :key='index' @click="select1(item,index)">
				{{item.value}}
			</view>
		</view>
		<view class="title">你是一位</view>
		<view class="contentBox">
			<view class="item section2" :class="{curr: index2 == index}" v-for="(item,index) in list2" :key='index'  @click="select2(item,index)">
				{{item}}
			</view>
		</view>
		<view class="title">你的职业</view>
		<view class="contentBox">
			<view class="item section3" :class="{curr: index3 == index}" v-for="(item,index) in list3" :key='index'  @click="select3(item,index)">
				{{item.label}}
			</view>
		</view>
		<view class="sureBtn myButton" @click="handleSure">确认</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				list1: [{id: 1, value: '男'},{id: 2, value: '女'}],
				list2: ['69前','70后','80后','90后','00后'],
				list3: [],
				sexValue: '',
				birthValue: '',
				occupationValue: '',
				index1: -1,
				index2: -1,
				index3: -1
			}
		},
		computed: {
			...mapState(['userInfo']),  //对全局变量hasLogin进行监控
		},
		created() {
			this.$http.get({
				url: '/v1/rest/public/findDictList',
				data:{
					skey: 'occupation',
				}
			}).then(resp => {
				// console.log(resp)
				if(resp.status == 200) {
					this.list3 = resp.data
				}
			})
		},
		onLoad() {
			
		},
		methods: {
			select1(item,index) {
				this.sexValue = item.id
				this.index1 = index
			},
			select2(item,index) {
				this.birthValue = item
				this.index2 = index
			},
			select3(item,index) {
				this.occupationValue = item.value
				this.index3 = index
			},
			// 提交
			handleSure() {
				if(this.index1 < 0) {
					uni.showToast({
						title: '请选择性别！',
						duration: 2000,
						icon: 'none'
					});
				}else if(this.index2 < 0) {
					uni.showToast({
						title: '请选择年龄段！',
						duration: 2000,
						icon: 'none'
					});
				}else if(this.index3 < 0) {
					uni.showToast({
						title: '请选择职业！',
						duration: 2000,
						icon: 'none'
					});
				}else {
					const params = {
						userId: this.userInfo.userId,
						sex: this.sexValue,
						ageGroup: this.birthValue,
						occupation: this.occupationValue,
					}
					// console.log(params)
					this.$http.post({
						url: '/v1/rest/login/registerLabelSaveOne',
						data: params,
					}).then(resp => {
						// console.log(resp)
						if(resp.status == 200) {
							uni.redirectTo({
								url: '/pages/userInfo/selectionTags/selectionTags?sex=' + this.sexValue
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.registerInfo{
		width: 100%;
		min-height: 100vh;
		box-sizing: border-box;
		overflow: hidden;
		padding:  0 16rpx;
		padding-top: 50rpx;
		.title{
			width: 100%;
			color: #fff;
			font-size: 31rpx;
			text-align: center;
			line-height: 32rpx;
			margin-bottom: 68rpx;
		}
		.contentBox{
			width: 100%;
			height: auto;
			box-sizing: border-box;
			padding: 0 64rpx;
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 90rpx;
		}
		.item{
			height: 97rpx;
			line-height: 97rpx;           
			text-align: center;
			background: #353535;
			color: #bdbcbc;
			font-size: 28rpx;
			margin-left: 5rpx;
		}
		.section1{
			width: 292rpx;
		}
		.section1:nth-of-type(1) {
			margin-left: 0;
		}
		.section2{
			width: 115rpx;
		}
		.section2:nth-of-type(1) {
			margin-left: 0;
		}
		.section3{
			width: 195rpx;
			margin-bottom: 6rpx;
		}
		.section3:nth-of-type(1) {
			margin-left: 0;
		}
		.section3:nth-of-type(4) {
			margin-left: 0;
		}
		.section3:nth-of-type(7) {
			margin-left: 0;
		}
		.curr{
			color: #ffbb00;
		}
		.sureBtn{
			margin-top: 50rpx;
		}
	}
</style>