$('input[name="zhifu"]').on('click',function(){
	$('input[name="zhifu"]').removeAttr('checked');
	$(this).attr('checked','checked');
//		console.log($('input[checked="checked"]'));
});
$('.save').click(function(){
//		alert(1);
	
	if($('.yes').attr('checked')){
		var status='已付款'
	}
	else{
		var status='未付款'
	}
//		console.log(status);
	if($('#userName').val()&&$('#provideCode').val()&&$('#goodsName').val()&&$('#billNum').val()&&$('#phoneNumber').val()&&$('#billCom').val()&&$('#money').val()){
		$.ajax({
			type:"post",
			url:"http://localhost:3000/checks/data",
			async:true,
			data:{
				userName:$('#userName').val(),
				provideCode:$('#provideCode').val(),
				goods:$('#goodsName').val(),
				number:$('#billNum').val(),
				phoneNumber:$('#phoneNumber').val(),
				price:$('#billCom').val(),
				sum:$('#money').val(),
				status:status,
//				desc:data.docs[index].desc,
//				url:arr[index],
				area:$('#area').val()
			}
		}).done(function(){
			location.href="saleList.html";
			});
		}
		
})
