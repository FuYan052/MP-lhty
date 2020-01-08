<template>
	<view class="tagsPage">
		<view class="ul">
			<view class="li" v-for="(item,index) in resultList2" :key="index">
				<text 
					v-for="(it,ind) in item" 
					:key="ind" @click="selected(it,ind)"
					:class="{selected:selectedListIds.indexOf(it.id)>=0}"
				>{{it.label}}</text>
			</view>
		</view>
		<view class="btnBox">
			<view class="btn createNew" @click="showAddBox">创建新标签</view>
			<view class="btn save" @click="saveSelectLabels">保存</view>
		</view>
		<view class="addLabel" v-show="isShow">
			<input type="text" v-model="addValue" ref="input" placeholder="请输入标签">
			<text @click="toAdd">添加</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				labelList: [],  //请求回来的一维数组
				resultList1: [], 
				resultList2: [], //变成二维数组渲染,用于渲染
				selectedListIds: []
			}
		},
		created() {
				// 从完善信息页传过来的标签集合
				// this.selectedList =JSON.parse(window.sessionStorage.getItem('labels')) 
				// for(let i in this.selectedList) {
				// 	this.selectedListIds.push(this.selectedList[i].id)
				// }
				// 获取所有标签
				this.getAllList()
		},
		methods: {
			// 获取所有标签
			getAllList() {
				this.labelList = []
				this.resultList1 = []
				this.resultList2 = []
				// this.$http.findAllLabel(this.userId).then(resp => {
				this.$http.get({
					url: '/v1/rest/mydata/findAllLabel',
					data: {
						userId: uni.getStorageSync('userInfo').userId
					}
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						this.labelList = resp.data
						this.sliceArr1()
						this.sliceArr2()
					}
				})
			}, 
			sliceArr1() {
				let n = 7
				let len = this.labelList.length
				let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1)
				let result = []
				for (let i = 0; i < lineNum; i++) {
					let newList = this.labelList.slice(i*n ,i*n+n)
					result.push(newList)
					this.resultList1 = result
				}
			},
			sliceArr2 () {
				for(let i = 0; i < this.resultList1.length; i++) {
					let n = 4
					let len = this.resultList1[i].length
					let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1)
					let result2 = []
					for (let j = 0; j < lineNum; j++) {
						let newList = this.resultList1[i].slice(j*n ,j*n+n)
						result2.push(newList)
					}
					this.resultList2.push(result2)
				}
				this.resultList2 = this.resultList2.reduce(function (a, b) { return a.concat(b)} )
				// console.log(this.resultList2)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tagsPage{
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		.ul{
			width: 100%;
			height: auto;
			padding: 0 30rpx;
			margin-top: 40rpx;
			box-sizing: border-box;
			.li{
				width: 100%;
				height: 80rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				text{
					display: block;
					background: #fff;
					width: 160rpx;
					overflow: auto;
					height: 56rpx;
					line-height: 54rpx;
					text-align: center;
					font-size: 22rpx;
					border-radius: 30rpx;
					color: #565656;
					border: 1rpx solid #313131;
				}
				.selected{
					background: #fffaec;
					border: 1rpx solid #fac41c;
					color: #f9c31b;
				}
			}
			.li:nth-child(even){
				padding: 0 80rpx;
			}
		}
		.btnBox{
			width: 100%;
			height: 170rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			.btn{
				width: 325rpx;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				font-size: 26rpx;
				border-radius: 10rpx;
				float: left;
				margin-top: 50rpx;
			}
			.createNew{
				color: #fff;
				border: 1rpx solid #fff;
			}
			.save{
				color: #fff;
				background: #fac31e;
			}
		}
		.addLabel{
			width: 100%;
			height: 100rpx;
			background: #fff;
			padding: 0 38rpx;
			position: fixed;
			bottom: 0;
			z-index: 9;
			position: relative;
			input{
				width: 100%;
				height: 70rpx;
				border: 1rpx solid #313131;
				border-radius: 40rpx;
				padding-left: 25rpx;
				font-size: 21rpx;
			}
			text{
				width: 90rpx;
				height: 55rpx;
				line-height: 55rpx;
				text-align: center;
				color: #fff;
				background: #fac31e;
				display: block;
				font-size: 25rpx;
				border-radius: 25rpx;
				position: absolute;
				top: 7rpx;
				right: 50rpx;
			}
		}
	}
</style>