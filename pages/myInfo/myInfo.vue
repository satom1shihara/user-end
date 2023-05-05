<template>
	<view>
		<div style="text-align: center;">
		  <!-- 头像 -->
		  <img :src="avatar_url" style="height: 100px; width: 100px; " alt="http://114.116.211.142:80/user/default.png">
		  <!-- 用户名 -->
			<div class="name">{{ "您好, 用户" + this.user_name }}</div>
			<!-- 修改头像 -->
			<button class="mini-btn" type="default" size="mini" @click="changeAvatar()" style="margin-top: 10px; height: 40px; width: 150px;">
				修改头像<uni-icons type="plusempty"></uni-icons>
			</button>
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
				user_id: 1,
				user_name: "asja",
				avatar_url: "sb.png",
				phone_number: "1231245",
			}
		},
		
		onLoad: function (options) {
			
			uni.request({
				url: "http://114.116.211.142:8080/api/user/info",
				data: {
					
				},
				header: {
					'Authorization': "Bearer " + uni.getStorageSync('token')
				},
				method: 'GET',
				success: (ret) => {
					if (ret.statusCode == 200) {
						let info = ret.data.data.user
						uni.setStorageSync('user_id', info.user_id);
						this.user_id = info.user_id
						this.user_name = info.user_name
						this.phone_number = info.phone_number	
						this.avatar_url = "http://114.116.211.142:80/user/" + info.avatar	
					} else {
						console.log(ret.errMsg)
					}
				},
				fail: (ret) => {
					console.log("fail to connect!")
				}
			})
		},
		
		methods: {
			changeAvatar() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
							// let filename = toString(new Date()) + toString(uni.getStorageSync('user_id'));
							uni.uploadFile({
								url: "http://114.116.211.142:8080/api/user/update/avatar",
								filePath: chooseImageRes.tempFilePaths[0],
								name: "pic",
								header: {
									'Authorization': "Bearer " + uni.getStorageSync('token')
								},
								formData: {
									user_id: uni.getStorageInfoSync('user_id')
								},
								success: (uploadFileRes) => {
									if (uploadFileRes.statusCode == 200) {
										this.avatar_url = uploadFileRes.data.path
									} else {
										console.log(uploadFileRes.data)
									}
								},
							})
						}
				});
			},
			
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
