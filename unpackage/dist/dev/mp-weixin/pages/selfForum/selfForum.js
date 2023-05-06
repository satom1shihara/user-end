"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  onPullDownRefresh: function() {
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
    trans(url) {
      let s = "http://114.116.211.142:80/" + url.slice(8);
      console.log(s);
      return s;
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
        url: "http://114.116.211.142:8080/api/post",
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
        url: "http://114.116.211.142:8080/api/post/table",
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
            let info = res.data.data.posts;
            this.block = [];
            for (let i = 0; i < info.length - 1; i++) {
              let post = {
                author_id: 0,
                post_id: 0,
                title: "",
                content: "",
                is_help: 0,
                status: 0,
                tag: [],
                picUrl: []
              };
              post.author_id = info[i].author_id;
              post.post_id = info[i].post_id;
              post.title = info[i].title;
              post.content = info[i].content;
              post.is_help = info[i].is_help;
              post.status = info[i].status;
              post.tag = info[i].tags;
              post.picUrl = info[i].pics;
              if (post.status != 2)
                continue;
              if (info[i].author_id != common_vendor.index.getStorageSync("user_id"))
                continue;
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
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_icons2 + _easycom_uni_col2 + _easycom_uni_row2 + _easycom_uni_card2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_icons + _easycom_uni_col + _easycom_uni_row + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.block, (item, index, i0) => {
      return {
        a: "481677b2-2-" + i0 + "," + ("481677b2-1-" + i0),
        b: common_vendor.p({
          title: item.title
        }),
        c: "481677b2-1-" + i0 + "," + ("481677b2-0-" + i0),
        d: common_vendor.f(item.picUrl, (pic, k1, i1) => {
          return {
            a: $options.trans(pic)
          };
        }),
        e: "481677b2-5-" + i0 + "," + ("481677b2-4-" + i0),
        f: common_vendor.o(($event) => $options.onClick(item)),
        g: "481677b2-4-" + i0 + "," + ("481677b2-3-" + i0),
        h: "481677b2-7-" + i0 + "," + ("481677b2-6-" + i0),
        i: common_vendor.o(($event) => $options.deleteForum(index)),
        j: "481677b2-6-" + i0 + "," + ("481677b2-3-" + i0),
        k: "481677b2-3-" + i0 + "," + ("481677b2-0-" + i0),
        l: "481677b2-0-" + i0,
        m: common_vendor.p({
          title: "基础卡片",
          ["sub-title"]: "副标题",
          extra: "额外信息",
          padding: "10px 0",
          thumbnail: item.avatarUrl
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
