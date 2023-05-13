<template>
	<view>			
			<uni-card :title="this.user_name" :thumbnail="this.avatarUrl" :extra="this.title" is-full="true">
				
				<div class="list-container">
				  <ul style="list-style: none;">
					  
					<uni-row class="demo-uni-row">
						<!-- tags -->
						<uni-col :span="20">
							<uni-icons type="fire-filled" size="20"></uni-icons>
							<li v-for="(it, index) in this.tag" style="display: inline-block; margin: 5px;"> {{it}} </li>
						</uni-col>
						<!-- is_help -->
						<uni-col :span="4">
							<uni-tooltip content="实心为求助帖">
								<p> 求助 </p>
								<uni-icons v-if="is_help" type="checkbox-filled" size="20"></uni-icons> 
					
								<uni-icons v-else type="checkbox" size="20"></uni-icons> 
							</uni-tooltip>
							
						</uni-col>
					</uni-row>  

				  </ul>
				</div>
				
				<p class="content"> {{this.content}} </p>
				
				<div v-for="(it, index) in this.picUrl">
					<img :src="trans(it)" style="text-align: center; height: 200px; width: 200px;">
				</div>
				
				
				
				<uni-section title="评论区" type="line">
					<div v-for="item in comments">
						<uni-card :title="item.name"  :extra="item.time" :thumbnail="item.avatar">
								<div class="content">
									<div class="text">{{ item.text }}</div>
								</div>
						</uni-card>
						
					</div>
				</uni-section>

				<mycommentor style="margin-bottom: 5%;"></mycommentor>>
			</uni-card>
	</view>
</template>

<script>
	import mycommentor from "/uni_modules/my-commentor/components/my-commentor/my-commentor.vue"
	export default {
		components: {
			mycommentor
		},
		
		data() {
			return {
				post_id: 1,
				author_id: 0,
				avatarUrl: "/static/avatar.png",
				user_name: "name",
				tag: ["tag1", "tag2"],
				content: "content",
				title: "title",
				picUrl: [],
				commentList: ["123", "3523"],
				is_help: true,
				comments: [
					{
						avatar: "/static/logo.png",
						name: "name",
						text: "asjdoasjdsdjkasdasdasd",
						time: "12.31"
					},
					{
						avatar: "/static/logo.png",
						name: "name",
						text: "asjdoasjdsdjkasdasdasd",
						time: "12.31"
					},
					{
						avatar: "/static/logo.png",
						name: "name",
						text: "asjdoasjdsdjkasdasdasd",
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
			trans(url) {
				let s = "https://anitu2.2022martu1.cn:8080/" + url.slice(8)
				console.log(s)
				return s
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
					success: (res) => {
						if (res.statusCode == 200) {
							console.log(res.data)
							let info = res.data.data  // comment post user
							this.comments = info.comments
							this.title = info.post.title
							this.content = info.post.content
							this.tag = info.post.tags
							this.picUrl = info.post.pics[0].split(',')
							console.log(info.post.pics)
							this.user_name = info.user.user_id
							this.avatarUrl = "https://anitu2.2022martu1.cn:8080/user/" + info.user.avatar
						} else {
							console.log(res.errMsg)
						}
					},
					fail: (res) => {
						console.log("fail to connect!")
					}
				})
			}
		}
	}
</script>

<style scoped> 
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
	

</style>
