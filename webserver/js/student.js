$(function(){
// 设置初始页码
var index = 1;
var maxIndex = 0;
// 获取学生数据的封装函数
function studentAjax(){
  $.ajax({
    type : "get",
    dataType : "json",
    data: `pageNum=${index}`,
    url : "http://127.0.0.1:3000/api/student",
    success : function(data){
      // 没有数据时，直接退出
      if(!data.code == 0){
        return;
      }
      var students = data.listed.data;
      var str = ``;
      // 将获取的数据渲染出去
      for(var i = 0; i < students.length; i++){
        var item = students[i];
        str += `
              <tr>
                <td>${i + 1}</td>
                <td>${item.studentName}</td>
                <td>${item.age}</td>
                <td>${item.grade}</td>
                <td><button class="btn btn-danger">删除</button></td>
              </tr>`;
      }
      $("#tbody").html(str);
      // 将页数渲染出去
      var studentNumStr = ``;
      maxIndex = data.listed.studentNum;
      studentNumStr += `<li class="lv-pagination__item prev"><a href="javascript:;"><i class="iconfont icon-doubleleft"></i></a></li>`;
      for(var i = 1; i <= maxIndex; i++){
        studentNumStr += `<li data-index=student class="lv-pagination__item ${i == index ? "active" : ""}"><a href="javascript:;">${i}</a></li>`;
      };
      studentNumStr += `<li class="lv-pagination__item next"><a href="javascript:;"><i class="iconfont icon-doubleright"></i></a></li>`
      $("#studentNum").html(studentNumStr);
    }
  });
}
// 页码加载获取一次数据
studentAjax();
// 点击页数获取相应的数据
$(".lv-pagination").on("click", ".lv-pagination__item", function(){
  if($(this).attr("data-index") == "student"){
    if(index == $(this).text()){
      return;
    }
    index = $(this).text();
    studentAjax();
  }
});
// 点击左右按钮翻页
// 前一页
$(".lv-pagination").on("click", ".prev", function(){
  if(index == 1){
    return;
  }
  index--
  studentAjax();
});
// 后一页
$(".lv-pagination").on("click", ".next", function(){
  if(index == maxIndex){
    return;
  }
  index++
  studentAjax();
});
});