<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>左侧菜单</title>
<link rel="stylesheet" type="text/css" href="/gitjob/Public/css/erweima-style.css" />
<script type="text/javascript" src="/gitjob/Public/js/jquery.js"></script>
<script type="text/javascript" src="/gitjob/Public/js/js.js"></script>
</head>
<body>
<div class="left_slide_nav">
  <div class="business">
      <dl class="dl_list">
          <dt class="dl_close"><span class="expend_icon"></span><a href="javascript:;">权限管理</a></dt><!--打开状态替换close为open-->
          <dd><a href="<?php echo ($url); ?>/Index/xzgly" target="rightFrame">新增管理员</a></dd>
          <dd><a href="<?php echo ($url); ?>/Index/gly_list" target="rightFrame">管理员列表</a></dd>
          <dd><a href="<?php echo ($url); ?>/Index/xzjs" target="rightFrame">新增角色</a></dd>
          <dd><a href="<?php echo ($url); ?>/Index/js_list" target="rightFrame">角色列表</a></dd>
          <dd><a href="<?php echo ($url); ?>/Index/xzqx" target="rightFrame">新增权限</a></dd>
          <dd><a href="<?php echo ($url); ?>/Index/fpqx" target="rightFrame">分配权限</a></dd>
          <!--当前页面导航条dl添加class为dl_height,dt添加class为dl_open,dd添加class为dd_current-->
      </dl>
      <dl class="dl_list">
          <dt class="dl_open"><span class="expend_icon"></span><a href="javascript:;">编码管理</a></dt><!--打开状态替换close为open-->
          <dd><a href="bm_list.html" target="rightFrame">编码列表</a></dd>
          <dd><a href="xzbm.html" target="rightFrame">编码分组</a></dd>

          <dd><a href="bm_list.html" target="rightFrame">编码生成</a></dd>
          <dd><a href="bm_list.html" target="rightFrame">编码出库</a></dd>
          <!--当前页面导航条dl添加class为dl_height,dt添加class为dl_open,dd添加class为dd_current-->
      </dl>
      <dl class="dl_list">
          <dt class="dl_open"><span class="expend_icon"></span><a href="javascript:;">数据导入</a></dt><!--打开状态替换close为open-->
          <dd><a href="xzxs.html" target="rightFrame">检测结果导入</a></dd>
          <dd><a href="xsxx_list.html" target="rightFrame">用户信息导入</a></dd>
          <dd><a href="javascript:;" target="rightFrame">量表信息导入</a></dd>
      </dl>
      <dl class="dl_list dl_3">
          <dt class="dl_open"><span class="expend_icon"></span><a href="javascript:;">报告管理</a></dt><!--打开状态替换close为open-->
          <dd><a href="xzwj.html" target="rightFrame">新增违纪</a></dd>
          <dd><a href="wj_list.html" target="rightFrame">违纪列表</a></dd>
          <dd><a href="javascript:;" target="rightFrame">回收站</a></dd>
      </dl>
      <dl class="dl_list dl_3">
          <dt class="dl_open"><span class="expend_icon"></span><a href="javascript:;">订单管理</a></dt><!--打开状态替换close为open-->
          <dd><a href="javascript:;" target="rightFrame">班级违纪排名</a></dd>
          <dd><a href="javascript:;" target="rightFrame">阶段违纪对比</a></dd>
          <dd><a href="javascript:;" target="rightFrame">违纪类型分析</a></dd>
          <dd><a href="javascript:;" target="rightFrame">互查违纪个数</a></dd>
          <dd><a href="javascript:;" target="rightFrame">讲师违纪KPI</a></dd>
          <dd><a href="javascript:;" target="rightFrame">班主任违纪KPI</a></dd>
      </dl>
      <dl class="dl_list dl_3">
          <dt class="dl_open"><span class="expend_icon"></span><a href="javascript:;">产品管理</a></dt><!--打开状态替换close为open-->
          <dd><a href="javascript:;" target="rightFrame">产品列表</a></dd>
          <dd><a href="javascript:;" target="rightFrame">作业记录</a></dd>
      </dl>
      <dl class="dl_list dl_3">
          <dt class="dl_open"><span class="expend_icon"></span><a href="javascript:;">用户管理</a></dt><!--打开状态替换close为open-->
          <dd><a href="javascript:;" target="rightFrame">用户列表</a></dd>
          <dd><a href="javascript:;" target="rightFrame">添加用户</a></dd>
          <!--<dd><a href="xsrz_list.html" target="rightFrame">学生日志列表</a></dd>-->
      </dl>
      <dl class="dl_list dl_3">
          <dt class="dl_open"><span class="expend_icon"></span><a href="javascript:;">密码管理</a></dt><!--打开状态替换close为open-->
          <dd><a href="xgmm.html" target="rightFrame">修改密码</a></dd>
      </dl>
  </div>
</div>

</body>
</html>