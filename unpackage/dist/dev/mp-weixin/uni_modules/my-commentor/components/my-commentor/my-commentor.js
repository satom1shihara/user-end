"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 默认禁止点击按钮
      disabled: true,
      plValue: ""
    };
  },
  onLoad() {
  },
  methods: {
    changeDisabled(e) {
      console.log(e);
      if (e.detail.value != "") {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    send() {
      this.$emit("sendTxt", this.plValue);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o([($event) => $data.plValue = $event.detail.value, (...args) => $options.changeDisabled && $options.changeDisabled(...args)]),
    b: $data.plValue,
    c: common_vendor.o((...args) => $options.send && $options.send(...args)),
    d: $data.disabled
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-eb9198e0"], ["__file", "E:/user-end/user-end/uni_modules/my-commentor/components/my-commentor/my-commentor.vue"]]);
wx.createComponent(Component);
