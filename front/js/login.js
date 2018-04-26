(function(){
	$user=$('#e-u-t');
	$pwd=$('#pwd');
	$Manager=$('#Manager');
	$Person=$('#Person');
	var bstopuser=true;
	var bstoppwd=true;
	var bstopmanager=true;
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
//	console.log($('input[name="radio"]'));
	$('input[name="radio"]').on('click',function(){
		$('input[name="radio"]').removeAttr('checked');
		$(this).attr('checked','checked');
//		console.log($('input[checked="checked"]'));
	})
	function addCookie(key,value,day){
					var date=new Date();//创建日期对象
					date.setDate(date.getDate()+day);//过期时间：获取当前的日期+天数，设置给date
					document.cookie=key+'='+encodeURI(value)+';expires='+date;//添加cookie，设置过期时间
				}
				$('#submit').on('click',function(){
//					alert(3);
					var $username=$user.val();
					var $password=$pwd.val();
					var $type;
					if($Manager.attr('checked')||$Person.attr('checked')){
						bstopmanager=false;
						if($Manager.attr('checked')){
							$type='管理员';
						}
						else if($Person.attr('checked')){
							$type='普通用户';
						}
					}
					else{
						$('#warning').show();
					}
//					console.log($type);
					if (bstopuser || bstoppwd || bstopmanager) {
			//      	alert(1);
			            return false; //阻止按钮跳转。
			        }
					else{
//						alert(1);
						$.ajax({
							type:'post',
							url:'http://localhost:3000/users/listsomething',
							data:{//将用户名和密码传输给后端
								username:$username,
								password:$password
//								type:$type
							}
						}).done(function(data){
								console.log(data.docs);
								if(data.docs.length<=0){
									//用户名或者密码错误
	//								$('#error').html('用户名或者密码错误');
	//								$('#password').val('');
	//								location.href='login.html';
									
									$('#warning').show();
									$pwd.val('');
//									$('#submit').attr('type','button');
									
	//								alert('请输入正确的账号密码');
	//								window.onload();
									//alert(1);
								}else{//成功时，将用户名给cookie
									$('#warning').hide();
//									$('#submit').attr('type','submit');
									addCookie('UserName',$username,7);
									if($type=='管理员'){
										if($Manager.attr('checked')){
											location.href='indexmanager.html';//跳转到管理首页
										}
										else if($Person.attr('checked')){
											location.href='index.html';
										}
									}
									else if($type=='普通用户'){
										location.href='index.html';//跳转到首页
									}
	//								location.href='index.html';//跳转到首页
									//alert(2);
								}
							});
//							请求成功，接收后端返回的值
//							alert(data);;
						}
				});
})();

//;(function(){
//	$(document).ready(function(){
//  	$('input[name="radio"]').removeAttr('checked');
//  });
//})();
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

