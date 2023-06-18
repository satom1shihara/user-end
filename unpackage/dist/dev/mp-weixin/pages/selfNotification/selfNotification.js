"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
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
    };
  },
  onLoad: function() {
    this.renewPage();
  },
  methods: {
    renewPage() {
      this.text_list = [];
      common_vendor.index.request({
        url: "https://anitu2.2022martu1.cn:8080/api/notice/table",
        data: {
          page: 1,
          limit: 100,
          sort: "created_at"
        },
        header: {
          "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
        },
        method: "GET",
        success: function(res) {
          if (res.statusCode == 200) {
            console.log(res.data.data.notices);
            var notices = res.data.data.notices;
            this.text_list.push(this.baseNotice);
            if (notices != null) {
              for (let i = 0; i < notices.length; i++) {
                var notice = {
                  title: "",
                  text: "",
                  time: ""
                };
                notice.title = notices[i].title;
                notice.text = notices[i].content;
                notice.time = notices[i].time.substring(0, 10) + " " + notices[i].time.substring(11, 19);
                this.text_list.push(notice);
              }
            }
          } else {
            common_vendor.index.showToast({
              title: res.errMsg,
              duration: 1e3
            });
            console.log(res.errMsg);
          }
        }.bind(this)
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_notice_bar2 + _easycom_uni_section2)();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_notice_bar + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(this.text_list, (item, k0, i0) => {
      return {
        a: "c423e950-1-" + i0 + "," + ("c423e950-0-" + i0),
        b: common_vendor.p({
          ["show-icon"]: true,
          color: "#2979FF",
          ["background-color"]: "#EAF2FF",
          text: item.text
        }),
        c: "c423e950-0-" + i0,
        d: common_vendor.p({
          title: item.title,
          type: "line",
          ["sub-title"]: item.time
        })
      };
    }),
    b: common_vendor.s({
      animationDelay: "0.4s"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/user-end/user-end/pages/selfNotification/selfNotification.vue"]]);
wx.createPage(MiniProgramPage);
