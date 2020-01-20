<template>
	<group-activity 
		:showPeople='true' 
		:showBtn='false' 
		:btn1Text='btn1Text' 
		:btn2Text='btn2Text' 
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
				btn2Text: '结算',
				people: 30,
				activityList: []
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getList()
		},
		methods: {
			getList() {
				this.$http.get({
					url: '/v1/rest/manage/listActivities',
					data: {
						clubId: uni.getStorageSync('clubId')
					}
				}).then(resp => {
					// console.log(resp)
					if(resp.status == 200) {
						this.activityList = resp.data
					}
				})
			},
			handle(v) {
				// console.log(v)
				uni.navigateTo({
					url: '/pages/groupOwnerManage/settlement/settlement?actId=' + v.activitiesId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>