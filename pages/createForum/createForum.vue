<template>
	<view>
		<uni-section title="在这里编写你的帖子" type="line">
			<view class="example">
						<uni-forms ref="baseForm" :modelValue="baseFormData">
							<uni-forms-item label="姓名" required>
								<uni-easyinput v-model="baseFormData.user_name" placeholder="请输入姓名" />
							</uni-forms-item>
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
							
							<uni-file-picker limit="9" title="最多选择9张图片"></uni-file-picker>
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
				baseFormData: {
					user_name: "",
					title: "",
					content: "",
					tag: [],
					is_help: true,
					picUrl: []
				},
				isHelp: [
					{
						text: "是",
						value: true
					},
					{
						text: "否",
						value: false
					}
				]
				
			}
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
