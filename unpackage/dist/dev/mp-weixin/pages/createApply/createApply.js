"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      ani_name: "",
      id: 0,
      baseFormData: {
        user_name: "",
        content: ""
      }
    };
  },
  onLoad(option) {
    let dataObj = JSON.parse(decodeURIComponent(option.dataObj));
    this.ani_name = dataObj.ani_name;
    this.id = dataObj.id;
  },
  methods: {
    submitForm() {
      console.log(this.baseFormData);
      common_vendor.index.request({
        url: "https://anitu2.2022martu1.cn:8080/api/animal/adopt",
        data: {
          animal_id: this.id,
          user_id: common_vendor.index.getStorageSync("user_id"),
          content: this.content
        },
        method: "POST",
        header: {
          "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
        },
        success: (ret) => {
          if (ret.statusCode == 200) {
            common_vendor.index.navigateBack();
            common_vendor.index.showToast({
              title: "领养申请成功成功",
              duration: 1e3
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
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_section2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(this.ani_name),
    b: common_vendor.p({
      title: "想要的动物名称"
    }),
    c: common_vendor.o(($event) => $data.baseFormData.user_name = $event),
    d: common_vendor.p({
      placeholder: "请输入姓名",
      modelValue: $data.baseFormData.user_name
    }),
    e: common_vendor.p({
      label: "姓名",
      required: true
    }),
    f: common_vendor.o(($event) => $data.baseFormData.content = $event),
    g: common_vendor.p({
      type: "textarea",
      placeholder: "请输入申请理由",
      modelValue: $data.baseFormData.content
    }),
    h: common_vendor.p({
      label: "申请理由",
      required: true
    }),
    i: common_vendor.sr("baseForm", "6c97e79e-2,6c97e79e-0"),
    j: common_vendor.p({
      modelValue: $data.baseFormData
    }),
    k: common_vendor.p({
      title: "在这里填写你的申请",
      type: "line"
    }),
    l: common_vendor.o(($event) => $options.submitForm())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/user-end/user-end/pages/createApply/createApply.vue"]]);
wx.createPage(MiniProgramPage);
