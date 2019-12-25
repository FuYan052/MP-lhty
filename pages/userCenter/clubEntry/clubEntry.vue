<template>
	<view class="clubEntry">
		<view class="sectionTitle">俱乐部基本信息</view>
		<view class="section1">
			<van-cell-group :border='false'>
				<van-field custom-style='margin-top: 0rpx;' @change='InputName' label="名称" placeholder="请输入俱乐部名称" size='large' :border='false'/>
				<van-field @change='InputQQgroup' label="QQ群" placeholder="请输入俱乐部使用的QQ群" size='large' :border='false'/>
				<view @click='selectRegion'>
					<van-field label="地区" placeholder="选择城市" right-icon="arrow" size='large' :border='false' readonly />
				</view>
				<van-field @change='InputVenue' label="活动场馆" placeholder="常活动场馆" size='large' :border='false'/>
			</van-cell-group>
		</view>
		<view class="sectionTitle">会长基本信息</view>
		<view class="section2">
			<van-cell-group :border='false'>
				<van-field custom-style='margin-top: 0rpx;' @change='InputUserName' label="姓名" placeholder="请输入姓名" size='large' :border='false' readonly/>
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
			<view class="myButton">提交申请</view>
		</view>
		<!-- 选择器 -->
		<w-picker
			mode="region" 
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
				QQ: ''
			}
		},
		methods: {
			InputName(v) {
				this.clubName = v
			},
			InputQQgroup(v) {
				this.QQgroup = v
			},
			InputVenue(v) {
				this.Venue = v
			},
			selectRegion() {
				this.$refs.picker1.show()
			},
			onConfirm(v) {
				console.log(v)
			},
			InputUserName(v) {
				this.UserName = v
			},
			InputPhone(v) {
				this.phone = v
			},
			InputWeixin(v) {
				this.Weixin = v
			},
			InputQQ(v) {
				this.QQ = v
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
 