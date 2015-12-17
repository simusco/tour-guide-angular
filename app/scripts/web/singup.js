function checkPwdStrength(string, fn) {
	if (string.length >= 6) {
		if (/[a-zA-Z]+/.test(string) && /[0-9]+/.test(string)
				&& /\W+\D+/.test(string)) {
			fn(1);
		} else if (/[a-zA-Z]+/.test(string) || /[0-9]+/.test(string)
				|| /\W+\D+/.test(string)) {
			if (/[a-zA-Z]+/.test(string) && /[0-9]+/.test(string)) {
				fn(-1);
			} else if (/\[a-zA-Z]+/.test(string) && /\W+\D+/.test(string)) {
				fn(-1);
			} else if (/[0-9]+/.test(string) && /\W+\D+/.test(string)) {
				fn(-1);
			} else {
				fn(0);
			}
		}
	} else {
		fn(null);
	}
}

function checkPwdLength(string, print) {
	var flag = false;

	if (string.length >= 6) {
		flag = true;
	}

	if (print != undefined)
		print(flag);

	return flag;
}

function printMsg(name, msg) {
	var c = $('*[ui-valid-msg=' + name + ']');
	c.empty();
	c.append('<small>'+msg+'</small>');
}

function clearMsg(name) {
	var c = $('*[ui-valid-msg=' + name + ']');
	c.empty();
}

function checkPwdSame() {
	var password = $('input[name=password]').val(), repassword = $(
			'input[name=repassword]').val();

	if (password != repassword) {
		return false;
	}

	return true;
}

function checkPhoneIsExists(fn) {
	var loginId = $('input[name=loginId]').val();

	$.ajax({
		url : contextPath + '/web/v1/user/exists.html',
		async : true,
		method : 'POST',
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : {
			'phoneNo' : loginId
		},
		success : function(resp) {
			var flag = $.parseJSON(resp).flag;
			console.log(flag);

			fn(flag);
		},
		error : function(resp) {
			alert('网络出现问题，刷新页面重新尝试！');
		}
	});
}

function checkIsPhontNo(string) {
	return !!string
			.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
}

function checkLoginId(fn) {
	var loginId = $('input[name=loginId]').val();

	if (loginId == null || loginId == '') {
		printMsg('loginId', '*必须填写')
		return;
	}

	if (!checkIsPhontNo(loginId)) {
		printMsg('loginId', '*手机号码不正确')
		return;
	}

	checkPhoneIsExists(fn);
}

function checkName() {
	var val = $('input[name=name]').val();
	if (val == null || val.length < 2 || val.length > 6) {
		return false;
	}
	return true;
}

function bindCheckName() {
	$('input[name=name]').keyup(function() {
		var flag = checkName();

		if (!flag) {
			printMsg('name', '*长度为2-6汉字')
		} else {
			clearMsg('name');
		}
	});
}

function bindCheckPwd(o) {

	o.keyup(function() {
		var self = $(this), val = self.val(), pwdLevel = self.parent().find(
				'*[ui-pwd]');
	
		checkPwdStrength(val, function(num) {
			if (pwdLevel.length == 0) {
				pwdLevel.find('*[ui-pwd-level]').removeClass('active');
				return;
			}

			if (num == 1) {
				pwdLevel.find('*[ui-pwd-level]').addClass('active');
			} else if (num == -1) {
				pwdLevel.find('*[ui-pwd-level=weak]').addClass('active');
				pwdLevel.find('*[ui-pwd-level=mid]').addClass('active');
			} else {
				pwdLevel.find('*[ui-pwd-level=weak]').addClass('active');
			}
		});
		
	});

	o.blur(function() {
		if (!checkPwdSame()) {
			printMsg('password', '*密码必须一致');
			printMsg('repassword', '*密码必须一致');
		}else{
			clearMsg('password');
			clearMsg('repassword');
			
			var self = $(this), val = self.val();
			checkPwdLength(val, function(flag) {
				!flag ? printMsg(self.attr('name'), '*必须填写,长度不少6位')
						: printMsg(self.attr('name'), '');
			});
		}
	});

}

function bindCheckLoginId(loginId) {
	loginId.blur(function() {
		var val = $(this).val(), self = $(this);

		checkLoginId(function(flag) {
			var ename = self.attr('name');
			if (flag) {
				printMsg(ename, '*帐号已经注册');
			} else {
				clearMsg(ename, '');
			}
		});
	});
}