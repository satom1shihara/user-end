<template>
	<view>
		
		<view v-if="this.block == '' ">
			
			<view class="cu-card case bg-white padding-bottom animation-slide-top" :style="[{animationDelay: '0.4s'}]" :class="'no-card'">
					<view class="shadow">
						<view class="image" style="background:url(https://anitu2.2022martu1.cn/match/bgpic.png)no-repeat center center;height: 150px;background-size: 100% 100%;">
							<view class="flex justify-between">
								<view class="padding-sm margin-xsradius ">
									<view class="text-white text-center text-xl">去档案馆看看有没有喜欢的小动物吧~</view>
								</view>
							</view>
						</view>
					</view>
				</view>
		</view>
		<view v-else>
			<div v-for="(item, index) in block">
				<uni-section title="" type="line">				
					<uni-card :title="item.ani_name" :is-shadow="false" :extra="item.status" >
						<text class="uni-body"> {{item.content}}</text>
					</uni-card>
				</uni-section>
			</div>
		</view>
	</view>
</template>

<script>
	export default {
		
		onPullDownRefresh: function() {
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
			this.renewPage()
		},
		
		onLoad: function () {
			this.renewPage()
		},
		
		data() {
			return {
				block: [
					// {
					// 	ani_name: "",
					// 	adopt_id: 1,
					// 	animal_id: 1,
					// 	content: "sdasdsadsadsdsdsdsadasd",
					// 	status: "",
					// 	user_id: 1
					// },
					// {
					// 	ani_name: "",
					// 	adopt_id: 1,
					// 	animal_id: 1,
					// 	content: "sdasdsadsadsdsdsdsadasd",
					// 	status: "",
					// 	user_id: 1
					// },
					// {
					// 	ani_name: "",
					// 	adopt_id: 1,
					// 	animal_id: 1,
					// 	content: "sdasdsadsadsdsdsdsadasd",
					// 	status: "",
					// 	user_id: 1
					// },
				]
			}
		},
		methods: {
			renewPage() {
				this.block = []
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
							
							for (let i = 0; i < info.length; i++) {
								let post = {
									ani_name: "",
									adopt_id: 1,
									animal_id: 1,
									content: "",
									status: 0,
									user_id: 1
								}
								post.ani_name = info[i].animal_name
								post.title = info[i].title
								post.adopt_id = info[i].adopt_id
								post.animal_id = info[i].animal_id
								post.status = info[i].status == 0 ? "领养失败" : "领养成功"
								console.log(post)
								// if (post.status == 0 || post.status == 1) continue
								if (info[i].user_id != uni.getStorageSync('user_id')) continue
								if (info[i].status == 0) {
									post.content = "没有通过审核哦qwq，提供更完善的信息可以提高审核的成功率哦~"
								} else {
									post.content = "恭喜你通过审核：），享受和新宠物的每一天哦~"
								}
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
