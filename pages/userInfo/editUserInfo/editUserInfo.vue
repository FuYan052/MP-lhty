<template>
	<view class="editUserInfo">
		<view class="top">
			<view class="wrap1 whiteBg">
				<view class="infoItem headImg" @click="choiceImg">
					<view class="title">头像</view>
					<view class="content">
						<view class="imgBox">
							<image :src="imgFile" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
						</view>
					</view>
					<van-icon name="arrow" />
				</view>
				<view class="infoItem nickName">
					<view class="title">昵称</view>
					<view class="content">
						<van-field :value='nickName' @change='InputNickName' input-align='right' placeholder="填写昵称" size='large' :border='false'/>
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
			<!-- 标签部分 -->
			<view class="wrap whiteBg">
				<view class="title">标签</view>
				<view class="itemBox">
					<view class="addBtn" @click="selectLabel"><van-icon name="plus" size='24rpx' color='#aaaaaa' /></view>
					<view class="itemLabel" v-for="(item,index) in selectedList" :key="index">
						{{item.label}}
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="btn myButton" @click="submit">保存</view>
		</view>
		<!-- 性别选择器 -->
		<w-picker mode="selector" :selectList="sexList" @confirm="confirmSex" ref="picker1" themeColor="#ffbc01"></w-picker>
		<!-- 身高选择器 -->
		<w-picker mode="selector" :selectList="heightList" :defaultVal="['165 cm']" @confirm="confirmHeight" ref="picker2" themeColor="#ffbc01" ></w-picker>
		<!-- 生日选择器 -->
		<w-picker mode="date" startYear="1940" endYear="2020" :defaultVal="defaultValBirth" @confirm="confirmBirth" ref="picker3" themeColor="#ffbc01"></w-picker>
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
				sex: '',
				sexValue: '',
				sexList: [{label: '男',value: 1},{label: '女',value: 2}],
				heightList: [],
				heightValue: '',
				birthValue: '',
				defaultValBirth: ['1990','06','15'],
				birthRangeValue: '',
				workList: [{label: '',value: ''},{label: '',value: ''}],
				workId: '',
				workValue: '',
				regionId: '',
				regionValue: '',
				selectedIds: [],
				selectedList: [],
				infoId: ''
			}
		},
		onLoad(options) {
			// 获取信息
			this.$http.get({
				url: '/v1/rest/mydata/findUserInfo',
				data: {
					userId: uni.getStorageSync('userInfo').userId
				}
			}).then(resp => {
				// console.log(resp)
				if(resp.status == 200) {
					this.infoId = resp.data.id
					this.imgFile = resp.data.headPortrait
					this.nickName = resp.data.nickName
					this.sex = resp.data.sex
					if(resp.data.sex == 1) {
						this.sexValue = '男'
					}else{
						this.sexValue = '女'
					}
					this.heightValue = resp.data.height
					this.birthValue = resp.data.birthday
					this.workId = resp.data.occupationId
					this.workValue = resp.data.occupation
					this.regionId = resp.data.region
					this.regionValue = resp.data.regionName
					if(resp.data.labelId) {
						this.selectedIds = resp.data.labelId.split(',')
					}else{
						this.selectedIds = []
					}
					this.selectedList = resp.data.labelVoList
				}
			})
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
				// console.log(resp)
				if(resp.status == 200) {
					this.workList = resp.data
				}
			})
		},
		onShow() {
			if(uni.getStorageSync('selectedLabels')) {
				this.selectedIds = uni.getStorageSync('selectedLabels').labelIds
				this.selectedList = uni.getStorageSync('selectedLabels').labelList
			}
		},
		methods: {
			choiceImg() {
				const that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						// console.log(res)
						that.imgFile = res.tempFilePaths[0]
						const filepath = res.tempFilePaths[0]
						uni.showLoading({
						  title: '上传中...'
						})
						uni.uploadFile({
							url: that.$http.baseUrl + '/v1/rest/file/uploadOSS', //仅为示例，非真实的接口地址
							filePath: filepath,
							name: 'file',
							success: (uploadFileRes) => {
								uni.hideLoading();
								const resp = JSON.parse(uploadFileRes.data)
								// console.log(resp);
								if(resp.status == 200) {
									that.imgFile = resp.data[0]
									uni.showToast({
										title: '上传成功！',
										duration: 1500,
										icon: 'none'
									});
								}
							},
							fail: (err) => {
								// console.log(err)
							}
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
				// 计算年龄段
				const birthYear = v.checkArr[0].toString()
				if(Number(v.checkArr[0]) <= 1969) {
					this.birthRangeValue = '69前'
				}else if(Number(v.checkArr[0]) >= 2000 && Number(v.checkArr[0]) < 2010) {
					this.birthRangeValue = '00后'
				}else if(Number(v.checkArr[0]) >= 2010) {
					this.birthRangeValue = '10后'
				}else{
					this.birthRangeValue = birthYear.substring(2,3) + '0后'
				}
			},
			// 选择职业
			selectWork(v) {
				this.$refs.picker4.show()
			},
			confirmWork(v) {
				// console.log(v)
				this.workValue = v.checkArr.label
				this.workId = v.checkArr.value
			},
			// 选择地区
			selectRegion(v) {
				this.$refs.picker5.show()
			},
			confirmRegion(v) {
				// console.log(v)
				this.regionValue = v.result
				this.regionId = v.checkValue[1]
			},
			// 选择标签
			selectLabel() {
				// console.log(this.selectedIds)
				uni.navigateTo({
					url: '/pages/userInfo/tagsPage/tagsPage?ids=' + encodeURIComponent(JSON.stringify(this.selectedIds)) 
				})
			},
			//保存
			submit() {
				const params = {
					id: this.infoId,
					headPortrait: this.imgFile,
					nickName: this.nickName,
					sex: this.sex,
					height: this.heightValue,
					birthday: this.birthValue,
					ageGroup: this.birthRangeValue,
					occupationId: this.workId,
					region: this.regionId,
					labelId: this.selectedIds.join(','),
					userId: uni.getStorageSync('userInfo').userId
				}
				this.$http.post({
					url: '/v1/rest/mydata/saveUserInfo',
					data: params
				}).then(resp => {
					// console.log(resp)
					if(resp.status == 200) {
						uni.removeStorageSync('selectedLabels')
						uni.navigateBack()
						uni.showToast({
							title: '保存成功！',
							duration: 1500,
							icon: 'none'
						});
					}
				})
			}
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
						font-size: 28rpx;
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
			.wrap{
				width: 100%;
				min-height: 188rpx;
				margin-top: 30rpx;
				box-sizing: border-box;
				padding: 0 32rpx;
				.title{
					width: 130rpx;
					height: 76rpx;
					line-height: 76rpx;
					font-size: 28rpx;
					text-align-last: justify;
					color: #4f4d4e;
				}
				.itemBox{
					width: 100%;
					height: auto;
					font-size: 0;
					margin-top: 20rpx;
					display: flex;
					flex-wrap: wrap;
					.addBtn{
						width: 100rpx;
						height: 46rpx;
						color: #aaaaaa;
						border: 1rpx solid #aaaaaa;
						border-radius: 25rpx;
						font-weight: bold;
						margin-bottom: 30rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-right: 18rpx;
					}
					.itemLabel{
						width: 157rpx;
						height: 46rpx;
						line-height: 46rpx;
						border: 1rpx solid #f9c31b;
						color: #f9c21f;
						background: #fcebb8;
						border-radius: 25rpx;
						text-align: center;
						font-size: 23rpx;
						margin-right: 18rpx;
						margin-bottom: 30rpx;
					}
				}
			}
		}
		.bottom{
			width: 100%;
			height: 160rpx;
			box-sizing: border-box;
			padding: 0 16rpx;
			padding-top: 32rpx;
		}
	}
</style>