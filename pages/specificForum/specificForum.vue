<template>
	<view>			
			<uni-card :title="this.user_name" sub-title="时间" :thumbnail="this.avatarUrl">
				
				<div class="list-container">
				  <ul style="list-style: none;">
					  
					<uni-row class="demo-uni-row" :gutter="gutter" :width="nvueWidth">
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
					<img :src="it" style="text-align: center; height: 200px; width: 200px;">
				</div>
				
				<uni-section title="评论区" type="line">
					<div v-for="item in comments">
						<uni-card title="基础卡片" sub-title="副标题" extra="额外信息" :thumbnail="avatar">
							<img :src="item.avatar" style="width: 100px; height: 100px;">
								<div class="content">
									<div class="name">{{ item.name }}</div>
									<div class="text">{{ item.text }}</div>
									<div class="time">{{ item.time }}</div>
								</div>
						</uni-card>
						
					</div>
				</uni-section>

				<mycommentor></mycommentor>>
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
				id: 1,
				avatarUrl: "/static/logo.png",
				user_name: "name",
				tag: ["tag1", "tag2"],
				content: "content",
				title: "title",
				picUrl: ["/static/logo.png", "/static/logo.png"],
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
			this.id = dataObj.id;
			this.avatarUrl = dataObj.avatarUrl;
			this.user_name = dataObj.user_name;
			this.tag = dataObj.tag;
			this.content = dataObj.content;
			this.title = dataObj.title;
			this.picUrl = dataObj.picUrl;
			this.is_help = dataObj.is_help
			this.commentList = dataObj.commentList;
			this.getAllcomments();
		},
		methods: {
			getAllcomments() {
				// TODO send ID to back-end and get all comments
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
