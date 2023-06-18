"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      ani_name: "",
      id: 0,
      content: "",
      picUrl: ""
    };
  },
  onLoad(option) {
    let dataObj = JSON.parse(decodeURIComponent(option.dataObj));
    console.log(dataObj);
    this.ani_name = dataObj.ani_name;
    console.log(this.ani_name);
    this.id = dataObj.id;
    this.picUrl = dataObj.picUrl;
  },
  methods: {
    submitForm() {
      if (this.content == "") {
        common_vendor.index.showToast({
          title: "请填写完整哦",
          icon: "error",
          duration: 1e3
        });
      } else {
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
          success: function(ret) {
            if (ret.statusCode == 200) {
              common_vendor.index.navigateBack();
              common_vendor.index.showToast({
                title: "领养申请成功",
                icon: "success",
                duration: 1e3
              });
            } else {
              console.log(ret.data);
            }
          }.bind(this),
          fail: (ret) => {
            console.log("fail to connect!");
          }
        });
      }
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
    a: common_vendor.p({
      title: "想要的小动物: " + this.ani_name
    }),
    b: "https://anitu2.2022martu1.cn" + this.picUrl,
    c: common_vendor.o(($event) => this.content = $event),
    d: common_vendor.p({
      type: "textarea",
      placeholder: "请输入申请理由,在宿舍养小动物请先向宿管申请哦",
      modelValue: this.content
    }),
    e: common_vendor.p({
      label: "申请理由",
      required: true
    }),
    f: common_vendor.sr("baseForm", "6c97e79e-2,6c97e79e-0"),
    g: common_vendor.p({
      title: "在这里填写你的申请",
      type: "line"
    }),
    h: common_vendor.o(($event) => $options.submitForm())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/user-end/user-end/pages/createApply/createApply.vue"]]);
wx.createPage(MiniProgramPage);
