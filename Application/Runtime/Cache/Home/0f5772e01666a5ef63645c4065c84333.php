<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>管理员列表</title>
<link rel="stylesheet" type="text/css" href="/gitjob/Public/css/erweima-style.css" />
<script type="text/javascript" src="/gitjob/Public/js/jquery.js"></script>
<script type="text/javascript" src="/gitjob/Public/js/js.js"></script>
</head>

<body>
<div class="chuda_co" id="container">
  <div class="co-box">
    <div class="title">
      <h4>权限管理管理>>用户列表</h4>
    </div>
    <div class="right container">
        <div class="custom-info">
            <div class="info-box">
                <ul class="ul-datetime">
                    <li>
                        <label>用户名称：</label>
                        <input type="text" class="w100" id="text">
                    </li>
                    <li><a class="btn01" id="search">查询</a></li>
                    <a class="btn03" href="<?php echo ($url); ?>/Index/xzgly">新增用户</a>
                    <!--<a class="btn02" href="">批量删除</a>-->
                </ul>
            </div>
        </div>
      <!--detail start-->
      <div class="co-detail clearfix"> 
        <table class="tablelist" border="0" cellpadding="0" cellspacing="0">
            <thead>
              <tr>
                <th>用户ID</th>
                <th>用户名</th>
                <th>性别</th>
                <th>所属渠道</th>
                <th>职位</th>
                <th>角色</th>
                <th>手机号</th>
                <th>Email</th>
                <th>编辑</th>
              </tr>
            </thead>
            <tbody id="data"></tbody>
          </table>
          <!--分页 start-->
          <div class="pages">
            <div class="sum">共<i><span id="count"></span></i>条记录</div>
            <div class="pages-btn">
              <a class="pre" id="last_page">上一页</a>
              <div class="num-btn" id="page"></div>
              <a class="after" id="next_page">下一页</a>
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
        <h3 class="title-big">修改班级信息</h3><a class="pop-close">X</a >
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
        <div class="preview"> <a class="preview-btn btn01">保存</a > <a class="cancel-btn btn01">取消</a > </div>
    </div>
</div>
</body>
</html>
<script type="text/javascript" src="/gitjob/Public/js/jquery.js"></script>
<script type="text/javascript" src="/gitjob/Public/js/common.js"></script>
<script type="text/javascript" src="/gitjob/Public/js_logic/jurisdiction.js"></script>