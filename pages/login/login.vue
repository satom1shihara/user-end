<template>
		  <view class="my-container">
			  <image class="bg-img" src="/static/loginbg.png" mode="scaleToFill"></image>
			<!-- 用户未登录 -->
			<block>
				<image class=" avatar-img animation-fade" :style="[{animationDelay: '0.1s'}]" src="/static/frontPage.png" mode="scaleToFill" />
				<view class="animation-reverse text-xl margin-top" :style="[{animationDelay: '0.1s'}]">欢迎来到小动物信息交流平台</view>
				
				<view class="cu-form-group margin-top  shadow-warp" :class="[shape=='round'?'round':'']">
					<view class="title"><text class="cuIcon-people margin-right-xs"></text>手机号:</view>
					<input placeholder="请输入手机号" name="input" v-model="this.phone_number" />
				</view>
				
				<view class="cu-form-group margin-top shadow-warp" :class="[shape=='round'?'round':'']">
					<view class="title"><text class="cuIcon-lock margin-right-xs"></text>密码:</view>
					<input class="uni-input" placeholder="请输入密码" :password="!showPassword" v-model="password" />
					<view class="action text-lg">
						<text :class="[showPassword ? 'cuIcon-attention' : 'cuIcon-attentionforbid']" @click="changePassword"></text>
					</view>
				</view>
				
				<!-- <view class="uni-form-item uni-column animation-scale-down" :style="[{animationDelay: '0.1s'}]">
					<input placeholder="请输入账号" v-model="this.phone_number" type="number" clearable />
				</view>
				<view class="uni-form-item uni-column animation-scale-down" :style="[{animationDelay: '0.1s'}]">
					<input placeholder="请输入密码" v-model="this.password"  clearable />
				</view> -->
				
			  <button class="bg-gradual-green login-btn animation-scale-up" :style="[{animationDelay: '0.1s'}]" type="primary" @click="submitLogin">登录</button>
			  <button class="bg-gradual-green login-btn animation-slide-bottom" :style="[{animationDelay: '0.1s'}]" type="primary" @click="submitRegister">注册</button>
			</block>
		  </view>
</template>

<script>

export default {
  name: 'my-login',
  data() {
    return {
		phone_number: "13942919766",
		password: "ssssss",
		showPassword: false
	};
  },
  methods: {
		submitLogin() {
			// uni.switchTab({
			// 	url: "/pages/myInfo/myInfo"
			// })	
			uni.request({
				url: "https://anitu2.2022martu1.cn:8080/api/user/login",
				data: {
					phone_number: this.phone_number,
					password: this.password
				},
				method: 'POST',
				success: (ret) => {
					if (ret.statusCode == 200) {
						uni.setStorageSync('token', ret.data.data.token);
						console.log("login in success!!!!")
						uni.switchTab({
							url: "/pages/myInfo/myInfo"
						})	
					} else {
						console.log(ret)
					}
				},
				fail: (ret) => {
					console.log(ret.errMsg)
					console.log("fail to connect!")
				}
			})
			
		},
		
		submitRegister() {
			uni.navigateTo({
				url: "/pages/register/register"
			})
		},
		
		changePassword() {
			this.showPassword = !this.showPassword
		}
  }
};
</script>

<style lang="scss" scoped>
.my-container {
	
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25%;
  .avatar-img {
    width: 200px;
    height: 150px;
  }
  .login-btn {
    margin-top: 5%;
    width: 85%;
  }
  .uni-column {
	  color: black;
	  margin-top: 5%;
	  width: 85%;
  }
  .bg-img {
	  position: fixed;
	      width: 100%;
	      height: 100%;
	      top: 0;
	      left: 0;
	      z-index: -1;
  }
}
</style>