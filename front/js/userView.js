//查看用户信息
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
				$('[zhushi=id]').html(data.docs[0]._id);
				$('[zhushi=name]').html(data.docs[0].username);
				$('[zhushi=tel]').html(data.docs[0].phoneNumber);
				$('[zhushi=type]').html(data.docs[0].type);
			});
//  	console.log($('tr'));
//  	console.log($('.providerTable'));
    });
    
    $('.goback').click(function(){
    	delCookie('onlyuserid',$('[zhushi=id]').html());
    })
    
})();