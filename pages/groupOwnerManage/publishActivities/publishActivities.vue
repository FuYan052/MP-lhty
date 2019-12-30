<template>
	<view class="publishActivities">
		<view class="wrap1">
			<view class="li_1">
				<van-cell-group :border='false'>
					<view class="item">
						<van-field :value="type" label="运动种类" size='large' :border='false' use-right-icon-slot disabled>
							<van-icon slot='icon' name="arrow" size="30rpx" color='#3d3a35'/>
						</van-field>
					</view>
					<view class="item" @click="choiceTime">
						<van-field :value="time" label="活动时间" placeholder="选择时间" use-right-icon-slot size='large' :border='false' readonly >
							<van-icon slot='icon' name="arrow" size="30rpx" color='#3d3a35'/>
						</van-field>
					</view>
					<view class="item" @click="choiceDuration">
						<van-field :value="hour" label="活动时长" placeholder="选择时长" right-icon="arrow" size='large' :border='false' readonly />
					</view>
					<view class="item" @click="choiceDeadline">
						<van-field :value="deadline" label="报名截止" placeholder="选择时间" right-icon="arrow" size='large' :border='false' readonly/>
					</view>
					<view class="item">
						<van-field :value="hour" label="活动地点" placeholder="填写位置" use-right-icon-slot size='large' :border='false' readonly >
							<van-icon slot='icon' name="location-o" size="32rpx" color='#010101'/>
						</van-field>
					</view>
					<view class="item">
						<van-field :value="inputNumValue" @change='inputNum' type='number' label="活动人数" placeholder="填写人数" size='large' :border='false'/>
					</view>
					<view class="item">
						<van-field :value="inputPrice1" @change='InputPrice1' type='number' label="钱包支付" placeholder="填写费用/元" size='large' :border='false'/>
					</view>
					<view class="item">
						<van-field :value="inputPrice2" @change='InputPrice2' type='number' label="费  用  男" placeholder="填写费用/元" size='large' :border='false'/>
					</view>
					<view class="item">
						<van-field :value="inputPrice3" @change='InputPrice3' type='number' label="费  用  女" placeholder="填写费用/元" size='large' :border='false'/>
					</view>
					<view class="item">
						<van-field :value="inputPrice4" @change='InputPrice4' type='number' label="临打费用" placeholder="填写费用/元" size='large' :border='false'/>
					</view>
					<view class="item">
						<van-field :value="inputBallType" @change='InputBall' label="活动用球" placeholder="填写用球" size='large' :border='false'/>
					</view>
					<!-- 等级要求 -->
					<view class="level">
						<view class="title">等级要求</view>
						<view class="optionsBox">
							<view class="optionItem" v-for="(item,index) in optionsList" :key='index' :class="{selected:selectedIds.indexOf(item.id)>=0}" @click="handleClick(item)">{{item.value}}</view>
						</view>
					</view>
					<view class="item">
						<van-field :value="inputOrganizer" @change='InputOrganizer' label="组 织 者" placeholder="填写组织者" size='large' :border='false'/>
					</view>
					<!-- 标题 -->
					<view class="textAreaBox">
						<view class="title">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</view>
						<van-cell-group :border='false'>
						  <van-field :value="titleValue" @change='inputTitleValue' type="textarea" placeholder="时间+地址+活动类型" autosize :border="false" :show-confirm-bar='false'/>
						</van-cell-group>
					</view>
					<!-- 活动规则 -->
					<view class="textAreaBox">
						<view class="title">活动规则</view>
						<van-cell-group :border='false'>
						  <van-field :value="ruleValue" @change='inputRuleValue' type="textarea" placeholder="请填写活动规则" autosize :border="false" :show-confirm-bar='false'/>
						</van-cell-group>
					</view>
				</van-cell-group>
				<!-- switch -->
				<view class="switchBox">
					<text class="text">接受线下报名</text>
					<van-switch custom-class='mySwitch' :checked="isUnderLine" active-color='#ffbc01' inactive-color='#dedede' @change='isUnderLine = !isUnderLine' size="20px" />
				</view>
				<view class="switchBox">
					<text class="text">作为周活动发布</text>
					<van-switch custom-class='mySwitch' :checked="isWeek" active-color='#ffbc01' inactive-color='#dedede' size="20px" @change='isWeek = !isWeek' />
				</view>
				<view class="switchBox">
					<text class="text">活动开始前2小时可取消</text>
					<van-switch custom-class='mySwitch' :checked="isCancel" active-color='#ffbc01' inactive-color='#dedede' @change='isCancel = !isCancel' size="20px" />
				</view>
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
		<w-picker
			mode="selector" 
			:selectList="columns"
			@confirm="onConfirm" 
			@cancel='onCancel'
			ref="picker1" 
			themeColor="#ffbc01" 
		></w-picker>
		<!-- 发布按钮 -->
		<view class="wrap2">
			<view class="buttonBox">
				<button class="myButton" @click="submit">
					发布
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import MyTimePicker from '@/components/myTimePicker/MyTimePicker.vue'
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			MyTimePicker,
			wPicker
		},
		data() {
			return {
				type: '羽毛球',
				time: '',  //选择的时间值
				isshow1: false,  //显示时间选择器
				isshow2: false,  //其他选择器
				hour: null,  //选择的时长
				pickList1: [],
				deadline: '',  //报名截止
				timePickerType: 100,  //100为选择活动时间，200为选择报名截止时间
				inputNumValue: '',  //人数
				inputPrice1: '',  //钱包支付费用
				inputPrice2: '',  //费用男
				inputPrice3: '',  //费用女
				inputPrice4: '',  //临打费用
				inputBallType: '',  //活动用球
				columns: [],
				optionsList: [],
				selectedIds: [],  //选中的等级
				inputOrganizer: '',  //组织者
				titleValue: '',  //标题
				ruleValue: '',  //活动规则
				isWeek: false,  //是否周活动
				isCancel: true,  //是否可取消
				isUnderLine: true  //是否接受线下报名
			}
		},
		onLoad() {
			this.columns = [{label:"0.5小时",value:"0.5"},{label:"1小时",value:"1"},{label:"1.5小时",value:"1.5"},{label:"2小时",value:"2"},{label:"2.5小时",value:"2.5"},{label:"3小时",value:"3"},{label:"3.5小时",value:"3.5"},{label:"4小时",value:"4"}];
			this.optionsList = [{id: 1, value: '菜鸟'},{id: 2, value: '初级'},{id: 3, value: '中级'},{id: 4, value: '高级'}]
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
				this.isshow2 = true
				this.$refs.picker1.show()
			},
			onConfirm(v) {
				this.hour = v.checkArr.value
				this.isshow2 = false
			},
			onCancel() {
				this.isshow2 = false
			},
			// 选择报名截止时间
			choiceDeadline() {
				this.isshow1 = true
				this.timePickerType = 200
			},
			receiveDeadline(v1, v2){
				this.deadline = v1
				this.isshow1 = v2
			},
			// 选择等级
			handleClick(item) {
				let selectedIndex = this.selectedIds.indexOf(item.id)
				 if(selectedIndex >= 0) {
					this.selectedIds.splice(selectedIndex, 1)
				}else{
					this.selectedIds.push(item.id)
				}
				// console.log(this.selectedIds)
			},
			// 输入人数
			inputNum(v) {
				this.inputNumValue = v.detail
			},
			// 输入钱包支付
			InputPrice1(v) {
				this.inputPrice1 = v.detail
			},
			// 输入费用男
			InputPrice2(v) {
				this.inputPrice2 = v.detail
			},
			// 输入人数
			InputPrice3(v) {
				this.inputPrice3 = v.detail
			},
			// 输入人数
			InputPrice4(v) {
				this.inputPrice4 = v.detail
			},
			// 输入标题
			inputTitleValue(v) {
				this.titleValue = v.detail
			},
			// 输入规则
			inputRuleValue(v) {
				this.ruleValue = v.detail
			},
			// 输入用球
			InputBall(v) {
				this.inputBallType = v.detail
			},
			// 输入组织者
			InputOrganizer(v) {
				this.inputOrganizer = v.detail
			},
			// 是否周活动
			switchChange1() {
				this.isWeek = !this.isWeek
			},// 是否可取消
			switchChange1() {
				this.isCancel = !this.isCancel
			},
			// 提交
			submit() {
				const params = {
					type: '001',
					time: this.time,
					duration: this.hour,
					deadline: this.deadline,
					place: '',
					people: this.inputNumValue,
					money: this.inputPrice1,
					moneyMan: this.inputPrice2,
					moneyWomen: this.inputPrice3,
					temporaryMoney: this.inputPrice4,
					ballType: this.inputBallType,
					level: this.selectedIds,
					title: this.titleValue,
					rule: this.ruleValue,
					isWeek: this.isWeek,
					isCancel: this.isCancel
				}
				console.log(params)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.publishActivities{
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
		position: relative;
		padding: 0 16rpx;
		// padding-bottom: 250rpx;
		display: flex;
		flex-direction: column;
		.wrap1{
			width: 100%;
			height: auto;
			overflow: auto;
			flex: 1;
			box-sizing: border-box;
			padding-bottom: 50rpx;
			/deep/ .van-cell-group{
				border-radius: 10rpx;
				background: #1e1e1e;
				.item{
					margin-bottom: 8rpx;
					border-radius: 10rpx;
				}
				.van-field__input--disabled{
					color: #1f1f1f;
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
					.van-icon{
						size: 30rpx; 
						color: #3d3a35;
					}
				}
			}
			.level{
				width: 100%;
				height: 180rpx;
				background: #fff;
				border-radius: 10rpx;
				margin-bottom: 8rpx;
				.title{
					height: 92rpx;
					margin-left: 32rpx;
					letter-spacing: 1rpx;
					font-size: 30rpx;
					color: #1f1f1f;
					line-height: 92rpx;
				}
				.optionsBox{
					width: 100%;
					height: 86rpx;
					display: flex;
					justify-content: space-around;
					.optionItem{
						width: 136rpx;
						height: 64rpx;
						line-height: 64rpx;
						text-align: center;
						background: #e6e4e5;
						color: #727272;
						font-size: 24rpx;
					}
					.selected{
						background: #ffbc01;
						color: #f1f1f1;
					}
				}
			}
			.textAreaBox{
				width: 100%;
				min-height: 270rpx;
				.title{
					height: 70rpx;
					line-height: 70rpx;
					color: #fff;
					padding-left: 34rpx;
				}
				/deep/ .van-cell{
					min-height: 192rpx;
					border-radius: 10rpx;
				}
			}
		}
		.switchBox{
			width: 100%;
			height: 96rpx;
			background: #fff;
			border-radius: 10rpx;
			margin-top: 10rpx;
			box-sizing: border-box;
			padding: 0 32rpx;
			.text{
				line-height: 96rpx;
				color: #1f1f1f;
			}
			/deep/ .van-switch{
				float: right;
				margin-top: 25rpx;
			}
		}
		.wrap2{
			width: 100%;
			height: 160rpx;
			background: #1e1e1e;
			box-sizing: border-box;
			.buttonBox{
				width: 100%;
				height: 96rpx;
				margin-top: 15rpx;
			}
		}
	}
</style>
<style>
	.van-field__input--textarea{
		overflow: auto;
	}
</style>