<template>
	
	<view>
		<uni-row class="demo-uni-row">
							<uni-col :span="20">
								<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @input="input" @cancel="cancel" @clear="clear" placeholder="请输入关键词进行搜索">
								</uni-search-bar>
							</uni-col>
							<uni-col :span="4">
								<button class="mini-btn" type="default" size="mini" @click="newForum" style="margin-top: 10px; height: 40px; width: 40px;">
									<uni-icons type="plusempty" style="margin-left: -5px;"></uni-icons>
								</button>
							</uni-col>
		</uni-row>
		
		
		
		<!-- <uni-notice-bar text="上方可进行搜索和发布新的帖子,下方可查看大家发布的帖子" /> -->
		<div v-if="this.block != '' ">
			
			<view class="cu-card case bg-white padding-bottom animation-slide-top" :style="[{animationDelay: '0.4s'}]" :class="'no-card'">
					<view class="shadow">
						<view class="image" style="background:url(https://anitu2.2022martu1.cn/match/bgpic.png)no-repeat center center;height: 150px;background-size: 100% 100%;">
							<view class="flex justify-between">
								<view class="padding-sm margin-xsradius ">
									<view class="text-white text-center text-xl">看看大家都说了些什么吧~</view>
								</view>
							</view>
						</view>
					</view>
				</view>
		<div v-for="(item, index) in this.block" class="demo-uni-row animation-slide-bottom" :style="[{animationDelay: '0.4s'}]">
			
			<uni-card :title="item.user_name" :sub-title="item.time" :extra="item.title" :thumbnail="transformUrl(item.avatar)" padding="10px 0" @click="onClick(item)">
				<image style="width: 100%;" :src="transformUrl(item.picUrl[0])" mode="aspectFill"></image>
			</uni-card>

			</div>
		</div>
		<div v-else>
			<div v-if="this.pattern == 'display' ">
				<view class="cu-list menu-avatar comment solids-top">
								<view class="cu-item">
									<view class="cu-avatar round" style="background-image:url(/static/bgpic.png);">
									</view>
									<view class="content">
										<view class="text-grey">修狗管理员~</view>
										<view class="text-gray text-content text-df">
											噫？还没有人发帖呢~ 快来发表帖子吧
										</view>
									</view>
									
								</view>
								<image mode="widthFix" src="/static/bgpic.png"></image>
				
				</view>
			</div>
			<div v-else>
				<view class="cu-list menu-avatar comment solids-top">
								<view class="cu-item">
									<view class="cu-avatar round" style="background-image:url(/static/bgpic.png);">
									</view>
									<view class="content">
										<view class="text-grey">修狗管理员~</view>
										<view class="text-gray text-content text-df">
											嗷呜~ 没找到相关内容哦
										</view>
									</view>
									
								</view>
								<image mode="widthFix" src="/static/bgpic.png"></image>
				
				</view>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				pattern: "display",
				info: {
					name: "",
					avatar: "",
				},
				id: 0,
				searchValue: "",
				searchPic: "",
				block: [
					// {
					// 	user_name: "author1",
					// 	time: "1 day ago",
					// 	avatar: "/static/avatar.png",
					// 	post_id: 1,
					// 	author_id: 1,
					// 	tag: ["tag1", "tag2"],
					// 	content: "上方可进行搜索和发布新的帖子,下方可查看大家发布的帖子",
					// 	title: "用户须知",
					// 	picUrl: [],
					// 	is_help: false,
					// },
					// {
					// 	user_name: "author2",
					// 	time: "1 day ago",
					// 	avatar: "/static/avatar.png",
					// 	post_id: 1,
					// 	author_id: 1,
					// 	tag: ["tag1", "tag2"],
					// 	content: "上方可进行搜索和发布新的帖子,下方可查看大家发布的帖子",
					// 	title: "用户须知",
					// 	picUrl: [],
					// 	is_help: false,
					// },
					// {
					// 	post_id: 2,
					// 	tag: ["tag1", "tag2"],
					// 	content: "content",
					// 	title: "title",
					// 	picUrl: ["/static/cat1-2.jpg", "/static/cat4.jpg"],
					// 	is_help: true,	
					// 	commentList: [123, 234] // id of comment
					// },
				]
			}
		},
		
		onPullDownRefresh: function() {
			console.log('refresh');
				setTimeout(function () {
					uni.stopPullDownRefresh();
				}, 1000);
			this.renewPage()
		},
		
		onLoad: function () {
			this.renewPage()
		},
		
		
		methods: {
			cancel() {
				this.renewPage()
			},
			
			transformUrl(url) {
				return "https://anitu2.2022martu1.cn" + url
			},
			
			transformHelp(item) {
				console.log(item.is_help)
				return item.is_help == 1 ? "求助" : "非求助"
			},
			
			renewPage() {
				uni.request({
					url: "https://anitu2.2022martu1.cn:8080/api/post/table",
					data: {
						page: 1,
						limit: 100,
						sort: "created_at"
					},
					header: {
						'Authorization': "Bearer " + uni.getStorageSync('token'),
						'Content-Type': "application/x-www-form-urlencoded",
					},
					
					method: 'GET',
					success: function (res) {
						if (res.statusCode == 200) {
							console.log(res.data)
							let info = res.data.data.posts
							this.block = []
							if (info == null) {
								return
							}
							for (let i = 0; i < info.length; i++) {
								let post = {
									user_name: "",
									time: "",
									avatar: "",
									author_id: 0,
									post_id: 0,
									title: "",
									content: "",
									is_help: 0,
									tag: [],
									picUrl: [],
								}
								
								post.author_id = info[i].author_id
								uni.request({
									url: "https://anitu2.2022martu1.cn:8080/api/user/view",
									data: {
										user_id: post.author_id
									},
									header: {
										'Authorization': "Bearer " + uni.getStorageSync('token'),
									},
									method: 'GET',
									success: function(res) {
										if (res.statusCode == 200) {
											post.user_name = res.data.name
											post.avatar = res.data.avatar
											post.time = info[i].time.substring(0, 10)
											post.post_id = info[i].post_id
											post.title = info[i].title
											post.content = info[i].content
											post.is_help = info[i].is_help
											post.status = info[i].status
											post.tag = info[i].tags
											post.picUrl = info[i].pics[0].split(",")
											if (post.status == 2) {
												this.block.push(post)
												// console.log(post)
											}
										} else {
											console.log(res.errMsg)
										}
									}.bind(this),
								});
							}
						} else {
							console.log(res.errMsg)
						}
						this.$forceUpdate()
					}.bind(this),
					fail: (res) => {
						console.log("fail to connect!")
					}
				})
			},
			
			search(res1) {
				if (res1.value == "") {
					uni.showToast({
						title: '搜索内容不为空哦',
						icon: 'none',
						duration: 1000
					})	
				} else {
					uni.request({
						url: "https://anitu2.2022martu1.cn:8080/api/post/search", 
						data: {
							keyword: res1.value
						},
						header: {
							'Authorization': "Bearer " + uni.getStorageSync('token')
						},
						method: 'GET',
						success: function (res2) {
							if (res2.statusCode == 200) {
								this.pattern = "search"
								console.log(res2.data)
								let info = res2.data.data.posts
								this.block = []
								if (info == null) {
									return
								}
								for (let i = 0; i < info.length; i++) {
									let post = {
										user_name: "",
										time: "",
										avatar: "",
										author_id: 0,
										post_id: 0,
										title: "",
										content: "",
										is_help: 0,
										tag: [],
										picUrl: [],
									}
									
									post.author_id = info[i].author_id
									uni.request({
										url: "https://anitu2.2022martu1.cn:8080/api/user/view",
										data: {
											user_id: post.author_id
										},
										header: {
											'Authorization': "Bearer " + uni.getStorageSync('token'),
										},
										method: 'GET',
										success: function(res) {
											if (res.statusCode == 200) {
												post.user_name = res.data.name
												post.avatar = res.data.avatar
												post.time = info[i].time.substring(0, 10)
												post.post_id = info[i].post_id
												post.title = info[i].title
												post.content = info[i].content
												post.is_help = info[i].is_help
												post.status = info[i].status
												post.tag = info[i].tags
												post.picUrl = info[i].pics[0].split(",")
												if (post.status == 2) {
													this.block.push(post)
													// console.log(post)
												}
											} else {
												console.log(res.errMsg)
											}
										}.bind(this),
									});
								}
							} else {
								console.log(res.errMsg)
							}
							this.$forceUpdate()
						}.bind(this),
						fail: (res) => {
							console.log("fail to connect!")
						}
					});
				}
			},
			input(res) {
							console.log('----input:', res)
						},
			onBackPress() {
						plus.key.hideSoftKeybord();
					},
			
			newForum() {
				// create a new forum
				uni.navigateTo({
					url: "/pages/createForum/createForum"
				})
			},
			
			onClick(item) {
				const dataObj = {
						post_id: item.post_id,
						author_id: item.author_id
					};
				uni.navigateTo({
					url: "/pages/specificForum/specificForum?dataObj=" + encodeURIComponent(JSON.stringify(dataObj))
				})
			}
		}
	}
</script>

<style scoped>
	
	.demo-uni-row {
		margin-bottom: 10px;
		display: block;
	}
	
	.profile {
	    display: flex;
/* 	    align-items: center; */
	    /* margin-top: 20px; */
		height: auto;
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
	    line-height: 1.5;
	  }
	

</style>
