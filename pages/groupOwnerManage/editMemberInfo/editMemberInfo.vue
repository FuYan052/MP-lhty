<template>
	<view class="editMemberInfo">
		<view class="whiteBg topBox">
			<van-field
				custom-style='padding-right:32rpx'
				input-align="right"
				 placeholder="输入备注名称"
				label="备注"
				type='number'
				@change='inputName'
			/>
			<view @click="choiceLevel">
				<van-field :value="levelValue" label="级别" placeholder="选择级别" input-align="right" right-icon="arrow" size='large' readonly />
			</view>
			<view @click="choiceRole">
				<van-field :value="roleValue" label="角色设计" placeholder="选择角色" input-align="right" right-icon="arrow" size='large' :border='false' readonly />
			</view>
		</view>
		<view class="myButton">
			保存
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
				inputValue: '',
				columns: [{label: "", value: ''}],
				pickerType: '',
				levelValue: '',
				roleValue: ''
			}
		},
		methods: {
			inputName(v) {
				this.inputValue = v.detail
			},
			// 选择级别
			choiceLevel() {
				this.columns = [{label: "菜鸟", value: '1'},{label: "初级", value: '2'},{label: "中级", value: '3'},{label: "高级", value: '4'}]
				this.$refs.picker1.show()
				this.pickerType = 100
			},
			// 选择角色
			choiceRole() {
				this.columns = [{label: "会长", value: '0'},{label: "管理员", value: '1'},{label: "会员", value: '2'},{label: "成员", value: '3'}]
				this.$refs.picker1.show()
				this.pickerType = 200
			},
			onConfirm(v) {
				console.log(v)
				if(this.pickerType == 100) {
					this.levelValue = v.checkArr.label
				}
				if(this.pickerType == 200) {
					this.roleValue = v.checkArr.label
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.editMemberInfo{
		width: 100%;
		height: 100vh;
		background: #f4f4f4;
		box-sizing: border-box;
		padding: 0 36rpx;
		.topBox{
			height: auto;
			border-radius: 12rpx;
			padding-right: 32rpx;
			box-sizing: border-box;
			/deep/ .van-cell{
				border-radius: 12rpx;
				padding-right: 0;
			}
			/deep/ .van-cell__title{
				font-size: 28rpx;
				color: #000;
				font-weight: 700;
			}
			/deep/ .van-cell__value{
				color: #404040;
			}
		}
		.myButton{
			margin-top: 335rpx;
		}
	}
</style>