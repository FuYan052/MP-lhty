<template>
	<group-activity 
		:showPeople='true' 
		:showBtn='false' 
		:btn1Text=btn1Text 
		:btn2Text=btn2Text 
		:activityList='activityList'
		@handle2='handle'>
	</group-activity>
</template>

<script>
	import GroupActivity from '../../../components/groupActivity/groupActivity.vue'
	export default {
		components: {
			GroupActivity
		},
		data() {
			return {
				btn2Text: '去收费',
				people: 30,
				activityList: []
			}
		},
		onShow() {
			this.getList()
		},
		methods: {
			getList() {
				this.$http.get({
					url: '/v1/rest/manage/listActivities',
					data: {
						userId: uni.getStorageSync('userInfo').userId
					}
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						this.activityList = resp.data
					}
				})
			},
			handle(v) {
				console.log(v)
				uni.navigateTo({
					url: '/pages/groupOwnerManage/spotChargeDetial/spotChargeDetial?id=' + v.activitiesId
				})
				uni.setStorageSync('addActId', v.activitiesId)
			}
		}
	}
</script>

<style lang='scss' scoped>

</style>