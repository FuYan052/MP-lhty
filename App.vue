<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/common.css';
	@import "/wxcomponents/vant/dist/common/index.wxss";
	
	
	page {
		background-color: #1e1e1e;
		min-height: 100%;
		font-size: 30rpx;
		font-family:Monospaced Number,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif!important;
	}
	*{
		box-sizing: border-box;
	}
</style>
