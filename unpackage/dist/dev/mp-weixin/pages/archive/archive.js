"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      gutter: 0,
      nvueWidth: 730,
      searchValue: "",
      block: [
        // {
        // 	ani_name: "ani_name",
        // 	title: "title",
        // 	content: "尊敬的客人，非常感谢您选择牛魔酬宾酒店。我们一直以来都以提供一流的服务和舒适的住宿环境为己任，让每位客人都能够感受到家一般的温馨和舒适。\
        // 	\n\n在这里，您可以享受到最优质的客房和设施，我们的工作人员将竭尽所能为您提供优质的服务，让您的旅途更加愉悦和难忘。我们致力于追求卓越，为客人提供最完美的体验。\
        // 	\n\n我们也非常注重诚信待客，始终以诚信为本，为每位客人提供公平、透明的服务。无论您是商务出差还是旅游度假，我们都会全力以赴为您提供最好的服务和体验。",
        // 	tag: ["tag1", "tag2"],
        // 	picUrl: ["/static/cat1-2.jpg"],
        // },
        // {
        // 	ani_name: "ani_name",
        // 	title: "title",
        // 	content: "尊敬的客人，非常感谢您选择牛魔酬宾酒店。我们一直以来都以提供一流的服务和舒适的住宿环境为己任，让每位客人都能够感受到家一般的温馨和舒适。\
        // 	\n\n在这里，您可以享受到最优质的客房和设施，我们的工作人员将竭尽所能为您提供优质的服务，让您的旅途更加愉悦和难忘。我们致力于追求卓越，为客人提供最完美的体验。\
        // 	\n\n我们也非常注重诚信待客，始终以诚信为本，为每位客人提供公平、透明的服务。无论您是商务出差还是旅游度假，我们都会全力以赴为您提供最好的服务和体验。",
        // 	tag: ["tag1", "tag2"],
        // 	picUrl: ["/static/cat1-2.jpg"],
        // },
        // {
        // 	ani_name: "ani_name",
        // 	title: "title",
        // 	content: "尊敬的客人，非常感谢您选择牛魔酬宾酒店。我们一直以来都以提供一流的服务和舒适的住宿环境为己任，让每位客人都能够感受到家一般的温馨和舒适。\
        // 	\n\n在这里，您可以享受到最优质的客房和设施，我们的工作人员将竭尽所能为您提供优质的服务，让您的旅途更加愉悦和难忘。我们致力于追求卓越，为客人提供最完美的体验。\
        // 	\n\n我们也非常注重诚信待客，始终以诚信为本，为每位客人提供公平、透明的服务。无论您是商务出差还是旅游度假，我们都会全力以赴为您提供最好的服务和体验。",
        // 	tag: ["tag1", "tag2"],
        // 	picUrl: ["/static/cat1-2.jpg"],
        // }
      ]
    };
  },
  onPullDownRefresh: function() {
    this.renewPage();
  },
  onLoad: function() {
    this.renewPage();
  },
  methods: {
    search(res) {
      common_vendor.index.showToast({
        title: "搜索：" + res.value,
        icon: "none"
      });
    },
    input(res) {
      console.log("----input:", res);
    },
    clear(res) {
      common_vendor.index.showToast({
        title: "clear事件，清除值为：" + res.value,
        icon: "none"
      });
    },
    cancel(res) {
      common_vendor.index.showToast({
        title: "点击取消，输入值为：" + res.value,
        icon: "none"
      });
    },
    onBackPress() {
      plus.key.hideSoftKeybord();
    },
    newForum() {
      console.log("creating new forum");
    },
    onClick(item) {
      const dataObj = {
        id: item.id,
        sex: item.sex,
        content: item.content,
        name: item.name,
        picUrl: item.picUrl,
        status: item.status
      };
      common_vendor.index.navigateTo({
        url: "/pages/specificArchive/specificArchive?dataObj=" + encodeURIComponent(JSON.stringify(dataObj))
      });
    },
    toggle(type) {
      this.$refs.popup.open(type);
    },
    open() {
      this.$refs.popup.open("top");
    },
    close() {
      this.$refs.popup.close();
    },
    ensure() {
    },
    renewPage() {
      common_vendor.index.request({
        url: "http://114.116.211.142:8080/api/animal/table",
        data: {
          page: 1,
          limit: 100,
          sort: "created_at"
        },
        header: {
          "Authorization": "Bearer " + common_vendor.index.getStorageSync("token"),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET",
        success: (res) => {
          if (res.statusCode == 200) {
            console.log(res.data);
            let info = res.data.data.animals;
            this.block = [];
            for (let i = 0; i < info.length - 1; i++) {
              let post = {
                id: 0,
                sex: "",
                content: "",
                name: "",
                picUrl: ["/static/cat1-2.jpg"],
                status: 0
              };
              post.id = info[i].animal_id;
              post.sex = info[i].animal_sex;
              post.content = info[i].content;
              post.name = info[i].animal_name;
              post.status = info[i].status;
              this.block.push(post);
            }
            console.log(this.block);
          } else {
            console.log(res.errMsg);
          }
        },
        fail: (res) => {
          console.log("fail to connect!");
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_search_bar2 + _easycom_uni_col2 + _easycom_uni_icons2 + _easycom_uni_file_picker2 + _easycom_uni_row2 + _easycom_uni_section2 + _easycom_uni_popup2 + _easycom_uni_notice_bar2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_card2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_col + _easycom_uni_icons + _easycom_uni_file_picker + _easycom_uni_row + _easycom_uni_section + _easycom_uni_popup + _easycom_uni_notice_bar + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.search),
    b: common_vendor.o($options.input),
    c: common_vendor.o($options.cancel),
    d: common_vendor.o($options.clear),
    e: common_vendor.o(($event) => $data.searchValue = $event),
    f: common_vendor.p({
      focus: true,
      modelValue: $data.searchValue
    }),
    g: common_vendor.p({
      span: 20
    }),
    h: common_vendor.p({
      type: "camera-filled"
    }),
    i: common_vendor.o(($event) => $options.open()),
    j: common_vendor.o(($event) => this.searchPic = $event),
    k: common_vendor.p({
      limit: "1",
      title: "最多选择1张图片",
      modelValue: this.searchPic
    }),
    l: common_vendor.o((...args) => $options.close && $options.close(...args)),
    m: common_vendor.p({
      span: 12
    }),
    n: common_vendor.o((...args) => $options.ensure && $options.ensure(...args)),
    o: common_vendor.p({
      span: 12
    }),
    p: common_vendor.p({
      ["uni-row"]: true
    }),
    q: common_vendor.p({
      title: "输入图片进行搜索",
      type: "line"
    }),
    r: common_vendor.sr("popup", "1ed2b163-5,1ed2b163-3"),
    s: common_vendor.p({
      ["mask-click"]: false,
      ["background-color"]: "#fff"
    }),
    t: common_vendor.p({
      span: 4
    }),
    v: common_vendor.p({
      gutter: $data.gutter,
      width: $data.nvueWidth
    }),
    w: common_vendor.p({
      text: "上方可进行搜索,下方可查看动物信息的档案"
    }),
    x: common_vendor.f($data.block, (item, index, i0) => {
      return {
        a: "1ed2b163-14-" + i0 + "," + ("1ed2b163-13-" + i0),
        b: common_vendor.p({
          title: item.name
        }),
        c: "1ed2b163-13-" + i0 + "," + ("1ed2b163-12-" + i0),
        d: item.picUrl[0],
        e: "1ed2b163-15-" + i0 + "," + ("1ed2b163-12-" + i0),
        f: common_vendor.o(($event) => $options.onClick(item)),
        g: "1ed2b163-12-" + i0
      };
    }),
    y: common_vendor.p({
      type: "forward",
      size: "20"
    }),
    z: common_vendor.p({
      padding: "10px 0"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1ed2b163"], ["__file", "E:/user-end/user-end/pages/archive/archive.vue"]]);
wx.createPage(MiniProgramPage);
