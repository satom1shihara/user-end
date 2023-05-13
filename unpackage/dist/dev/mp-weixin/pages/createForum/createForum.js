"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      filesList: [],
      filePathList: [],
      baseFormData: {
        title: "",
        content: "",
        tag: [],
        picUrl: [],
        is_help: 0
      },
      isHelp: [
        {
          text: "是",
          value: 1
        },
        {
          text: "否",
          value: 0
        }
      ]
    };
  },
  methods: {
    handleSelect() {
      common_vendor.index.chooseImage({
        success: (chooseImageRes) => {
          for (let i = 0; i < chooseImageRes.tempFilePaths.length; i++) {
            console.log(chooseImageRes.tempFilePaths[i]);
            common_vendor.index.uploadFile({
              url: "https://anitu2.2022martu1.cn:8080/api/pic/upload",
              filePath: chooseImageRes.tempFilePaths[i],
              name: "pic",
              header: {
                "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
              },
              formData: {
                "opt": 0
              },
              success: (uploadFileRes) => {
                if (uploadFileRes.statusCode == 200) {
                  const data = JSON.parse(uploadFileRes.data);
                  console.log("data=" + data.path);
                  this.baseFormData.picUrl.push(data.path);
                } else {
                  console.log(uploadFileRes.data);
                }
              }
            });
          }
        }
      });
    },
    submitForm() {
      common_vendor.index.request({
        url: "https://anitu2.2022martu1.cn:8080/api/post",
        data: {
          author_id: common_vendor.index.getStorageSync("user_id"),
          title: this.baseFormData.title,
          content: this.baseFormData.content,
          tags: this.baseFormData.tag.split(","),
          pics: this.baseFormData.picUrl,
          is_help: this.baseFormData.is_help
        },
        method: "POST",
        header: {
          "Authorization": "Bearer " + common_vendor.index.getStorageSync("token"),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: (ret) => {
          if (ret.statusCode == 200) {
            common_vendor.index.navigateBack();
            common_vendor.index.showToast({
              title: "发布成功",
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
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_icons2 + _easycom_uni_forms2 + _easycom_uni_section2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_icons + _easycom_uni_forms + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.baseFormData.title = $event),
    b: common_vendor.p({
      type: "textarea",
      placeholder: "请输入标题",
      modelValue: $data.baseFormData.title
    }),
    c: common_vendor.p({
      label: "标题",
      required: true
    }),
    d: common_vendor.o(($event) => $data.baseFormData.content = $event),
    e: common_vendor.p({
      type: "textarea",
      placeholder: "请输入内容",
      modelValue: $data.baseFormData.content
    }),
    f: common_vendor.p({
      label: "内容",
      required: true
    }),
    g: common_vendor.o(($event) => $data.baseFormData.tag = $event),
    h: common_vendor.p({
      type: "textarea",
      placeholder: "请输入标签,标签之间使用逗号','隔开",
      modelValue: $data.baseFormData.tag
    }),
    i: common_vendor.p({
      label: "标签",
      required: true
    }),
    j: common_vendor.o(($event) => $data.baseFormData.is_help = $event),
    k: common_vendor.p({
      localdata: $data.isHelp,
      modelValue: $data.baseFormData.is_help
    }),
    l: common_vendor.p({
      label: "求助",
      required: true
    }),
    m: common_vendor.p({
      type: "folder-add",
      size: "20"
    }),
    n: common_vendor.o(($event) => $options.handleSelect()),
    o: common_vendor.sr("baseForm", "76662384-1,76662384-0"),
    p: common_vendor.p({
      modelValue: $data.baseFormData
    }),
    q: common_vendor.p({
      title: "在这里编写你的帖子",
      type: "line"
    }),
    r: common_vendor.o(($event) => $options.submitForm())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/user-end/user-end/pages/createForum/createForum.vue"]]);
wx.createPage(MiniProgramPage);
