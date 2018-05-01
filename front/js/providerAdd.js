//判断输入框
;(function(){
	var oInput=$('input').not('input[type="button"]');
//	console.log(oInput.length); 
	oInput.on('blur',function(){
//		console.log($(this).index());
		if($(this).val()){
//			console.log($(this).val());
			$(this).siblings('span').html('');
			$(this).parent().removeClass('error');
			$(this).parent().addClass('ok');
		}
		else{
			$(this).siblings('span').html('*请输入对应项');
			$(this).parent().removeClass('ok');
			$(this).parent().addClass('error');
		}
	})
})();
//点击返回/保存 回到list页面,
;(function(){
	var back=$('input[mold="back"]');
	var save=$('input[mold="save"]');
	var providerCode=$('#providerId');
	var providerName=$('#providerName');
	var provide=$('#provide');
	var linkman=$('#people');
	var phoneNumber=$('#phone');
	var fax=$('#fax');
	var desc=$('#describe');
	var oInput=$('input').not('input[type="button"]');
	var bstop=true;
	back.click(function(){
//		alert(providerCode.val());
		document.location='providerList.html';
	})
	save.click(function(){
//		console.log(providerCode);
		$.each(oInput, function(i) {
			if(!$(this).val()){
				bstop=false;
				return ;
			}
			else{
				bstop=true;
				
			}
		});
		
		if(bstop){
//			console.log(providerCode);
			$.ajax({
			type:"post",
			url:"http://localhost:3000/providers/data",
			async:true,
			data:{
				providerCode:providerCode.val(),
				providerName:providerName.val(),
				provide:provide.val(),
				linkman:linkman.val(),
				phoneNumber:phoneNumber.val(),
				fax:fax.val(),
				desc:desc.val()
			}
			}).done(function(){
				document.location='providerList.html';
			});
		}
		
	})
})();
