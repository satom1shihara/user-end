<template>
	<view>			
			<uni-card :title="this.ani_name" :sub-title="this.title">
				
				<div class="list-container">
				  <ul style="list-style: none;">

							<uni-icons type="fire-filled" size="20"></uni-icons>
							<li v-for="(it, index) in this.tag" style="display: inline-block; margin: 5px;"> {{it}} </li>


				  </ul>
				</div>
				
				<p class="content"> {{this.content}} </p>
				
				<div v-for="(it, index) in this.picUrl">
					<img :src="it" style="text-align: center; height: 200px; width: 200px;">
				</div>
				
				<view slot="actions" class="card-actions">
					<button type="default" @click="want(item)">
						想要ta~
						<uni-icons type="heart-filled" size="20"></uni-icons>
					</button>
				</view>

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
				gutter: 0,
				nvueWidth: 730,
				searchValue: "",
				ani_name: "ani_name",
				title: "title",
				content: "尊敬的客人，非常感谢您选择牛魔酬宾酒店。我们一直以来都以提供一流的服务和舒适的住宿环境为己任，让每位客人都能够感受到家一般的温馨和舒适。\
				\n\n在这里，您可以享受到最优质的客房和设施，我们的工作人员将竭尽所能为您提供优质的服务，让您的旅途更加愉悦和难忘。我们致力于追求卓越，为客人提供最完美的体验。\
				\n\n我们也非常注重诚信待客，始终以诚信为本，为每位客人提供公平、透明的服务。无论您是商务出差还是旅游度假，我们都会全力以赴为您提供最好的服务和体验。",
				tag: ["tag1", "tag2"],
				picUrl: ["/static/logo.png"],
			}
		},
		onLoad: function (options) {
			let dataObj = JSON.parse(decodeURIComponent(options.dataObj));
			this.ani_name = dataObj.ani_name;
			this.title = dataObj.title;
			this.content = dataObj.content;
			this.tags = dataObj.tags;
			this.picUrl = dataObj.picUrl;
			this.getAllcomments();
		},
		methods: {
			getAllcomments() {
				// TODO send ID to back-end and get all comments
			},
			
			want(item) {
				const dataObj = {
						ani_name: this.ani_name
					};
				uni.navigateTo({
					url: "/pages/createApply/createApply?dataObj=" + encodeURIComponent(JSON.stringify(dataObj))
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
