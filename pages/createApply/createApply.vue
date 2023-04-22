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
				baseFormData: {
					user_name: "",
					content: "",
				}
			}
		},
		
		onLoad(option) {
			let dataObj = JSON.parse(decodeURIComponent(option.dataObj));
			this.ani_name = dataObj.ani_name;
		},
		methods: {
			submitForm() {
				console.log(this.baseFormData)
			}
		}
	}
</script>

<style>

</style>
