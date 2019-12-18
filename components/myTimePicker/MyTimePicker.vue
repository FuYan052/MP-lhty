<template>
		<w-picker
			mode="dateTime" 
			startYear="2019" 
			endYear="2022" 
			step='10'
			:current="true" 
			@confirm="onConfirm1" 
			@cancel='onCancel1'
			ref="dateTime" 
			themeColor="#ffbc01" 
		></w-picker>
</template>

<script>
import wPicker from "@/components/w-picker/w-picker.vue";
export default {
  name: 'MyTimePicker',
  components: {
		wPicker
  },
  props: ['isShowTimePicker', 'timePickerType','currTimeValue'],
  data() {
    return {
			currentDate: '',
      show: false
    }
  },
	watch: {
		isShowTimePicker(v) {
			// console.log(v)
			if(v){
				this.$refs.dateTime.show()
			}else{
				this.$refs.dateTime.hide()
			}
		}
	},
  methods: {
    // 确认
    onConfirm1(v) {
			console.log(v)
      this.show = false
      if(this.timePickerType == 100) {
        this.$emit('submitTime', v.result, this.show)
      }else{
        this.$emit('submitDeadline', v.result, this.show)
      }
    },
    // 取消
    onCancel1() {
      this.show = false
      if(this.timePickerType == 100) {
        this.$emit('submitTime', this.currTimeValue, this.show)
      }else{
        this.$emit('submitDeadline', this.currTimeValue, this.show)
      }
    },
  }
}

</script>

<style lang='scss' scoped>
	
</style>
