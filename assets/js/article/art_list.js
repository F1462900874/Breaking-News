var layer = layui.layer;
var q = {
  pagenum: 1, // 页码值，默认请求第一页的数据
  pagesize: 2, // 每页显示几条数据，默认每页显示2条
  cate_id: "", // 文章分类的 Id
  state: "", // 文章的发布状态
};

//获取文章列表
articleList();
function articleList() {
  $.ajax({
    type: "GET",
    url: "/my/article/list",
    data: q,
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      var htmlStr = template("tpl-table", res);
      $("tbody").html(htmlStr);
      renderPage(res.total);
    },
  });
}

// 通过templete设置过滤器
template.defaults.imports.dataFormat = function (data) {
  var dt = new Date(data);
  var y = dt.getFullYear();
  y = y < 10 ? "0" + y : y;
  var m = dt.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = dt.getDate();
  d = d < 10 ? "0" + d : d;
  var hh = dt.getHours();
  hh = hh < 10 ? "0" + hh : hh;
  var mm = dt.getMinutes();
  mm = mm < 10 ? "0" + mm : mm;
  var ss = dt.getSeconds();
  ss = ss < 10 ? "0" + ss : ss;
  return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
};

var form = layui.form;
// 初始化文章下拉菜单
$.ajax({
  type: "GET",
  url: "/my/article/cates",
  success: function (res) {
    if (res.status !== 0) {
      return layer.msg(res.message);
    }
    var htmlStr = template("tpl-cate", res);
    $("[name=cate_id]").html(htmlStr);

    form.render();
  },
});

// 实现筛选事件
$("#form-search").on("submit", function (e) {
  e.preventDefault();
  var cate_id = $("[name=cate_id]").val();
  var state = $("[name=state]").val();
  q.cate_id = cate_id;
  q.state = state;
  articleList();
});

// 调用 laypage.render 方法渲染分页的基本结构
var laypage = layui.laypage;
function renderPage(total) {
  laypage.render({
    elem: "pageBox", // 分页容器的 Id
    count: total, // 总数据条数
    first: 1,
    limit: q.pagesize, // 每页显示几条数据
    curr: q.pagenum, // 设置默认被选中的分页
    layout: ["count", "limit", "prev", "page", "next", "skip"],
    limits: [2, 3, 5, 10],
    jump: function (obj, first) {
      // 把最新的页码值，赋值到 q 这个查询参数对象中
      q.pagenum = obj.curr;
      q.pagesize = obj.limit;
      if (!first) {
        articleList();
      }
    },
  });
}

// 删除文章
$("tbody").on("click", ".btnDelete", function (e) {
  e.preventDefault();

  var len = $(".btnDelete").length;

  var id = $(this).attr("data-index");

  layer.confirm(
    "确定要删除分类?",
    { icon: 3, title: "提示" },

    function (index) {
      $.ajax({
        type: "GET",
        url: "/my/article/delete/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message);
          }

          if (len === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
          }
          articleList();
          layer.close(index);
        },
      });
    }
  );
});

$("tbody").on("click", ".btn-redact", function () {
  var id = $(this).attr("data-index");

  location.href = "art_edit.html?id+" + id;
});
