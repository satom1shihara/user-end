<template>
	<view>
		<uni-section title="在这里编写你的帖子" type="line">
			<view class="example">
						<uni-forms ref="baseForm" :modelValue="baseFormData">	
							<uni-forms-item label="标题" required>
								<uni-easyinput type="textarea" v-model="baseFormData.title" placeholder="请输入标题" />
							</uni-forms-item>
							<uni-forms-item label="内容" required>
								<uni-easyinput type="textarea" v-model="baseFormData.content" placeholder="请输入内容" />
							</uni-forms-item>
							<uni-forms-item label="标签" required>
								<uni-easyinput type="textarea" v-model="baseFormData.tag" placeholder="请输入标签,标签之间使用逗号','隔开" />
							</uni-forms-item>
							<uni-forms-item label="求助" required>
								<uni-data-checkbox v-model="baseFormData.is_help" :localdata="isHelp" />
							</uni-forms-item>
						
							
							<button type="default" @click="handleSelect()">
								选择文件<uni-icons type="folder-add" size="20"></uni-icons>
							</button>
							
						</uni-forms>
				</view>
		</uni-section>
		
		<button type="primary" @click="submitForm()">提交</button>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				filesList: [],
				filePathList: [],
				baseFormData: {
					title: "",
					content: "",
					tag: [],
					picUrl: [],
					is_help: 0,
				},
				isHelp: [
					{
						text: "是",
						value: 1
					},
					{
						text: "否",
						value: 0
					},
				]
				
			}
		},
		methods: {

			handleSelect() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						for (let i = 0; i < chooseImageRes.tempFilePaths.length; i++) {
							console.log(chooseImageRes.tempFilePaths[i])
							uni.uploadFile({
								url: "https://anitu2.2022martu1.cn:8080/api/pic/upload",
								filePath: chooseImageRes.tempFilePaths[i],
								name: "pic",
								header: {
									'Authorization': "Bearer " + uni.getStorageSync('token'),
									
								},
								formData: {
									"opt": 0
								},
								success: function(res) {
									if (res.statusCode == 200) {
										const data = JSON.parse(res.data)
										console.log("data=" + data.path)
										this.baseFormData.picUrl.push(data.path)
									} else {
										console.log(res.data)
									}
								}.bind(this),
							})
						}
						
						
					}
				});
			},

			submitForm() {
				
				uni.request({
					url: "https://anitu2.2022martu1.cn:8080/api/post",
					data: {
								author_id: uni.getStorageSync('user_id'),
								title: this.baseFormData.title,
								content: this.baseFormData.content,
								tags: this.baseFormData.tag.split(","),
								pics: this.baseFormData.picUrl,
								is_help: this.baseFormData.is_help,
					},
					method: 'POST',
					header: {
						'Authorization': "Bearer " + uni.getStorageSync('token'),
						'Content-Type': "application/x-www-form-urlencoded",
					},
					success: (ret) => {
						if (ret.statusCode == 200) {
							uni.navigateBack()
							uni.showToast({
								title: '发布成功',
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
			}
		}
	}
</script>

<style>

</style>
