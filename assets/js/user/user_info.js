var form = layui.form;
var layer = layui.layer;
form.verify({
  nickname: function (value) {
    if (value.length > 10) {
      return "昵称长度必须在 1 ~ 10 个字符之间！";
    }
  },
});

// 实现表单数据初始化
initUserInfo();
function initUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success: function (res) {
      form.val("formUserInfo", res.data);
    },
  });
}

// 重置表单数据
$("#BtnReSet").on("click", function (e) {
  e.preventDefault();
  initUserInfo();
});

// 发起请求更新用户的信息
$(".layui-form").on("submit", function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/my/userinfo",
    data: $(this).serialize(),
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg("获取用户信息失败");
      }
      layer.msg("获取用户信息成功");
      console.log(res);
      window.parent.getUserInfo();
    },
  });
});
