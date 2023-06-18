<template>
	<view>
		<uni-section title="在这里填写你的申请" type="line">
			<view class="example">
						<uni-section class="mb-10" :title="'想要的小动物: ' + this.ani_name" >
						</uni-section>	
						
						<uni-forms ref="baseForm" >
							<image class="round" :src="'https://anitu2.2022martu1.cn' + this.picUrl" mode="aspectFill" style="text-align: center;"></image>
							<uni-forms-item label="申请理由" required>
								<uni-easyinput type="textarea" v-model="this.content" placeholder="请输入申请理由,在宿舍养小动物请先向宿管申请哦" />
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
				content: "",
				picUrl: ""
			}
		},
		
		onLoad(option) {
			let dataObj = JSON.parse(decodeURIComponent(option.dataObj));
			console.log(dataObj)
			this.ani_name = dataObj.ani_name;
			console.log(this.ani_name)
			this.id = dataObj.id;
			this.picUrl = dataObj.picUrl
		},
		methods: {
			submitForm() {
				if (this.content == "") {
					uni.showToast({
						title: '请填写完整哦',
						icon:'error',
						duration: 1000
					})
				} else {
					uni.request({
						url: "https://anitu2.2022martu1.cn:8080/api/animal/adopt",
						data: {
							animal_id: this.id,
							user_id: uni.getStorageSync('user_id'),
							content: this.content
						},
						method: 'POST',
						header: {
							'Authorization': "Bearer " + uni.getStorageSync('token'),
						},
						success: function(ret) {
							if (ret.statusCode == 200) {
								uni.navigateBack()
								uni.showToast({
									title: '领养申请成功',
									icon:'success',
									duration: 1000
								})
							} else {
								console.log(ret.data)
							}
						}.bind(this),
						fail: (ret) => {
							console.log("fail to connect!")
						}
					})
				}
			}
		}
	}
</script>

<style>

</style>
