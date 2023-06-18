<template>
	<view>
		
				<view class="animation-slide-bottom"  :style="[{animationDelay: '0.4s'}]">
					<div v-for="item in this.text_list" class="shadow-warp">
						
						<uni-section :title="item.title" type="line" :sub-title="item.time">
							<uni-notice-bar  show-icon  color="#2979FF" background-color="#EAF2FF" :text="item.text">
							</uni-notice-bar>
						</uni-section>
					</div>
				</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: new Date().toISOString(),
				baseNotice: {
					title: "通知",
					text: "欢迎来到流浪小动物管理平台",
					time: "2023-5-21 00:00:00"
				},
				text_list: [
					// {
					// 	title: "通知",
					// 	text: "欢迎来到流浪小动物管理平台",
					// 	time: "2023-5-28"
					// },
					// {
					// 	title: "通知",
					// 	text: "欢迎来到流浪小动物管理平台",
					// 	time: "2023-1-23"
					// }
				]
			}
		},
		
		onLoad: function () {
			this.renewPage()
		},
		
		methods: {
			renewPage() {
				this.text_list = []
				uni.request({
					url: "https://anitu2.2022martu1.cn:8080/api/notice/table",
					data: {
						page: 1,
						limit: 100,
						sort: "created_at"	
					},
					header: {
						'Authorization': "Bearer " + uni.getStorageSync('token'),
					},
					method: 'GET',
					success: function(res) {
						if (res.statusCode == 200) {
							console.log(res.data.data.notices)
							var notices = res.data.data.notices
							this.text_list.push(this.baseNotice)
							if (notices != null) {
								for (let i = 0; i < notices.length; i++) {
									var notice = {
										title: "",
										text: "",
										time: ""
									}
									notice.title = notices[i].title
									notice.text = notices[i].content
									notice.time = notices[i].time.substring(0, 10) + ' ' + notices[i].time.substring(11, 19)
									this.text_list.push(notice)
								}
							} 
						} else {
							uni.showToast({
								title: res.errMsg,
								duration: 1000
							})
							console.log(res.errMsg)
						}
					}.bind(this),
				});
			}
		}
	}
</script>

<style>

</style>
