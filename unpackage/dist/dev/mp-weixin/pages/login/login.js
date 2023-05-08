"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-login",
  data() {
    return {
      phone_number: "13942919766",
      password: "ssssss"
    };
  },
  methods: {
    submitLogin() {
      common_vendor.index.request({
        url: "http://114.116.211.142:8080/api/user/login",
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
            console.log("redirect success");
          } else {
            console.log(ret);
            console.log("wrong phone number or password, please try again~");
          }
        },
        fail: (ret) => {
          console.log("fail to connect!");
        }
      });
    },
    submitRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: this.phone_number,
    b: common_vendor.o(($event) => this.phone_number = $event.detail.value),
    c: this.password,
    d: common_vendor.o(($event) => this.password = $event.detail.value),
    e: common_vendor.o((...args) => $options.submitLogin && $options.submitLogin(...args)),
    f: common_vendor.o((...args) => $options.submitRegister && $options.submitRegister(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"], ["__file", "E:/user-end/user-end/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
