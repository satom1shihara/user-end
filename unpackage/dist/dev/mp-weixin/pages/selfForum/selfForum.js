"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  onPullDownRefresh: function() {
    console.log("refresh");
    setTimeout(function() {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
    this.renewPage();
  },
  onLoad: function() {
    this.renewPage();
  },
  data() {
    return {
      block: [
        // {
        // 	post_id: 1,
        // 	tag: ["tag1", "tag2"],
        // 	content: "asjkdlfjaskldjfl;asdkfjasdlkfjasdlkcvjdslkfjasd;lkghksldnvsadovikjnoasinvironav;oasivoiawrhnvao;ighlkasdnv;asoivhj",
        // 	title: "title",
        // 	picUrl: ["/static/cat1-2.jpg", "/static/cat4.jpg"],
        // 	is_help: true,
        // 	commentList: [123, 234] // id of comment
        // },
        // {
        // 	post_id: 2,
        // 	tag: ["tag1", "tag2"],
        // 	content: "content",
        // 	title: "title",
        // 	picUrl: ["/static/cat1-2.jpg", "/static/cat4.jpg"],
        // 	is_help: true,	
        // 	commentList: [123, 234] // id of comment
        // },
      ]
    };
  },
  methods: {
    transformUrl(url) {
      return "https://anitu2.2022martu1.cn" + url;
    },
    transformHelp(item) {
      return item.is_help == true ? "求助" : "非求助";
    },
    onClick(item) {
      const dataObj = {
        post_id: item.post_id,
        author_id: item.author_id
      };
      common_vendor.index.navigateTo({
        url: "/pages/specificForum/specificForum?dataObj=" + encodeURIComponent(JSON.stringify(dataObj))
      });
    },
    deleteForum(index) {
      console.log("delete this forum");
      console.log(index);
      common_vendor.index.request({
        url: "https://anitu2.2022martu1.cn:8080/api/post",
        data: {
          post_id: this.block[index].post_id,
          user_id: common_vendor.index.getStorageSync("user_id")
        },
        method: "DELETE",
        header: {
          "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
        },
        success: (ret) => {
          if (ret.statusCode == 200) {
            common_vendor.index.navigateBack();
            common_vendor.index.showToast({
              title: "删除成功",
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
    },
    renewPage() {
      common_vendor.index.request({
        url: "https://anitu2.2022martu1.cn:8080/api/post/table",
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
        success: function(res) {
          if (res.statusCode == 200) {
            console.log(res.data);
            let info = res.data.data.posts;
            this.block = [];
            console.log("info=" + info);
            if (info == null) {
              return;
            }
            for (let i = 0; i < info.length; i++) {
              let post = {
                user_name: "",
                time: "",
                avatar: "",
                author_id: 0,
                post_id: 0,
                title: "",
                content: "",
                is_help: 0,
                tag: [],
                picUrl: []
              };
              post.author_id = info[i].author_id;
              console.log("11");
              common_vendor.index.request({
                url: "https://anitu2.2022martu1.cn:8080/api/user/view",
                data: {
                  user_id: post.author_id
                },
                header: {
                  "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
                },
                method: "GET",
                success: function(res2) {
                  if (res2.statusCode == 200) {
                    console.log("33");
                    post.user_name = res2.data.name;
                    post.avatar = res2.data.avatar;
                    console.log("name=" + post.user_name);
                    console.log("avatar=" + post.avatar);
                    post.time = info[i].time.substring(0, 10);
                    console.log("time=" + post.time);
                    post.post_id = info[i].post_id;
                    post.title = info[i].title;
                    post.content = info[i].content;
                    post.is_help = info[i].is_help;
                    post.status = info[i].status;
                    post.tag = info[i].tags;
                    post.picUrl = info[i].pics;
                    console.log("post=" + post);
                    console.log("111");
                    if (post.status == 2 && post.author_id == common_vendor.index.getStorageSync("user_id")) {
                      this.block.push(post);
                    }
                    console.log("33");
                  } else {
                    console.log(res2.errMsg);
                  }
                }.bind(this)
              });
            }
          } else {
            console.log(res.errMsg);
          }
          this.$forceUpdate();
        }.bind(this),
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
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_icons2 + _easycom_uni_col2 + _easycom_uni_row2 + _easycom_uni_card2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_col + _easycom_uni_row + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.block, (item, index, i0) => {
      return {
        a: common_vendor.f(item.picUrl, (pic, k1, i1) => {
          return {
            a: $options.transformUrl(pic)
          };
        }),
        b: "481677b2-3-" + i0 + "," + ("481677b2-2-" + i0),
        c: common_vendor.o(($event) => $options.onClick(item)),
        d: "481677b2-2-" + i0 + "," + ("481677b2-1-" + i0),
        e: "481677b2-5-" + i0 + "," + ("481677b2-4-" + i0),
        f: common_vendor.o(($event) => $options.deleteForum(index)),
        g: "481677b2-4-" + i0 + "," + ("481677b2-1-" + i0),
        h: "481677b2-1-" + i0 + "," + ("481677b2-0-" + i0),
        i: common_vendor.o(($event) => $options.onClick(item)),
        j: "481677b2-0-" + i0,
        k: common_vendor.p({
          title: item.user_name,
          ["sub-title"]: item.time,
          extra: this.transformHelp(item.is_help),
          thumbnail: $options.transformUrl(item.avatar),
          padding: "10px 0"
        })
      };
    }),
    b: common_vendor.p({
      type: "forward",
      size: "20"
    }),
    c: common_vendor.p({
      span: "12"
    }),
    d: common_vendor.p({
      type: "closeempty",
      size: "20"
    }),
    e: common_vendor.p({
      span: "12"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-481677b2"], ["__file", "E:/user-end/user-end/pages/selfForum/selfForum.vue"]]);
wx.createPage(MiniProgramPage);
