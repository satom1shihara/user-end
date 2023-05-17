"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  // components: {
  // 	mycommentor
  // },
  data() {
    return {
      plValue: "",
      post_id: 1,
      author_id: 0,
      avatarUrl: "/static/avatar.png",
      user_name: "name",
      tag: ["tag1", "tag2"],
      content: "content",
      title: "title",
      picUrl: ["/static/avatar.png"],
      commentList: ["123", "3523"],
      is_help: true,
      comments: [
        {
          avatar: "/static/logo.png",
          name: "name",
          content: "asjdoasjdsdjkasdasdasd",
          time: "12.31"
        },
        {
          avatar: "/static/logo.png",
          name: "name",
          content: "asjdoasjdsdjkasdasdasd",
          time: "12.31"
        },
        {
          avatar: "/static/logo.png",
          name: "name",
          content: "asjdoasjdsdjkasdasdasd",
          time: "12.31"
        }
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
    send() {
      console.log("点击发送", this.plValue);
      common_vendor.index.request({
        url: "https://anitu2.2022martu1.cn:8080/api/post/comment",
        data: {
          post_id: this.post_id,
          author_id: common_vendor.index.getStorageSync("user_id"),
          content: this.plValue
        },
        header: {
          "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
        },
        method: "POST",
        success: function(res) {
          if (res.statusCode == 200) {
            common_vendor.index.showToast({
              title: "发布成功",
              duration: 1e3
            });
          } else {
            console.log(res.errMsg);
          }
        }.bind(this)
      });
    },
    clear() {
      this.plValue = "";
    },
    transform(url) {
      return "https://anitu2.2022martu1.cn" + url;
    },
    getDetail() {
      common_vendor.index.request({
        url: "https://anitu2.2022martu1.cn:8080/api/post/detail",
        data: {
          post_id: this.post_id,
          user_id: this.author_id
        },
        header: {
          "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
        },
        method: "POST",
        success: function(res) {
          if (res.statusCode == 200) {
            console.log(res.data);
            let info = res.data.data;
            this.title = info.post.title;
            this.content = info.post.content;
            this.tag = info.post.tags[0].split(",");
            this.time = info.post.time.substring(0, 10);
            this.is_help = info.post.is_help;
            this.picUrl = info.post.pics;
            console.log(info.post.pics);
            this.avatarUrl = info.user.avatar;
            common_vendor.index.request({
              url: "https://anitu2.2022martu1.cn:8080/api/user/view",
              data: {
                user_id: this.author_id
              },
              header: {
                "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
              },
              method: "GET",
              success: function(res1) {
                if (res1.statusCode == 200) {
                  this.user_name = res1.data.name;
                  this.avatar = res1.data.avatar;
                  console.log("name=" + this.user_name);
                  console.log("avatar=" + this.avatar);
                  this.comments = [];
                  if (info.comments != null) {
                    var comment = {
                      avatar: "/static/logo.png",
                      name: "name",
                      content: "asjdoasjdsdjkasdasdasd",
                      time: "12.31"
                    };
                    for (let i = 0; i < info.comments.length; i++) {
                      common_vendor.index.request({
                        url: "https://anitu2.2022martu1.cn:8080/api/user/view",
                        data: {
                          user_id: this.author_id
                        },
                        header: {
                          "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
                        },
                        method: "GET",
                        success: function(res2) {
                          if (res2.statusCode == 200) {
                            console.log("2222");
                            console.log(res2.data);
                            comment.avatar = res2.data.avatar;
                            comment.name = res2.data.name;
                            comment.time = info.comments[i].time.substring(0, 10);
                            comment.content = info.comments[i].content;
                            this.comments.push(comment);
                          } else {
                            console.log(res.errMsg);
                          }
                        }.bind(this),
                        fail: (res2) => {
                          console.log("fail to connect!");
                        }
                      });
                    }
                  }
                } else {
                  console.log(res.errMsg);
                }
              }.bind(this)
            });
          } else {
            console.log(res.errMsg);
          }
        }.bind(this),
        fail: (res) => {
          console.log("fail to connect!");
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_tooltip2 = common_vendor.resolveComponent("uni-tooltip");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_col2 + _easycom_uni_icons2 + _easycom_uni_tooltip2 + _easycom_uni_row2 + _easycom_uni_card2)();
}
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_tooltip = () => "../../uni_modules/uni-tooltip/components/uni-tooltip/uni-tooltip.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_col + _easycom_uni_icons + _easycom_uni_tooltip + _easycom_uni_row + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f(this.tag, (it, index, i0) => {
      return {
        a: common_vendor.t(it)
      };
    }),
    b: common_vendor.p({
      span: 20
    }),
    c: this.is_help == 1
  }, this.is_help == 1 ? {
    d: common_vendor.p({
      type: "checkbox-filled",
      size: "20"
    })
  } : {
    e: common_vendor.p({
      type: "checkbox",
      size: "20"
    })
  }, {
    f: common_vendor.p({
      content: "实心为求助帖"
    }),
    g: common_vendor.p({
      span: 4
    }),
    h: common_vendor.t(this.content),
    i: common_vendor.f(this.picUrl, (it, index, i0) => {
      return {
        a: $options.transform(it)
      };
    }),
    j: common_vendor.f(this.comments, (item, index, i0) => {
      return {
        a: $options.transform(item.avatar),
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.time),
        d: common_vendor.t(item.content)
      };
    }),
    k: this.plValue,
    l: common_vendor.o(($event) => this.plValue = $event.detail.value),
    m: common_vendor.o(($event) => this.send()),
    n: common_vendor.o(($event) => this.clear()),
    o: common_vendor.p({
      title: this.user_name,
      ["sub-title"]: this.time,
      thumbnail: $options.transform(this.avatarUrl),
      extra: this.title,
      ["is-full"]: "true"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8ad8c482"], ["__file", "E:/user-end/user-end/pages/specificForum/specificForum.vue"]]);
wx.createPage(MiniProgramPage);
