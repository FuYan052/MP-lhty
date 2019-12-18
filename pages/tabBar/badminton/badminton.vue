<template>
	<view class="badminton">
		<view class="title1">
			{{text}}
		</view>
		<van-button type='info'>按钮</van-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: ''
			}
		},
		onLoad() {
			this.$http.post({
				url: '/v1/rest/login/activitiesList',
				data:{
					type: 'sportsKinds_01',
					time: '2019-11-11',
					keyWord: '',
					lat: '30.5702',
					lon: '104.06476',
					page: 1,
					userId: '',
				}
			}).then(resp => {
				console.log(resp)
			})
			this.$http.get({
				url: '/v1/rest/login/login',
				data:{
					phone: '15096762547',
					passWord: '1234567',
				}
			}).then(resp => {
				console.log(resp)
				this.text = resp.info
			})
		}
	}
</script>

<style lang="scss" scoped>
	.badminton{
		width: 100%;
		max-height: 100vh;
		.title1{
			// width: 15px;
			// height: 30rpx;
			border: 1rpx solid #3F536E;
			
			font-size: 30rpx;
			color: #3F536E;
		}
		/deep/ .van-button--normal{
			padding: 0 15rpx;
		}
	}
</style>
