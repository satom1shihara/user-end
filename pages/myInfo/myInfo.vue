<template>
	<view>
		<div style="text-align: center;">
		  <!-- 头像 -->
		  <img :src="avatar_url" style="height: 100px; width: 100px; ">
		  <!-- 用户名 -->
			<div class="name">{{ "您好, 用户" + this.user_name }}</div>
		  <!-- 查看通知系统 -->
		  <view slot="actions" class="card-actions" style="margin-top: 20px;">
		  	<button type="default" @click="showNotifications()">
		  		查看通知
		  		<uni-icons type="notification-filled" size="20"></uni-icons>
		  	</button>
		  </view>
		  <!-- 查看个人帖子信息 -->
		  <view slot="actions" class="card-actions">
		  	<button type="default" @click="showPosts()">
		  		查看帖子
		  		<uni-icons type="list" size="20"></uni-icons>
		  	</button>
		  </view>
		  <!-- 查看个人领养信息 -->
		  <view slot="actions" class="card-actions">
		  	<button type="default" @click="showAdoptions()">
		  		查看领养信息
		  		<uni-icons type="list" size="20"></uni-icons>
		  	</button>
		  </view>
		  <!-- 退出登录按钮 -->
		  <view slot="actions" class="card-actions">
		  	<button type="warn" @click="logout()">
		  		退出登录
		  		<uni-icons type="closeempty" size="20"></uni-icons>
		  	</button>
		  </view>
		</div>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				user_name: "asja",
				avatar_url: "/static/logo.png",
				true_name: "asdafg",
				phone_number: "1231245",
				email: "asdj@aw.com"
			}
		},
		methods: {
			showNotifications() {
				uni.navigateTo({
					url: "/pages/selfNotification/selfNotification"
				})
			      // 显示通知
			},
			showPosts() {
				uni.navigateTo({
					url: "/pages/selfForum/selfForum"
				})
			  // 显示个人帖子信息
			},
			showAdoptions() {
				uni.navigateTo({
					url: "/pages/selfArchive/selfArchive"
				})
			  // 显示个人领养信息
			},
			logout() {
				uni.redirectTo({
					url: "/pages/login/login"
				})
			  // 执行退出登录操作
			}
		}
	}
</script>

<style>


</style>
