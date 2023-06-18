"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      gutter: 0,
      nvueWidth: 730,
      searchValue: "",
      id: 0,
      sex: "",
      content: "",
      name: "",
      picUrl: [],
      status: false
    };
  },
  onLoad: function(options) {
    let dataObj = JSON.parse(decodeURIComponent(options.dataObj));
    this.id = dataObj.id;
    this.sex = dataObj.sex == 0 ? "雌性" : "雄性";
    this.content = dataObj.content;
    this.name = dataObj.name;
    this.picUrl = dataObj.picUrl;
    this.status = dataObj.status == 0 ? false : true;
  },
  methods: {
    want(item) {
      if (this.status == true) {
        common_vendor.index.showToast({
          title: "已经被领养惹~",
          icon: "error",
          duration: 2e3
        });
      } else {
        const dataObj = {
          ani_name: this.name,
          id: this.id,
          picUrl: this.picUrl[0]
        };
        common_vendor.index.navigateTo({
          url: "/pages/createApply/createApply?dataObj=" + encodeURIComponent(JSON.stringify(dataObj))
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_icons2 + _easycom_uni_card2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(this.content),
    b: common_vendor.f(this.picUrl, (it, index, i0) => {
      return {
        a: "https://anitu2.2022martu1.cn" + it
      };
    }),
    c: common_vendor.p({
      type: "heart-filled",
      size: "20"
    }),
    d: common_vendor.o(($event) => $options.want(_ctx.item)),
    e: common_vendor.p({
      title: this.name,
      extra: this.sex
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2dc69fde"], ["__file", "E:/user-end/user-end/pages/specificArchive/specificArchive.vue"]]);
wx.createPage(MiniProgramPage);
