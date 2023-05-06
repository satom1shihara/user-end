"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  computed: {
    checkPassword() {
      return this.baseFormData.password == this.baseFormData.repeatPassword ? false : true;
    }
  },
  data() {
    return {
      baseFormData: {
        user_name: "",
        phone_number: "",
        password: "",
        repeatPassword: "",
        email: ""
      }
    };
  },
  methods: {
    submitForm() {
      common_vendor.index.request({
        url: "http://114.116.211.142:8080/api/user/register",
        data: this.baseFormData,
        method: "POST",
        success: (ret) => {
          if (ret.statusCode == 200) {
            common_vendor.index.redirectTo({
              url: "/pages/login/login"
            });
          } else {
            console.log(ret.data);
          }
        },
        fail: (ret) => {
          console.log("fail to connect!");
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_section2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.baseFormData.user_name = $event),
    b: common_vendor.p({
      placeholder: "请输入用户名",
      modelValue: $data.baseFormData.user_name
    }),
    c: common_vendor.p({
      label: "用户名",
      required: true
    }),
    d: common_vendor.o(($event) => $data.baseFormData.phone_number = $event),
    e: common_vendor.p({
      placeholder: "请输入电话号码",
      modelValue: $data.baseFormData.phone_number
    }),
    f: common_vendor.p({
      label: "电话号码",
      required: true
    }),
    g: common_vendor.o(($event) => $data.baseFormData.password = $event),
    h: common_vendor.p({
      placeholder: "请输入密码",
      modelValue: $data.baseFormData.password
    }),
    i: common_vendor.p({
      label: "密码",
      required: true
    }),
    j: common_vendor.o(($event) => $data.baseFormData.repeatPassword = $event),
    k: common_vendor.p({
      placeholder: "请再次输入密码",
      modelValue: $data.baseFormData.repeatPassword
    }),
    l: common_vendor.p({
      label: "重复密码",
      required: true
    }),
    m: common_vendor.o(($event) => $data.baseFormData.email = $event),
    n: common_vendor.p({
      placeholder: "请输入邮箱",
      modelValue: $data.baseFormData.email
    }),
    o: common_vendor.p({
      label: "邮箱",
      required: true
    }),
    p: common_vendor.sr("baseForm", "20b21ad8-1,20b21ad8-0"),
    q: common_vendor.p({
      modelValue: $data.baseFormData
    }),
    r: common_vendor.p({
      title: "在这里填写你的注册信息",
      type: "line"
    }),
    s: common_vendor.o(($event) => $options.submitForm()),
    t: this.checkPassword
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/user-end/user-end/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
