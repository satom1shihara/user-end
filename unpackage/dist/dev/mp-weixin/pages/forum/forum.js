"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      info: {
        name: "",
        avatar: ""
      },
      id: 0,
      searchValue: "",
      searchPic: "",
      block: [
        // {
        // 	user_name: "author1",
        // 	time: "1 day ago",
        // 	avatar: "/static/avatar.png",
        // 	post_id: 1,
        // 	author_id: 1,
        // 	tag: ["tag1", "tag2"],
        // 	content: "上方可进行搜索和发布新的帖子,下方可查看大家发布的帖子",
        // 	title: "用户须知",
        // 	picUrl: [],
        // 	is_help: false,
        // },
        // {
        // 	user_name: "author2",
        // 	time: "1 day ago",
        // 	avatar: "/static/avatar.png",
        // 	post_id: 1,
        // 	author_id: 1,
        // 	tag: ["tag1", "tag2"],
        // 	content: "上方可进行搜索和发布新的帖子,下方可查看大家发布的帖子",
        // 	title: "用户须知",
        // 	picUrl: [],
        // 	is_help: false,
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
  methods: {
    transformUrl(url) {
      return "https://anitu2.2022martu1.cn" + url;
    },
    transformHelp(item) {
      return item.is_help == true ? "求助" : "非求助";
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
                    if (post.status == 2) {
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
    },
    search(res) {
      common_vendor.index.showToast({
        title: "搜索：" + res.value,
        icon: "none"
      });
    },
    input(res) {
      console.log("----input:", res);
    },
    onBackPress() {
      plus.key.hideSoftKeybord();
    },
    newForum() {
      common_vendor.index.navigateTo({
        url: "/pages/createForum/createForum"
      });
    },
    onClick(item) {
      const dataObj = {
        post_id: item.post_id,
        author_id: item.author_id
      };
      common_vendor.index.navigateTo({
        url: "/pages/specificForum/specificForum?dataObj=" + encodeURIComponent(JSON.stringify(dataObj))
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_search_bar2 + _easycom_uni_col2 + _easycom_uni_icons2 + _easycom_uni_row2 + _easycom_uni_card2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_col + _easycom_uni_icons + _easycom_uni_row + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.search),
    b: common_vendor.o($options.input),
    c: common_vendor.o(_ctx.cancel),
    d: common_vendor.o(_ctx.clear),
    e: common_vendor.o(($event) => $data.searchValue = $event),
    f: common_vendor.p({
      focus: true,
      modelValue: $data.searchValue
    }),
    g: common_vendor.p({
      span: 20
    }),
    h: common_vendor.p({
      type: "plusempty"
    }),
    i: common_vendor.o((...args) => $options.newForum && $options.newForum(...args)),
    j: common_vendor.p({
      span: 4
    }),
    k: common_vendor.f(this.block, (item, index, i0) => {
      return {
        a: common_vendor.f(item.picUrl, (pic, k1, i1) => {
          return {
            a: $options.transformUrl(pic)
          };
        }),
        b: common_vendor.o(($event) => $options.onClick(item)),
        c: "aeadbf01-5-" + i0,
        d: common_vendor.p({
          title: item.user_name,
          ["sub-title"]: item.time,
          extra: this.transformHelp(item.is_help),
          thumbnail: $options.transformUrl(item.avatar),
          padding: "10px 0"
        })
      };
    }),
    l: common_vendor.s({
      animationDelay: "0.4s"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-aeadbf01"], ["__file", "E:/user-end/user-end/pages/forum/forum.vue"]]);
wx.createPage(MiniProgramPage);
