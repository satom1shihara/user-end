"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  onPullDownRefresh: function() {
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
        // 	ani_name: "",
        // 	adopt_id: 1,
        // 	animal_id: 1,
        // 	content: "sdasdsadsadsdsdsdsadasd",
        // 	status: "",
        // 	user_id: 1
        // },
        // {
        // 	ani_name: "",
        // 	adopt_id: 1,
        // 	animal_id: 1,
        // 	content: "sdasdsadsadsdsdsdsadasd",
        // 	status: "",
        // 	user_id: 1
        // },
        // {
        // 	ani_name: "",
        // 	adopt_id: 1,
        // 	animal_id: 1,
        // 	content: "sdasdsadsadsdsdsdsadasd",
        // 	status: "",
        // 	user_id: 1
        // },
      ]
    };
  },
  methods: {
    renewPage() {
      this.block = [];
      common_vendor.index.request({
        url: "https://anitu2.2022martu1.cn:8080/api/animal/adopt/table",
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
            let info = res.data.data.adopts;
            for (let i = 0; i < info.length; i++) {
              let post = {
                ani_name: "",
                adopt_id: 1,
                animal_id: 1,
                content: "",
                status: 0,
                user_id: 1
              };
              post.ani_name = info[i].animal_name;
              post.title = info[i].title;
              post.adopt_id = info[i].adopt_id;
              post.animal_id = info[i].animal_id;
              post.status = info[i].status == 0 ? "领养失败" : "领养成功";
              console.log(post);
              if (info[i].user_id != common_vendor.index.getStorageSync("user_id"))
                continue;
              if (info[i].status == 0) {
                post.content = "没有通过审核哦qwq，提供更完善的信息可以提高审核的成功率哦~";
              } else {
                post.content = "恭喜你通过审核：），享受和新宠物的每一天哦~";
              }
              this.block.push(post);
            }
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
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: this.block == ""
  }, this.block == "" ? {
    b: common_vendor.s({
      animationDelay: "0.4s"
    }),
    c: common_vendor.n("no-card")
  } : {
    d: common_vendor.f($data.block, (item, index, i0) => {
      return {
        a: common_vendor.t(item.content),
        b: "4f4d95a6-1-" + i0 + "," + ("4f4d95a6-0-" + i0),
        c: common_vendor.p({
          title: item.ani_name,
          ["is-shadow"]: false,
          extra: item.status
        }),
        d: "4f4d95a6-0-" + i0
      };
    }),
    e: common_vendor.p({
      title: "",
      type: "line"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/user-end/user-end/pages/selfArchive/selfArchive.vue"]]);
wx.createPage(MiniProgramPage);
