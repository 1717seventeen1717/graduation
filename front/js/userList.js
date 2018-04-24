//页面刷新时显示所有用户信息
;(function(){
	var oTbody=$('.providerTable tbody');
//	console.log(oTbody.length);
	var html='';
	$.ajax({
		type:"post",
		url:"http://localhost:3000/users/listEverything",
		async:true
	}).done(function(data){
		console.log(data.docs);
		$.each(data.docs, function(i) {
			html+=`<tr><td>"${data.docs[i]._id}"</td></tr>`;
			oTbody.append(html);
			console.log(i);
		});
//		oTr.append()
	});
})();
