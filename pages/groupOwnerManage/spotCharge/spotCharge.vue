<template>
	<view class="spotCharge">
		<view class="contentBox">
			<view class="itemBox" v-for="(item,index) in list" :key='index'>
				<view class="detail">
					<view class="top">
						<view class="imgBox">
							<image style="width: 100%; height: 100%; border-radius: 50%;"
								src="http://f1.haiqq.com/allimg/3831982416/2817233822.jpg" mode="">
							</image>
						</view>
						<view class="info">
							<view class="name">文艺青年(男)</view>
						</view>
						<view class="editMoney" @click="editMoney(item)">
							￥{{item.money}}<van-icon name="edit" size="28rpx" color="#fff" />
						</view>
					</view>
				</view>
				<view class="chekcBox" :class="{checked : selectedList.indexOf(item.id) >= 0}"  @click="handleCheck(item)">
					<icon class="myIcon" v-show="selectedList.indexOf(item.id) >= 0" type="success_no_circle" size="27rpx" color="#f1b202"/>
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
					收费总额：<text class="num">￥500</text>
				</view>
				<view class="right">
					<view class="text">全选</view>
					<view class="checkBox" @click="allCheck" :class="{checked : isAllChecked}">
						<icon class="myIcon" v-show="isAllChecked" type="success_no_circle" size="27rpx" color="#f1b202"/>
					</view>
				</view>
			</view>
			<view class="btn">收费</view>
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
					type='number'
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
				list: [{id:1,money: 20},{id:2,money: 40},{id:3,money: 20},{id:4,money: 20},{id:5,money: 30},{id:6,money: 25},{id:7,money: 30},{id:8,money: 25},{id:9,money: 40}],
				selectedList: [],
				isAllChecked: false,
				show: false,
				editValue: '',
				clickMoney: ''
			}
		},
		// created() {
		// 	console.log('加载')
		// },
		// onLoad() {
		// 	console.log('onload页面')
		// },
		methods: {
			editMoney(item) {
				console.log(item)
				this.show = true
				this.clickMoney = item.money
			},
			onChange(v) {
				this.editValue = v.detail
			},
			onClose() {
				this.show = false
			},
			confirm1() {
				this.show = false
			},
			handleCheck(item) {
				this.Item = item
				let selectedIndex = this.selectedList.indexOf(item.id)
				 if(selectedIndex >= 0) {
					this.selectedList.splice(selectedIndex, 1)
				}else{
					this.selectedList.push(item.id)
				}
				if(this.selectedList.length == this.list.length) {
					this.isAllChecked = true
				}else{
					this.isAllChecked = false
				}
			},
			// 全选
			allCheck() {
				this.isAllChecked = !this.isAllChecked
				if(!this.isAllChecked) {
					this.selectedList = []
				}else{
					this.selectedList = []
					this.list.forEach(function(item){
						this.selectedList.push(item.id)
					},this)
				}
			},
			// 添加会员
			addMember() {
				uni.navigateTo({
					url: '/pages/groupOwnerManage/searchMember/searchMember'
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
								line-height: 70rpx;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
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
					font-size: 32rpx;
				}
			}
		}
	}
</style>