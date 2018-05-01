//查看供货商信息
;(function(){
	$(document).ready(function display(){
//  	var oTbody=$('.providerTable tbody');
		//	console.log(oTbody.length);
//			var html='';
			var id=getCookie('onlyproviderid');
//			console.log(id);
			$.ajax({
				type:"post",
				url:"http://localhost:3000/providers/listbyid",
				async:true,
				data:{
					_id:id
				}
			}).done(function(data){
				console.log(data.docs[0]);
//				$('[zhushi=id]').html(data.docs[0]._id);
				$('[zhushi=providerCode]').html(data.docs[0].providerCode);
				$('[zhushi=name]').html(data.docs[0].providerName);
				$('[zhushi=provide]').html(data.docs[0].provide);
				$('[zhushi=linkman]').html(data.docs[0].linkman);
				$('[zhushi=tel]').html(data.docs[0].phoneNumber);
				$('[zhushi=fax]').html(data.docs[0].fax);
				$('[zhushi=desc]').html(data.docs[0].desc);
				$('[zhushi=date]').html(data.docs[0].date);
			});
//  	console.log($('tr'));
//  	console.log($('.providerTable'));
    });
    
    $('.goback').click(function(){
    	delCookie('onlyproviderid');
    })
    
})();