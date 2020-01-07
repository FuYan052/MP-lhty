<template>
	<group-activity :showPeople='false' :showBtn='true' :btn1Text='btn1Text' :btn2Text='btn2Text' :activityList='actList' @handle1='handleEdit' @handle2='handleCencel'></group-activity>
</template>

<script>
	import GroupActivity from '../../../components/groupActivity/groupActivity.vue'
	export default {
		components: {
			GroupActivity
		},
		data() {
			return {
				btn1Text: '修改',
				btn2Text: '取消',
				actList: []
			}
		},
		created() {
			this.getActList()
		},
		methods: {
			// 活动列表
			getActList() {
				this.$http.get({
					url: '/v1/rest/manage/listActivities',
					data: {
						userId: uni.getStorageSync('userInfo').userId
					}
				}).then(resp => {
					console.log(resp)
					if(resp.status == 200) {
						this.actList = resp.data
					}
				})
			},
			handleEdit(v) {
				console.log(v)
				uni.navigateTo({
					url: '/pages/groupOwnerManage/revisionActivity/revisionActivity?editId=' + v.activitiesId
				})
			},
			handleCencel(v) {
				const that = this
				uni.showModal({
					title: '提示',
					content: '确定要取消该条活动吗？',
					success: function (res) {
						if (res.confirm) {
							that.$http.get({
								url: '/v1/rest/manage/cancelActivities',
								data: {
									activitiesId: v.activitiesId
								}
							}).then(resp => {
								console.log(resp)
								if(resp.status == 200) {
									console.log(resp)
									if(resp.status == 200) {
										that.getActList()
										uni.showToast({
											title: '取消成功',
											duration: 2000,
											icon: 'none'
										}); 
									}
								}
							})
						} else if (res.cancel) {}
					}
				});
			}
		}
	}
</script>

<style lang='scss' scoped>

</style>