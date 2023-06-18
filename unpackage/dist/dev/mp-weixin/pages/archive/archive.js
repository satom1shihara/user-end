"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      gutter: 0,
      searchPic: "",
      nvueWidth: 730,
      searchValue: "",
      block: []
    };
  },
  onPullDownRefresh: function() {
    this.renewPage();
  },
  onLoad: function() {
    this.renewPage();
  },
  methods: {
    uploadPic(e) {
      const tempFilePaths = e.tempFilePaths;
      const imgUrl = tempFilePaths[0];
      common_vendor.index.uploadFile({
        url: "https://anitu2.2022martu1.cn:8080/api/pic/upload",
        filePath: imgUrl,
        name: "pic",
        header: {
          "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
        },
        formData: {
          "opt": 3
        },
        success: function(res) {
          if (res.statusCode == 200) {
            const data = JSON.parse(res.data);
            console.log(data.path);
            this.searchPic = data.path;
            console.log(this.searchPic);
          } else {
            console.log(res.data);
          }
        }.bind(this)
      });
    },
    transformUrl(url) {
      return "https://anitu2.2022martu1.cn" + url;
    },
    search(res1) {
      common_vendor.index.request({
        url: "https://anitu2.2022martu1.cn:8080/api/animal/search",
        data: {
          keyword: this.searchValue
        },
        header: {
          "Authorization": "Bearer " + common_vendor.index.getStorageSync("token"),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET",
        success: function(res) {
          if (res.statusCode == 200) {
            console.log(res.data);
            let info = res.data.data.animals;
            this.block = [];
            for (let i = 0; i < info.length; i++) {
              let post = {
                id: 0,
                sex: "",
                content: "",
                name: "",
                picUrl: [],
                type: "",
                status: 0
              };
              post.id = info[i].animal_id;
              post.sex = info[i].animal_sex;
              post.content = info[i].content;
              post.name = info[i].animal_name;
              post.status = info[i].status;
              post.picUrl = info[i].pics;
              post.type = info[i].animal_type;
              console.log(post);
              this.block.push(post);
            }
            console.log(this.block);
          } else {
            console.log(res.errMsg);
          }
        }.bind(this),
        fail: (res) => {
          console.log("fail to connect!");
        }
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
      this.renewPage();
    },
    onBackPress() {
      plus.key.hideSoftKeybord();
    },
    newForum() {
      console.log("creating new forum");
    },
    onClick(item) {
      console.log(item);
      const dataObj = {
        id: item.id,
        sex: item.sex,
        content: item.content,
        name: item.name,
        picUrl: item.picUrl,
        type: item.type,
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
      console.log(this.searchPic);
      common_vendor.index.request({
        url: "https://anitu2.2022martu1.cn:8080/api/animal/similarity",
        data: {
          pic: this.searchPic
        },
        header: {
          "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
        },
        method: "POST",
        success: function(res) {
          if (res.statusCode == 200) {
            console.log(res.data);
            console.log(res.data.data.animal);
            var info = res.data.data.animal;
            const dataObj = {
              id: info.animal_id,
              sex: info.animal_sex,
              content: info.content,
              name: info.animal_name,
              picUrl: info.pics,
              type: info.animal_type,
              status: info.status
            };
            common_vendor.index.navigateTo({
              url: "/pages/specificArchive/specificArchive?dataObj=" + encodeURIComponent(JSON.stringify(dataObj))
            });
            common_vendor.index.showToast({
              title: "找到最相近的小动物是：" + info.animal_name,
              icon: "none",
              duration: 3e3
            });
          } else {
            console.log(res.errMsg);
          }
        }.bind(this),
        fail: (res) => {
          console.log("fail to connect!");
        }
      });
    },
    renewPage() {
      common_vendor.index.request({
        url: "https://anitu2.2022martu1.cn:8080/api/animal/table",
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
            for (let i = 0; i < info.length; i++) {
              let post = {
                id: 0,
                sex: "",
                content: "",
                name: "",
                picUrl: [],
                type: "",
                status: 0
              };
              post.id = info[i].animal_id;
              post.sex = info[i].animal_sex;
              post.content = info[i].content;
              post.name = info[i].animal_name;
              post.status = info[i].status;
              post.picUrl = info[i].pics;
              post.type = info[i].animal_type;
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
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_search_bar2 + _easycom_uni_col2 + _easycom_uni_icons2 + _easycom_uni_file_picker2 + _easycom_uni_row2 + _easycom_uni_section2 + _easycom_uni_popup2 + _easycom_uni_card2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_col + _easycom_uni_icons + _easycom_uni_file_picker + _easycom_uni_row + _easycom_uni_section + _easycom_uni_popup + _easycom_uni_card)();
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
    j: common_vendor.sr("files", "1ed2b163-7,1ed2b163-6"),
    k: common_vendor.o(this.uploadPic),
    l: common_vendor.p({
      ["auto-upload"]: false,
      limit: "1",
      title: "最多选择1张图片"
    }),
    m: common_vendor.o((...args) => $options.close && $options.close(...args)),
    n: common_vendor.p({
      span: 12
    }),
    o: common_vendor.o((...args) => $options.ensure && $options.ensure(...args)),
    p: common_vendor.p({
      span: 12
    }),
    q: common_vendor.p({
      ["uni-row"]: true
    }),
    r: common_vendor.p({
      title: "输入图片进行搜索",
      type: "line"
    }),
    s: common_vendor.sr("popup", "1ed2b163-5,1ed2b163-3"),
    t: common_vendor.p({
      ["mask-click"]: false,
      ["background-color"]: "#fff"
    }),
    v: common_vendor.p({
      span: 4
    }),
    w: common_vendor.p({
      gutter: $data.gutter,
      width: $data.nvueWidth
    }),
    x: common_vendor.s({
      animationDelay: "0.4s"
    }),
    y: common_vendor.n("no-card"),
    z: common_vendor.f($data.block, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.type),
        c: $options.transformUrl(item.picUrl[0]),
        d: "1ed2b163-12-" + i0 + "," + ("1ed2b163-11-" + i0),
        e: common_vendor.o(($event) => $options.onClick(item)),
        f: "1ed2b163-11-" + i0
      };
    }),
    A: common_vendor.p({
      type: "forward",
      size: "20"
    }),
    B: common_vendor.p({
      padding: "10px 0"
    }),
    C: common_vendor.s({
      animationDelay: "0.4s"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1ed2b163"], ["__file", "E:/user-end/user-end/pages/archive/archive.vue"]]);
wx.createPage(MiniProgramPage);
