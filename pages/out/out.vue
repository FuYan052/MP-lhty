<template>
	<web-view :src="outUrl"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				outUrl: ''
			}
		},
		onLoad(v) {
			// console.log(v)
			this.outUrl = v.url
		}
	}
</script>

<style lang="scss" scoped>

</style>
