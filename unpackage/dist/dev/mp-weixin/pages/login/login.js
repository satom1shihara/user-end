"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-login",
  data() {
    return {
      phone_number: "13942919766",
      password: "ssssss",
      showPassword: false
    };
  },
  methods: {
    submitLogin() {
      common_vendor.index.request({
        url: "https://anitu2.2022martu1.cn:8080/api/user/login",
        data: {
          phone_number: this.phone_number,
          password: this.password
        },
        method: "POST",
        success: (ret) => {
          if (ret.statusCode == 200) {
            common_vendor.index.setStorageSync("token", ret.data.data.token);
            console.log("login in success!!!!");
            common_vendor.index.switchTab({
              url: "/pages/myInfo/myInfo"
            });
          } else {
            console.log(ret);
          }
        },
        fail: (ret) => {
          console.log(ret.errMsg);
          console.log("fail to connect!");
        }
      });
    },
    submitRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    },
    changePassword() {
      this.showPassword = !this.showPassword;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s({
      animationDelay: "0.1s"
    }),
    b: common_vendor.s({
      animationDelay: "0.1s"
    }),
    c: this.phone_number,
    d: common_vendor.o(($event) => this.phone_number = $event.detail.value),
    e: common_vendor.n(_ctx.shape == "round" ? "round" : ""),
    f: !$data.showPassword,
    g: $data.password,
    h: common_vendor.o(($event) => $data.password = $event.detail.value),
    i: common_vendor.n($data.showPassword ? "cuIcon-attention" : "cuIcon-attentionforbid"),
    j: common_vendor.o((...args) => $options.changePassword && $options.changePassword(...args)),
    k: common_vendor.n(_ctx.shape == "round" ? "round" : ""),
    l: common_vendor.s({
      animationDelay: "0.1s"
    }),
    m: common_vendor.o((...args) => $options.submitLogin && $options.submitLogin(...args)),
    n: common_vendor.s({
      animationDelay: "0.1s"
    }),
    o: common_vendor.o((...args) => $options.submitRegister && $options.submitRegister(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"], ["__file", "E:/user-end/user-end/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
