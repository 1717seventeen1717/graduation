//页面刷新时显示所有用户信息
;(function(){
	$(document).ready(function display(){
    	var oTbody=$('.providerTable tbody');
		//	console.log(oTbody.length);
			var html='';
			$.ajax({
				type:"post",
				url:"http://localhost:3000/users/listEverything",
				async:true
			}).done(function(data){
		
		//		console.log(data.docs);
				$.each(data.docs, function(i) {
					var idRegExp = new RegExp(/^\w{0,22}/g);
		//			console.log(data.docs[i]._id);
					data.docs[i]._id=data.docs[i]._id.replace(idRegExp,'');
					
					html+=`<tr><td>${i+1}</td><td>${data.docs[i].username}</td><td>${data.docs[i].phoneNumber}</td><td>${data.docs[i].type}</td><td>
		                        <a href="userView.html"><img src="img/read.png" alt="查看" title="查看"/></a>
		                        <a href="userUpdate.html"><img src="img/xiugai.png" alt="修改" title="修改"/></a>
		                        <a href="#" class="removeUser"><img src="img/schu.png" alt="删除" title="删除"/></a>
		                    </td></tr>`;
		//			html+=`<tr><td>${data.docs[i]._id}</td></tr>`;	
		//			console.log(i);
				});
				oTbody.append(html);
		//		oTr.append()
			}).done(function(){
				paginate();
			});
//  	console.log($('tr'));
//  	console.log($('.providerTable'));
    });
})();

//点击查询 搜索含有该字符的所有用户名信息

;(function(){
	var oSearch = $('input[value="查询"]');
//	$('input[name="radio"]')
	oSearch.mousedown(function(){
		oSearch.css('background-color','#5d8410');
		
	});
	
	oSearch.mouseup(function(){
		oSearch.css('background-color','');
	});
})();