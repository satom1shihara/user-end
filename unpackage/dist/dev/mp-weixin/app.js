"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/forum/forum.js";
  "./pages/archive/archive.js";
  "./pages/myInfo/myInfo.js";
  "./pages/selfForum/selfForum.js";
  "./pages/selfNotification/selfNotification.js";
  "./pages/selfArchive/selfArchive.js";
  "./pages/specificForum/specificForum.js";
  "./pages/specificArchive/specificArchive.js";
  "./pages/createForum/createForum.js";
  "./pages/createApply/createApply.js";
  "./pages/register/register.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/user-end/user-end/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
