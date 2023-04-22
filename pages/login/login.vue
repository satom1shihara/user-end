<template>
  <view class="my-container">
    <!-- 用户未登录 -->
    <block>
		<image class="avatar avatar-img" src="/static/logo.png" mode="scaleToFill" />
		<view class="login-desc">欢迎来到小动物信息交流平台</view>
		<view class="uni-form-item uni-column">
	  		<input placeholder="请输入账号" v-model="value" type="number" clearable />
		</view>
		<view class="uni-form-item uni-column">
			<input placeholder="请输入密码" v-model="value" type="number" clearable />
		</view>
      <button class="login-btn" type="primary" @click="submitLogin">登录</button>
    </block>
  </view>
</template>

<script>
export default {
  name: 'my-login',
  data() {
    return {
		
	};
  },
  methods: {
		submitLogin() {
			uni.redirectTo({
				url: "/pages/myInfo/myInfo"
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
    width: 78px;
    height: 78px;
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