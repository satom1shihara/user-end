<template>
	<view>			
			<uni-card :title="this.name" :extra="this.sex">
				
				<p class="content"> {{this.content}} </p>
				
				<div v-for="(it, index) in this.picUrl">
					<img :src="it" style="text-align: center; height: 200px; width: 200px;">
				</div>
				
				<view slot="actions" class="card-actions">
					<button type="default" @click="want(item)" :disabled="this.status">
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
				id: 0,
				sex: "",
				content: "",
				name: "",
				picUrl: [],
				status: false,	
			}
		},
		onLoad: function (options) {
			let dataObj = JSON.parse(decodeURIComponent(options.dataObj));
			this.id = dataObj.id
			this.sex = dataObj.sex == 0 ? "雌性" : "雄性"
			this.content = dataObj.content
			this.name = dataObj.name
			this.picUrl = dataObj.picUrl
			this.status = dataObj.status == 0 ? false : true
		},
		
		methods: {
			
			want(item) {
				const dataObj = {
					ani_name: this.ani_name,
					id: this.id
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
