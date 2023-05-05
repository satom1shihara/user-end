<template>
	<view>
		<ul>
			<div v-for="(item, index) in block">
				
				<uni-card title="基础卡片" sub-title="副标题" extra="额外信息" padding="10px 0" :thumbnail="item.avatarUrl" >
					<template v-slot:title>
						<uni-list>
							<uni-list-item  :title="item.title" ></uni-list-item>
						</uni-list>
					</template>
					<div v-for="pic in item.picUrl">
						<image style="width: 100%;" :src="trans(pic)"></image>
					</div>
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
		</ul>
	</view>
</template>

<script>

	export default {
		components: {
			
		},
		
		onPullDownRefresh: function() {
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
			trans(url) {
				let s = "http://114.116.211.142:80/" + url.slice(8)
				console.log(s)
				return s
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
					url: "http://114.116.211.142:8080/api/post",
					data: {
						post_id: this.block[index].post_id,
						user_id: uni.getStorageSync('user_id')
					},
					method: 'DELETE',
					header: {
						'Authorization': "Bearer " + uni.getStorageSync('token'),
					},
					success: (ret) => {
						if (ret.statusCode == 200) {
							uni.navigateBack()
							uni.showToast({
								title: '删除成功',
								duration: 1000
							})
						} else {
							console.log(ret.data)
						}
					},
					fail: (ret) => {
						console.log("fail to connect!")
					}
				})
			},
			
			renewPage() {
				uni.request({
					url: "http://114.116.211.142:8080/api/post/table",
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
					success: (res) => {
						if (res.statusCode == 200) {
							console.log(res.data)
							let info = res.data.data.posts
							this.block = []
							for (let i = 0; i < info.length - 1; i++) {
								let post = {
									author_id: 0,
									post_id: 0,
									title: "",
									content: "",
									is_help: 0,
									status: 0,
									tag: [],
									picUrl: [],
								}
								post.author_id = info[i].author_id
								post.post_id = info[i].post_id
								post.title = info[i].title
								post.content = info[i].content
								post.is_help = info[i].is_help
								post.status = info[i].status
								post.tag = info[i].tags
								post.picUrl = info[i].pics
								// console.log(info[i].author_id)
								// console.log( uni.getStorageSync('user_id'))
								if (post.status != 2) continue
								if (info[i].author_id != uni.getStorageSync('user_id')) continue
								
								
								this.block.push(post)
							}
							console.log(this.block)
						} else {
							console.log(res.errMsg)
						}
					},
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
