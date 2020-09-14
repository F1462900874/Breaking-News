// 获取文章分类列表
getArticleList();
function getArticleList() {
  $.ajax({
    method: "GET",
    url: "/my/article/cates",
    success: function (res) {
      var htmlStr = template("tpl-table", res);
      $("tbody").html(htmlStr);
    },
  });
}

var layer = layui.layer;
var addIndex = null;

$("#btnAddCase").on("click", function () {
  addIndex = layer.open({
    title: "添加文章分类",
    type: 1,
    area: ["500px", "300px"],
    content: $("#dialog-add").html(),
  });
});

// 注册确认添加事件
$("body").on("submit", "#form-add", function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/my/article/addcates",
    data: $(this).serialize(),
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("新增分类失败！");
      }

      layer.msg("新增分类成功！");
      getArticleList();
      layer.close(addIndex);
    },
  });
});

var edioIndex = null;
var form = layui.form;
// 注册编辑事件
$("tbody").on("click", "#btnEdio", function () {
  edioIndex = layer.open({
    title: "修改文章分类",
    type: 1,
    area: ["500px", "300px"],
    content: $("#dialog-edio").html(),
  });

  var id = $(this).attr("data-id");
  $.ajax({
    type: "GET",
    url: "/my/article/cates/" + id,
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("获取文章分类数据失败");
      }
      layer.msg("获取文章分类数成功");
      form.val("form-edio", res.data);
    },
  });
});

// 编辑提交事件
$("body").on("submit", "#form-edio", function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/my/article/updatecate",
    data: $(this).serialize(),
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("更新分类信息失败");
      }
      layer.msg("更新分类信息成功");
      getArticleList();
      layer.close(edioIndex);
    },
  });
});

// 删除事件
$("tbody").on("click", "#btn-delete", function (e) {
  e.preventDefault();
  var id = $(this).attr("data-id");
  console.log(id);
  layer.confirm(
    "确定要删除分类?",
    { icon: 3, title: "提示" },

    function (index) {
      $.ajax({
        type: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message);
          }
          layer.msg("删除分支成功");
          getArticleList();
          layer.close(index);
        },
      });
    }
  );
});
