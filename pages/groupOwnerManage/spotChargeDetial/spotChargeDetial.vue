<template>
	<view class="spotCharge">
		<view class="contentBox">
			<view class="itemBox" v-for="(item,index) in list" :key='index'>
				<view class="detail">
					<view class="top">
						<view class="imgBox">
							<image style="width: 100%; height: 100%; border-radius: 50%;"
								:src="item.headPortrait" mode="">
							</image>
						</view>
						<view class="info">
							<view class="name">
								<view class="text">
									{{item.nickName}} <text v-show="item.roleName">-({{item.roleName}})</text>
								</view>
								<view class="sex">
									<view class="sexIcon sex1" v-if="item.sex == 1"></view>
									<view class="sexIcon sex2" v-else></view>
								</view>
							</view>
						</view>
						<view class="editMoney" @click="editMoney(item)">
							￥{{item.totalFee}}<van-icon name="edit" size="28rpx" color="#fff" />
						</view>
					</view>
				</view>
				<view class="chekcBox" v-if="!item.status" :class="{checked : selectedList.indexOf(item.orderId) >= 0}"  @click="handleCheck(item)">
					<icon class="myIcon" v-show="selectedList.indexOf(item.orderId) >= 0" type="success_no_circle" size="27rpx" color="#f1b202"/>
				</view>
				<view class="chekcBox chekcBox2" v-else>
					<icon class="myIcon" type="success_no_circle" size="29rpx" color="#48d131"/>
				</view>
			</view>
			<!-- 添加会员 -->
			<view class="add" @click="addMember">
				<van-icon name="plus" color='#ffbb03' size='30rpx'/>
				添加会员
			</view>
		</view>
		<view class="btnBox">
			<view class="allChoice">
				<view class="totalMoney">
					收费总额：<text class="num">￥{{totalMoney}}</text>
				</view>
				<view class="right">
					<view class="text">全选</view>
					<view class="checkBox" @click="allCheck" :class="{checked : isAllChecked}">
						<icon class="myIcon" v-show="isAllChecked" type="success_no_circle" size="27rpx" color="#f1b202"/>
					</view>
				</view>
			</view>
			<view class="btn" @click="submit">收费</view>
		</view>
		<!-- 弹出框 -->
		<van-dialog
		  use-slot
		  title="修改金额"
		  :show="show"
		  show-cancel-button
		  @close="onClose"
		  @confirm="confirm1"
		>
			<view class="inputBox">
				<van-field
					:value='clickMoney'
					placeholder="请输入金额"
					:border='false'
					:clearable='true'
					type='digit'
					@change="onChange"
				/>
			</view>
		</van-dialog>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				selectedList: [],
				selectMoney: [],
				isAllChecked: false,
				show: false,
				editValue: '',
				clickMoney: '',
				actId: '',
				orderId: ''
			}
		},
		computed: {
			totalMoney() {
			let num = 0;
			for(let i = 0; i < this.selectMoney.length; i++){
					num = num + this.selectMoney[i];
			}
			return num
			}
		},
		onLoad(options) {
			// console.log(options)
			this.actId = uni.getStorageSync('addActId')
		},
		onShow() {
			this.getList()
		},
		methods: {
			getList() {
				this.$http.get({
					url: '/v1/rest/manage/sceneChargeDetails',
					data: {
						activitiesId: this.actId
					}
				}).then(resp => {
					// console.log(resp)
					if(resp.status == 200) {
						this.list = resp.data
					}
				})
			},
			editMoney(item) {
				// console.log(item)
				if(item.status) {
					uni.showToast({
						title: '该会员已收费，无法修改！',
						duration: 2000,
						icon: 'none'
					});
				}else{
					this.show = true
					this.clickMoney = item.money
					this.orderId = item.orderId
				}
			},
			onChange(v) {
				this.editValue = v.detail
			},
			onClose() {
				this.show = false
			},
			confirm1() {
				this.show = false
				this.$http.get({
					url: '/v1/rest/manage/updateSceneFee',
					data: {
						orderId: this.orderId,
						totalFee: this.editValue
					}
				}).then(resp => {
					// console.log(resp)
					if(resp.status == 200) {
						this.getList()
						uni.showToast({
							title: '修改成功',
							duration: 2000,
							icon: 'none'
						});
					}
				})
			},
			handleCheck(item) {
				this.Item = item
				if(!item.status) {
					let selectedIndex = this.selectedList.indexOf(item.orderId)
					 if(selectedIndex >= 0) {
						this.selectedList.splice(selectedIndex, 1)
						this.selectMoney.splice(selectedIndex, 1)
					}else{
						this.selectedList.push(item.orderId)
						this.selectMoney.push(item.totalFee)
					}
					if(this.selectedList.length == this.list.length) {
						this.isAllChecked = true
					}else{
						this.isAllChecked = false
					}
				}
			},
			// 全选
			allCheck() {
				this.isAllChecked = !this.isAllChecked
				if(!this.isAllChecked) {
					this.selectedList = []
					this.selectMoney = []
				}else{
					this.selectedList = []
					this.selectMoney = []
					this.list.forEach(function(item){
						if(!item.status){
							this.selectedList.push(item.orderId)
							this.selectMoney.push(item.totalFee)
						}
					},this)
				}
			},
			// 添加会员
			addMember() {
				uni.navigateTo({
					url: '/pages/groupOwnerManage/searchMember/searchMember'
				})
			},
			submit() {
				this.$http.get({
					url: '/v1/rest/manage/settlementOk',
					data: {
						orderId: this.selectedList.join(','),
						operatorId: uni.getStorageSync('userInfo').userId,
						clubId: uni.getStorageSync('clubId')
					}
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						const that = this
						uni.removeStorageSync('addActId')
						uni.showModal({
							title: '提示',
							content: `${resp.data.message}\n收入：${resp.data.expenditure}元\n账户余额：${resp.data.income}元`,
							cancelText: '去结算',
							success: function (res) {
								if (res.confirm) {
									that.getList()
								} else if (res.cancel) {
									uni.redirectTo({
										url: '/pages/groupOwnerManage/activitySettlement/activitySettlement'
									})
								}
							}
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.spotCharge{
		width: 100%;
		height: 100vh;
		background: #f4f4f4;
		flex-direction: column;
		display: flex;
		.contentBox{
			width: 100%;
			overflow: auto;
			box-sizing: border-box;
			padding: 0 16rpx;
			padding-bottom: 60rpx;
			flex: 1;
			.itemBox{
				width: 100%;
				height: 140rpx; 
				margin-top: 23rpx;
				display: flex;
				align-items: center;
				.detail{
					width: 622rpx;
					height: 140rpx;
					background: #fff;
					border-radius: 15rpx;
					box-sizing: border-box;
					padding: 0 32rpx;
					.top{
						width: 100%;
						height: 140rpx;
						display: flex;
						align-items: center;
						.imgBox{
							width: 70rpx;
							height: 70rpx;
							border: 50%;
						}
						.info{
							width: 262rpx;
							font-size: 27rpx;
							height: 70rpx;
							margin-left: 32rpx;
							.name{
								display: flex;
								height: 70rpx;
								line-height: 70rpx;
								align-items: center;
								.text{
									max-width: 220rpx;
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
								}
								.sexIcon{
									display: block;
									width: 34rpx;
									height: 34rpx;
									margin-left: 15rpx;
									background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/mIcon.png') no-repeat center;
									background-size: 18rpx auto;
								}
								.sex2{
									background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/wIcon.png') no-repeat center;
									background-size: 18rpx auto;
								}
							}
						}
						.editMoney{
							width: 134rpx;
							height: 48rpx;
							margin-left: 32rpx;
							border-radius: 10rpx;
							background: #ffbc01;
							font-size: 26rpx;
							color: #fff;
							display: flex;
							align-items: center;
							justify-content: space-around;
						}
					}
				}
				.chekcBox{
					width: 36rpx;
					height: 36rpx;
					border-radius: 50%;
					border: 1rpx solid #8b8b8b;
					margin-left: 24rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.chekcBox2{
					border: none !important;
				}
				.checked {
					border: 1rpx solid #ffbd05;
				}
			}
			.add{
				width: 348rpx;
				height: 62rpx;
				margin: 0 auto;
				margin-top: 70rpx;
				border: 1rpx dashed #fbd89e;
				font-size: 26rpx;
				color: #ffbc03;
				display: flex;
				justify-content: center;
				align-items: center;
				/deep/ .van-icon{
					padding-right: 18rpx;
				}
			}
		}
		.btnBox{
			width: 100%;
			height: 180rpx;
			display: flex;
			flex-direction: column;
			.allChoice{
				width: 100%;
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.totalMoney{
					margin-left: 40rpx;
					font-size: 24rpx;
					.num{
						font-size: 28rpx;
						color: #fdbc00;
					}
				}
				.right{
					display: flex;
				}
				.text{
					font-size: 27rpx;
				}
				.checkBox{
					width: 36rpx;
					height: 36rpx;
					border: 1rpx solid #8b8b8b;
					border-radius: 50%;
					margin-right: 52rpx;
					margin-left: 26rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.checked{
					border: 1rpx solid #ffbd05;
				}
			}
			.btn{
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				background: #ffbc01;
				font-size: 32rpx;
				color: #000000;
			}
		}
		.inputBox{
			width: 90%;
			height: auto;
			margin: 0 auto;
			box-sizing: border-box;
			padding: 40rpx 0;
			/deep/ .van-cell{
				border: 1rpx solid #ebedf0;
				.van-field__input{
					font-size: 28rpx;
				}
			}
		}
	}
</style>