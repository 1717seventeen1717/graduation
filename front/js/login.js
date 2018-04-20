(function(){
	$user=$('#e-u-t');
	$pwd=$('#pwd');
	var bstopuser=true;
	var bstoppwd=true;
	$user.on('input',function(){
		if($user.val()!=''){
			$user.parent().find('.i-status').show();
			$user.parent().find('.i-status').on('click',function(){
				$user.val('');
				$(this).hide();
			});
			bstopuser=false;
		}
		else
		{
			$user.parent().find('.i-status').hide();
			bstopuser=true;
		}
	});
	$pwd.on('input',function(){
		if($pwd.val()!=''){
			$pwd.parent().find('.i-status').show();
			$pwd.parent().find('.i-status').on('click',function(){
				$pwd.val('');
				$(this).hide();
			});
			bstoppwd=false;
		}
		else
		{
			$pwd.parent().find('.i-status').hide();
			bstoppwd=true;
		}
	});
	function addCookie(key,value,day){
					var date=new Date();//创建日期对象
					date.setDate(date.getDate()+day);//过期时间：获取当前的日期+天数，设置给date
					document.cookie=key+'='+encodeURI(value)+';expires='+date;//添加cookie，设置过期时间
				}
				$('#submit').on('click',function(){
//					alert(3);
					var $username=$user.val();
					var $password=$pwd.val();
					$.ajax({
						type:'post',
						url:'php/login.php',
						data:{//将用户名和密码传输给后端
							name:$username,
							pass:$password
						},
						success:function(data){//请求成功，接收后端返回的值
//							alert(data);
							if(!data){//用户名或者密码错误
//								$('#error').html('用户名或者密码错误');
//								$('#password').val('');
//								location.href='login.html';
								$('#warning').show();
								$pwd.val('');
								$('#submit').attr('type','button');
//								alert('请输入正确的账号密码');
//								window.onload();
								//alert(1);
							}else{//成功时，将用户名给cookie
								$('#warning').hide();
								$('#submit').attr('type','submit');
								addCookie('UserName',$username,7);
								location.href='index.html';//跳转到首页
								//alert(2);
							}
						}
					})
				});
})();


////选择复选框
//(function(){
//	var manager=$('#Manager');
//	var person=$('#Person');
//	if(manager.attr('checked','checked')){
//		person.attr('checked','');
//	}
//	if(person.attr('checked','checked')){
//		manager.attr('checked','');
//	}
//})();

