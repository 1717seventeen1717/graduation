function getCookie(key){
//			var str=decodeURI(document.cookie);
//			var arr=str.split('; ');
//			for(var i=0;i<arr.length;i++){
//				var arr1=arr[i].split('=');
// 				if(arr1[0]==key){
//					return arr1[1];
//				}
//			}
			var str=decodeURI(document.cookie);
//			console.log(str);
			var arr=str.split(';');
			var arr1=[];
			var arr2=[];
//			console.log(arr);
			for(var i=0;i<arr.length;i++){
				var s=arr[i].split('=');
				arr1.push(s[0].replace(/\s/g, ""));
				arr2.push(s[1].replace(/\s/g, ""));
			}
			for(var i=0;i<arr1.length;i++){
//				console.log(arr1);
				if(arr1[i]==key){
//					console.log(arr1[i]);
					return arr2[i];
				}
			}
		}

//页面刷新时显示当前用户所有账单信息
;(function(){
	$(document).ready(function display(){
//  	var oTbody=$('.providerTable tbody');
		//	console.log(oTbody.length);
//			var html='';
//			console.log(getCookie('UserNameWorker'));
			$.ajax({
				type:"post",
				url:"http://localhost:3000/sends/listbyload",
				async:true,
				data:{
					workerName:getCookie('UserNameWorker')
				}
			}).done(function(data){
//				console.log(data);
				addTable(data);
//				paginate();
			}).done(function(data){
//				console.log(data.docs);
//				$('.send').click(function(){
//					updatedata($(this));
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
//	console.log(obj.docs);
	$.each(obj.docs, function(i) {
//					console.log(i);
					var idRegExp = new RegExp(/^\w{0,22}/g);
		//			console.log(data.docs[i]._id);
//					obj.docs[i]._id=obj.docs[i]._id.replace(idRegExp,'');
					html+=`<tr>
					<td class="sendId" style="display:none">${obj.docs[i]._id}</td>
					<td class="tdId">${obj.docs[i].checkid}</td>
					<td>${obj.docs[i].userName}</td>
					<td>${obj.docs[i].goods}</td>
					<td class="tdUsername">${obj.docs[i].number}</td>
					<td>${obj.docs[i].workerName}</td>
					<td>${obj.docs[i].area}</td>
					<td>${obj.docs[i].status}</td>
					<td>${obj.docs[i].date}</td>
		                    </tr>`;
		//			html+=`<tr><td>${data.docs[i]._id}</td></tr>`;	
		//			console.log(i);
				});
	oTbody.append(html);
	paginate();
	//点击查看 传输id
//	view();
}


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
			url:"http://localhost:3000/sends/listUserVague",
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
			url:"http://localhost:3000/sends/listEverything",
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





//点击我要送货 修改订单状态以及发货单状态
function updatedata(obj){
	var index=obj.index('.send');
	console.log(index);
	var checkid=$('.tdId').eq(index).html();
	var sendid=$('.sendId').eq(index).html();
	//修改送货单状态
	var accept=confirm('你确定要送货吗？')
	console.log(sendid);
	console.log(checkid);
	console.log(getCookie('UserNameWorker'));
//	console.log(a);
	if(accept){
		$.ajax({
			type:"put",
			url:"http://localhost:3000/sends/data/"+sendid,
			async:true,
			data:{
				status:'已送达',
				workerName:getCookie('UserNameWorker')
			}
		}).done(function(data){
			console.log(data);
			$.ajax({
				type:"put",
				url:"http://localhost:3000/checks/data/"+checkid,
				async:true,
				data:{
					status:'已送达'
				}
				
			}).done(function(){
				window.location.reload();
			});
//			window.location.reload();
			
		});
	}
	
//	console.log(checkid);
//	console.log(sendid);
}
