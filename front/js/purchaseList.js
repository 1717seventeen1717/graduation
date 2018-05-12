//页面刷新时显示所有用户信息
;(function(){
	$(document).ready(function display(){
//  	var oTbody=$('.providerTable tbody');
		//	console.log(oTbody.length);
//			var html='';
			$.ajax({
				type:"post",
				url:"http://localhost:3000/purchases/listEverything",
				async:true
			}).done(function(data){
				console.log(data);
				addTable(data);
				//删除采购单
				$('.removeProvider').click(function(){
					var bstop=confirm('您确定要删除这条采购单吗？');
					var index=$(this).index('.removeProvider');
					var sid=$('.tdId').eq(index).html();
//					console.log(sid);
					if(bstop){
						$.ajax({
							type:"delete",
							url:"http://localhost:3000/purchases/data/"+sid,
							async:true
						}).done(function(){
							location.reload();
						});
					}
				})
//				paginate();
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
					<td>${obj.docs[i].number}</td>
					<td>${obj.docs[i].date}</td>
					<td> 
                        <a href="#" class="removeProvider"><img src="img/schu.png" alt="删除" title="删除"/></a>
		           </td>
		                    </tr>`;
//		            <a href="providerView.html" class="View"><img src="img/read.png" alt="查看" title="查看"/></a>
//                  <a href="providerUpdate.html" class="Update"><img src="img/xiugai.png" alt="修改" title="修改"/></a>
		//			html+=`<tr><td>${data.docs[i]._id}</td></tr>`;	
		//			console.log(i);
				});
	oTbody.append(html);
	paginate();
	//点击查看 传输id
//	view();
}
//清空表格
function clearTable(){
	var oTbody=$('.providerTable tbody tr').not('.firstTr');
//	console.log(oTbody);
	oTbody.remove();
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
			url:"http://localhost:3000/purchases/listGoods",
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
			url:"http://localhost:3000/purchases/listEverything",
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