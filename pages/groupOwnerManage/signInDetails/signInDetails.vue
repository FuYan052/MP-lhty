<template>
	<view class="signInDetails">
		<view class="contentBox">
			<view class="itemBox" v-for="(item,index) in list" :key='index' @click="handleCheck(item)">
				<view class="detail">
					<view class="top">
						<view class="imgBox">
							<image style="width: 100%; height: 100%; border-radius: 50%;"
								:src="item.headPortrait" mode="">
							</image>
						</view>
						<view class="info">
							<!-- <view class="name">{{item.nickName}}(男)</view> -->
							<view class="name">
								<view class="text">
									{{item.nickName}} <text v-show="item.roleName">-({{item.roleName}})</text>
								</view>
								<view class="sex">
									<view class="sexIcon sex1" v-if="item.sex == 1"></view>
									<view class="sexIcon sex2" v-else></view>
								</view>
							</view>
							<view class="phone">{{item.phone}}</view>
						</view>
						<view class="money">支付金额：{{item.totalFee}}元</view>
					</view>
					<view class="bottom">
						<view>支付方式：{{item.payTypeName}}</view>
						<view>报名时间：{{item.createTime}}</view>
					</view>
				</view>
				<view class="chekcBox" v-if="!item.signInState" :class="{checked : selectedList.indexOf(item.orderId) >= 0}">
					<icon class="myIcon" v-show="selectedList.indexOf(item.orderId) >= 0" type="success_no_circle" size="27rpx" color="#f1b202"/>
				</view>
				<view class="chekcBox chekcBox2" v-else>
					<icon class="myIcon" type="success_no_circle" size="29rpx" color="#48d131"/>
				</view>
			</view>
		</view>
		<view class="btnBox">
			<view class="allChoice">
				<view class="text">全选</view>
				<view class="checkBox" @click="allCheck" :class="{checked : isAllChecked}">
					<icon class="myIcon" v-show="isAllChecked" type="success_no_circle" size="27rpx" color="#f1b202"/>
				</view>
			</view>
			<view class="btn" @click="submit">签到</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				selectedList: [],
				isAllChecked: false,
				actId: '',
			}
		},
		onLoad(options) {
			// console.log(options)
			this.actId = options.id
		},
		onShow() {
			this.getList()
		},
		methods: {
			getList() {
				this.$http.get({
					url: '/v1/rest/manage/signInDetails',
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
			handleCheck(item) {
				this.Item = item
				if(!item.signInState) {
					let selectedIndex = this.selectedList.indexOf(item.orderId)
					 if(selectedIndex >= 0) {
						this.selectedList.splice(selectedIndex, 1)
					}else{
						this.selectedList.push(item.orderId)
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
				}else{
					this.selectedList = []
					this.list.forEach(function(item){
						if(!item.signInState){
							this.selectedList.push(item.orderId)
						}
					},this)
				}
			},
			submit() {
				// console.log(typeof(this.selectedList))
				this.$http.get({
					url: '/v1/rest/manage/signInOk',
					data: {
						orderId: this.selectedList.join(',')
					}
				}).then(resp => {
					// console.log(resp)
					if(resp.status == 200) {
						this.getList()
						uni.showToast({
							title: '签到成功！',
							duration: 2000,
							icon: 'none'
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.signInDetails{
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
			padding-bottom: 20rpx;
			flex: 1;
			.itemBox{
				width: 100%;
				height: 218rpx; 
				margin-top: 23rpx;
				display: flex;
				align-items: center;
				.detail{
					width: 622rpx;
					height: 218rpx;
					background: #fff;
					border-radius: 15rpx;
					box-sizing: border-box;
					padding: 0 32rpx;
					.top{
						width: 100%;
						height: 154rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.imgBox{
							width: 88rpx;
							height: 88rpx;
							border: 50%;
						}
						.info{
							max-width: 222rpx;
							font-size: 27rpx;
							height: 86rpx;
							.name{
								width: 420rpx;
								display: flex;
								height: 50rpx;
								align-items: center;
								.text{
									max-width: 330rpx;
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
									background-size: 22rpx auto;
								}
								.sex2{
									background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/wIcon.png') no-repeat center;
									background-size: 20rpx auto;
								}
							}
							.phone{
								line-height: 36rpx;
							}
						}
						.money{
							width: 180rpx;
							font-size: 22rpx;
							color: #ffbc01;
						}
					}
					.bottom{
						width: 100%;
						height: 56rpx;
						border-top: 1rpx dashed #c8c8c8;
						display: flex;
						font-size: 18rpx;
						align-items: center;
						color: #5e5e5e;
						view {
							margin: 0 20rpx;
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
		}
		.btnBox{
			width: 100%;
			height: 170rpx;
			display: flex;
			flex-direction: column;
			.allChoice{
				width: 100%;
				height: 70rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
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
	}
</style>