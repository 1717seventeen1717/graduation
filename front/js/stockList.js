//页面刷新时显示所有用户信息
;(function(){
	$(document).ready(function display(){
//  	var oTbody=$('.providerTable tbody');
		//	console.log(oTbody.length);
//			var html='';
			$.ajax({
				type:"post",
				url:"http://localhost:3000/stocks/listEverything",
				async:true
			}).done(function(data){
				console.log(data);
				addTable(data);
//				insertdelivery(data);
//				paginate();
			}).done(function(data){
				$.each($('.tdNumber'), function(i) {
//					console.log($('.tdNumber').eq(i).html());
					if(parseInt($('.tdNumber').eq(i).html())<=100){
						console.log(i);
						$('.tdNumber').eq(i).addClass('short');
						$('.tdNumber').eq(i).html(data.docs[i].number+'库存不足，请补仓！');
					}
					else{
						$('.tdNumber').eq(i).removeClass('short');
					}
				});
//				console.log(data);
//				$('.Update').click(function(){
////					console.log($(this));
//					getId($(this));
//				});
//				$('.accept').click(function(){
//					var bstop=confirm('您确定要收货吗？');
//					if(bstop){
//						
//					}
//				})
			});
//			var a=new Date().format('yyyy-MM-dd hh:mm:ss');
//			console.log(a);
//  	console.log($('tr'));
//  	console.log($('.providerTable'));
    });
})();


//拼接表格函数
function addTable(obj){
	var html='';
	var oTbody=$('.providerTable tbody');
	console.log(obj.docs);
	$.each(obj.docs, function(i) {
//					console.log(i);
					var idRegExp = new RegExp(/^\w{0,22}/g);
		//			console.log(data.docs[i]._id);
//					obj.docs[i]._id=obj.docs[i]._id.replace(idRegExp,'');
					
					html+=`<tr>
					<td class="tdId" style="display:none">${obj.docs[i]._id}</td>
					<td>${i+1}</td>
					<td>${obj.docs[i].providerCode}</td>
					<td class="tdUsername">${obj.docs[i].providerName}</td>
					<td>${obj.docs[i].provideCode}</td>
					<td>${obj.docs[i].goods}</td>
					<td class="tdNumber">${obj.docs[i].number}</td>
					<td>${obj.docs[i].date}</td>
					
		                    </tr>`;
//		            <td>
//                      <a href="deliveryUpdate.html" class="Update"><img src="img/xiugai.png" alt="修改" title="修改"/></a>
//						
//		           </td>
		//			html+=`<tr><td>${data.docs[i]._id}</td></tr>`;	
		//			console.log(i);
				});
	oTbody.append(html);
	paginate();
	//点击查看 传输id
//	view();
}

//将数据添加到收货单中 只有选择了收货数量才能生成收货单
function insertdelivery(){
//	$.ajax({
//		type:"get",
//		url:"",
//		async:true
//	});
}
//获取当前行的id
function getId(obj){
	var value=obj.parent().siblings('.tdId').html();
//	console.log(value);
		$.ajax({
			type:"post",
			url:"http://localhost:3000/deliverys/listbyid",
			async:true,
			data:{
				_id:value
			}
		}).done(function(data){
//			console.log(data.docs[0]._id);
			addCookie('onlydeliveryid',data.docs[0]._id,7);
			addCookie('onlydeliverynumber',data.docs[0].number,7);
	});
}

//点击查询 搜索含有该字符的所有用户名信息

;(function(){
	var oSearch = $('input[value="查询"]');
	var oSearchText=$('input[placeholder="请输入商品的名称"]');
//	$('input[name="radio"]')
	oSearch.mousedown(function(){
		oSearch.css('background-color','#5d8410');
	});
	
	oSearch.mouseup(function(){
		oSearch.css('background-color','');
	});
	
	oSearch.click(function(){
		var textValue=oSearchText.val();
		console.log(textValue);
		if(textValue!=''){
			$.ajax({
			type:"post",
			url:"http://localhost:3000/stocks/listGoods",
			async:true,
			data:{
				textValue:textValue
			}
			}).done(function(data){
					clearTable();
//					console.log(data);
					addTable(data);
//					paginate();
				});
		}
		else{
			$.ajax({
			type:"post",
			url:"http://localhost:3000/stocks/listEverything",
			async:true,
			}).done(function(data){
					clearTable();
//					console.log(data);
					addTable(data);
//					paginate();
				});
		}
		
	})
})();
