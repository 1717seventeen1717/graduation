//页面载入通过cookie取值
;(function(){
	$(document).ready(function display(){
//  	var oTbody=$('.providerTable tbody');
		//	console.log(oTbody.length);
//			var html='';
			var id=getCookie('onlyuserid');
//			console.log(id);
			$.ajax({
				type:"post",
				url:"http://localhost:3000/users/listbyid",
				async:true,
				data:{
					_id:id
				}
			}).done(function(data){
//				console.log(data.docs[0]);
				$('[name=userId]').val(data.docs[0]._id).css('color','red');
				$('[name=userName]').val(data.docs[0].username).css('color','red');
				$('[name=password]').val(data.docs[0].password);
				$('[name=userphone]').val(data.docs[0].phoneNumber);
				$('[name=userAddress]').val(data.docs[0].area);
				$('.userType').html(data.docs[0].type).css({'color':'red','margin-left':'0'});
//				console.log(data.docs[0].type);
			});
//  	console.log($('tr'));
//  	console.log($('.providerTable'));
    });
})();

//验证密码和手机号是否正确 保存或者返回删除cookie
(function(){
    var bstoppassword = true; //密码不通过
    var bstoptel = true; //手机号不通过
    $('#password').blur(function() {
    	var regpwd = /^([a-zA-Z0-9\_\-]){4,20}$/;
    	$pwdvalue = $('#password').val();
    	if ($pwdvalue != ''){
    		if (regpwd.test($pwdvalue)) {
    			$(this).parent().find('span').html('该密码可以使用');
                bstoppassword = false;
    		}
    		else {
    			console.log(1);
    			$(this).parent().find('span').html('格式不正确');
                bstoppassword = true;
            }
    	}
    	else{
    		$(this).parent().find('span').html('密码不能为空');
            bstoppassword = true;
    	}
    	console.log(bstoppassword);
    });
    
    
    
    $('#userphone').blur(function() {
            if (this.value != '') {
                var reg = /^[1][3|4|5|6|7|8|9]\d{9}$/;
                if (reg.test(this.value)) {
                	$(this).parent().find('span').html('该手机号可以使用');
                    bstoptel = false;
                } else {
                	$(this).parent().find('span').html('手机格式不正确');
                	bstoptel = true;
                }
            } else {
                $(this).parent().find('span').html('手机号不能为空');
                bstoptel = true;
            }
            console.log(bstoptel);
        });
        
//  console.log($("[mold=save]").length); 
    $("[mold=save]").click(function(){
    	
    	if(bstoptel||bstoppassword){
//  		alert('请输入正确的数据');
			if($('#userphone').parent().find('span').html('*')||$('#userphone').parent().find('span').html('*')){
    			updateInformation();
    			window.location.href='userList.html';
    		}
			else{
				return false;
			}
    		
    	}
    	
    	else{
    		updateInformation();
    		window.open('userList.html');
    	}
    	delCookie('onlyuserid',$('#userId').html());
    });
    
    $("[mold=back]").click(function(){
    	delCookie('onlyuserid',$('#userId').html());
    	window.location.href='userList.html';
    });
    
})();


//修改信息
function updateInformation(){
	var id=getCookie('onlyuserid');
	$.ajax({
		type:"put",
		url:"http://localhost:3000/users/data/"+id,
		async:true,
		data:{
			password:$('#password').val(),
			phoneNumber:$('#userphone').val()
		}
	});
}
