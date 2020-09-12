var layer = layui.layer;

// 获取用户信息
getUserInfo();
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败！");
      }
      // 调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data);
    },
  });
}

// 渲染用户信息
function renderAvatar(user) {
  // 渲染用户名
  var name = user.username || user.nickname;
  $("#welcome").html("欢迎" + name);

  // 渲染用户头像
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    渲染文本头像;
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}

// 退出事件
$("#quitBtn").on("click", function () {
  layer.confirm("确认要退出吗?", { icon: 3, title: "提示" }, function (index) {
    layer.close(index);
    localStorage.removeItem("token");
    location.href = "/index.html";
  });
});
