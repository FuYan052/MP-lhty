<template>
	<view class="publishActivities">
		<view class="wrap1">
			<view class="li_1">
				<van-cell-group :border='false'>
					<view class="item">
						<van-field
							class="field"
							:value="type"
							label="运动种类"
							size='large'
							:border='false'
							use-right-icon-slot
							disabled
						>
							<van-icon slot='icon' name="arrow" size="30rpx" color='#3d3a35'/>
						</van-field>
					</view>
					<view class="item" @click="choiceTime">
						<van-field
							class="field"
							v-model="time"
							label="活动时间"
							placeholder="选择时间"
							use-right-icon-slot
							size='large'
							:border='false'
							readonly
						>
							<van-icon slot='icon' name="arrow" size="30rpx" color='#3d3a35'/>
						</van-field>
					</view>
					<view class="item" @click="choiceDuration">
						<van-field
							v-model="hour"
							label="活动时长"
							placeholder="选择时长/小时"
							right-icon="arrow"
							size='large'
							:border='false'
							readonly
						/>
					</view>
				</van-cell-group>
				<test-con></test-con>
			</view>
		</view>
		<!-- 时间选择器 -->
		<my-time-picker 
			:isShowTimePicker='isshow1' 
			:timePickerType='timePickerType'
			:currTimeValue='time'
			@submitTime='receiveTime'
			@submitDeadline='receiveDeadline'
		></my-time-picker>
		<!-- 其他自定义选择器 -->
		<my-picker v-show="isshow2" :isShowPicker='isshow2' :currHourValue='hour' @submitHour='receiveHour'></my-picker>
		<!-- 发布按钮 -->
		<view class="wrap2">
			<view class="buttonBox">
				<view class="myButton">
					发布
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MyTimePicker from '@/components/myTimePicker/MyTimePicker.vue'
	import MyPicker from '@/components/myPicker/myPicker.vue'
	export default {
		components: {
			MyTimePicker,
			MyPicker
		},
		data() {
			return {
				type: '羽毛球',
				time: '',  //选择的时间值
				isshow1: false,  //显示时间选择器
				isshow2: false,  //其他选择器
				timePickerType: 100,  //100为选择活动时间，200为选择报名截止时间
				hour: null,  //选择的时长
			}
		},
		methods: {
			// 选择活动时间
			choiceTime() {
				this.isshow1 = !this.isshow1
				this.timePickerType = 100
			},
			receiveTime(v1, v2){
				this.time = v1
				this.isshow1 = v2
			},
			// 选择活动时长
			choiceDuration() {
				this.isshow2 = !this.isshow2
			},
			receiveHour(v1, v2) {
				this.hour = v1
				this.isshow2 = v2
			},
		}
	}
</script>

<style lang="scss" scoped>
	.publishActivities{
		width: 100%;
		min-height: 100vh;
		box-sizing: border-box;
		position: relative;
		padding: 16rpx;
		padding-bottom: 250rpx;
		.wrap1{
			width: 100%;
			/deep/ .van-cell-group{
				border-radius: 10rpx;
				background: #1e1e1e;
				.item{
					margin-bottom: 8rpx;
					border-radius: 10rpx;
				}
				.van-cell--large{
					width: 100%;
					height: 96rpx;
					border-radius: 10rpx;
					.van-field__label{
						width: 208rpx;
						font-size: 30rpx;
						color: #676767;
					}
					.van-field__control{
						font-size: 28rpx;
						color: #1f1f1f;
					}
					.van-field__control:disabled{
						font-size: 28rpx;
						color: #1f1f1f;
						-webkit-text-fill-color: #1f1f1f;
					}
				}
			}
		}
		.wrap2{
			width: 100%;
			height: 210rpx;
			background: #1e1e1e;
			box-sizing: border-box;
			position: fixed;
			padding: 0 16rpx;
			bottom: 0;
			left: 0;
			.buttonBox{
				width: 100%;
				height: 96rpx;
				
			}
		}
	}
</style>