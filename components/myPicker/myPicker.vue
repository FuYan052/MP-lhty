<template>
		<w-picker
			mode="selector" 
			:defaultVal="['2小时']" 
			:selectList="columns"
			@confirm="onConfirm1" 
			@cancel='onCancel1'
			ref="picker1" 
			themeColor="#ffbc01" 
		></w-picker>
</template>

<script>
import wPicker from "@/components/w-picker/w-picker.vue";
export default {
  name: 'MyPicker',
  components: {
		wPicker
  },
  props: ['isShowPicker','currHourValue','pickList'],
  data() {
    return {
			show: false,
    }
  },
	computed: {
		columns() {
			return this.pickList
		}
	},
	watch: {
		isShowPicker(v) {
			if(v){
				this.$refs.picker1.show()
			}else{
				this.$refs.picker1.hide()
			}
		}
	},
  methods: {
    // 确认
    onConfirm1(v) {
			// console.log(v)
      this.show = false
      this.$emit('handleSubmit', v, this.show)
    },
    // 取消
    onCancel1() {
      this.show = false
      this.$emit('submitHour', this.currHourValue, this.show)
    },
  }
}

</script>

<style lang='scss' scoped>
	
</style>
