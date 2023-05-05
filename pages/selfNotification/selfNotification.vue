<template>
	<template>
		<view class="container">
			<div v-for="item in text_list">
				<uni-section :title="item.title" type="line" :sub-title="dateFormat(date)">
					<uni-notice-bar :text="item.text" />
				</uni-section>
			</div>
		</view>
	</template>
</template>

<script>
	export default {
		data() {
			return {
				date: new Date().toISOString(),
				text_list: [
					{
						title: "通知",
						text: "欢迎来到流浪小动物管理平台"
					}
				]
			}
		},
		
		
		methods: {
			dateFormat(time) {
				    let date = new Date(time);
				    let year = date.getFullYear();
				    // 在日期格式中，月份是从0开始的，因此要加0，使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
				    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				    let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				    // 拼接
				    return year + "年" + month + "月" + day + "日" + hours + ":" + minutes + ":" + seconds;
				    // return year + "-" + month + "-" + day;
				},
		}
	}
</script>

<style>

</style>
