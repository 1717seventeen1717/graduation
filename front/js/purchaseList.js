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
                        <a href="providerView.html" class="View"><img src="img/read.png" alt="查看" title="查看"/></a>
                        <a href="providerUpdate.html" class="Update"><img src="img/xiugai.png" alt="修改" title="修改"/></a>
                        <a href="#" class="removeProvider"><img src="img/schu.png" alt="删除" title="删除"/></a>
		           </td>
		                    </tr>`;
		//			html+=`<tr><td>${data.docs[i]._id}</td></tr>`;	
		//			console.log(i);
				});
	oTbody.append(html);
	paginate();
	//点击查看 传输id
//	view();
}