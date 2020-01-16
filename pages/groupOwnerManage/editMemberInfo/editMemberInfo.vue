<template>
	<view class="editMemberInfo">
		<view class="whiteBg topBox">
			<van-field
				:value='inputValue'
				class='inputField'
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
		<view class="myButton" @click="save">
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
				optionsList: [],
				clubStateList: [],
				pickerType: '',
				levelValue: '',  //等级名称
				levelId: '',  //等级id
				roleValue: '',  //角色名称
				stateId: '',  //角色id
				userId: '',
				clubId: '',
			}
		},
		created() {
			
		},
		onLoad(options) {
			console.log(options)
			const item = JSON.parse(decodeURIComponent(options.item))
			console.log(item)
			this.userId = item.userId
			this.clubId = '3'
			this.levelId = item.levelId
			this.levelValue = item.level
			this.stateId = item.stateId
			this.roleValue = item.state
			this.inputValue = item.roleName
		},
		methods: {
			inputName(v) {
				this.inputValue = v.detail
			},
			// 选择级别
			choiceLevel() {
				// 查询级别
				this.$http.get({
					url: '/v1/rest/public/findDictList',
					data: {
						skey: 'level'
					}
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						this.optionsList = resp.data
						this.columns = this.optionsList
						this.$refs.picker1.show()
						this.pickerType = 100
					}
				})
			},
			// 选择角色
			choiceRole() {
				// 查询角色
				this.$http.get({
					url: '/v1/rest/public/findDictList',
					data: {
						skey: 'clubState'
					}
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						// this.optionsList = resp.data
						this.clubStateList = resp.data.filter(item => {
							if(item.value != 'clubState_01') {
								return item
							}
						})
						this.columns = this.clubStateList
						this.$refs.picker1.show()
						this.pickerType = 200
					}
				})
			},
			onConfirm(v) {
				console.log(v)
				if(this.pickerType == 100) {
					this.levelValue = v.checkArr.label
					this.levelId = v.checkArr.value
				}
				if(this.pickerType == 200) {
					this.roleValue = v.checkArr.label
					this.stateId = v.checkArr.value
				}
			},
			save() {
				this.$http.post({
					url: '/v1/rest/manage/updateMemberInfo',
					data: {
						clubId: this.clubId, 
						level: this.levelId,
						roleName: this.inputValue,
						state: this.stateId,
						userId: this.userId
					}
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						uni.showToast({
							title: '修改成功！',
							duration: 1000,
							icon: 'none'
						});
						const timer = setTimeout(function() {
							// uni.redirectTo({
							// 	url: '/pages/groupOwnerManage/membershipManage/membershipManage?clubId=' + this.clubId
							// })
							uni.navigateBack()
							clearTimeout(timer)
						},500)
					}
				})
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