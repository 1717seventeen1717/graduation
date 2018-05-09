//页面刷新时显示所有用户信息
;(function(){
	$(document).ready(function display(){
//  	var oTbody=$('.providerTable tbody');
		//	console.log(oTbody.length);
//			var html='';
			$.ajax({
				type:"post",
				url:"http://localhost:3000/deliverys/listEverything",
				async:true
			}).done(function(data){
				console.log(data);
				addTable(data);
//				insertdelivery(data);
//				paginate();
			}).done(function(data){
//				console.log(data.docs);
				//点击修改
				$('.Update').click(function(){
//					console.log($(this));
					getId($(this));
				});
				//点击删除
				$('.delete').click(function(){
					var bstop=confirm('您确定要删除这条收货单吗？');
					var index=$(this).index('.delete');
					if(bstop){
						if($('.status').eq(index).html()=='未收货'){
							alert('您还未收货，无法删除该订单');
						}
						else{
//							console.log(1);
//							console.log(data.docs[index]._id);
							$.ajax({
								type:"delete",
								url:"http://localhost:3000/deliverys/data/"+data.docs[index]._id,
								async:true
							}).done(function(){
								$.ajax({
									type:"delete",
									url:"http://localhost:3000/rejecteds/data/"+data.docs[index]._id,
									async:true
								});
							});
						}
					}
				})
				//点击确认收货
				$('.accept').click(function(){
					var bstop=confirm('您确定要收货吗？');
					var index=$(this).index('.accept');
					if(bstop){
						//如果没有修改过数据，则不能确认收货
						if($('.deliveryNumber').eq(index).html()==''){
//							alert(1);
							alert('请选择收货数量');
						}
						else if($('.status').eq(index).html()=='已收货'){
							alert('您已收货，无法再次收货');
						}
						else{
//							alert(2);
//							console.log(data.docs[index]);
							$.ajax({
								type:"put",
								url:"http://localhost:3000/deliverys/data/"+data.docs[index]._id,
								async:true,
								data:{
									status:'已收货'
								}
							}).done(function(){
//								console.log(data.docs[index].provideCode);
								$.ajax({
									type:"post",
									url:"http://localhost:3000/stocks/listbyProvideCode",
									async:true,
									data:{
										provideCode:data.docs[index].provideCode
									}
								}).done(function(data1){
//									console.log(data1.docs);
									if(data1.docs.length<=0){
//										console.log(data1);
										$.ajax({
											type:"post",
											url:"http://localhost:3000/stocks/data",
											async:true,
											data:{
												providerCode: data.docs[index].providerCode,
											    providerName: data.docs[index].providerName,
											    provideCode: data.docs[index].provideCode,
											    goods: data.docs[index].goods,
											    price: data.docs[index].price,
											    number: data.docs[index].deliveryNumber,
											    desc: data.docs[index].desc,
											    status: '已入库'
											}
										}).done(function(data2){
											window.location.reload();
//											console.log(data2);
										});
									}
									else{
										var originNumber=data1.docs[0].number;
										var oSid=data1.docs[0]._id;
										var oNumber=data1.docs[0].number;
//										console.log(data1.docs);
//										console.log(oSid);
										$.ajax({
											type:"put",
											url:"http://localhost:3000/stocks/data/"+oSid,
											async:true,
											data:{
												number:parseInt(oNumber)+parseInt(data.docs[index].deliveryNumber)
											}
										}).done(function(){
											window.location.reload();
										});
									}
								});
							})
						}
					}
				})
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
					<td class="tdId" style="display:none">${obj.docs[i]._id}</td>
					<td>${i+1}</td>
					<td>${obj.docs[i].providerCode}</td>
					<td class="tdUsername">${obj.docs[i].providerName}</td>
					<td>${obj.docs[i].provideCode}</td>
					<td>${obj.docs[i].goods}</td>
					<td>${obj.docs[i].number}</td>
					<td class="deliveryNumber">${obj.docs[i].deliveryNumber}</td>
					<td class="rejectedNumber">${obj.docs[i].rejectedNumber}</td>
					<td class="status">${obj.docs[i].status}</td>
					<td>${obj.docs[i].date}</td>
					<td>
                        <a href="deliveryUpdate.html" class="Update"><img src="img/xiugai.png" alt="修改" title="修改"/></a>
						<a href="javascript:;" class="accept"><img src="img/zd.png" alt="确认收货" title="确认收货"/></a>
                        <a href="javascript:;" class="delete"><img src="img/schu.png" alt="修改" title="修改"/></a>
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

//将数据添加到收货单中 只有选择了收货数量才能生成收货单
function insertdelivery(){
//	$.ajax({
//		type:"get",
//		url:"",
//		async:true
//	});
}
//获取当前行的id
function getId(obj){
	var value=obj.parent().siblings('.tdId').html();
//	console.log(value);
		$.ajax({
			type:"post",
			url:"http://localhost:3000/deliverys/listbyid",
			async:true,
			data:{
				_id:value
			}
		}).done(function(data){
//			console.log(data.docs[0]._id);
			addCookie('onlydeliveryid',data.docs[0]._id,7);
			addCookie('onlydeliverynumber',data.docs[0].number,7);
	});
}
