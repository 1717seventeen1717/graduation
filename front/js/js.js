/**
 * Created by yaling.he on 2015/11/17.
 */

//供应商管理页面上点击删除按钮弹出删除框(providerList.html)
$(function () {
    $('.removeProvider').click(function () {
        $('.zhezhao').css('display', 'block');
        $('#removeProv').fadeIn();
    });
});

$(function () {
    $('#no').click(function () {
        $('.zhezhao').css('display', 'none');
        $('#removeProv').fadeOut();
    });
});


//订单管理页面上点击删除按钮弹出删除框(billList.html)
$(function () {
    $('.removeBill').click(function () {
        $('.zhezhao').css('display', 'block');
        $('#removeBi').fadeIn();
    });
});

$(function () {
    $('#no').click(function () {
        $('.zhezhao').css('display', 'none');
        $('#removeBi').fadeOut();
    });
});

//用户管理页面上点击删除按钮弹出删除框(userList.html)
$(function () {
    $('.removeUser').click(function () {
        $('.zhezhao').css('display', 'block');
        $('#removeUse').fadeIn();
    });
});
$(function () {
    $('#no').click(function () {
        $('.zhezhao').css('display', 'none');
        $('#removeUse').fadeOut();
    });
});

//点击退出按钮
$(function () {
    $('.exitSystem').click(function () {
        $('.exitZhezhao').css('display', 'block');
        $('#exitremoveSystem').fadeIn();
    });
});

$(function () {
    $('#exitNo').click(function () {
        $('.exitZhezhao').css('display', 'none');
        $('#exitremoveSystem').fadeOut();
    });
});

$(function () {
    $('#exitYes').click(function () {
    	document.location.href="login.html";
    });
});

//登录时显示当前登录的账号
;(function(){
	function getCookie(key){
			var str=decodeURI(document.cookie);
//			console.log(str);
			var arr=str.split(';');
//			console.log(arr);
			for(var i=0;i<arr.length;i++){
				var arr1=arr[i].split('=');
 				if(arr1[0]==key){
//					console.log(arr1[1]);
					return arr1[1];
				}
			}
	}
	var cookie=getCookie('UserName');
//	console.log(cookie);
	$oA=$('.publicHeaderR .in-login');
	$oH=$('.wFont h2');
	if(cookie){
		$oA.html("您好:"+cookie+"");
		$oH.html(cookie);
	}
	else{
//		alert(1);
		$oA.html("请登录");
	}
})();

