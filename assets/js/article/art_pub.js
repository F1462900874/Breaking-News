var layer = layui.layer;
var form = layui.form;

//初始化文章分类
initCate();
function initCate() {
  $.ajax({
    type: "GET",
    url: "/my/article/cates",
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("初始化文章分类失败！");
      }
      var htmlStr = template("tpl-cate", res);
      $("[name=cate_id]").html(htmlStr);
      form.render();
    },
  });
}

// 初始化富文本编辑器
initEditor();

// 1. 初始化图片裁剪器
var $image = $("#image");
// 2. 裁剪选项
var options = {
  aspectRatio: 400 / 280,
  preview: ".img-preview",
};
// 3. 初始化裁剪区域
$image.cropper(options);

/* 选择图片事件 */
$("#btnChooseImage").on("click", function () {
  $("#coverFile").click();
});

$("#coverFile").on("change", function (e) {
  var files = e.target.files;
  if (files.length === 0) {
    return layer.msg("请至少上传一张图片");
  }
  // 根据文件,创建对应的URL地址
  var newImgURL = URL.createObjectURL(files[0]);
  $image.cropper("destroy").attr("src", newImgURL).cropper(options);
});

var art_state = "已发布";
$("#btnSave2").on("click", function () {
  art_state = "草稿";
});

$("#form-pub").on("submit", function (e) {
  e.preventDefault();
  var fd = new FormData($(this)[0]);
  fd.append("state", art_state);
  fd.append("content", tinymce.activeEditor.getContent());

  $image
    .cropper("getCroppedCanvas", {
      // 创建一个 Canvas 画布
      width: 400,
      height: 280,
    })
    .toBlob(function (blob) {
      fd.append("cover_img", blob);
      publishArtcle(fd);
    });
});

//封装裁剪封面的函数
function publishArtcle(fd) {
  $.ajax({
    type: "POST",
    url: "/my/article/add",
    data: fd,
    contentType: false,
    processData: false,
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("发布文章成功");
      location.href = "art_list.html";
    },
  });
}
