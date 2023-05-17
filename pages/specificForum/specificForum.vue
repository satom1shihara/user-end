<template>
	<view>			
			<uni-card :title="this.user_name" :sub-title="this.time" :thumbnail="transform(this.avatarUrl)" :extra="this.title" is-full="true">
				
				<div class="list-container">
					  
					<uni-row class="demo-uni-row">
						<!-- tags -->

						<uni-col :span="20">
							<li v-for="(it, index) in this.tag" style="display: inline-block; margin: 5px;"> 
								<view class="cu-tag bg-gradual-blue">
									{{it}}
								</view>
							</li>
						</uni-col>
						<!-- is_help -->
						<uni-col :span="4">
							<uni-tooltip content="实心为求助帖">
								<uni-icons v-if="this.is_help == 1" type="checkbox-filled" size="20">求助</uni-icons> 
					
								<uni-icons v-else type="checkbox" size="20">非求助</uni-icons> 
							</uni-tooltip>
							
						</uni-col>
					</uni-row>  
				</div>
				
				<p class="content"> {{this.content}} </p>
				
				<div v-for="(it, index) in this.picUrl" style="text-align: center;">
					<img :src="transform(it)" style=" height: 200px; width: 200px;">
				</div>
				
				
				
				<!-- <uni-section title="评论区" type="line">
					<div v-for="item in comments">
						<uni-card :title="item.name"  :extra="item.time" :thumbnail="item.avatar">
								<div class="content">
									<div class="text">{{ item.text }}</div>
								</div>
						</uni-card>
						
					</div>
				</uni-section> -->
				
				
				<view>
				        <view class="uni-padding-wrap">
				            <!-- 评论区 start -->
				            <view v-for="(item, index) in this.comments" class="uni-comment">
								
				                <view class="uni-comment-list">
				                    <view class="uni-comment-face">
				                        <image :src="transform(item.avatar)" mode="widthFix"></image>
				                    </view>
				                    <view class="uni-comment-body">
				                        <view class="uni-comment-top">
				                            <text>{{item.name}}</text>
				                        </view>
				                        <view class="uni-comment-date">
				                            <text>{{item.time}}</text>
				                        </view>
				                        <view class="uni-comment-content">{{item.content}}</view>
				                    </view>
				                </view>
								
								
				               <!-- <view class="uni-comment-list">
				                    <view class="uni-comment-face">
				                        <image src="/static/avatar.png" mode="widthFix"></image>
				                    </view>
				                    <view class="uni-comment-body">
				                        <view class="uni-comment-top">
				                            <text>马克一天</text>
				                        </view>
				                        <view class="uni-comment-content">很强大，厉害了我的uni-app!</view>
				                    </view>
				                </view>
				                <view class="uni-comment-list">
				                    <view class="uni-comment-face">
				                        <image src="/static/avatar.png" mode="widthFix"></image>
				                    </view>
				                    <view class="uni-comment-body">
				                        <view class="uni-comment-top">
				                            <text>今生缘</text>
				                        </view>
				                        <view class="uni-comment-content">好牛逼的感觉，是不是小程序、App、移动端都互通了？</view>
				                        <view class="uni-comment-date">
				                            <text>08/10 07:55</text>
				                        </view>
				                    </view>
				                </view>
				                <view class="uni-comment-list">
				                    <view class="uni-comment-face">
				                        <image src="/static/avatar.png" mode="widthFix"></image>
				                    </view>
				                    <view class="uni-comment-body">
				                        <view class="uni-comment-top">
				                            <text>小猫咪</text>
				                        </view>
				                        <view class="uni-comment-content">支持国产，支持DCloud!</view>
				                        <view class="uni-comment-date">
				                            <view>2天前</view>
				                        </view>
				                    </view>
				                </view> -->
				            </view>
				        </view>
				    </view>
			<!-- comment -->
			<view class="plBox">
				<textarea placeholder="在这里发表评论" v-model="this.plValue"></textarea>
			
				<button plain="true" @click="this.send()">发送</button>
				<button plain="true" @click="this.clear()">清除</button>
			</view>
			
			
			</uni-card>
	</view>
</template>

<script>
	// import mycommentor from "/uni_modules/my-commentor/components/my-commentor/my-commentor.vue"
	export default {
		// components: {
		// 	mycommentor
		// },
		
		data() {
			return {
				plValue: "",
				post_id: 1,
				author_id: 0,
				avatarUrl: "/static/avatar.png",
				user_name: "name",
				tag: ["tag1", "tag2"],
				content: "content",
				title: "title",
				picUrl: ["/static/avatar.png"],
				commentList: ["123", "3523"],
				is_help: true,
				comments: [
					{
						avatar: "/static/logo.png",
						name: "name",
						content: "asjdoasjdsdjkasdasdasd",
						time: "12.31"
					},
					{
						avatar: "/static/logo.png",
						name: "name",
						content: "asjdoasjdsdjkasdasdasd",
						time: "12.31"
					},
					{
						avatar: "/static/logo.png",
						name: "name",
						content: "asjdoasjdsdjkasdasdasd",
						time: "12.31"
					}
				]
			}
		},
		onLoad: function (options) {
			let dataObj = JSON.parse(decodeURIComponent(options.dataObj));
			this.post_id = dataObj.post_id;
			this.author_id = dataObj.author_id;
			console.log(this.post_id)
			console.log(this.author_id)
			this.getDetail()
		},
		methods: {
			send() {
				console.log("点击发送", this.plValue);
				uni.request({
					url: "https://anitu2.2022martu1.cn:8080/api/post/comment",
					data: {
						post_id: this.post_id,
						author_id: uni.getStorageSync("user_id"),
						content: this.plValue
					},
					header: {
						'Authorization': "Bearer " + uni.getStorageSync('token'),
					},
					method: 'POST',
					success: function(res) {
						if (res.statusCode == 200) {
							uni.showToast({
								title: '发布成功',
								duration: 1000
							})
						} else {
							console.log(res.errMsg)
						}
					}.bind(this),
				});
				
			},
			
			clear() {
				this.plValue = ""
				
			},
			transform(url) {
				return "https://anitu2.2022martu1.cn" + url
			},
			
			getDetail() {
				uni.request({
					url: "https://anitu2.2022martu1.cn:8080/api/post/detail",
					data: {
						post_id: this.post_id,
						user_id: this.author_id
					},
					header: {
						'Authorization': "Bearer " + uni.getStorageSync('token'),
					},
					
					method: 'POST',
					success: function(res) {
						if (res.statusCode == 200) {
							console.log(res.data)
							let info = res.data.data  // comment post user
							// this.comments = info.comments
							this.title = info.post.title
							this.content = info.post.content
							this.tag = info.post.tags[0].split(",")
							this.time = info.post.time.substring(0, 10)
							this.is_help = info.post.is_help
							this.picUrl = info.post.pics
							console.log(info.post.pics)
							this.avatarUrl = info.user.avatar
							uni.request({
								url: "https://anitu2.2022martu1.cn:8080/api/user/view",
								data: {
									user_id: this.author_id
								},
								header: {
									'Authorization': "Bearer " + uni.getStorageSync('token'),
								},
								method: 'GET',
								success: function(res1) {
									if (res1.statusCode == 200) {
										this.user_name = res1.data.name
										this.avatar = res1.data.avatar
										console.log("name=" + this.user_name)
										console.log("avatar=" + this.avatar)
										this.comments = []
										// solve comment
										if (info.comments != null) {
											var comment = {
												avatar: "/static/logo.png",
												name: "name",
												content: "asjdoasjdsdjkasdasdasd",
												time: "12.31"
											}
											for (let i = 0; i < info.comments.length; i++) {
												uni.request({
													url: "https://anitu2.2022martu1.cn:8080/api/user/view",
													data: {
														user_id: this.author_id
													},
													header: {
														'Authorization': "Bearer " + uni.getStorageSync('token'),
													},
													
													method: 'GET',
													success: function(res2) {
														if (res2.statusCode == 200) {
															console.log("2222")
															console.log(res2.data)
															comment.avatar = res2.data.avatar
															comment.name = res2.data.name
															
															comment.time = info.comments[i].time.substring(0, 10)
															comment.content = info.comments[i].content
															this.comments.push(comment)
														} else {
															console.log(res.errMsg)
														}
													}.bind(this),
													fail: (res) => {
														console.log("fail to connect!")
													}
												})
											}
										}
									} else {
										console.log(res.errMsg)
									}
								}.bind(this),
							});
						} else {
							console.log(res.errMsg)
						}
					}.bind(this),
					fail: (res) => {
						console.log("fail to connect!")
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped> 
	.profile {
	    display: flex;
/* 	    align-items: center; */
	    margin-bottom: 20px;
		height: 80%;
		overflow: auto;
	  }
	
	  .avatar {
		float: left;
		display: inline-block;
	  }
	
	  .info {
		display: inline-block;
		float: right;
	    flex: 1;
	  }
	
	  .name {
	    font-size: 20px;
	    font-weight: bold;
	    margin-bottom: 10px;
	  }
	  
	  .content {
		  font-size: 16px;
		    font-weight: normal;
		    line-height: 1.5;
		    color: #333333;
		    text-align: left;
		    text-decoration: none;
		    white-space: normal;
		    word-wrap: break-word;
		    word-break: break-all;
		    letter-spacing: normal;
		    display: block;
		    margin-top: 20px;
		    padding: 0;
			text-indent: 2em;
	  }
	  
	  page {
	          background-color: #f8f8f8;
	      }
	  
	      .uni-padding-wrap {
	          padding: 30upx;
	      }
	  
	      view {
	          font-size: 28upx;
	      }
	  
	      .uni-comment {
	          padding: 5rpx 0;
	          display: flex;
	          flex-grow: 1;
	          flex-direction: column;
	      }
	  
	      .uni-comment-list {
	          flex-wrap: nowrap;
	          padding: 10rpx 0;
	          margin: 10rpx 0;
	          width: 100%;
	          display: flex;
	      }
	  
	      .uni-comment-face {
	          width: 70upx;
	          height: 70upx;
	          border-radius: 100%;
	          margin-right: 20upx;
	          flex-shrink: 0;
	          overflow: hidden;
	      }
	  
	      .uni-comment-face image {
	          width: 100%;
	          border-radius: 100%;
	      }
	  
	      .uni-comment-body {
	          width: 100%;
	      }
	  
	      .uni-comment-top {
	          line-height: 1.5em;
	          justify-content: space-between;
	      }
	  
	      .uni-comment-top text {
	          color: #0A98D5;
	          font-size: 24upx;
	      }
	  
	      .uni-comment-date {
	          line-height: 38upx;
	          flex-direction: row;
	          justify-content: space-between;
	          display: flex !important;
	          flex-grow: 1;
	      }
	  
	      .uni-comment-date view {
	          color: #666666;
	          font-size: 24upx;
	          line-height: 38upx;
	      }
	  
	      .uni-comment-content {
	          line-height: 1.6em;
	          font-size: 28upx;
	          padding: 8rpx 0;
	      }
	  
	      .uni-comment-replay-btn {
	          background: #FFF;
	          font-size: 24upx;
	          line-height: 28upx;
	          padding: 5rpx 20upx;
	          border-radius: 30upx;
	          color: #333 !important;
	          margin: 0 10upx;
	      }
		  
		  
		  
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
