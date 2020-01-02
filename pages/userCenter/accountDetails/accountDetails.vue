<template>
	<view class="accountDetails">
		<view class="topBox">
			<view class="date">2019年12月<van-icon name="arrow-down" size='25rpx'/></view>
			<view class="search1" v-show="show1" @click="handleShow1"><van-icon name="search" size='28rpx'/></view>
			<view class="search2" v-show="!show1">
				<van-search
				  placeholder="请输入搜索关键词"
				  use-action-slot
					@change="onChange"
				>
				  <view slot="action" @click="onClick">搜索</view>
				</van-search>
			</view>
		</view>
		<view class="content whiteBg">
			<view class="itemBox" v-for="(item,index) in list" :key='index' @click="toDetail(item)">
				<view class="box1">
					{{item.title}}
				</view>
				<view class="box2">
					<view class="left">
						<view class="user">{{item.name}}</view>
						<view class="time">{{item.time}}</view>
					</view>
					<view class="right" :class="{isNotIncome: !item.isIncome}"><text v-if="item.isIncome">+</text><text v-else>-</text>{{item.money}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show1: true,
				searchValue: '',
				list: [{id: 1,title: '会员报名活动',name: '文文-18884205462',time: '2020-01-15',money: '592.5',isIncome: true},
							{id: 2,title: '会员报名活动',name: '文文-18884205462',time: '2020-01-15',money: '6492.85',isIncome: true},
							{id: 3,title: '会员报名活动',name: '文文静静-18884205462',time: '2020-01-15',money: '592.85',isIncome: false},
							{id: 4,title: '会员报名活动',name: '文文-18884205462',time: '2020-01-15',money: '92.8',isIncome: false},
							{id: 5,title: '会员报名活动',name: '文文文文静静文文静静文文静静-18884205462',time: '2020-01-15',money: '5625.85',isIncome: true},
							{id: 6,title: '会员报名活动',name: '文文-18884205462',time: '2020-01-15',money: '692.85',isIncome: false},
							{id: 7,title: '会员报名活动',name: '文文-18884205462',time: '2020-01-15',money: '52.5',isIncome: true}]
			}
		},
		methods: {
			handleShow1() {
				this.show1 = false
			},
			onChange(v) {
				this.searchValue = v.detail
			},
			// 搜索
			onClick(v) {
				console.log(this.searchValue)
			},
			toDetail(item) {
				uni.navigateTo({
					url: '/pages/userCenter/billDetails/billDetails?id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.accountDetails{
		width: 100%;
		min-height: 100vh;
		box-sizing: border-box;  
		padding: 0 32rpx;
		.topBox{
			width: 100%;
			height: 72rpx;
			box-sizing: border-box;
			padding-left: 25rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.date{
				color: #fff;
				font-size: 28rpx;
				line-height: 72rpx;
				display: flex;
				align-items: center;
			}
			.search1{
				width: 115rpx;
				height: 37rpx;
				border-radius: 18rpx;
				background: #4c4c4c;
				color: #fefefe;
				box-sizing: border-box;
				margin-right: 15rpx;
				padding-right: 15rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
			}
			.search2{
				width: 460rpx;
				height: 56rpx;
				border-radius: 25rpx;
				background: #4c4c4c;
				color: #fefefe;
				text-align: right;
				box-sizing: border-box;
				padding-right: 15rpx;
				/deep/ .van-search--withaction{
					height: 56rpx;
					padding: 0;
					background: none !important;
					color: #fefefe;
					.van-search__content{
						background: none !important;
						color: #fefefe;
					}
					.van-search__action{
						color: #fefefe;
						font-size: 24rpx;
					}
				}
				/deep/ .van-cell{
					height: 56rpx;
					padding: 0 !important;
					color: #fefefe;
					display: flex;
					align-items: center;
					.van-field__input{
						color: #fefefe;
						font-size: 24rpx;
					}
				}
			}
		}
		.content{
			width:  100%;
			height: auto;
			margin-top: 8rpx;
			box-sizing: border-box;
			padding: 0 25rpx;
			.itemBox{
				width: 100%;
				height: 132rpx;
				display: flex;
				align-items: center;
				.box1{
					width: 75rpx;
					height: 72rpx;
					border-right: 1rpx dashed #e6e6e6;
					font-size: 21rpx;
					color: #444444;
					display: flex;
					align-items: center;
					overflow: hidden;
				}
				.box2{
					flex: 1;
					height: 132rpx;
					border-bottom: 1rpx solid #f0f0f0;
					margin-left: 15rpx;
					display: flex;
					.left{
						width: 370rpx;
						.user{
							width: 100%;
							font-size: 28rpx;
							line-height: 30rpx;
							color: #151515;
							margin-top: 28rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
						.time{
							font-size: 22rpx; 
							color: #858585;
							line-height: 24rpx;
							margin-top: 20rpx;
						}
					}
					.right{
						width: 172rpx;
						height: 86rpx;
						line-height: 86rpx;
						font-size: 30rpx;
						font-weight: 700;
						color: #e8480c;
						text-align: right;
						text{
							font-size: 28rpx;
							padding-right: 3rpx;
						}
					}
					.isNotIncome{
						color: #383838;
					}
				}
			}
		}
		.itemBox:nth-last-child(1){
			.box2{
				border: none;
			}
		}
	}
</style>