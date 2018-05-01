//var pageSize = 10;    //每页显示的记录条数
//var curPage=0;        //当前页
//var lastPage;        //最后页
//var direct=0;        //方向
//var len;            //总行数
//var page;            //总页数
//var begin;
//var end;
//页面刷新时显示所有用户信息
;(function(){
	$(document).ready(function display(){
//  	var oTbody=$('.providerTable tbody');
		//	console.log(oTbody.length);
//			var html='';
			$.ajax({
				type:"post",
				url:"http://localhost:3000/users/listEverything",
				async:true
			}).done(function(data){
				addTable(data);
//				paginate();
			});
//  	console.log($('tr'));
//  	console.log($('.providerTable'));
    });
})();

//点击查询 搜索含有该字符的所有用户名信息

;(function(){
	var oSearch = $('input[value="查询"]');
	var oSearchText=$('input[placeholder="请输入用户名"]');
//	$('input[name="radio"]')
	oSearch.mousedown(function(){
		oSearch.css('background-color','#5d8410');
	});
	
	oSearch.mouseup(function(){
		oSearch.css('background-color','');
	});
	
	oSearch.click(function(){
		var textValue=oSearchText.val();
//		console.log(textValue);
		if(textValue!=''){
			$.ajax({
			type:"post",
			url:"http://localhost:3000/users/listUserVague",
			async:true,
			data:{
				textValue:textValue
			}
			}).done(function(data){
					clearTable();
					console.log(data);
					addTable(data);
//					paginate();
				});
		}
		else{
			$.ajax({
			type:"post",
			url:"http://localhost:3000/users/listEverything",
			async:true,
			}).done(function(data){
					clearTable();
					console.log(data);
					addTable(data);
//					paginate();
				});
		}
		
	})
})();




	




//拼接表格函数
function addTable(obj){
	var html='';
	var oTbody=$('.providerTable tbody');
	$.each(obj.docs, function(i) {
//					console.log(i);
					var idRegExp = new RegExp(/^\w{0,22}/g);
		//			console.log(data.docs[i]._id);
//					obj.docs[i]._id=obj.docs[i]._id.replace(idRegExp,'');
					
					html+=`<tr>
					<td class="tdId" style="display:none">${obj.docs[i]._id}</td>
					<td>${i+1}</td>
					<td class="tdUsername">${obj.docs[i].username}</td>
					<td>${obj.docs[i].phoneNumber}</td>
					<td>${obj.docs[i].type}</td>
					<td>
                        <a href="userView.html" class="View"><img src="img/read.png" alt="查看" title="查看"/></a>
                        <a href="userUpdate.html" class="Update"><img src="img/xiugai.png" alt="修改" title="修改"/></a>
                        <a href="#" class="removeUser"><img src="img/schu.png" alt="删除" title="删除"/></a>
		            </td></tr>`;
		//			html+=`<tr><td>${data.docs[i]._id}</td></tr>`;	
		//			console.log(i);
				});
	oTbody.append(html);
	paginate();
	//点击查看 传输id
	view();
	
    
}

//清空表格
function clearTable(){
	var oTbody=$('.providerTable tbody tr').not('.firstTr');
//	console.log(oTbody);
	oTbody.remove();
}

//点击右侧按钮 获取当前行id
function view(){
	var oView=$('.View');
	var oUpdate=$('.Update');
	var value;
//	console.log(oView.length);
	oView.click(function(){
//		console.log($(this).parent().siblings('.tdId').html());//获取当前行的id值
		getId($(this));
	});
	
	oUpdate.click(function(){
		getId($(this));
	})
	//点击删除 弹出确认删除框 点击确定删除数据
    $('.removeUser').click(function () {
        $('.zhezhao').css('display', 'block');
        $('#removeUse').fadeIn();
        getId($(this));
    });
    $('#no').click(function(){
    	delCookie('onlyuserid');
        $('.zhezhao').css('display', 'none');
        $('#removeUse').fadeOut();
    });
    $('#yes').click(function(){
    	var delId=getCookie('onlyuserid');
    	$.ajax({
    		type:"delete",
    		url:"http://localhost:3000/users/data/"+delId,
    		async:true
    	}).done(function(){
	    	$('.zhezhao').css('display', 'none');
	        $('#removeUse').fadeOut();
	        delCookie('onlyuserid');
	        location.reload(); 
    	});
        
    });
}





//获取当前行的id
function getId(obj){
	var value;
	value=obj.parent().siblings('.tdId').html();
		$.ajax({
			type:"post",
			url:"http://localhost:3000/users/listbyid",
			async:true,
			data:{
				_id:value
			}
		}).done(function(data){
//			console.log(data.docs[0]._id);
			addCookie('onlyuserid',data.docs[0]._id,7);
	});
}
//获取当前行的username
//function getUsername(obj){
//	var value;
//	value=obj.parent().siblings('.tdUsername').html();
////	alert(value);
//		$.ajax({
//			type:"post",
//			url:"http://localhost:3000/users/list",
//			async:true,
//			data:{
//				username:value
//			}
//		}).done(function(data){
////			console.log(data.docs[0]._id);
////			addCookie('onlyUsername',data.docs[0].username,7);
//			addCookie('onlyuserid',data.docs[0]._id,7);
//	});
//}
