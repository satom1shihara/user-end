<template>
	<view>
		<ul>
			<div v-for="(item, index) in block">
				<uni-section title="" type="line">				
					<uni-card title="小动物名称" :is-shadow="false" :extra="item.time" :sub-title="item.ani_name">
						<text class="uni-body"> {{item.content}}</text>
					</uni-card>
				</uni-section>
			</div>
		</ul>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				block: [
					{
						ani_name: "ani_name",
						time: "2023.12.31",
						content: "asdfas fasdgasfaskdfhaslkjhflasfjr"
					},
					{
						ani_name: "ani_name",
						time: "2023.12.31",
						content: "asdfas fasdgasfaskdfhaslkjhflasfjr"
					},
					{
						ani_name: "ani_name",
						time: "2023.12.31",
						content: "asdfas fasdgasfaskdfhaslkjhflasfjr"
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	

</style>
