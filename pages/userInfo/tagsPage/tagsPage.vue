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
			<!-- <input type="text" v-model="addValue" placeholder="请输入标签"> -->
			<van-field
				placeholder="请输入少于六个字的自定义标签"
				:border="false"
				@change="onChange"
				maxlength='6'
			 >
			</van-field>
			<view class="addButton" @click="toAdd">添加</view>
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
				selectedListIds: [],
				isShow: false,
				addLabel: ''
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
			showAddBox() {
				this.isShow = true
			},
			onChange(v) {
				this.addLabel = v.detail
			},
			toAdd() {
				// 创建并提交后台
				this.$http.get({
					url: '/v1/rest/mydata/createLabel',
					data: {
						userId: uni.getStorageSync('userInfo').userId,
						labelName: this.addLabel
					}
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						this.getAllList()
						this.addLabel = ''
						this.isShow = false
					}
				})
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
			padding-left: 20rpx;
			margin-top: 40rpx;
			box-sizing: border-box;
			.li{
				width: 100%;
				height: 80rpx;
				box-sizing: border-box;
				display: flex;
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
					margin-left: 12rpx;
				}
				.selected{
					background: #fffaec;
					border: 1rpx solid #fac41c;
					color: #f9c31b;
				}
			}
			.li:nth-child(even){
				padding-right: 80rpx;
				padding-left: 60rpx;
				text{
					margin-left: 20rpx;
				}
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
			box-sizing: border-box;
			padding: 0 38rpx;
			position: relative;
			/deep/ .van-cell{
				height: 76rpx;
				border: 1rpx solid #fff;
				box-sizing: border-box;
				border-radius: 40rpx;
				padding: 0;
				padding: 0 25rpx;
				font-size: 24rpx;
				background: none;
				align-items: center;
				.van-field__input{
					color: #fff;
				}
			}
			.addButton{
				width: 70rpx;
				height: 76rpx;
				line-height: 76rpx;
				font-size: 28rpx;
				color: #fac31e;
				position: absolute;
				top: 0;
				right: 48rpx;
				z-index: 99;
			}
		}
	}
</style>