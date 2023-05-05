<template>
	
	<view>
		<uni-row class="demo-uni-row" :gutter="gutter" :width="nvueWidth">
							<uni-col :span="20">
								<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @input="input"
									@cancel="cancel" @clear="clear">
								</uni-search-bar>
							</uni-col>
							<uni-col :span="4">
								<button class="mini-btn" type="default" size="mini" @click="newForum" style="margin-top: 10px; height: 40px; width: 40px;">
									<uni-icons type="plusempty" style="margin-left: -5px;"></uni-icons>
								</button>
							</uni-col>
		</uni-row>
		
		<uni-notice-bar text="上方可进行搜索和发布新的帖子,下方可查看大家发布的帖子" />
		
		<div v-for="(item, index) in block">
			
			<uni-card  padding="10px 0" >
				<template v-slot:title>
					<uni-list>
						<uni-list-item :title="item.title" ></uni-list-item>
					</uni-list>
				</template>
				<div v-for="pic in item.picUrl">
					<image style="width: 100%;" :src="trans(pic)"></image>
				</div>
				
				<view slot="actions" class="card-actions">
					<button type="default" @click="onClick(item)">
						查看详情
						<uni-icons type="forward" size="20"></uni-icons>
					</button>
				</view>
			</uni-card>

		</div>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				gutter: 0,
				id: 0,
				nvueWidth: 730,
				searchValue: "",
				searchPic: "",
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
		
		onPullDownRefresh: function() {
			this.renewPage()
		},
		
		onLoad: function () {
			this.renewPage()
		},
		
		methods: {
			trans(url) {
				let s = "http://114.116.211.142:80/" + url.slice(8)
				console.log(s)
				return s	
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
								if (post.status == 2) {
									this.block.push(post)
									// console.log(post)
								}
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
