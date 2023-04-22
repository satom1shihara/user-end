<template>
	<view>
		<ul>
			<div v-for="(item, index) in block">
				
				<uni-card title="基础卡片" sub-title="副标题" extra="额外信息" padding="10px 0" :thumbnail="item.avatarUrl" >
					<template v-slot:title>
						<uni-list>
							<uni-list-item  title="列表文字" ></uni-list-item>
						</uni-list>
					</template>
					<image style="width: 100%;" :src="item.avatarUrl"></image>
					<view slot="actions" class="card-actions">
						<uni-row class="demo-uni-row">
							<uni-col span="12">
								<button type="default" @click="onClick(item)">
									查看详情<uni-icons type="forward" size="20"></uni-icons>
								</button>
							</uni-col>
							<uni-col span="12">
								<button type="default" @click="deleteForum(item)">
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
		
		data() {
			return {
				block: [
					{
						id: 1,
						avatarUrl: "/static/logo.png",
						user_name: "name",
						tag: ["tag1", "tag2"],
						content: "content",
						title: "title",
						picUrl: ["/static/logo.png", "/static/logo.png"],
						is_help: true,
						commentList: [123, 234] // id of comment
					},
					{
						id: 2,
						avatarUrl: "/static/logo.png",
						user_name: "name",
						tag: ["tag1", "tag2"],
						content: "content",
						title: "title",
						picUrl: ["/static/logo.png"],
						is_help: true,
						commentList: [123, 234] // id of comment
					},
					{
						id: 3,
						avatarUrl: "/static/logo.png",
						user_name: "name",
						tag: ["tag1", "tag2"],
						content: "content",
						title: "title",
						picUrl: ["/static/logo.png"],
						is_help: true,
						commentList: [123, 234] // id of comment
					},
					{
						id: 4,
						avatarUrl: "/static/logo.png",
						user_name: "name",
						tag: ["tag1", "tag2"],
						content: "content",
						title: "title",
						picUrl: ["/static/logo.png"],
						is_help: true,
						commentList: [123, 234] // id of comment
					},
					{
						id: 5,
						avatarUrl: "/static/logo.png",
						user_name: "name",
						tag: ["asdfasfd", "tag2"],
						content: "content",
						title: "title",
						picUrl: ["/static/logo.png"],
						is_help: true,
						commentList: [123, 234] // id of comment
					}
				]
			}
		},
		methods: {
			onClick(item) {
				const dataObj = {
						id: item.id,
						avatarUrl: item.avatarUrl,
						user_name: item.user_name,
						tag: item.tag,
						content: item.content,
						title: item.title,
						picUrl: item.picUrl,
						is_help: item.is_help,
						commentList: item.commentList
					};
				uni.navigateTo({
					url: "/pages/specificForum/specificForum?dataObj=" + encodeURIComponent(JSON.stringify(dataObj))
				})
			},
			deleteForum(item) {
				console.log("delete this forum");
			}
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
