//页面刷新时显示所有用户信息
;(function(){
	$(document).ready(function display(){
//  	var oTbody=$('.providerTable tbody');
		//	console.log(oTbody.length);
//			var html='';
			$.ajax({
				type:"post",
				url:"http://localhost:3000/providers/listEverything",
				async:true
			}).done(function(data){
				console.log(data);
				addTable(data);
//				paginate();
			});
//			var a=new Date().format('yyyy-MM-dd hh:mm:ss');
//			console.log(a);
//  	console.log($('tr'));
//  	console.log($('.providerTable'));
    });
})();

//点击查询 搜索含有该字符的所有用户名信息

;(function(){
	var oSearch = $('input[value="查询"]');
	var oSearchText=$('input[placeholder="请输入供应商的名称"]');
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
			url:"http://localhost:3000/providers/listUserVague",
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
			url:"http://localhost:3000/providers/listEverything",
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
					<td>${obj.docs[i].providerCode}</td>
					<td class="tdUsername">${obj.docs[i].providerName}</td>
					<td>${obj.docs[i].provide}</td>
					<td>${obj.docs[i].price}</td>
					<td>${obj.docs[i].linkman}</td>
					<td>${obj.docs[i].phoneNumber}</td>
					<td>${obj.docs[i].fax}</td>
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
	view();
}


//点击右侧按钮 获取当前行id
function view(){
	var oView=$('.View');
	var oUpdate=$('.Update');
	var value;
//	alert(oView.length);
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
    	delCookie('onlyproviderid');
        $('.zhezhao').css('display', 'none');
        $('#removeUse').fadeOut();
    });
    $('#yes').click(function(){
    	var delId=getCookie('onlyproviderid');
    	$.ajax({
    		type:"delete",
    		url:"http://localhost:3000/providers/data/"+delId,
    		async:true
    	}).done(function(){
	    	$('.zhezhao').css('display', 'none');
	        $('#removeUse').fadeOut();
	        delCookie('onlyproviderid');
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
			url:"http://localhost:3000/providers/listbyid",
			async:true,
			data:{
				_id:value
			}
		}).done(function(data){
//			console.log(data.docs[0]._id);
			addCookie('onlyproviderid',data.docs[0]._id,7);
	});
}

//日期格式化
//Date.prototype.format = function(fmt) { 
//		     var o = { 
//		        "M+" : this.getMonth()+1,                 //月份 
//		        "d+" : this.getDate(),                    //日 
//		        "h+" : this.getHours(),                   //小时 
//		        "m+" : this.getMinutes(),                 //分 
//		        "s+" : this.getSeconds(),                 //秒 
//		        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
//		        "S"  : this.getMilliseconds()             //毫秒 
//		    }; 
//		    if(/(y+)/.test(fmt)) {
//		            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
//		    }
//		     for(var k in o) {
//		        if(new RegExp("("+ k +")").test(fmt)){
//		             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
//		         }
//		     }
//		    return fmt; 
//		}

