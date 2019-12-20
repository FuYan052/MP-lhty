<template>
	<view class="recharge">
		<view class="whiteBg topBox">
			<van-cell title="充值俱乐部" :border='false' :value="clubName" title-width='190rpx' is-link size='large' @click='choiceClub'/>
			<view class="myCell account">
				<view class="title">充值账户</view>
				<view class="right">
					<text>幸运</text>
					<view class="imgBox">
						<image style="width: 100%; height: 100%;" src="https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/weixinIcon2.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="myCell">
				<view class="title">支付方式</view>
				<view class="right">
					<text>微信支付</text>
					<view class="imgBox">
						<image style="width: 100%; height: 100%;" src="https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/weixinIcon2.png" mode=""></image>
					</view>
				</view>
			</view>
			<van-field
				<van-field
					:value="money"
					type='number'
					title-width='260rpx'
					:border='false'
					label="充值金额"
					placeholder="请输入您要充值的金额"
					placeholder-style='font-size:26rpx;'
					@change='inputMoney'
				/>
			/>
		</view>
		<view class="btnbox">
			<view class="myButton" type="primary" @click="submit">确认充值</view>
		</view>
		<!-- 选择器 -->
		<w-picker
			mode="selector" 
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
				columns: [],
				clubName: '请选择俱乐部',
				clubId: '',
				money: ''
			}
		},
		created() {
			this.columns = [{label:"来虎",value:"1"},{label:"波利",value:"2"},{label:"晴天",value:"3"}]
		},
		methods: {
			choiceClub() {
				this.$refs.picker1.show()
			},
			onConfirm(v) {
				// console.log(v)
				this.clubId = v.checkArr.value
				this.clubName = v.checkArr.label
			},
			inputMoney(v) {
				this.money = v.detail
			},
			submit() {
				if(this.clubId == '') {
					uni.showToast({
						title: '请选择要充值的俱乐部',
						duration: 2000,
						icon: 'none'
					});
				}else if(Number(this.money) <= 0) {
					uni.showToast({
						title: '请输入您要充值的金额',
						duration: 2000,
						icon: 'none'
					});
				}else{
					const params = {
						clubId: this.clubId,
						money: this.money
					}
					console.log(params)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recharge{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0 28rpx;
		.topBox{
			height: 376rpx;
			margin-top: 40rpx;
			box-sizing: border-box;
			padding-top: 6rpx;
			/deep/ .van-cell{
				height: 90rpx;
				border-radius: 12rpx;
				.van-cell__title{
					color: #504e4f;
					font-size: 28rpx;
				}
				.van-cell__value{
					font-size: 26rpx;
					color: #515151;
				}
				.van-icon{
					color: #3a3a3a;
				}
			}
			/deep/ .van-cell::after {
				right: 32rpx;
			}
			.myCell{
				width: 650rpx;
				height: 90rpx;
				margin: 0 auto;
				border-bottom: 1px solid #e8e8e8;
				.title{
					width: 190rpx;
					height: 90rpx;
					line-height: 90rpx;
					color: #504e4f;
					font-size: 28rpx;
					float: left;
					padding-left: 8rpx;
				}
				.right{
					float: right;
					text{
						display: block;
						float: right;
						text-align: right;
						line-height: 90rpx;
						font-size: 26rpx;
						color: #515151;
						padding-right: 15rpx;
					}
					.imgBox{
						display: block;
						float: right;
						margin-top: 4rpx;
						width: 37rpx;
						height: 35rpx;
						margin-right: 10rpx;
						line-height: 92rpx;
					}
				}	
			}
			.account{
				border-top: 1px solid #e8e8e8;
			}
			/deep/ .van-field__input{
				text-align: right;
				font-size: 34rpx;
			}
			/deep/ .van-cell__title{
				color: #504e4f;
				font-size: 28rpx;
			}
		}
		.btnbox{
			margin-top: 110rpx;
		}
	}
</style>