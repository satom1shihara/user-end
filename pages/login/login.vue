<template>
  <view class="my-container">
    <!-- 用户未登录 -->
    <block>
		<image class="avatar avatar-img" src="/static//homepage.jpeg" mode="scaleToFill" />
		<view class="login-desc">欢迎来到小动物信息交流平台</view>
		<view class="uni-form-item uni-column">
	  		<input placeholder="请输入账号" v-model="this.phone_number" type="number" clearable />
		</view>
		<view class="uni-form-item uni-column">
			<input placeholder="请输入密码" v-model="this.password" type="number" clearable />
		</view>
      <button class="login-btn" type="primary" @click="submitLogin">登录</button>
	  <button class="login-btn" type="primary" @click="submitRegister">注册</button>
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
	};
  },
  methods: {
		submitLogin() {
			// uni.redirectTo({
			// 	url: "/pages/myInfo/myInfo"
			// })	
			uni.request({
				url: "http://114.116.211.142:8080/api/user/login",
				data: {
					phone_number: this.phone_number,
					password: this.password
				},
				method: 'POST',
				success: (ret) => {
					if (ret.statusCode == 200) {
						uni.setStorageSync('token', ret.data.data.token);
						uni.redirectTo({
							url: "/pages/myInfo/myInfo"
						})	
					} else {
						console.log("wrong phone number or password, please try again~")
					}
				},
				fail: (ret) => {
					console.log("fail to connect!")
				}
			})
			
		},
		
		submitRegister() {
			uni.navigateTo({
				url: "/pages/register/register"
			})
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
  .login-desc {
    color: grey;
    font-size: medium;
    margin-top: 5%;
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
}
</style>