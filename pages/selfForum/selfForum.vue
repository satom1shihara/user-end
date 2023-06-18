<template>
	<view>
		<view v-if="this.block == '' ">
			<view class="cu-list menu-avatar comment solids-top">
							<view class="cu-item">
								<view class="cu-avatar round" style="background-image:url(/static/bgpic.png);">
								</view>
								<view class="content">
									<view class="text-grey">修狗管理员~</view>
									<view class="text-gray text-content text-df">
										噫？你还没有发帖呢~ 快来发表帖子吧
									</view>
								</view>
								
							</view>
							<image mode="widthFix" src="/static/bgpic.png"></image>
			
			</view>
		</view>
		
		<view v-else>
			<div v-for="(item, index) in block">
				
				<uni-card :title="item.user_name" :sub-title="item.time" :extra="item.title" :thumbnail="transformUrl(item.avatar)">
					<!-- <div v-for="pic in item.picUrl">
						<image style="width: 100%;" :src="transformUrl(pic)" mode="aspectFill"></image>
					</div> -->
					<image style="width: 100%;" :src="transformUrl(item.picUrl[0])" mode="aspectFill"></image>
					<view slot="actions" class="card-actions">
						<uni-row class="demo-uni-row">
							<uni-col span="12">
								<button type="default" @click="onClick(item)">
									查看详情<uni-icons type="forward" size="20"></uni-icons>
								</button>
							</uni-col>
							<uni-col span="12">
								<button type="default" @click="deleteForum(index)">
									删除帖子<uni-icons type="closeempty" size="20"></uni-icons>
								</button>
							</uni-col>
						</uni-row>
						
					</view>
				</uni-card>
			
			</div>
		</view>
	</view>
</template>

<script>

	export default {
		components: {
			
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
		
		data() {
			return {
				block: [
					// {
					// 	post_id: 1,
					// 	tag: ["tag1", "tag2"],
					// 	content: "asjkdlfjaskldjfl;asdkfjasdlkfjasdlkcvjdslkfjasd;lkghksldnvsadovikjnoasinvironav;oasivoiawrhnvao;ighlkasdnv;asoivhj",
					// 	title: "title",
					// 	picUrl: ["/static/cat1-2.jpg", "/static/cat4.jpg"],
					// 	is_help: true,
					// 	commentList: [123, 234] // id of comment
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
		methods: {
			
			transformUrl(url) {
				return "https://anitu2.2022martu1.cn" + url
			},
			
			transformHelp(item) {
				return item.is_help == true ? "求助" : "非求助"
			},
			onClick(item) {
				const dataObj = {
						post_id: item.post_id,
						author_id: item.author_id
					};
				uni.navigateTo({
					url: "/pages/specificForum/specificForum?dataObj=" + encodeURIComponent(JSON.stringify(dataObj))
				})
			},
			deleteForum(index) {
				console.log("delete this forum");
				console.log(index);
				uni.request({
					url: "https://anitu2.2022martu1.cn:8080/api/post",
					data: {
						post_id: this.block[index].post_id,
						user_id: uni.getStorageSync('user_id')
					},
					method: 'DELETE',
					header: {
						'Authorization': "Bearer " + uni.getStorageSync('token'),
					},
					success: function(ret) {
						if (ret.statusCode == 200) {
							uni.showToast({
								title: '删除成功',
								duration: 1000
							})
							this.renewPage()
						} else {
							console.log(ret.data)
						}
					}.bind(this),
					fail: (ret) => {
						console.log("fail to connect!")
					}
				})
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
											if (post.status == 2 && post.author_id == uni.getStorageSync('user_id')) {
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
		}
	}
</script>

<style scoped>
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
