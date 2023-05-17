"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      user_id: 1,
      user_name: "asja",
      avatar_url: "/user/default.png",
      phone_number: "1231245"
    };
  },
  onLoad: function(options) {
    this.renewPage();
  },
  onPullDownRefresh: function() {
    console.log("refresh");
    setTimeout(function() {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
    this.renewPage();
  },
  methods: {
    renewPage() {
      common_vendor.index.request({
        url: "https://anitu2.2022martu1.cn:8080/api/user/info",
        data: {},
        header: {
          "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
        },
        method: "GET",
        success: (ret) => {
          if (ret.statusCode == 200) {
            let info = ret.data.data.user;
            common_vendor.index.setStorageSync("user_id", info.user_id);
            this.user_id = info.user_id;
            this.user_name = info.user_name;
            this.phone_number = info.phone_number;
            this.avatar_url = "https://anitu2.2022martu1.cn" + info.avatar;
          } else {
            console.log(ret.errMsg);
          }
        },
        fail: (ret) => {
          console.log("fail to connect!");
        }
      });
    },
    changeAvatar() {
      common_vendor.index.chooseImage({
        success: (chooseImageRes) => {
          chooseImageRes.tempFilePaths;
          common_vendor.index.uploadFile({
            url: "https://anitu2.2022martu1.cn:8080/api/pic/upload",
            filePath: chooseImageRes.tempFilePaths[0],
            name: "pic",
            header: {
              "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
            },
            formData: {
              "opt": 2
            },
            success: (uploadFileRes) => {
              if (uploadFileRes.statusCode == 200) {
                console.log(uploadFileRes.data);
                let obj = JSON.parse(uploadFileRes.data);
                this.updateUrl(obj.path);
              } else {
                console.log(uploadFileRes);
              }
            }
          });
        }
      });
    },
    updateUrl(options) {
      common_vendor.index.request({
        url: "https://anitu2.2022martu1.cn:8080/api/user/update/avatar",
        data: {
          "user_id": common_vendor.index.getStorageSync("user_id"),
          "new_avatar": options
        },
        header: {
          "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
        },
        method: "POST",
        success: (res) => {
          common_vendor.index.showToast({
            title: "修改成功",
            duration: 1e3
          });
        }
      });
    },
    showNotifications() {
      common_vendor.index.navigateTo({
        url: "/pages/selfNotification/selfNotification"
      });
    },
    showPosts() {
      common_vendor.index.navigateTo({
        url: "/pages/selfForum/selfForum"
      });
    },
    showAdoptions() {
      common_vendor.index.navigateTo({
        url: "/pages/selfArchive/selfArchive"
      });
    },
    logout() {
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.avatar_url,
    b: common_vendor.t(this.user_name),
    c: common_vendor.s({
      animationDelay: "0.2s"
    }),
    d: common_vendor.t(this.phone_number),
    e: common_vendor.s({
      animationDelay: "0.2s"
    }),
    f: common_vendor.s({
      animationDelay: "0.4s"
    }),
    g: common_vendor.o(($event) => $options.changeAvatar()),
    h: common_vendor.s({
      animationDelay: "0.4s"
    }),
    i: common_vendor.o(($event) => $options.showNotifications()),
    j: common_vendor.s({
      animationDelay: "0.4s"
    }),
    k: common_vendor.o(($event) => $options.showPosts()),
    l: common_vendor.s({
      animationDelay: "0.4s"
    }),
    m: common_vendor.o(($event) => $options.showAdoptions()),
    n: common_vendor.s({
      animationDelay: "0.4s"
    }),
    o: common_vendor.o(($event) => $options.logout())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/user-end/user-end/pages/myInfo/myInfo.vue"]]);
wx.createPage(MiniProgramPage);
