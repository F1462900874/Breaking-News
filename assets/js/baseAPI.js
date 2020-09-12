$.ajaxPrefilter(function (option) {
  option.url = "http://ajax.frontend.itheima.net" + option.url;

  // 统一为有权接口设置请求头
<<<<<<< HEAD
  option.headers = {
    Authorization: localStorage.getItem("token") || "",
  };
=======
  if (option.url.indexOf("/my/") !== -1) {
    option.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }
>>>>>>> user

  // 控制用户访问权限
  option.complete = function (res) {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      // 1. 强制清空 token
      localStorage.removeItem("token");
      // 2. 强制跳转到登录页面
      location.href = "/login.html";
    }
  };
});
