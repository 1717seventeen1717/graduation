//通过数据库内容填写oSelectId option中的内容
;(function(){
	var oSelectId=$('#providerId');
	var oSelectGoods=$('#provide');
	var htmlId='';
	var resultId=[];
	$(document).ready(function display(){
			$.ajax({
				type:"post",
				url:"http://localhost:3000/providers/listEverything",
				async:true
			}).done(function(data){
				console.log(data.docs);
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
			});
    });
	/**/
	
	//第一个下拉框选中后根据供货商编号，oSelectGoods自动跳出该供货商下面的商品
	
	
	oSelectId.on('change',function(){
		changeSelection();
	});
	
})();

//改变图片文件以及总价 设置oninput事件
;
(function(){
	var oPrice=$('#price');
	var oNumber=$('#number');
	var oSum=$('#sum');
	var oImage=$('#image');
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
	oImage.on('input',function(){
		isNull($(this));
	});
})();

//点击保存，保存或者修改数据
(function(){
	var oSave=$('input[mold=save]');
//	console.log(oSave.length);
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

//下拉框随动
function changeSelection(){
	var oSelectId=$('#providerId');
	var oSelectGoods=$('#provide');
	$.ajax({
		type:"post",
		url:"http://localhost:3000/providers/listbyProviderCode",
		async:true,
		data:{
			providerCode:oSelectId.val()
		}
	}).done(function(data){
		oSelectGoods.find('option').remove();
		var htmlProvide='';
		console.log(data.docs);
		$.each(data.docs, function(i) {
			htmlProvide+=`<option value='${data.docs[i].provide}'>${data.docs[i].provide}</option>`;
		});
		oSelectGoods.append(htmlProvide);
	});
}

