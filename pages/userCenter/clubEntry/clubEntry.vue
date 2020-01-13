<template>
	<view class="clubEntry">
		<view class="sectionTitle">俱乐部基本信息</view>
		<view class="section1">
			<van-cell-group :border='false'>
				<van-field custom-style='margin-top: 0rpx;' @change='InputName' label="名称" placeholder="请输入俱乐部名称" size='large' :border='false'/>
				<van-field @change='InputQQgroup' label="QQ群" placeholder="请输入俱乐部使用的QQ群" size='large' :border='false'/>
				<view @click='selectRegion'>
					<van-field label="地区" :value='regionName' placeholder="选择城市" right-icon="arrow" size='large' :border='false' readonly />
				</view>
				<van-field @change='InputVenue' label="活动场馆" placeholder="常活动场馆" size='large' :border='false'/>
			</van-cell-group>
			<view class="logoBox whiteBg2">
				<view class="title">俱乐部LOGO</view>
				<view class="logoUpperBox">
					<view class="imgBox" v-if="imgUrl == ''" @click="choiceImg">
						<van-icon name="plus" size='30rpx' color='#8a8a8a'/>
					</view>
					<view class="LogoImg" v-else @click="choiceImg">
						<image :src="imgUrl" mode="" style="width: 100%; height: 100%;"></image>
					</view>
				</view>
			</view>
			<view class="intro whiteBg2">
				<view class="title">俱乐部介绍</view>
				<view class="textAreaBox">
						<van-field
							type="textarea"
							placeholder="请输入俱乐部简介"
							:autosize='true'
							:border="false"
							:show-confirm-bar='false'
						/>
				</view>
			</view>
		</view>
		<view class="sectionTitle">会长基本信息</view>
		<view class="section2">
			<van-cell-group :border='false'>
				<van-field custom-style='margin-top: 0rpx;' @change='InputUserName' label="姓名" placeholder="请输入姓名" size='large' :border='false'/>
				<van-field @change='InputPhone' type='number' label="手机号" placeholder="请输入手机号" size='large' :border='false'/>
				<van-field @change='InputWeixin' label="微信" placeholder="请输入微信" size='large' :border='false'/>
				<van-field @change='InputQQ' label="QQ" placeholder="请输入QQ" size='large' :border='false'/>
			</van-cell-group>
		</view>
		<view class="sectionTitle">客服信息</view>
		<view class="section3">
			<van-cell-group :border='false'>
				<van-field custom-style='margin-top: 0rpx;' value='19983057372' label="客服电话" size='large' :border='false' readonly/>
				<van-field label="客服微信" size='large' value='1009806199ZI' :border='false' readonly/>
			</van-cell-group>
		</view>
		<view class="tips">
			如有疑问可拨打客服电话或添加客服微信咨询
		</view>
		<view class="btnBox">
			<view class="myButton" @click="submit">提交申请</view>
		</view>
		<!-- 选择器 -->
		<w-picker
			mode="region" 
			:hideArea='true'
			:areaCode="['510000','510100','0']"
			:selectList="columns"
			@confirm="onConfirm" 
			ref="picker1" 
			themeColor="#ffbc01" 
		></w-picker>
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
				clubName: '',
				QQgroup: '',
				Venue: '',
				UserName: '',
				phone: '',
				Weixin: '',
				QQ: '',
				regionCode: '',
				regionName: '',
				introduce: '',
				imgUrl: '../../../static/logo.png',
			}
		},
		methods: {
			InputName(v) {
				this.clubName = v.detail
			},
			InputQQgroup(v) {
				this.QQgroup = v.detail
			},
			InputVenue(v) {
				this.Venue = v.detail
			},
			selectRegion() {
				this.$refs.picker1.show()
			},
			onConfirm(v) {
				console.log(v)
				this.regionName = v.result
				this.regionCode = v.checkValue[1]
			},
			InputUserName(v) {
				this.UserName = v.detail
			},
			choiceImg() {
				const that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						console.log(res)
						that.imgUrl = res.tempFilePaths[0]
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
								console.log(resp);
								if(resp.status == 200) {
									that.imgUrl = resp.data[0]
								}
							},
							fail: (err) => {
								console.log(err)
							}
						});
					}
				});
			},
			inputIntrValue(v) {
				this.introduce = v.detail
			},
			InputPhone(v) {
				this.phone = v.detail
			},
			InputWeixin(v) {
				this.Weixin = v.detail
			},
			InputQQ(v) {
				this.QQ = v.detail
			},
			submit() {
				const params = {
					clubName: this.clubName,
					qqGroup: this.QQgroup,
					region: this.regionCode,
					venueName: this.Venue,
					name: this.UserName,
					phone: this.phone,
					qq: this.QQ,
					weixin: this.Weixin,
					logo: this.imgUrl,
					content: this.introduce,
					userId: uni.getStorageSync('userInfo').userId
				}
				console.log(params)
				this.$http.post({
					url: '/v1/rest/club/insertClub',
					data: params
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						uni.showModal({
							title: '提示',
							content: '申请成功，请等待审核！',
							showCancel: false,
							confirmText: '知道了',
							success: function (res) {
								uni.navigateBack()
							}
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.clubEntry{
		width: 100%;
		min-height: 100vh;
		box-sizing: border-box;
		padding: 0 16rpx;
		padding-bottom: 230rpx;
		.sectionTitle{
			width: 100%;
			height: 92rpx;
			line-height: 92rpx;
			font-size: 28rpx;
			color: #fff;
		}
		/deep/ .van-cell--large{
			margin-top: 8rpx;
			.van-cell__title{
				font-size: 28rpx;
			}
		}
		.section1{
			.whiteBg2{
				width: 100%;
				min-height: 250rpx;
				background: #fff;
				border-radius: 10rpx;
				margin-top: 8rpx;
				box-sizing: border-box;
				padding-bottom: 35rpx;
				.title{
					height: 92rpx;
					margin-left: 32rpx;
					letter-spacing: 1rpx;
					font-size: 28rpx;
					color: #1f1f1f;
					line-height: 92rpx;
				}
			}
			.intro{
				width: 100%;
				min-height: 250rpx;
				box-sizing: border-box;
				padding: 0 35rpx;
				padding-bottom: 35rpx;
				.title{
					margin-left: 0;
				}
				.textAreaBox{
					width: 100%;
					min-height: 135rpx;
					box-sizing: border-box;
					display: flex;
					border: 1rpx solid #222222;
					padding: 20rpx;
					/deep/ .van-cell{
						width: 600rpx;
						padding: 0;
						.van-field__input{
							min-height: 135rpx;
							font-size: 28rpx;
							line-height: 40rpx;
						}
						.van-field__body--textarea.van-field__body--ios{
							margin-top: 0;
						}
					}
				}
			}
			.logoBox{
				height: 196rpx;
				.logoUpperBox{
					height: 100rpx;
					display: flex;
				}
				.imgBox{
					width: 83rpx;
					height: 83rpx;
					border: 1rpx dashed #898989;
					margin-left: 35rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.LogoImg{
					width: 83rpx;
					height: 83rpx;
					margin-left: 35rpx;
				}
			}
		}
		.tips{
			width: 100%;
			line-height: 78rpx;
			box-sizing: border-box;
			font-size: 24rpx;
			color: #febe00;
			padding-left: 5rpx;
		}
		.btnBox{
			width: 100%;
			height: 220rpx;
			box-sizing: border-box;
			padding: 0 16rpx;
			padding-top: 30rpx;
			margin-top: 70rpx;
			background: #1e1e1e;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 9;
		}
	}
</style>
 