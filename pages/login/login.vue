<template>
	<view class="login">
		<view class="title1">
			<text>全民运动</text>
			<text class="text2">专注羽球</text>
		</view>
		<view class="title2">来虎体育</view>
		<view class="inputWrap">
			<view class="inputBox inputBox1">
				<van-cell-group :border="false">
				  <van-field
				    :value="userPhone"
						size='large'
				    placeholder="请输入手机号"
						placeholder-style="color: #b1b1b1;font-size: 28rpx;"
						type='number'
				    :border="false"
				    @change="onChangePhone"
				  />
				</van-cell-group>
			</view>
			<view class="inputBox inputBox2">
				<van-cell-group :border="false">
				  <van-field
				    :value="password"
						size='large'
				    placeholder="请输入密码"
						placeholder-style="color: #b1b1b1;font-size: 28rpx;"
						type="password"
				    :border="false"
				    @change="onChangePassword"
				  />
				</van-cell-group>
			</view>
		</view>	
		<view class="btnBox">
			<view class="myButton">登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userPhone: '',
				password: ''
			}
		},
		methods: {
			onChangePhone() {
				
			},
			onChangePassword() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login{
		width: 100%;
		height: 100vh;
		background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/loginBg.png') no-repeat center;
		background-size: 100% auto;
		overflow: hidden;
		.title1{
			width: 100%;
			height: 195rpx;
			box-sizing: border-box;
			font-size: 54rpx;
			color: #fff;
			font-weight: 400;
			padding-top: 80rpx;
			padding-left: 30rpx;
			.text2{
				margin-left: 22rpx;
			}
		}
		.title2{
			width: 100%;
			height: 40rpx;
			box-sizing: border-box;
			line-height: 36rpx;
			font-size: 34rpx;
			color: #f0f0f0;
			padding-left: 30rpx;
		}
		.inputWrap{
			width: 716rpx;
			height: 240rpx;
			margin-left: 17rpx;
			margin-top: 105rpx;
			background: rgba(255,255,255,0.2);
			border-radius: 13rpx;
			box-sizing: border-box;
			padding: 0 28rpx;
			.inputBox{
				width: 100%;
				height: 120rpx;
				overflow: hidden;
				/deep/ .van-cell-group{
					.van-cell--large{
						margin-top: 12rpx;
						margin-left: -30rpx;
					}
					.van-cell{
						background: none;
						.van-field__input{
							font-size: 34rpx;
							color: #fff;
						}	
					}
				} 
				/deep/ .inputBox.data-v-92f2ff3e{
					font-size: 26rpx;
				}
			}
			.inputBox1{
				border-bottom: 1rpx solid #5f5f5f;
			}
		}
		.btnBox{
			width: 100%;
			height: 96rpx;
			margin-top: 16rpx;
			padding: 0 17rpx;
			box-sizing: border-box;
		}
	}
</style>
<style>
	.login .inputWrap .inputBox.data-v-92f2ff3e .van-cell-group .van-cell .van-field__input{
		font-size: 22rpx;
	}
</style>