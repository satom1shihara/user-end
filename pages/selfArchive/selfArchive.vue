<template>
	<view>
		<ul>
			<div v-for="(item, index) in block">
				<uni-section title="" type="line">				
					<uni-card :title="item.ani_name" :is-shadow="false" :extra="item.status" >
						<text class="uni-body"> {{item.content}}</text>
					</uni-card>
				</uni-section>
			</div>
		</ul>
	</view>
</template>

<script>
	export default {
		
		onPullDownRefresh: function() {
			this.renewPage()
		},
		
		onLoad: function () {
			this.renewPage()
		},
		
		data() {
			return {
				block: [
					{
						ani_name: "",
						adopt_id: 1,
						animal_id: 1,
						content: "sdasdsadsadsdsdsdsadasd",
						status: "",
						user_id: 1
					},
					{
						ani_name: "",
						adopt_id: 1,
						animal_id: 1,
						content: "sdasdsadsadsdsdsdsadasd",
						status: "",
						user_id: 1
					},
					{
						ani_name: "",
						adopt_id: 1,
						animal_id: 1,
						content: "sdasdsadsadsdsdsdsadasd",
						status: "",
						user_id: 1
					},
				]
			}
		},
		methods: {
			renewPage() {
				uni.request({
					url: "https://anitu2.2022martu1.cn:8080/api/animal/adopt/table",
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
							let info = res.data.data.adopts
							this.block = []
							for (let i = 0; i < info.length - 1; i++) {
								let post = {
									ani_name: "",
									adopt_id: 1,
									animal_id: 1,
									content: "sdasdsadsadsdsdsdsadasd",
									status: 0,
									user_id: 1
								}
								post.ani_name = info[i].animal_name
								post.title = info[i].title
								post.adopt_id = info[i].adopt_id
								post.animal_id = info[i].animal_id
								post.status = info[i].status == 0 ? "未领养" : "已经领养"
								console.log(post)
								// if (post.status == 0 || post.status == 1) continue
								if (info[i].user_id != uni.getStorageSync('user_id')) continue
								this.block.push(post)
							}
							// console.log(this.block)
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
	

</style>
