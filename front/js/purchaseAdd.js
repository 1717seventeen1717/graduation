//通过数据库内容填写oSelectId option中的内容
;(function(){
	var oSelectId=$('#providerId');
	var oSelectGoods=$('#provide');
	var oProvideCode=$('#provideCode');
	var htmlId='';
	var resultId=[];
	$(document).ready(function display(){
			$.ajax({
				type:"post",
				url:"http://localhost:3000/providers/listEverything",
				async:true
			}).done(function(data){
//				console.log(data.docs[0].desc);
				
//				console.log(data.docs);
		//		console.log(resultId.indexOf(1));
				$.each(data.docs, function(i) {
					if(resultId.indexOf(data.docs[i].providerCode)==-1){
						resultId.push(data.docs[i].providerCode);
					}
				});
		//		console.log(resultId);
				$.each(resultId, function(i) {
					htmlId+=`<option value='${resultId[i]}'>${resultId[i]}</option>`;
				});
		//		console.log(htmlId);
				oSelectId.append(htmlId);
				changeSelection();
				changePrice();
			});
    });
	/**/
	
	//第一个下拉框选中后根据供货商编号，oSelectGoods自动跳出该供货商下面的商品
	oSelectId.on('change',function(){
		changeSelection();
		changePrice();
	});
	//第二个下拉框选中后根据供货商编号，自动获取商品单价以及商品编号
	oSelectGoods.on('change',function(){
		changePrice();
		changeProvideCode();
	});
})();

//改变图片文件以及总价 设置oninput事件
;
(function(){
	var oPrice=$('#price');
	var oNumber=$('#number');
	var oSum=$('#sum');
//	var oImage=$('#image');
	var oSelectGoods=$('#provide');
	var oProvideCode=$('#provideCode');
	$('#file').on('change',function(){
		$('#image').val($(this).val());
//		console.log($(this).val());
	});
	oPrice.on('input',function(){
		isNull($(this));
		changeSum();
	});
	oNumber.on('input',function(){
		isNull($(this));
		changeSum();
	});
//	oImage.on('input',function(){
//		isNull($(this));
//	});
})();

//点击保存，保存或者修改数据 
(function(){
	var oSave=$('input[mold=save]');
	var oBack=$('input[mold=back]');
	oBack.click(function(){
		location.href='purchaseList.html';
	})
//	console.log(oSave.length);
	oSave.click(function(){
		console.log($('#provideCode').find('option').val());
		if($('#providerId').val()&&$('#providerName').val()&&$('#provideCode').val()&&$('#provide').val()&&$('#price').val()&&$('#number').val()&&$('#desc').val())
		{
			
			$.ajax({
				type:"post",
				url:"http://localhost:3000/purchases/listbyProvideCode",
				async:true,
				data:{
					provideCode:$('#provideCode').find('option').val()
				}
			}).done(function(data){
				//如果存在，则修改数据
				
//				if(data.docs.length>0){
//					console.log(data);
//					$.ajax({
//						type:"put",
//						url:"http://localhost:3000/purchases/data/"+data.docs[0]._id,
//						async:true,
//						data:{
//							number:parseInt(data.docs[0].number)+parseInt($('#number').val()),
////							url:$('#image').val(),
//						    desc:$('#desc').val()
//						}
//					}).done(function(data){
//						console.log(data);
//						location.href='goodsList.html';
//					});
//				}
//				//不存在 则添加数据
//				else{
					$.ajax({
						type:"post",
						url:"http://localhost:3000/purchases/data",
						async:true,
						data:{
							providerCode:$('#providerId').val(),
							providerName:$('#providerName').val(),
							provideCode:$('#provideCode').find('option').val(),
							goods:$('#provide').val(),
						    price:$('#price').val(),
						    number:$('#number').val(),
						    status:'未收货',
//						    url:$('#image').val(),
						    desc:$('#desc').val()
						}
					}).done(function(data){
							$.ajax({
							type:"post",
							url:"http://localhost:3000/deliverys/data",
							async:false,
							data:{
								providerCode:$('#providerId').val(),
								providerName:$('#providerName').val(),
								provideCode:$('#provideCode').find('option').val(),
								goods:$('#provide').val(),
							    price:$('#price').val(),
							    number:$('#number').val(),
							    status:'未收货',
	//						    url:$('#image').val(),
							    desc:$('#desc').val(),
							    deliveryNumber:'',
							    rejectedNumber:''
							}
						}).done(function(data1){
							console.log(data1);
	//						console.log(data);
							location.href='purchaseList.html';
						});
					});
					
					
//				}
			});
			
			
		}
		else{
			alert('请输入数据');
		}
	})
})();

//根据数量和单价，重新计算并把值输入总价处
function changeSum(){
	var oPrice=$('#price');
	var oNumber=$('#number');
	var oSum=$('#sum');
	oSum.val(oPrice.val()*oNumber.val());
}

//文本框验证是否为空
function isNull(obj){
	if(obj.val()){
//			console.log($(this).val());
			obj.siblings('span').html('');
			obj.parent().removeClass('error');
			obj.parent().addClass('ok');
		}
		else{
			obj.siblings('span').html('*请输入对应项');
			obj.parent().removeClass('ok');
			obj.parent().addClass('error');
	}
}

//商品名称下拉框随动
function changeSelection(){
	var oSelectId=$('#providerId');
	var oSelectGoods=$('#provide');
	var oProviderName=$('#providerName');
	var oProvideCode=$('#provideCode');
	var oPrice=$('#price');
	$.ajax({
		type:"post",
		url:"http://localhost:3000/providers/listbyProviderCode",
		async:true,
		data:{
			providerCode:oSelectId.val()
		}
	}).done(function(data){
//		console.log(data);
		oProviderName.val(data.docs[0].providerName);
		$('#desc').val(data.docs[0].desc);
		oSelectGoods.find('option').remove();
		oProvideCode.find('option').remove();
		var htmlProvide='';
		var htmlProvideCode='';
//		console.log(data.docs);
		$.each(data.docs, function(i) {
			htmlProvide+=`<option value='${data.docs[i].provide}'>${data.docs[i].provide}</option>`;
			htmlProvideCode+=`<option value='${data.docs[i].provideCode}'>${data.docs[i].provideCode}</option>`
		});
		oSelectGoods.append(htmlProvide);
		oProvideCode.append(htmlProvideCode);
	}).done(function(){
		changePrice();
	});
}


//商品价格随动
function changePrice(){
	var oSelectId=$('#providerId');
	var oSelectGoods=$('#provide');
	var oProviderName=$('#providerName');
	var oPrice=$('#price');
//	console.log(oPrice.val());
//	console.log(oSelectId.val());
		$.ajax({
			type:"post",
			url:"http://localhost:3000/providers/listbyProvide",
			async:true,
			data:{
				provide:oSelectGoods.val()
			}
		}).done(function(data){
//			console.log(data.docs);
//			console.log(data.docs[0].price);
			oPrice.val(data.docs[0].price);
		});
//		oPrice.val(data.docs)
}
//商品编号随动
function changeProvideCode(){
	var oSelectId=$('#providerId');
	var oSelectGoods=$('#provide');
	var oProviderName=$('#providerName');
	var oProvideCode=$('#provideCode');
	var oPrice=$('#price');
	$.ajax({
		type:"post",
		url:"http://localhost:3000/providers/listbyProvide",
		async:true,
		data:{
			provide:oSelectGoods.val()
		}
	}).done(function(data){
//		console.log(data);
		oProviderName.val(data.docs[0].providerName);
		oProvideCode.find('option').remove();
		var htmlProvideCode='';
		console.log(data.docs);
		$.each(data.docs, function(i) {
			htmlProvideCode+=`<option value='${data.docs[i].provideCode}'>${data.docs[i].provideCode}</option>`
		});
		oProvideCode.append(htmlProvideCode);
//		console.log(oProvideCode.find('option').val());
	}).done(function(){
		changeSum();
	});
}

