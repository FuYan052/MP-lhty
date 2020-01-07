<template>
	<view class="editUserInfo">
		<view class="top">
			<view class="wrap1 whiteBg">
				<view class="infoItem headImg" @click="choiceImg">
					<view class="title">头像</view>
					<view class="content">
						<view class="imgBox">
							<!-- <image src="http://f1.haiqq.com/allimg/3831982416/2817233822.jpg" style="width: 100%; height: 100%; border-radius: 50%;" alt=""> -->
							<image :src="imgFile" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
						</view>
					</view>
					<van-icon name="arrow" />
				</view>
				<view class="infoItem nickName">
					<view class="title">昵称</view>
					<view class="content">
						<van-field @change='InputNickName' input-align='right' placeholder="填写昵称" size='large' :border='false'/>
					</view>
					<van-icon name="arrow" color='#fff'/>
				</view>
				<view class="infoItem" @click="selectSex">
					<view class="title">性别</view>
					<view class="content">
						<van-field :value="sexValue" input-align='right' placeholder="选填性别" size='large' :border='false' readonly />
					</view>
					<van-icon name="arrow" />
				</view>
				<view class="infoItem" @click="selectHeight">
					<view class="title">身高</view>
					<view class="content">
						<van-field :value="heightValue" input-align='right' placeholder="选填身高" size='large' :border='false' readonly />
					</view>
					<van-icon name="arrow" />
				</view>
				<view class="infoItem" @click="selectBirth">
					<view class="title">生日</view>
					<view class="content">
						<van-field :value="birthValue" input-align='right' placeholder="选填生日" size='large' :border='false' readonly />
					</view>
					<van-icon name="arrow" />
				</view>
				<view class="infoItem" @click="selectWork">
					<view class="title">职业</view>
					<view class="content">
						<van-field :value="workValue" input-align='right' placeholder="选填职业" size='large' :border='false' readonly />
					</view>
					<van-icon name="arrow" />
				</view>
				<view class="infoItem region" @click="selectRegion">
					<view class="title">所在地区</view>
					<view class="content">
						<van-field :value="regionValue" input-align='right' placeholder="选填地区" size='large' :border='false' readonly />
					</view>
					<van-icon name="arrow" />
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="btn myButton">保存</view>
		</view>
		<!-- 性别选择器 -->
		<w-picker mode="selector" :selectList="sexList" @confirm="confirmSex" ref="picker1" themeColor="#ffbc01"></w-picker>
		<!-- 身高选择器 -->
		<w-picker mode="selector" :selectList="heightList" :defaultVal="['165 cm']" @confirm="confirmHeight" ref="picker2" themeColor="#ffbc01" ></w-picker>
		<!-- 生日选择器 -->
		<w-picker mode="date" startYear="1940" endYear="2019" :defaultVal="defaultValBirth" @confirm="confirmBirth" ref="picker3" themeColor="#ffbc01"></w-picker>
		<!-- 职业选择器 -->
		<w-picker mode="selector" :selectList="workList" @confirm="confirmWork" ref="picker4" themeColor="#ffbc01"></w-picker>
		<!-- 地区选择器 -->
		<w-picker mode="region" :hideArea='true' :areaCode="['510000','510100','0']" @confirm="confirmRegion" ref="picker5" themeColor="#ffbc01"></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				imgFile: '',
				nickName: '',
				sexValue: '',
				sexList: [{label: '男',value: 1},{label: '女',value: 2}],
				heightList: [],
				heightValue: '',
				birthValue: '',
				defaultValBirth: ['1990','06','15'],
				workList: [{label: '',value: ''},{label: '',value: ''}],
				workValue: '',
				regionValue: ''
			}
		},
		onLoad() {
			// 身高选择列表
			for(let i=120; i<=200; i++) {
				let item = {
					label: i + ' cm',
					value: i
				}
				this.heightList.push(item)
			}
			// 职业选择列表
			this.$http.get({
				url: '/v1/rest/public/findDictList',
				data:{
					skey: 'occupation',
				}
			}).then(resp => {
				console.log(resp)
				if(resp.status == 200) {
					this.workList = resp.data
				}
			})
		},
		methods: {
			choiceImg() {
				const that = this
				// uni.chooseImage({
				// 	count: 6, //默认9
				// 	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				// 	success: function (res) {
				// 		console.log(res)
				// 		that.imgFile = res.tempFilePaths
				// 	}
				// });
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: function(res) {
							// 预览图片
							uni.previewImage({
									urls: res.tempFilePaths,
									success: function(resp) {
										console.log(resp)
									}
									// longPressActions: {
									// 		success: function(data) {
									// 				console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
									// 		},
									// 		fail: function(err) {
									// 				console.log(err.errMsg);
									// 		}
									// }
							});
					}
				});
			},
			InputNickName(v) {
				this.nickName = v.detail
			},
			selectSex() {
				this.$refs.picker1.show()
			},
			confirmSex(v) {
				this.sexValue = v.result
			},
			// 选择身高
			selectHeight(v) {
				this.$refs.picker2.show()
			},
			confirmHeight(v) {
				this.heightValue = v.result
			},
			// 选择生日
			selectBirth(v) {
				this.$refs.picker3.show()
			},
			confirmBirth(v) {
				this.birthValue = v.result
			},
			// 选择职业
			selectWork(v) {
				this.$refs.picker4.show()
			},
			confirmWork(v) {
				this.workValue = v.result
			},
			// 选择地区
			selectRegion(v) {
				this.$refs.picker5.show()
			},
			confirmRegion(v) {
				this.regionValue = v.result
			},
		}
	}
</script>

<style lang="scss" scoped>
	.editUserInfo{
		width: 100%;
		height: 100vh;
		display: flex; 
		flex-direction: column;
		.top{
			width: 100%;
			flex: 1;
			overflow: auto;
			box-sizing: border-box;
			padding: 0 16rpx;
			.wrap1{
				width: 100%;
				height: auto;
				box-sizing: border-box;
				padding: 15rpx 32rpx;
				.infoItem{
					width: 100%;
					height: 106rpx;
					border-bottom: 1rpx solid #e8e8e8;
					box-sizing: border-box;
					padding-right: 25rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.title{
						width: 130rpx;
						text-align-last: justify;
						color: #4f4d4e;
					}
					.content{
						width: 440rpx;
						/deep/ .van-cell{
							padding: 0;
							.van-field__input{
								font-size: 28rpx;
								color: #535353;
							}
						}
					}
				}
				.headImg{
					width: 100%;
					height: 113rpx;
					.content{
						display: flex;
						align-items: center;
						justify-content: flex-end;
						.imgBox{
							width: 70rpx;
							height: 70rpx;
							border-radius: 50%;
							border: 1rpx solid #f5f5f5;
							background: #f4f4f4;
						}
					}
				}
				.region{
					border: none;
				}
			}
		}
		.bottom{
			width: 100%;
			height: 190rpx;
			box-sizing: border-box;
			padding: 0 16rpx;
			padding-top: 32rpx;
		}
	}
</style>