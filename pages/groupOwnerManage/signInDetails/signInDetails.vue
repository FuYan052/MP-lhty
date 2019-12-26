<template>
	<view class="signInDetails">
		<view class="contentBox">
			<view class="itemBox" v-for="(item,index) in list" :key='index' @click="handleCheck(item)">
				<view class="detail">
					<view class="top">
						<view class="imgBox">
							<image style="width: 100%; height: 100%; border-radius: 50%;"
								src="http://f1.haiqq.com/allimg/3831982416/2817233822.jpg" mode="">
							</image>
						</view>
						<view class="info">
							<view class="name">文艺青年(男)</view>
							<view class="phone">18334531374</view>
						</view>
						<view class="money">支付金额：32元</view>
					</view>
					<view class="bottom">
						<view>支付方式：微信支付</view>
						<view>报名时间：2019年8月18日</view>
						<view>12:00</view>
					</view>
				</view>
				<view class="chekcBox" :class="{checked : selectedList.indexOf(item.id) >= 0}">
					<icon class="myIcon" v-show="selectedList.indexOf(item.id) >= 0" type="success_no_circle" size="27rpx" color="#f1b202"/>
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
			<view class="btn">签到</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6}],
				selectedList: [],
				isAllChecked: false
				
			}
		},
		computed: {
			
		},
		methods: {
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
								line-height: 50rpx;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
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
						view{
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