"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      date: new Date().toISOString(),
      text_list: [
        {
          title: "通知",
          text: "欢迎来到流浪小动物管理平台"
        }
      ]
    };
  },
  methods: {
    dateFormat(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return year + "年" + month + "月" + day + "日" + hours + ":" + minutes + ":" + seconds;
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
    a: common_vendor.f($data.text_list, (item, k0, i0) => {
      return {
        a: "c423e950-1-" + i0 + "," + ("c423e950-0-" + i0),
        b: common_vendor.p({
          text: item.text
        }),
        c: "c423e950-0-" + i0,
        d: common_vendor.p({
          title: item.title,
          type: "line",
          ["sub-title"]: $options.dateFormat($data.date)
        })
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/user-end/user-end/pages/selfNotification/selfNotification.vue"]]);
wx.createPage(MiniProgramPage);
