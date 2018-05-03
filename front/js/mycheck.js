//页面刷新时显示当前用户所有账单信息
;(function(){
	$(document).ready(function display(){
//  	var oTbody=$('.providerTable tbody');
		//	console.log(oTbody.length);
//			var html='';
			$.ajax({
				type:"post",
				url:"http://localhost:3000/checks/listEverything",
				async:true
			}).done(function(data){
//				console.log(data);
				addTable(data);
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
					<td class="tdId">${obj.docs[i]._id}</td>
					<td>${obj.docs[i].userName}</td>
					<td>${obj.docs[i].goods}</td>
					<td class="tdUsername">${obj.docs[i].number}</td>
					<td>${obj.docs[i].sum}</td>
					<td>${obj.docs[i].area}</td>
					<td>${obj.docs[i].status}</td>
					<td>${obj.docs[i].date}</td>
					<td>
                        <input type="button" value="付款" class="buy"/>
                        <input type="button" value="确认收货" class="confirm"/>
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