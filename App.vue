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
	}
	*{
		box-sizing: border-box;
	}
	/* @font-face {
	    font-family:'vant-icon';
	    src:url('https://img.yzcdn.cn/vant/vant-icon-0bc654.woff2') format('truetype');
	} */
</style>
