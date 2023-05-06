"use strict";
const common_vendor = require("../../common/vendor.js");
const mycommentor = () => "../../uni_modules/my-commentor/components/my-commentor/my-commentor.js";
const _sfc_main = {
  components: {
    mycommentor
  },
  data() {
    return {
      post_id: 1,
      author_id: 0,
      avatarUrl: "",
      user_name: "name",
      tag: ["tag1", "tag2"],
      content: "content",
      title: "title",
      picUrl: [],
      commentList: ["123", "3523"],
      is_help: true,
      comments: [
        // {
        // 	avatar: "/static/logo.png",
        // 	name: "name",
        // 	text: "asjdoasjdsdjkasdasdasd",
        // 	time: "12.31"
        // },
        // {
        // 	avatar: "/static/logo.png",
        // 	name: "name",
        // 	text: "asjdoasjdsdjkasdasdasd",
        // 	time: "12.31"
        // },
        // {
        // 	avatar: "/static/logo.png",
        // 	name: "name",
        // 	text: "asjdoasjdsdjkasdasdasd",
        // 	time: "12.31"
        // }
      ]
    };
  },
  onLoad: function(options) {
    let dataObj = JSON.parse(decodeURIComponent(options.dataObj));
    this.post_id = dataObj.post_id;
    this.author_id = dataObj.author_id;
    console.log(this.post_id);
    console.log(this.author_id);
    this.getDetail();
  },
  methods: {
    trans(url) {
      let s = "http://114.116.211.142:80/" + url.slice(8);
      console.log(s);
      return s;
    },
    getDetail() {
      common_vendor.index.request({
        url: "http://114.116.211.142:8080/api/post/detail",
        data: {
          post_id: this.post_id,
          user_id: this.author_id
        },
        header: {
          "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
        },
        method: "POST",
        success: (res) => {
          if (res.statusCode == 200) {
            console.log(res.data);
            let info = res.data.data;
            this.comments = info.comments;
            this.title = info.post.title;
            this.content = info.post.content;
            this.tag = info.post.tags;
            this.picUrl = info.post.pics[0].split(",");
            console.log(info.post.pics);
            this.user_name = info.user.user_id;
            this.avatarUrl = "http://114.116.211.142:80/user/" + info.user.avatar;
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
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_tooltip2 = common_vendor.resolveComponent("uni-tooltip");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_mycommentor = common_vendor.resolveComponent("mycommentor");
  (_easycom_uni_icons2 + _easycom_uni_col2 + _easycom_uni_tooltip2 + _easycom_uni_row2 + _easycom_uni_card2 + _easycom_uni_section2 + _component_mycommentor)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_tooltip = () => "../../uni_modules/uni-tooltip/components/uni-tooltip/uni-tooltip.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_col + _easycom_uni_tooltip + _easycom_uni_row + _easycom_uni_card + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "fire-filled",
      size: "20"
    }),
    b: common_vendor.f(this.tag, (it, index, i0) => {
      return {
        a: common_vendor.t(it)
      };
    }),
    c: common_vendor.p({
      span: 20
    }),
    d: $data.is_help
  }, $data.is_help ? {
    e: common_vendor.p({
      type: "checkbox-filled",
      size: "20"
    })
  } : {
    f: common_vendor.p({
      type: "checkbox",
      size: "20"
    })
  }, {
    g: common_vendor.p({
      content: "实心为求助帖"
    }),
    h: common_vendor.p({
      span: 4
    }),
    i: common_vendor.p({
      gutter: _ctx.gutter,
      width: _ctx.nvueWidth
    }),
    j: common_vendor.t(this.content),
    k: common_vendor.f(this.picUrl, (it, index, i0) => {
      return {
        a: $options.trans(it)
      };
    }),
    l: common_vendor.f($data.comments, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: "8ad8c482-9-" + i0 + ",8ad8c482-8",
        c: common_vendor.p({
          title: item.name,
          extra: item.time,
          thumbnail: item.avatar
        })
      };
    }),
    m: common_vendor.p({
      title: "评论区",
      type: "line"
    }),
    n: common_vendor.p({
      title: this.user_name,
      thumbnail: this.avatarUrl,
      extra: this.title
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8ad8c482"], ["__file", "E:/user-end/user-end/pages/specificForum/specificForum.vue"]]);
wx.createPage(MiniProgramPage);
