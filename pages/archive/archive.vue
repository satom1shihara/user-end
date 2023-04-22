<template>
	
	<view>
		<uni-row class="demo-uni-row" :gutter="gutter" :width="nvueWidth">
							<uni-col :span="24">
								<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @input="input"
									@cancel="cancel" @clear="clear">
								</uni-search-bar>
							</uni-col>
							<!-- <uni-col :span="4">
								<button class="mini-btn" type="default" size="mini" @click="newForum" style="margin-top: 10px;">
									<uni-icons type="plusempty"></uni-icons>
								</button>
							</uni-col> -->
		</uni-row>
		
		<uni-notice-bar text="上方可进行搜索,下方可查看动物信息的档案" />
		
		<div v-for="(item, index) in block">
			
			<uni-card padding="10px 0" >
				<template v-slot:title>
					<uni-list>
						<uni-list-item  :title="item.title" ></uni-list-item>
					</uni-list>
				</template>
				<image style="width: 100%;" :src="item.picUrl[0]"></image>
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
				nvueWidth: 730,
				searchValue: "",
				block: [
					{
						ani_name: "ani_name",
						title: "title",
						content: "尊敬的客人，非常感谢您选择牛魔酬宾酒店。我们一直以来都以提供一流的服务和舒适的住宿环境为己任，让每位客人都能够感受到家一般的温馨和舒适。\
						\n\n在这里，您可以享受到最优质的客房和设施，我们的工作人员将竭尽所能为您提供优质的服务，让您的旅途更加愉悦和难忘。我们致力于追求卓越，为客人提供最完美的体验。\
						\n\n我们也非常注重诚信待客，始终以诚信为本，为每位客人提供公平、透明的服务。无论您是商务出差还是旅游度假，我们都会全力以赴为您提供最好的服务和体验。",
						tag: ["tag1", "tag2"],
						picUrl: ["/static/logo.png"],
					},
					{
						ani_name: "ani_name",
						title: "title",
						content: "尊敬的客人，非常感谢您选择牛魔酬宾酒店。我们一直以来都以提供一流的服务和舒适的住宿环境为己任，让每位客人都能够感受到家一般的温馨和舒适。\
						\n\n在这里，您可以享受到最优质的客房和设施，我们的工作人员将竭尽所能为您提供优质的服务，让您的旅途更加愉悦和难忘。我们致力于追求卓越，为客人提供最完美的体验。\
						\n\n我们也非常注重诚信待客，始终以诚信为本，为每位客人提供公平、透明的服务。无论您是商务出差还是旅游度假，我们都会全力以赴为您提供最好的服务和体验。",
						tag: ["tag1", "tag2"],
						picUrl: ["/static/logo.png"],
					},
					{
						ani_name: "ani_name",
						title: "title",
						content: "尊敬的客人，非常感谢您选择牛魔酬宾酒店。我们一直以来都以提供一流的服务和舒适的住宿环境为己任，让每位客人都能够感受到家一般的温馨和舒适。\
						\n\n在这里，您可以享受到最优质的客房和设施，我们的工作人员将竭尽所能为您提供优质的服务，让您的旅途更加愉悦和难忘。我们致力于追求卓越，为客人提供最完美的体验。\
						\n\n我们也非常注重诚信待客，始终以诚信为本，为每位客人提供公平、透明的服务。无论您是商务出差还是旅游度假，我们都会全力以赴为您提供最好的服务和体验。",
						tag: ["tag1", "tag2"],
						picUrl: ["/static/logo.png"],
					}
				]
			}
		},
		methods: {
			search(res) {
							uni.showToast({
								title: '搜索：' + res.value,
								icon: 'none'
							})
						},
			input(res) {
							console.log('----input:', res)
						},
			clear(res) {
							uni.showToast({
								title: 'clear事件，清除值为：' + res.value,
								icon: 'none'
							})
						},
			cancel(res) {
							uni.showToast({
								title: '点击取消，输入值为：' + res.value,
								icon: 'none'
							})
						},
			onBackPress() {
						plus.key.hideSoftKeybord();
					},
			
			newForum() {
				console.log("creating new forum");
				// create a new forum
			},
			
			onClick(item) {
				const dataObj = {
						ani_name: item.ani_name,
						title: item.title,
						content: item.content,
						tag: item.tag,
						picUrl: item.picUrl,
						is_help: item.is_help
					};
				uni.navigateTo({
					url: "/pages/specificArchive/specificArchive?dataObj=" + encodeURIComponent(JSON.stringify(dataObj))
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
	  
	  .demo-uni-row {
	  		margin-bottom: 10px;
	  

	  		display: block;

	  	}
	  

	  	::v-deep .uni-row {
	  		margin-bottom: 10px;
	  	}
	  

	  
	  	.demo-uni-col {
	  		height: 36px;
	  		border-radius: 5px;
	  	}
	  
	  	.dark_deep {
	  		background-color: #99a9bf;
	  	}
	  
	  	.dark {
	  		background-color: #d3dce6;
	  	}
	  
	  	.light {
	  		background-color: #e5e9f2;
	  	}
	

</style>
