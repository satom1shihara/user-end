<template>
	<view>
		<view class="UCenter-bg text-center">
		  <image :src="avatar_url" class="png round animation-slide-right margin-bottom-sm margin-0" mode="scaleToFill" alt="http://114.116.211.142:80/user/default.png"></image>
		  <!-- <image src="/static/bgpic.png" mode="scaleToFill" class="gif-wave"></image> -->
		</view>
		<!-- 修改头像 -->
		<button class="cu-item arrow animation-slide-bottom" :style="[{animationDelay: '0.4s'}]"  hover-class="none" @click="changeAvatar()">
				<view class="content" >
					<text class="cuIcon-location text-cyan"></text>
						<text class="text-grey">修改头像</text>
				</view>
		</button>
		
		
		<view class="padding flex text-center text-grey bg-white shadow-warp">
				    <view class="flex flex-sub flex-direction solid-right animation-slide-top" :style="[{animationDelay: '0.2s'}]">
				      <view class="text-xl text-orange">{{this.user_name}}</view>
					  <view class="margin-top-sm"><text class="cuIcon-people"></text> 用户</view>
		</view>
				    
		<view class="flex flex-sub flex-direction animation-slide-top" :style="[{animationDelay: '0.2s'}]">
				      <view class="text-xl text-green">{{this.phone_number}}</view>
				      <view class="margin-top-sm"><text class="cuIcon-news"></text> 手机号</view>
				    </view>
		</view>
		
		
		<!-- list of function: -->
		<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">

			
			<!-- 查看通知系统 -->
			
			<button class="cu-item arrow animation-slide-bottom" :style="[{animationDelay: '0.4s'}]"  hover-class="none"  @click="showNotifications()">
				<view class="content" >
					<text class="cuIcon-location text-cyan"></text>
						<text class="text-grey">通知系统</text>
				</view>
			</button>
			
			<!-- 查看个人帖子信息 -->
			<button class="cu-item arrow animation-slide-bottom" :style="[{animationDelay: '0.4s'}]"  hover-class="none"  @click="showPosts()">
				<view class="content" >
					<text class="cuIcon-location text-cyan"></text>
						<text class="text-grey">查看帖子信息</text>
				</view>
			</button>
			<!-- 查看个人领养信息 -->
			<button class="cu-item arrow animation-slide-bottom" :style="[{animationDelay: '0.4s'}]"  hover-class="none"  @click="showAdoptions()">
				<view class="content" >
					<text class="cuIcon-location text-cyan"></text>
						<text class="text-grey">查看领养信息</text>
				</view>
			</button>
			<!-- 退出登录按钮 -->
			<button class="cu-item arrow animation-slide-bottom" :style="[{animationDelay: '0.4s'}]" style="color: red;" hover-class="none"  @click="logout()">
				<view class="content" >
					<text class="cuIcon-exit text-cyan"></text>
						<text class="text-grey">退出登录</text>
				</view>
			</button>
			
			<!-- <button class="mini-btn" type="default" size="mini"  style="margin-top: 10px; height: 40px; width: 150px;">
				修改头像<uni-icons type="plusempty"></uni-icons>
			</button> -->
		  
		  <!-- <view slot="actions" class="card-actions" style="margin-top: 20px;">
		  	<button type="default" @click="showNotifications()">
		  		查看通知
		  		<uni-icons type="notification-filled" size="20"></uni-icons>
		  	</button>
		  </view> -->
		  
		  <!-- <view slot="actions" class="card-actions">
		  	<button type="default" @click="showPosts()">
		  		查看帖子
		  		<uni-icons type="list" size="20"></uni-icons>
		  	</button>
		  </view>
		  
		  
		  <view slot="actions" class="card-actions">
		  	<button type="warn" @click="logout()">
		  		退出登录
		  		<uni-icons type="closeempty" size="20"></uni-icons>
		  	</button>
		  </view> -->
		</view>
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
