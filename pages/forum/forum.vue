<template>
	
	<view>
		<uni-row class="demo-uni-row">
							<uni-col :span="20">
								<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @input="input"
									@cancel="cancel" @clear="clear" >
								</uni-search-bar>
							</uni-col>
							<uni-col :span="4">
								<button class="mini-btn" type="default" size="mini" @click="newForum" style="margin-top: 10px; height: 40px; width: 40px;">
									<uni-icons type="plusempty" style="margin-left: -5px;"></uni-icons>
								</button>
							</uni-col>
		</uni-row>
		
		<!-- <uni-notice-bar text="上方可进行搜索和发布新的帖子,下方可查看大家发布的帖子" /> -->
		
		<div v-for="(item, index) in this.block" class="demo-uni-row animation-slide-bottom" :style="[{animationDelay: '0.4s'}]">
			
			<uni-card :title="item.user_name" :sub-title="item.time" :extra="this.transformHelp(item.is_help)" :thumbnail="transformUrl(item.avatar)" padding="10px 0" @click="onClick(item)">
				<div v-for="pic in item.picUrl">
					<image style="width: 100%;" :src="transformUrl(pic)"></image>
				</div>
			</uni-card>

		</div>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
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
			transformUrl(url) {
				return "https://anitu2.2022martu1.cn" + url
			},
			
			transformHelp(item) {
				return item.is_help == true ? "求助" : "非求助"
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
							console.log("info=" + info)
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
								console.log("11")
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
											console.log("33")
											post.user_name = res.data.name
											post.avatar = res.data.avatar
											console.log("name=" + post.user_name)
											console.log("avatar=" + post.avatar)
											post.time = info[i].time.substring(0, 10)
											console.log("time=" + post.time)
											post.post_id = info[i].post_id
											post.title = info[i].title
											post.content = info[i].content
											post.is_help = info[i].is_help
											post.status = info[i].status
											post.tag = info[i].tags
											post.picUrl = info[i].pics
											console.log("post=" + post)
											console.log("111")
											if (post.status == 2) {
												this.block.push(post)
												// console.log(post)
											}
											console.log("33")
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
			
			search(res) {
							uni.showToast({
								title: '搜索：' + res.value,
								icon: 'none'
							})
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
