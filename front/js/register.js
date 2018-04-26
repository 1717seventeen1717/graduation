//(function(){
//	window.onload
//})();
//点击下拉 弹出国家框
;
(function() {
    var $phonearea = $('.phone-area');
    var $areaphonedrop = $('#area-phone-drop');
    $phonearea.on('click', function() {
        $areaphonedrop.toggle();
    });
})();
//点击邮箱验证显示邮箱验证
(function() {
    var $oA = $('#phone .manager-block a');
    var $oManager = $('#manager');
    $oA.on('click', function() {
        $oManager.toggle();
        if ($oA.html() == '注册成为管理员') {
            $oA.html('手机验证');
        } else {
            $oA.html('注册成为管理员');
            $('#managerIp').val('');
        }
    })
})();
//点击按钮显示竖杠失去焦点消失
(function() {
    var $oIpunt = $('input');
    var $oI = $('.warning-title');
    $oI.on('click', function() {
        $(this).parent().find($oIpunt).css('position', 'relative').focus();
        $(this).css('display', 'none');
    });
    $oIpunt.on('click', function() {
        $(this).css('position', 'relative').focus();
        $(this).parent().find($oI).css('display', 'none');
    })
    $oIpunt.blur(function() {
        if ($(this).val() == '') {
            $(this).css('position', 'static');
            $(this).parent().find($oI).css('display', 'block');
        }

        //		alert(1);
    })
})();
//验证
(function() {
    var bstopuser = true; //用户名不通过
    var bstoppassword1 = true; //密码不通过
    var bstoppassword2 = true; //重复密码不通过
    var bstoptel = true; //手机号不通过
    var bstopmanagerKey=true; //管理员口令不通过
    //验证用户名		
    var usereg = /^([\u4e00-\u9fa5]|[a-zA-Z0-9\_\-]){4,20}$/;
    $('#usernameIp').focus(function() {
        if (bstopuser && $(this).val() == '') {
            $(this).parent().find('p').html(`<em></em>支持中文、字母、数字、'_'、'-'的组合 4-20个字符`).css('display', 'block');
        } else if (bstopuser) {
            $('#username').css('border', '1px solid red');
        }
    });
    $('#usernameIp').blur(function() {
        $(this).parent().find('p').html("").css('display', 'none');;
        var username = $(this).val();
        var exist=true;
        if (username != '') {
            if (usereg.test(username)) {
                $.ajax({
                    type: 'post',
                    url: 'http://localhost:3000/users/list',
                    data: { //注册的用户名传给后端
                        username: username
                    }
                    
                }).done(function(data) {
//              	console.log(data);
//              	console.log(data.docs.length);
                	$.each(data.docs, function(i) {
                		if(data.docs[i].username==username){
                			exist=false;
                		}
                	});
//              	console.log(data.docs.username);
//					console.log(data);
                    if (exist) {
                        $('#usernameIp').parent().find('.i-status').css('display', 'block');
                        $('#username').css('border', '1px solid #ccc');
                        bstopuser = false;
                    } else {
                        $('#username').css('border', '1px solid red');
                        $('#usernameIp').parent().find('p').html(`<em></em>该用户名已存在`).css('display', 'block');
                        $('#usernameIp').parent().find('.i-status').css('display', 'none');
                        bstopuser = true;
                    }
                });
            } else {
                $('#username').css('border', '1px solid red');
                $('#usernameIp').parent().find('p').html(`<em></em>格式不正确`).css('display', 'block');
                $('#usernameIp').parent().find('.i-status').css('display', 'none');
                bstopuser = true;
            }
        } else {
            $('#username').css('border', '1px solid red');
            $('#usernameIp').parent().find('p').html(`<em></em>用户名不能为空`).css('display', 'block');
            $('#usernameIp').parent().find('.i-status').css('display', 'none');
            bstopuser = true;
        }
        if (bstopuser) {
            $('#usernameIp').parent().find('p').css('color', 'red');
            $('#usernameIp').parent().find('em').css('background-position', '-17px -100px');
        } else {
            $('#username').css('border', '1px solid #ccc');
        }
    });

    //密码动态验证
    $('#password1Ip').focus(function() {
        if (bstoppassword1) {
            $(this).parent().find('p').html(`<em></em>建议使用字母数字、和符号两种以上的组合`).css('display', 'block');
            $('#password1').css('border', '1px solid #CCCCCC');
        }

    });
    $('#password1Ip').on('input', function() {
        var level = 0;
        var regpwd = /^([a-zA-Z0-9\_\-]){4,20}$/;
        var reg01 = /\d+/g;
        var reg02 = /([a-z]|[A-Z])+/g;
        var reg03 = /[^a-zA-Z0-9]+/g;
        $pwdvalue = $('#password1Ip').val()
        if ($pwdvalue != '') {
            if (regpwd.test($pwdvalue)) {
                bstoppassword1 = false;
                if (reg01.test($pwdvalue)) {
                    level++;
                }
                if (reg02.test($pwdvalue)) {
                    level++;
                }
                if (reg03.test($pwdvalue)) {
                    level++;
                }
                switch (level) {
                    case 1:
                        $('#password1Ip').parent().find('p').css('display', 'none');
                        $('.pwd-tip').css('display', 'block');
                        $('.pwd-tip').find('.pwd').css('background-position', '-17px -134px');
                        $('.pwd-tip').find('.pwd-text').html('有被盗风险，强度弱');
                        break;
                    case 2:
                        $('#password1Ip').parent().find('p').css('display', 'none');
                        $('.pwd-tip').css('display', 'block');
                        $('.pwd-tip').find('.pwd').css('background-position', '-34px -117px');
                        $('.pwd-tip').find('.pwd-text').html('强度适中');
                        break;
                    case 3:
                        $('#password1Ip').parent().find('p').css('display', 'none');
                        $('.pwd-tip').css('display', 'block');
                        $('.pwd-tip').find('.pwd').css('background-position', '-34px -134px');
                        $('.pwd-tip').find('.pwd-text').html('密码强度高');
                        break;
                }
            } else {
                $('#password1Ip').parent().find('p').html(`<em></em>格式不正确`).css('display', 'block');
                $('.pwd-tip').css('display', 'none');
                bstoppassword1 = true;
            }
        } else {
            $('#password1Ip').parent().find('p').html(`<em></em>密码不能为空`).css('display', 'block');
            $('.pwd-tip').css('display', 'none');
            bstoppassword1 = true;
        }
        if (bstoppassword1) {
            $('#password1').css('border', '1px solid red');
            $('#password1').parent().find('em').css('background-position', '-17px -100px');
            $('#password1').parent().find('p').css('color', 'red');
            $('#password1Ip').parent().find('.i-status').css('display', 'none');
        } else {
            $('#password1').css('border', '1px solid #ccc');
            $('#password1').parent().find('p').css('color', '#ccc');
            $('#password1Ip').parent().find('.i-status').css('display', 'block');
        }
    });

    //密码验证重复
    $('#password2Ip').focus(function() {
        if (bstoppassword2) {
            $(this).parent().find('p').html(`<em></em>请再次输入密码`).css('display', 'block');
            $('#password2').css('border', '1px solid #CCCCCC');
            $('#password2').parent().find('em').css('background-position', '-17px -100px');
            $('#password2Ip').parent().find('.i-status').css('display', 'none');

        }
    });
    $('#password2Ip').on('input', function() {
        var regpwd = /^([a-zA-Z0-9\_\-]){4,20}$/;
        if ($(this).val() != '') {
            if (regpwd.test($(this).val())) {
                if ($(this).val() == $('#password1Ip').val()) {
                    bstoppassword2 = false;
                    $('#password2Ip').parent().find('.i-status').css('display', 'block');
                    $(this).parent().find('p').css('display', 'none');
                } else {
                    $(this).parent().find('p').html(`<em></em>两次密码不一致`).css('display', 'block');
                    bstoppassword2 = true;
                }
            } else {
                $('#password2Ip').parent().find('p').html(`<em></em>格式不正确`).css('display', 'block');
                bstoppassword2 = true;
            }
        }
        if (bstoppassword2) {
            $('#password2').css('border', '1px solid red');
            $('#password2').parent().find('em').css('background-position', '-17px -100px');
            $('#password2Ip').parent().find('.i-status').css('display', 'none');
            $('#password2').parent().find('p').css('color', 'red');
        } else {
            $('#password2').css('border', '1px solid #ccc');
            $('#password2').parent().find('p').css('color', '#ccc');
            $('#password2Ip').parent().find('.i-status').css('display', 'block');
        }
    })

    //验证手机
    $('#telIp').focus(function() {
        if (bstoptel) {
            $(this).parent().find('p').eq(0).html(`<em></em>完成注册后你可以用该手机登录`).css('display', 'block');
            $(this).parent().find('p').eq(0).css('color', '#ccc');
            $('#tel').css('border', '1px solid #CCCCCC');
        }
//      else if (bstopuser) {
//          $('#tel').css('border', '1px solid red');
//      }
    });
    
    $('#telIp').blur(function() {
            if (this.value != '') {
                var reg = /^[1][3|4|5|6|7|8|9]\d{9}$/;
                if (reg.test(this.value)) {
                    bstoptel = false;
                    $('#telIp').parent().find('.i-status').css('display', 'block');
                    $(this).parent().find('p').eq(0).css('display', 'none');
                } else {
                    $(this).parent().find('p').eq(0).html(`<em></em>手机格式不正确`).css('display', 'block');
                    bstoptel = true;
                }
            } else {
                $('#telIp').parent().find('p').eq(0).html(`<em></em>格式不正确`).css('display', 'block');
                $('#phone .warning-title').value='';
                
                bstoptel = true;
            }
            if (bstoptel) {
                $('#phone').find('p').css('color', 'red');
                $('#telIp').parent().find('em').css('background-position', '-17px -100px');
                $('#telIp').parent().find('.i-status').css('display', 'none');
                $('#phone').css('border','1px solid red');
            }
            else{
            	$('#phone').css('border', '1px solid #ccc');
            	$('#telIp').parent().find('p').css('color', '#ccc');
            	$('#telIp').parent().find('.i-status').css('display', 'block');
            }
        });
        
    //验证管理员口令
    $('#managerIp').focus(function() {
        if (bstopmanagerKey) {
            $(this).parent().find('p').eq(0).html(`<em></em>完成注册后你可以成为管理员`).css('display', 'block');
            $(this).parent().find('p').eq(0).css('color', '#ccc');
            $('#tel').css('border', '1px solid #CCCCCC');
        }
    });
    $('#managerIp').blur(function() {
            if (this.value != '') {
				if(this.value=='louzenghui'||this.value=='seventeen'){
					bstopmanagerKey = false;
                    $('#managerIp').parent().find('.i-status').css('display', 'block');
                    $(this).parent().find('p').eq(0).css('display', 'none');
				}
				else{
					$(this).parent().find('p').eq(0).html(`<em></em>管理员口令不正确`).css('display', 'block');
                    bstopmanagerKey = true;
				}
            } else {
                $('#managerIp').parent().find('p').eq(0).html(`<em></em>口令不能为空`).css('display', 'block');
                $('#manager .warning-title').value='';
                bstopmanagerKey = true;
            }
            if (bstopmanagerKey) {
                $('#managerIp').parent().find('.i-status').css('display', 'none');
                $('#manager').css('border','1px solid red');
                $('#managerIp').parent().find('p').css('color', 'red');
                $('#managerIp').parent().find('em').css('background-position', '-17px -100px');
            }
            else{
            	$('#manager').css('border', '1px solid #ccc');
            	$('#managerIp').parent().find('p').css('color', '#ccc');
            	$('#managerIp').parent().find('.i-status').css('display', 'block');
            }
        });
    
    
    
     
    //点击提交按钮
    $('.submit').on('click', function() {
        if (bstopuser || bstoppassword1 || bstoppassword2 || bstoptel) {
//      	alert(1);
            return false; //阻止按钮跳转。
        }
        else{
        	if(!bstopmanagerKey){
        		 $.ajax({
                    type: 'post',
                    url: 'http://localhost:3000/users/data',
                    data: { //注册的用户名传给后端
                        username:$('#usernameIp').val(),
                        password:$('#password1Ip').val(),
                        phoneNumber:$('#telIp').val(),
                        type: '管理员',
                    }
                    
                });
//              $.ajax({
//                  type: 'post',
//                  url: 'http://localhost:3000/users/data',
//                  data: { //注册的用户名传给后端
//                      username:$('#usernameIp').val(),
//                      password:$('#password1Ip').val(),
//                      phoneNumber:$('#telIp').val(),
//                      type: '普通用户',
//                  }
//                  
//              });
        		window.location.href="login.html";
        	}
        	else
        	{
        		 $.ajax({
                    type: 'post',
                    url: 'http://localhost:3000/users/data',
                    data: { //注册的用户名传给后端
                        username:$('#usernameIp').val(),
                        password:$('#password1Ip').val(),
                        phoneNumber:$('#telIp').val(),
                        type: '普通用户'
                    }
                    
                })
        		window.location.href="login.html";
        	}
        }
    });
})();

//删除用户
//(function() {
//  $(document).ready(function() {$.ajax("http://localhost:3000/users/data/5adb12fc1cc2a332d87dd314", {
//          type: 'delete'
//      }).done(function(res) {
//          console.log(res);
//      })
//  })
//})();