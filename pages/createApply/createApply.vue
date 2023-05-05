<template>
	<view>
		<uni-section title="在这里填写你的申请" type="line">
			<view class="example">
						<uni-section class="mb-10" title="想要的动物名称">
										<template v-slot:right>
											<p> {{this.ani_name}} </p>
										</template>
						</uni-section>	
						
						<uni-forms ref="baseForm" :modelValue="baseFormData">
							<uni-forms-item label="姓名" required>
								<uni-easyinput v-model="baseFormData.user_name" placeholder="请输入姓名" />
							</uni-forms-item>
							<uni-forms-item label="申请理由" required>
								<uni-easyinput type="textarea" v-model="baseFormData.content" placeholder="请输入申请理由" />
							</uni-forms-item>
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
				ani_name: "",
				id: 0,
				baseFormData: {
					user_name: "",
					content: "",
				}
			}
		},
		
		onLoad(option) {
			let dataObj = JSON.parse(decodeURIComponent(option.dataObj));
			this.ani_name = dataObj.ani_name;
			this.id = dataObj.id;
		},
		methods: {
			submitForm() {
				console.log(this.baseFormData)
				
				uni.request({
					url: "http://114.116.211.142:8080/api/animal/adopt",
					data: {
						animal_id: this.id,
						user_id: uni.getStorageSync('user_id'),
						content: this.content
					},
					method: 'POST',
					header: {
						'Authorization': "Bearer " + uni.getStorageSync('token'),
					},
					success: (ret) => {
						if (ret.statusCode == 200) {
							uni.navigateBack()
							uni.showToast({
								title: '领养申请成功成功',
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
