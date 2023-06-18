<template>
	
	<view>
		<uni-row class="demo-uni-row" :gutter="gutter" :width="nvueWidth">
							<uni-col :span="20">
								<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @input="input"
									@cancel="cancel" @clear="clear">
								</uni-search-bar>
							</uni-col>
							<uni-col :span="4">
								<button class="mini-btn" type="default" size="mini" @click="open()" style="margin-top: 10px; height: 40px; width: 40px;">
									<uni-icons type="camera-filled" style="margin-left: -5px;"></uni-icons>	
								</button>
								
								<uni-popup ref="popup" :mask-click="false" background-color="#fff">
									<uni-section title="输入图片进行搜索" type="line">
										<uni-file-picker ref="files" :auto-upload="false" limit="1" title="最多选择1张图片" @select="this.uploadPic"></uni-file-picker>
										<uni-row uni-row class="demo-uni-row">
											<uni-col :span="12">
												<button @click="close">关闭</button>
											</uni-col>
											<uni-col :span="12">
												<button @click="ensure">确定</button>
											</uni-col>
										</uni-row>
										
									</uni-section>
								</uni-popup>
							</uni-col>
		</uni-row>
		
		
		<view class="cu-card case bg-white padding-bottom animation-slide-top" :style="[{animationDelay: '0.4s'}]" :class="'no-card'">
				<view class="shadow">
					<view class="image" style="background:url(https://anitu2.2022martu1.cn/match/bgpic.png)no-repeat center center;height: 150px;background-size: 100% 100%;">
						<view class="flex justify-between">
							<view class="padding-sm margin-xsradius ">
								<view class="text-white text-center text-xl">看看已经登记的小动物们吧~</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		
		<div v-for="(item, index) in block" class="demo-uni-row animation-slide-bottom" :style="[{animationDelay: '0.4s'}]">
			
			<uni-card padding="10px 0" >
				<view class="cu-list menu-avatar comment solids-top">
								<view class="cu-item">
									<view class="cu-avatar cuIcon-news">
									</view>
									<view class="content">
										<view class="text-grey">{{item.name}}</view>
									</view>
									<view class="content">
										<view class="text-grey margin-right-xs text-bold">{{item.type}}</view>
									</view>
								</view>
				</view>
				<image style="width: 100%;" :src="transformUrl(item.picUrl[0])" mode="aspectFill"></image>
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
				searchPic: "",
				nvueWidth: 730,
				searchValue: "",
				block: [
					
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
			uploadPic(e) {
				const tempFilePaths = e.tempFilePaths;
				const imgUrl=tempFilePaths[0]
				uni.uploadFile({
				        url: "https://anitu2.2022martu1.cn:8080/api/pic/upload",
				        filePath: imgUrl,
				        name: "pic",
				        header: {
				        	'Authorization': "Bearer " + uni.getStorageSync('token'),
				        	
				        },
				        formData: {
				        	"opt": 3
				        },
				        success: function(res) {
				        	if (res.statusCode == 200) {
				        		const data = JSON.parse(res.data)
				        		console.log(data.path)
				        		this.searchPic = data.path
								console.log(this.searchPic)
				        	} else {
				        		console.log(res.data)
				        	}
				        }.bind(this),
				});
			},
			transformUrl(url) {
				return "https://anitu2.2022martu1.cn" + url
			},
			search(res1) {
				uni.request({
					url: "https://anitu2.2022martu1.cn:8080/api/animal/search",
					data: {
						keyword: this.searchValue
					},
					header: {
						'Authorization': "Bearer " + uni.getStorageSync('token'),
						'Content-Type': "application/x-www-form-urlencoded",
					},
					
					method: 'GET',
					success: function(res) {
						if (res.statusCode == 200) {
							console.log(res.data)
							let info = res.data.data.animals
							this.block = []
							for (let i = 0; i < info.length; i++) {
								let post = {
									id: 0,
									sex: "",
									content: "",
									name: "",
									picUrl: [],
									type: "",
									status: 0,	
								}
								post.id = info[i].animal_id
								post.sex = info[i].animal_sex
								post.content = info[i].content
								post.name = info[i].animal_name
								post.status = info[i].status
								post.picUrl = info[i].pics
								post.type = info[i].animal_type
								console.log(post)
								this.block.push(post)
									
							}
							console.log(this.block)
						} else {
							console.log(res.errMsg)
						}
					}.bind(this),
					fail: (res) => {
						console.log("fail to connect!")
					}
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
					this.renewPage()
						},
			onBackPress() {
						plus.key.hideSoftKeybord();
					},
			
			newForum() {
				console.log("creating new forum");
				// create a new forum
			},
			
			onClick(item) {
				console.log(item)
				const dataObj = {
						id: item.id,
						sex: item.sex,
						content: item.content,
						name: item.name,
						picUrl: item.picUrl,
						type: item.type,
						status: item.status,	
					};
				uni.navigateTo({
					url: "/pages/specificArchive/specificArchive?dataObj=" + encodeURIComponent(JSON.stringify(dataObj))
				})
			},
			
			toggle(type) {
				 this.$refs.popup.open(type) 	
			},
			
			open() {
				this.$refs.popup.open('top')
			},
			close() {
				this.$refs.popup.close()
			},
			
			ensure() {
				console.log(this.searchPic)
				// send search pic to search
				uni.request({
					url: "https://anitu2.2022martu1.cn:8080/api/animal/similarity",
					data: {
						pic: this.searchPic
					},
					header: {
						'Authorization': "Bearer " + uni.getStorageSync('token'),
					},
					
					method: 'POST',
					success: function(res) {
						if (res.statusCode == 200) {
							console.log(res.data)
							console.log(res.data.data.animal)
							var info = res.data.data.animal
							// TODO: 
							const dataObj = {
									id: info.animal_id,
									sex: info.animal_sex,
									content: info.content,
									name: info.animal_name,
									picUrl: info.pics,
									type: info.animal_type,	
									status: info.status,	
								};
							uni.navigateTo({
								url: "/pages/specificArchive/specificArchive?dataObj=" + encodeURIComponent(JSON.stringify(dataObj))
							})
							uni.showToast({
								title: '找到最相近的小动物是：' + info.animal_name,
								icon: 'none',
								duration: 3000
							})
						} else {
							console.log(res.errMsg)
						}
					}.bind(this),
					fail: (res) => {
						console.log("fail to connect!")
					}
				})
			},
			
			renewPage() {
				uni.request({
					url: "https://anitu2.2022martu1.cn:8080/api/animal/table",
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
							let info = res.data.data.animals
							this.block = []
							for (let i = 0; i < info.length; i++) {
								let post = {
									id: 0,
									sex: "",
									content: "",
									name: "",
									picUrl: [],
									type: "",
									status: 0,	
								}
								post.id = info[i].animal_id
								post.sex = info[i].animal_sex
								post.content = info[i].content
								post.name = info[i].animal_name
								post.status = info[i].status
								post.picUrl = info[i].pics
								post.type = info[i].animal_type
								this.block.push(post)
									// console.log(post)
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
