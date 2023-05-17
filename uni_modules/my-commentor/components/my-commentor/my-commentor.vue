<template>
	<view>
		<view class="plBox">
			<textarea placeholder="在这里发表评论" v-model="this.plValue"></textarea>

			<button plain="true" @click="this.send()">发送</button>
			<button plain="true" @click="this.clear()">清除</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				plValue: ''
			}
		},
		

		onLoad() {

		},
		methods: {
			send() {
				console.log("点击发送", this.plValue);
				uni.request({
					url: "https://anitu2.2022martu1.cn:8080/api/comment",
					data: {
						user_id: post.author_id
					},
					header: {
						'Authorization': "Bearer " + uni.getStorageSync('token'),
					},
					method: 'POST',
					success: function(res) {
						if (res.statusCode == 200) {
							
						} else {
							console.log(res.errMsg)
						}
					}.bind(this),
				});
				
			},
			
			clear() {
				this.plValue = ""
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.plBox {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		min-height: 100rpx;
		padding: 20rpx 20rpx 20rpx 30rpx;
		box-sizing: border-box;
		background-color: #F7F7F7;
		display: flex;
		justify-content: space-between;
		align-items: center;

		textarea {
			flex: 7;
			flex-shrink: 0;
			border-radius: 15rpx;
			max-height: 100rpx !important;
			margin-right: 30rpx;
			border: none;
			background-color: #ffffff;
			padding: 20rpx;
		}

		button {
			flex: 1;
			border: 1px solid #D3D3D3;
			color: #ffffff;
			margin: 0;
			padding: 0 5rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 30rpx;
			background-color: #304D99;
		}
	}
</style>


