//页面载入通过cookie取值
;(function(){
	$(document).ready(function display(){
//  	var oTbody=$('.providerTable tbody');
		//	console.log(oTbody.length);
//			var html='';
			var id=getCookie('onlydeliveryid');
//			console.log(id);
			$.ajax({
				type:"post",
				url:"http://localhost:3000/deliverys/listbyid",
				async:true,
				data:{
					_id:id
				}
			}).done(function(data){
//				console.log(data.docs[0]);
//				$('[name=userId]').val(data.docs[0]._id).css('color','red');
//				$('[name=userName]').val(data.docs[0].username).css('color','red');
//				$('[name=password]').val(data.docs[0].password);
//				$('[name=userphone]').val(data.docs[0].phoneNumber);
//				$('.userType').html(data.docs[0].type).css({'color':'red','margin-left':'0'});
				$('.deliveryNumber').val(data.docs[0].deliveryNumber);
//				console.log(data.docs[0].type);
			});
//  	console.log($('tr'));
//  	console.log($('.providerTable'));
    });
})();

//验证数量是否为空
(function(){
    $("[mold=save]").click(function(){
    	var sid=getCookie('onlydeliveryid');
    	var number=getCookie('onlydeliverynumber');
//  	console.log(typeof($('.deliveryNumber').val()));//string
//  	console.log(number);
//  	console.log(typeof(number));
//  	console.log(sid);
		if(parseInt(number)<parseInt($('.deliveryNumber').val())){
			alert('该采购订单采购货物不足，请重新输入');
		}
		else{
	    	$.ajax({
	    		type:"put",
	    		url:"http://localhost:3000/deliverys/data/"+sid,
	    		async:true,
	    		data:{
	    			deliveryNumber:$('.deliveryNumber').val(),
	    			rejectedNumber:parseInt(number)-parseInt($('.deliveryNumber').val())
	    		}
	    	}).done(function(data){
	    		console.log(data);
	    		$.ajax({
	    			type:"post",
	    			url:"http://localhost:3000/rejecteds/listbypurchaseId",
	    			async:true,
	    			data:{
	    				purchaseId:data._id
	    			}
	    		}).done(function(data1){
	    			console.log(data1.docs);
	    			//如果没有数据 则添加退货信息
					if(data1.docs.length<=0){
						//如果大于0才执行
						////确认收货生成退货单
						if(parseInt(number)-parseInt($('.deliveryNumber').val())>0){
			    			$.ajax({
			    				type:"post",
			    				url:"http://localhost:3000/rejecteds/data",
			    				async:true,
			    				data:{
			    					purchaseId:data._id,
			    					providerCode: data.providerCode,
								    providerName: data.providerName,
								    provideCode: data.provideCode,
								    goods: data.goods,
								    price: data.price,
								    number: data.number,
								    desc: data.desc,
								    date: data.date,
								    status: data.status,
								    rejectedNumber: parseInt(number)-parseInt($('.deliveryNumber').val())
			    				}
			    			}).done(function(){
			    				delCookie('onlydeliveryid');
			    				delCookie('onlydeliverynumber');
			    				window.location.href='deliveryList.html';
			    			});
			    		}
			    		else{
		    				delCookie('onlydeliveryid');
		    				delCookie('onlydeliverynumber');
		    				window.location.href='deliveryList.html';
			    		}
					}
					//否则,修改或者删除退货信息
					else{
						var rejectedId=data1.docs[0]._id;
						if(parseInt(number)-parseInt($('.deliveryNumber').val())>0){
			    			$.ajax({
			    				type:"put",
			    				url:"http://localhost:3000/rejecteds/data/"+rejectedId,
			    				async:true,
			    				data:{
			    					purchaseId:data._id,
			    					providerCode: data.providerCode,
								    providerName: data.providerName,
								    provideCode: data.provideCode,
								    goods: data.goods,
								    price: data.price,
								    number: data.number,
								    desc: data.desc,
								    date: data.date,
								    status: data.status,
								    rejectedNumber: parseInt(number)-parseInt($('.deliveryNumber').val())
			    				}
			    			}).done(function(){
			    				delCookie('onlydeliveryid');
			    				delCookie('onlydeliverynumber');
			    				window.location.href='deliveryList.html';
			    			});
			    		}
						//删除该条退货信息
						else if(parseInt(number)-parseInt($('.deliveryNumber').val())==0){
							alert(1);
							$.ajax({
			    				type:"delete",
			    				url:"http://localhost:3000/rejecteds/data/"+data._id,
			    				async:true
			    			}).done(function(){
			    				delCookie('onlydeliveryid');
			    				delCookie('onlydeliverynumber');
			    				window.location.href='deliveryList.html';
			    			});
						}
			    		else{
		    				delCookie('onlydeliveryid');
		    				delCookie('onlydeliverynumber');
		    				window.location.href='deliveryList.html';
			    		}
					}
	    		});
	    		

	    	});
		}
    });
    
    $("[mold=back]").click(function(){
    	delCookie('onlydeliveryid');
    	delCookie('onlydeliverynumber');
    	window.location.href='deliveryList.html';
    });
    
})();


//修改信息
//function updateInformation(){
//	var id=getCookie('onlyuserid');
//	$.ajax({
//		type:"put",
//		url:"http://localhost:3000/users/data/"+id,
//		async:true,
//		data:{
//			password:$('#password').val(),
//			phoneNumber:$('#userphone').val()
//		}
//	});
//}
