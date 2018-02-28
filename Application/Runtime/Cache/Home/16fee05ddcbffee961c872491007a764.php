<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>角色列表</title>
<link rel="stylesheet" type="text/css" href="/gitjob/Public/css/erweima-style.css" />
<script type="text/javascript" src="/gitjob/Public/js/jquery.js"></script>
<script type="text/javascript" src="/gitjob/Public/js/js.js"></script>
</head>

<body>
<div class="chuda_co" id="container">
  <div class="co-box">
    <div class="title">
      <h4>权限管理>>角色列表</h4>
    </div>
    <div class="right"> 
    	<a class="btn03" href="<?php echo ($url); ?>/Index/xzjs">新增角色</a>
      <!--detail start-->
      <div class="co-detail clearfix"> 
        <table class="tablelist" border="0" cellpadding="0" cellspacing="0">
            <thead>
              <tr>
                <th>角色ID</th>
                <th>角色名称</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody id="data"></tbody>
          </table>
          <!--分页 start-->
          <div class="pages">
            <div class="sum">共<i><span id="count"></span></i>条记录</div>
            <div class="pages-btn">
              <a class="pre">上一页</a>
              <div class="num-btn" id="page"></div>
              <a class="after">下一页</a>
            </div>
          </div>
          <!--分页 end-->
      </div>
      <!--detail end--> 
    </div>
  </div>
</div>
<div class="pop_layer add-mess">
  <div class="fill-info pop-layer-box">
    <h3 class="title-big">修改班级信息</h3><a class="pop-close">X</a>
    <div class="info-box">
      <ul>
        <li>
          <label>班级名称：</label>
          <input type="text" name="name" class="w200 name" value="">
        </li>
        <li>
          <label>班主任：</label>
          <select class="w200">
            <option>于强</option>
            <option>张三</option>
          </select>
        </li>
        <li>
          <label>讲师：</label>
          <select class="w200">
            <option>李朋</option>
            <option>王五</option>
          </select>
        </li>
      </ul>
    </div>
    <div class="preview"> <a class="preview-btn btn01">保存</a> <a class="cancel-btn btn01">取消</a> </div>
  </div>
</div>
</body>
</html>
<script type="text/javascript" src="/gitjob/Public/js/jquery.js"></script>
<script type="text/javascript" src="/gitjob/Public/js/common.js"></script>
<script type="text/javascript" src="/gitjob/Public/js_logic/js_list.js"></script>