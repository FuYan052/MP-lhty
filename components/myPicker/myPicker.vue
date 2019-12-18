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
  props: ['isShowPicker','currHourValue'],
  data() {
    return {
			show: false,
			columns: [{label:"0.5小时",value:"0.5"},{label:"1小时",value:"1"},{label:"1.5小时",value:"1.5"},{label:"2小时",value:"2"},{label:"2.5小时",value:"2.5"},{label:"3小时",value:"3"},{label:"3.5小时",value:"3.5"},{label:"4小时",value:"4"}]
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
      this.$emit('submitHour', v.checkArr.value, this.show)
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
