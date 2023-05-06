"use strict";
const common_vendor = require("../../common/vendor.js");
const mycommentor = () => "../../uni_modules/my-commentor/components/my-commentor/my-commentor.js";
const _sfc_main = {
  components: {
    mycommentor
  },
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
      const dataObj = {
        ani_name: this.ani_name,
        id: this.id
      };
      common_vendor.index.navigateTo({
        url: "/pages/createApply/createApply?dataObj=" + encodeURIComponent(JSON.stringify(dataObj))
      });
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
        a: it
      };
    }),
    c: common_vendor.p({
      type: "heart-filled",
      size: "20"
    }),
    d: common_vendor.o(($event) => $options.want(_ctx.item)),
    e: this.status,
    f: common_vendor.p({
      title: this.name,
      extra: this.sex
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2dc69fde"], ["__file", "E:/user-end/user-end/pages/specificArchive/specificArchive.vue"]]);
wx.createPage(MiniProgramPage);