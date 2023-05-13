<template>
	<view>
		<view class="plBox">
			<textarea auto-height="true" maxlength="-1" :show-confirm-bar="false" cursor-spacing="100" fixed="true"
				placeholder="在这里发表评论" v-model="this.plValue" @input="changeDisabled"></textarea>
			<button plain="true" @click="send" :disabled="disabled">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 默认禁止点击按钮
				disabled: true,
				plValue: ''
			}
		},

		onLoad() {

		},
		methods: {
			changeDisabled(e) {
				console.log(e);
				if (e.detail.value != "") {
					this.disabled = false;
				} else {
					this.disabled = true;
				}
			},
			send() {
				// console.log("点击发送", this.plValue);
				this.$emit("sendTxt", this.plValue)
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
			max-height: 140rpx !important;
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


