<template>
	<group-activity 
		:showPeople='true' 
		:showBtn='false' 
		:btn1Text=btn1Text 
		:btn2Text=btn2Text 
		:signUpPeople='people'
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
				btn2Text: '签到',
				people: 30
			}
		},
		methods: {
			handle(v) {
				console.log(v)
				uni.navigateTo({
					url: '/pages/groupOwnerManage/signInDetails/signInDetails?id=' + v
				})
			}
		}
	}
</script>

<style lang='scss' scoped>

</style>