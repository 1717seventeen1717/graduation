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
				var oInput=$('.send');
//				console.log(oInput);
				console.log(data.docs);
				$.each(data.docs, function(i) {
					if(data.docs[i].status=='已送达'){
						console.log(i);
						oInput.eq(i).removeClass('send');
						oInput.eq(i).addClass('error');
						oInput.eq(i).attr('disabled','disabled');
					}
					else{
						oInput.eq(i).removeClass('error');
						oInput.eq(i).addClass('send');
						oInput.eq(i).removeAttr('disabled');
					}
				});
				console.log(data.docs);
				$('.send').click(function(){
					updatedata($(this));
				})
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
		var sendTime;
					if(obj.docs[i].sendTime){
						sendTime=obj.docs[i].sendTime;
					}
					else{
						sendTime='还未送货';
					}
//					console.log(i);
					var idRegExp = new RegExp(/^\w{0,22}/g);
		//			console.log(data.docs[i]._id);
//					obj.docs[i]._id=obj.docs[i]._id.replace(idRegExp,'');
					html+=`<tr>
					<td class="sendId" style="display:none">${obj.docs[i]._id}</td>
					<td class="tdId">${obj.docs[i].checkid}</td>
					<td>${obj.docs[i].userName}</td>
					<td>${obj.docs[i].phoneNumber}</td>
					<td class="goods">${obj.docs[i].goods}</td>
					<td class="tdNumber">${obj.docs[i].number}</td>
					<td>${obj.docs[i].workerName}</td>
					<td>${obj.docs[i].area}</td>
					<td>${obj.docs[i].status}</td>
					<td>${obj.docs[i].date}</td>
					<td>${sendTime}</td>
					<td>
                        <input type="button" value="我要送货" class="send common"/>
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




//点击我要送货 修改订单状态以及发货单状态以及库存数量
function updatedata(obj){
	var index=obj.index('.common');
	console.log(index);
	var checkid=$('.tdId').eq(index).html();
	var sendid=$('.sendId').eq(index).html();
	var goods=$('.goods').eq(index).html();
	var tdNumber=$('.tdNumber').eq(index).html();
//	console.log(tdNumber);
//	console.log(goods);
	//修改送货单状态
	var accept=confirm('你确定要送货吗？');
	console.log(sendid);
	console.log(checkid);
	console.log(getCookie('UserNameWorker'));
//	console.log(a);
	
//	if(accept){
//		$.ajax({
//			type:"post",
//			url:"http://localhost:3000/stocks/listbyGoods",
//			async:true,
//			data:{
//				goods:goods
//			}
//		}).done(function(data1){
////			console.log(data1.docs[0]._id);
////			console.log(data1.docs[0]);
//			
//			$.ajax({
//				type:"put",
//				url:"http://localhost:3000/stocks/data/"+data1.docs[0]._id,
//				async:true,
//				data:{
//					number:parseInt(data1.docs[0].number)-parseInt(tdNumber)
//				}
//			});
//		});
//	}
	
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
			console.log(data.status);
			$.ajax({
				type:"put",
				url:"http://localhost:3000/checks/data/"+checkid,
				async:true,
				data:{
					status:"已送达,送货员"+getCookie('UserNameWorker')+"",
					acceptTime:'未收货'
				}
			}).done(function(){
					$.ajax({
						type:"post",
						url:"http://localhost:3000/stocks/listbyGoods",
						async:true,
						data:{
							goods:goods
						}
					}).done(function(data1){
			//			console.log(data1.docs[0]._id);
			//			console.log(data1.docs[0]);
						
						$.ajax({
							type:"put",
							url:"http://localhost:3000/stocks/data/"+data1.docs[0]._id,
							async:true,
							data:{
								number:parseInt(data1.docs[0].number)-parseInt(tdNumber),
								status:'出库'+tdNumber+''
							}
						});
				});
			})
//			.done(function(data){
//				$.ajax({
//					type:"put",
//					url:"",
//					async:true
//				});
//			})
			.done(function(){
				window.location.reload();
			});
//			window.location.reload();
			
		});
	}
	
//	console.log(checkid);
//	console.log(sendid);
}
