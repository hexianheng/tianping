<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>修改密码</title>
  <link rel="stylesheet" type="text/css" href="/gitjob/Public/css/erweima-style.css" />
</head>

<body>
<div class="chuda_co" id="container">
  <div class="co-box">
    <div class="title"><h4>密码管理>>修改密码</h4></div>
    <div class="fill-info">
      <div class="info-box">
        <ul>
          <li>
            <label>请输入旧密码：</label>
            <input type="password" name="name" class="w200 name" value="" id="pwdOld" onblur="pwdOld()"><span id="msg_old"></span>
          </li>
          <li>
            <label>请输入新密码：</label>
            <input type="password" name="name" class="w200 name" value="" id="password" onblur="password()"><span id="msg_new"></span>
          </li>
          <li>
            <label>确认新密码：</label>
            <input type="password" name="name" class="w200 name" value="" id="pwdAgain" onblur="pwdAgain()"><span id="msg_Again"></span>
          </li>

        </ul>
      </div>
      <div class="preview"> <a class="preview-btn btn01" id="submit" onclick="submit();">修改密码</a></div>
    </div>
  </div>
</div>
</body>
</html>
<script type="text/javascript" src="/gitjob/Public/js/jquery.js"></script>
<script type="text/javascript" src="/gitjob/Public/js/common.js"></script>
<script type="text/javascript" src="/gitjob/Public/js_logic/xgmm.js"></script>