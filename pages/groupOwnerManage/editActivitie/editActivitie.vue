<template>
	<group-activity :showPeople='false' :showBtn='true' :btn1Text=btn1Text :btn2Text=btn2Text @handle1='handleEdit' @handle2='handleCencel'></group-activity>
</template>

<script>
	import GroupActivity from '../../../components/groupActivity/groupActivity.vue'
	export default {
		components: {
			GroupActivity
		},
		data() {
			return {
				btn1Text: '编辑',
				btn2Text: '取消',
			}
		},
		methods: {
			handleEdit(v) {
				console.log(v)
				uni.navigateTo({
					url: '/pages/groupOwnerManage/revisionActivity/revisionActivity'
				})
			},
			handleCencel(v) {
				console.log(v)
			}
		}
	}
</script>

<style lang='scss' scoped>

</style>