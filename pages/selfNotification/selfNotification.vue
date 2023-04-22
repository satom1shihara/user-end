<template>
	<template>
		<view class="container">
			<uni-card is-full :is-shadow="false">
				<text class="uni-h6">通告栏组件多用于系统通知，广告通知等场景，可自定义图标，颜色，展现方式等。</text>
			</uni-card>
			<div v-for="item in text_list">
				<uni-section :title="item.title" type="line">
					<uni-notice-bar :text="item.text" />
					<uni-notice-bar :text="item.time" font-size="10px" />
				</uni-section>
			</div>
		</view>
	</template>
</template>

<script>
	export default {
		data() {
			return {
				text_list: [
					{
						title: "通知",
						time: "12.12",
						text: "asdastqw"
					},
					{
						title: "通知",
						time: "1.23",
						text: "asggdsg"
					},
					{
						title: "通知",
						time: "2.24",
						text: "asdasasdghhtqw"
					},
					{
						title: "通知",
						time: "2.24",
						text: "asdasasdghhtqw"
					},
					{
						title: "通知",
						time: "2.24",
						text: "asdasasdghhtqw"
					},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
