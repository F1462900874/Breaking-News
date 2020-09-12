<<<<<<< HEAD
var layer = layui.layer;

// 获取用户信息
getUserInfo();
=======
$(function () {
  var layer = layui.layer;

  // 获取用户信息
  getUserInfo();
});

>>>>>>> user
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败！");
      }
      // 调用 renderAvatar 渲染用户的头像
<<<<<<< HEAD
=======
      // console.log(res.data);
>>>>>>> user
      renderAvatar(res.data);
    },
  });
}

// 渲染用户信息
function renderAvatar(user) {
  // 渲染用户名
<<<<<<< HEAD
  var name = user.username || user.nickname;
=======
  var name = user.nickname || user.username;
>>>>>>> user
  $("#welcome").html("欢迎" + name);

  // 渲染用户头像
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
<<<<<<< HEAD
    渲染文本头像;
=======
>>>>>>> user
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
