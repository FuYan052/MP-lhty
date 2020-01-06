<template>
	<view class="clubHome">
		<view class="topWrap">
			<view class="imgBox">
				<image src="../../static/logo.png" mode="" style="width: 100%; height: 100%; border-radius: 50%;"></image>
			</view>
			<view class="clubName">四川中船绿洲职工羽协</view>
			<view class="number">
				<view class="left" @click="toMember">
					成员&nbsp;&nbsp;876
				</view>
				<view class="right">
					活跃度&nbsp;&nbsp;86
				</view>
			</view>
			<view class="jionClub">加入俱乐部</view>
		</view>
		<!-- 活动周期表 -->
		<view class="weekActive">
			<view class="sectionTitle">活动周期表</view>
			<view class="content">
				<view class="header">
					<view class="tableHeader tableHeader1">星期</view>
					<view class="tableHeader tableHeader2">活动时段</view>
					<view class="tableHeader tableHeader3">活动场馆</view>
				</view>
				<!-- 默认显示三天的活动 -->
				<view class="show show1">
					<view class="item" v-for="(item,index) in actList1" :key='index'>
						<view class="left">
							<view class="weekDay">{{item.date}}</view>
						</view>
						<view class="rightContent">
							<view class="list" :class="'list' + ind " v-for="(it,ind) in item.act" :key='ind'>
								<view class="center">{{it.time}}</view>
								<view class="right">{{it.venue}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 默认隐藏三天后的活动 -->
				<view class="show show2" v-show="isShow2">
					<view class="item" v-for="(item,index) in actList1" :key='index'>
						<view class="left">
							<view class="weekDay">{{item.date}}</view>
						</view>
						<view class="rightContent">
							<view class="list" :class="'list' + ind " v-for="(it,ind) in item.act" :key='ind'>
								<view class="center">{{it.time}}</view>
								<view class="right">{{it.venue}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 箭头 -->
				<view class="arrowWrap" @click="handleShow2">
					<van-icon v-if="!isShow2" color='#787878' name="arrow-down"/>
					<van-icon v-else color='#787878' name="arrow-up" />
				</view>
			</view>
		</view>
		<!-- 俱乐部介绍 -->
		<view class="clubIntroduce">
			<view class="sectionTitle">俱乐部介绍</view>
			<view class="intrDetail">
				将自定义tabbar 写到 index.vue 中 或将其封装为组件 加载进来将 自定义tabbar 写到 index.vue 中 或将其封装为组件 加载进来将 自定义tabbar 写到 index.vue 中 或将其封装为组件 加载进来将 自定义tabbar 写到 index.vue 中 或将其封装为组件 加载进来
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				actList1: [{date: '周一',act: [{time: '19:00-21:00',venue: '波利羽毛球馆波利羽球馆波利'}]},
									{date: '周二',act: [{time: '19:00-21:00',venue: '波利羽毛球馆'},{time: '19:00-21:00',venue: '波利羽毛球馆'}]}],
				actList2: [{date: '周一',act: [{time: '19:00-21:00',venue: '波利羽毛球馆'}]},
									{date: '周二',act: [{time: '19:00-21:00',venue: '波利羽毛球馆'},{time: '19:00-21:00',venue: '波利羽毛球馆'}]}],
				isShow2: false,
			}
		},
		methods: {
			handleShow2() {
				this.isShow2 = !this.isShow2
			},
			toMember() {
				uni.navigateTo({
					url: '/pages/club/clubMember/clubMember'
				})
			}
		}
	}     
</script>

<style lang="scss" scoped>
	.clubHome{
		width: 100%;
		height: auto;
		box-sizing: border-box;
		padding: 0 30rpx;
		overflow: hidden;
		padding-bottom: 40rpx;
		.topWrap{
			width: 100%;
			height: 453rpx;
			margin-top: 10rpx;
			background: url('https://lhty-vue.oss-cn-shenzhen.aliyuncs.com/clubPageBg.png') no-repeat center;
			background-size: 690rpx 453rpx;
			overflow: hidden;
			.imgBox{
				width: 98rpx;
				height: 98rpx;
				border-radius: 50%;
				margin: 0 auto;
				margin-top: 65rpx;
			}
			.clubName{
				height: 33rpx;
				font-size: 31rpx;
				text-align: center;
				font-weight: 600;
				line-height: 32rpx;
				margin-top: 28rpx;
				color: #3a383d;
			}
			.number{
				height: 32rpx;
				line-height: 32rpx;
				width: 450rpx;
				margin: 0 auto;
				margin-top: 45rpx;
				font-weight: 500;
				display: flex;
				justify-content: space-between;
				font-size: 30rpx;
				color: #39383d;
			}
			.jionClub{
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				font-size: 33rpx;
				color: #fff;
				margin-top: 64rpx;
				letter-spacing: 4rpx;
			}
		}
		.weekActive{
			width: 100%;
			min-height: 440rpx;
			background: #fff;
			border-radius: 26rpx;
			margin-top: 20rpx;
			overflow: hidden;
			.content{
				width: 100%;
				height: auto;
				box-sizing: border-box;
				padding: 0 34rpx;
				margin-top: 25rpx;
				padding-bottom: 25rpx;
				.header{
					width: 100%;
					height: 50rpx;
					background: #f8f8f8;
					border-bottom: 1rpx solid #f3f3f3;
					display: flex;
					align-items: center;
					.tableHeader{
						font-size: 22rpx;
						color: #39393b;
						text-align: center;
					}
					.tableHeader1{
						width: 138rpx;
					}
					.tableHeader2{
						width: 188rpx;
					}
					.tableHeader3{
						flex: 1;
					}
				}
				.show{
					width: 100%;
					height: auto;
					.item{
						width: 100%;
						min-height: 89rpx;
						height: auto;
						border-top: 1rpx solid #ededed;
						display: flex;
						.left{
							width: 134rpx;
							float: left;
							display: flex;
							justify-content: center;
							.weekDay{
								width: 68rpx;
								height: 40rpx;
								margin-top: 25rpx;
								text-align: center;
								line-height: 40rpx;
								font-size: 21rpx;
								color: #f9c309;
								border: 1rpx solid #fbcf3a;
								border-radius: 10rpx;
							}
						}
						.rightContent{
							float: left;
							flex: 1;
							.list{
								width: 100%;
								height: 85rpx;
								border-top: 1rpx dashed #eeeeee;
								display: flex;
								align-items: center;
								.center{
									width: 184rpx;
									font-size: 24rpx;
									color: #010101;
									text-align: center;
								}
								.right{
									width: 296rpx;
									box-sizing: border-box;
									padding-left: 60rpx;
									font-size: 24rpx;
									color: #010101;
									line-height: 24rpx;
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
								}
							}
							.list0 {
								border: none;
							}
						}
					}
				}
				.show1{
					.item:nth-of-type(1){
						border: none;
					}
				}
			}
			.arrowWrap{
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.sectionTitle{
			font-size: 30rpx;
			color: #212121;
			font-weight: 600;
			line-height: 30rpx;
			padding-left: 34rpx;
			margin-top: 40rpx;
			position: relative;
		}
		.sectionTitle::before{
			content: '';
			display: block;
			width: 7rpx;
			height: 30rpx;
			background: #f9c307;
			position: absolute;
			top: 0;
			left: 0;
		}
		.clubIntroduce{
			width: 100%;
			min-height: 300rpx;
			background: #fff;
			border-radius: 26rpx;
			margin-top: 20rpx;
			overflow: hidden;
			box-sizing: border-box;
			padding-bottom: 40rpx;
			.intrDetail{
				box-sizing: border-box;
				padding: 0 34rpx;
				font-size: 26rpx;
				line-height: 45rpx;
				margin-top: 23rpx;
			}
		}
	}
</style>