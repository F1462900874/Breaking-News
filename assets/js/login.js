$("#link_reg").on("click", function () {
  $(".reg-box").show();
  $(".login-box").hide();
});

$("#link_login").on("click", function () {
  $(".login-box").show();
  $(".reg-box").hide();
});
// 表单验证
var form = layui.form;
var layer = layui.layer;
form.verify({
  pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

  repwd: function (value) {
    var pwd = $(".reg-box [name=password]").val();
    if (pwd !== value) {
      return "两次密码不一致！";
    }
  },
});
// 注册事件
$("#form_reg").on("submit", function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/api/reguser",
    data: {
      username: $(".reg-box [name=username]").val(),
      password: $(".reg-box [name=password]").val(),
    },
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("注册失败");
      }
      layer.msg("注册成功");
      $("#link_login").click();
    },
  });
});

// 登陆事件
$("#form_login").on("submit", function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/api/login",
    data: {
      username: $(".login-box [name=username]").val(),
      password: $(".login-box [name=password]").val(),
    },
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg("登录失败");
      }
      layer.msg("登录成功");
      localStorage.setItem("token", res.token);
      location.href = "/index.html";
    },
  });
});
