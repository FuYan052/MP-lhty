<template>
	<view class="editUserInfo">
		<view class="top">
			<view class="wrap1 whiteBg">
				<view class="infoItem headImg">
					<view class="title">头像</view>
					<view class="content">
						<view class="imgBox">
							<image src="http://f1.haiqq.com/allimg/3831982416/2817233822.jpg" style="width: 100%; height: 100%; border-radius: 50%;" alt="">
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
		<w-picker mode="selector" :selectList="sexList" :defaultVal='defaultValue' @confirm="confirmSex" ref="picker1" themeColor="#ffbc01"></w-picker>
		<!-- 身高选择器 -->
		<w-picker
			mode="selector" 
			:selectList="sexList"
			:defaultVal='defaultValue'
			@confirm="confirmSex" 
			ref="picker2" 
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
				nickName: '',
				sexValue: '',
				sexList: [{'label': '男',value: 1},{'label': '女',value: 2}],
				heightValue: '',
				birthValue: '',
				workValue: '',
				regionValue: ''
			}
		},
		methods: {
			InputNickName(v) {
				this.nickName = v.detail
			},
			selectSex() {
				this.columns = this.sexList
				this.$refs.picker1.show()
			},
			confirmSex(v) {
				this.sexValue = v.result
			},
			// 选择身高
			selectHeight(v) {
				this.columns = this.sexList
				this.$refs.picker1.show()
			},
			confirmHeight(v) {
				this.sexValue = v.result
			},
			// 选择生日
			selectBirth(v) {
				this.columns = this.sexList
				this.$refs.picker1.show()
			},
			confirmBirth(v) {
				this.birthValue = v.result
			},
			// 选择职业
			selectWork(v) {
				this.columns = this.sexList
				this.$refs.picker1.show()
			},
			confirmWork(v) {
				this.sexValue = v.result
			},
			// 选择地区
			selectRegion(v) {
				this.columns = this.sexList
				this.$refs.picker1.show()
			},
			confirmWork(v) {
				this.sexValue = v.result
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
					height: 113rpx;
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