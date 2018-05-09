//页面刷新时显示当前用户所有账单信息
;(function(){
	$(document).ready(function display(){
//  	var oTbody=$('.providerTable tbody');
		//	console.log(oTbody.length);
//			var html='';
			$.ajax({
				type:"post",
				url:"http://localhost:3000/checks/listbyusername",
				async:true,
				data:{
					userName:getCookie('UserNamePerson')
				}
			}).done(function(data){
//				console.log(data);
				addTable(data);
//				paginate();
			}).done(function(data){
				console.log(data.docs);
				$('.confirm').click(function(){
//					if($('.oStatus'))
					updateCheck($(this),data);
//					console.log(index);

				});
			});
//			var a=new Date().format('yyyy-MM-dd hh:mm:ss');
//			console.log(a);
//  	console.log($('tr'));
//  	console.log($('.providerTable'));
    });
    $('.goback').click(function(){
    	var a=confirm('您确定返回主页面吗？');
    	if(a){
    		window.location.href='index.html';
    	}
    })
})();


//拼接表格函数
function addTable(obj){
	var html='';
	var oTbody=$('.providerTable tbody');
//	console.log(obj.docs);
	$.each(obj.docs, function(i) {
//					console.log(i);
					var idRegExp = new RegExp(/^\w{0,22}/g);
		//			console.log(data.docs[i]._id);
//					obj.docs[i]._id=obj.docs[i]._id.replace(idRegExp,'');
					html+=`<tr>
					<td class="tdId" style="display:none">${obj.docs[i]._id}</td>
					<td>${obj.docs[i].userName}</td>
					<td>${obj.docs[i].phoneNumber}</td>
					<td>${obj.docs[i].goods}</td>
					<td class="tdUsername">${obj.docs[i].number}</td>
					<td>${obj.docs[i].sum}</td>
					<td>${obj.docs[i].area}</td>
					<td class="oStatus">${obj.docs[i].status}</td>
					<td>${obj.docs[i].date}</td>
					<td>
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

//点击确认收货修改订单状态
function updateCheck(obj,data){
	var index=obj.index('.confirm');
	var id=$('.tdId').eq(index).html();
//	console.log(id);
//	console.log(index);
//	console.log(data.docs[index].status);
	var pStr=data.docs[index].status;
	var cStr='已送达';
	var is=pStr.indexOf(cStr);
//	console.log(pStr.indexOf(cStr));
	if(is!=-1){
		var a=confirm('您确定收货吗？');
		if(a){
			$.ajax({
				type:"put",
				url:"http://localhost:3000/checks/data/"+id,
				async:true,
				data:{
					status:'买家已收货'
				}
			}).done(function(){
				window.location.reload();
			});
		}
	}
	else{
		alert('该商品还未发货，无法确认');
	}
}
