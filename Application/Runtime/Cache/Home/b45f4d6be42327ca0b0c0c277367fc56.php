<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>天平永达后台系统</title>

<link href="/gitjob/Public/css/style.css" rel="stylesheet" type="text/css">

</head>

<body class="login">
<!--<div class="login_logo"><img src="images/logo.png"></div>-->
<div class="login_logo"><img src="/gitjob/Public/images/login-logo.png"></div>
<div class="login_m">
	
	<div class="login_boder">
		<div class="login_padding">
			<h2>用户名</h2>
			<label>
				<input type="text" id="username" class="txt_input txt_input2" onfocus="if (value ==&#39;Your name&#39;){value =&#39;&#39;}" onblur="if (value ==&#39;&#39;){value=&#39;Your name&#39;}" value="Your name">
			</label>
			<h2>密码</h2>
			<label>
				<input type="password" name="textfield2" id="userpwd" class="txt_input" onfocus="if (value ==&#39;******&#39;){value =&#39;&#39;}" onblur="if (value ==&#39;&#39;){value=&#39;******&#39;}" value="******">
			</label>
			<div class="rem_sub">

				<label>
					<input type="button" class="sub_button" name="button" id="button" value="登录" style="opacity: 0.7;">
				</label>
			</div>
		</div>
	</div><!--login_boder end-->
</div><!--login_m end-->

<br />
<br />


</body>
</html>
<script type="text/javascript" src="/gitjob/Public/js/jquery.js"></script>
<script type="text/javascript" src="/gitjob/Public/js/common.js"></script>
<script type="text/javascript" src="/gitjob/Public/js_logic/login.js"></script>