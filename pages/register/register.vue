<template>
	<view>
		<uni-section title="在这里填写你的注册信息" type="line">
			<view class="example">
				<uni-forms ref="baseForm" :modelValue="baseFormData">
									<uni-forms-item label="用户名" required>
										<uni-easyinput v-model="baseFormData.user_name" placeholder="请输入用户名" />
									</uni-forms-item>
									<uni-forms-item label="电话号码" required>
										<uni-easyinput v-model="baseFormData.phone_number" placeholder="请输入电话号码" />
									</uni-forms-item>
									<uni-forms-item label="密码" required>
										<uni-easyinput v-model="baseFormData.password" placeholder="请输入密码" />
									</uni-forms-item>
									<uni-forms-item label="重复密码" required>
										<uni-easyinput v-model="baseFormData.repeatPassword" placeholder="请再次输入密码" />
									</uni-forms-item>
									<uni-forms-item label="邮箱" required>
										<uni-easyinput v-model="baseFormData.email" placeholder="请输入邮箱" />
									</uni-forms-item>
					</uni-forms>
				</view>
		</uni-section>
		
		
		<button type="primary" @click="submitForm()" :disabled="this.checkPassword">提交</button>
	</view>
</template>

<script>
	export default {
		
		computed: {
			checkPassword() {
				return (this.baseFormData.password == this.baseFormData.repeatPassword) ? false : true
			}
		},
		data() {
			return {
				baseFormData: {
					user_name: "",
					phone_number: "",
					password: "",
					repeatPassword: "",
					email: ""
				},
			}
		},
		methods: {
			submitForm() {
				uni.request({
					url: "https://anitu2.2022martu1.cn:8080/api/user/register",
					data: this.baseFormData,
					method: 'POST',
					success: (ret) => {
						if (ret.statusCode == 200) {
							uni.redirectTo({
								url: "/pages/login/login"
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
	.example {
		padding: 15px;
		background-color: #fff;
	}
</style>
