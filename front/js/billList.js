//页面刷新时显示所有账单信息
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
			}).done(function(){
				$('.fahuo').click(function(){
			    	checkEnough($(this));
			   });
			   $('.commonRefund').click(function(){
			   		delthischeck($(this));
					
			   });
			   $('.output').click(function(){
			   		method5('providerTable');
			   })
			}).done(function(){
				var tdStatus=$('.tdStatus');
//				console.log(tdStatus.length);
				$.each(tdStatus, function(i) {
					var checkidValue=$('.tdId').eq(i).html();
//					console.log(tdStatus.eq(i).html());
//					console.log(tdStatus.eq(i).html());
					var message=tdStatus.eq(i).html();
					//如果为正在发货，则10秒后跳转为已送达
//					if(message=='正在发货'){
//						console.log(i);
//						setTimeout(function(){
//								$.ajax({
//									type:"put",
//									url:"http://localhost:3000/checks/data/"+checkidValue,
//									async:true,
//									data:{
//										status:'已送达'
//									}
//								}).done(function(data1){
////									console.log(data1);
//									window.location.reload();
//					//				console.log(checkidValue);
//					//				console.log(data.status);
//								})
//						},3000)
//					}
				});
			});
//			$.each(tdStatus, function(i) {
//				console.log()
//			});
//			var a=new Date().format('yyyy-MM-dd hh:mm:ss');
//			console.log(a);
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
			url:"http://localhost:3000/checks/listUserVague",
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
			url:"http://localhost:3000/checks/listEverything",
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
//	console.log(obj.docs);
	$.each(obj.docs, function(i) {
//					console.log(i);
//					console.log(obj.docs[i].provideCode);
					var idRegExp = new RegExp(/^\w{0,22}/g);
		//			console.log(data.docs[i]._id);
//					obj.docs[i]._id=obj.docs[i]._id.replace(idRegExp,'');
					html+=`<tr>
					<td style="display:none" class="provideCode">${obj.docs[i].provideCode}</td>
					<td class="tdId">${obj.docs[i]._id}</td>
					<td>${obj.docs[i].userName}</td>
					<td>${obj.docs[i].phoneNumber}</td>
					<td class="tdGoods">${obj.docs[i].goods}</td>
					<td class="tdNumber">${obj.docs[i].number}</td>
					<td>${obj.docs[i].sum}</td>
					<td class="tdArea">${obj.docs[i].area}</td>
					<td class="tdStatus">${obj.docs[i].status}</td>
					<td class="tdInput">
                        
						<input type="button" value="退款" class="refund commonRefund"/>
		           </td>
		                    </tr>`;
//		                    <td>${obj.docs[i].date}</td>
		//			html+=`<tr><td>${data.docs[i]._id}</td></tr>`;	
		//			console.log(i);
	});
	
	oTbody.append(html);
//	console.log($('.provideCode').length);
	var oTd=$('.tdStatus');
	var oArea=$('.tdArea');
	var oInput=$('.common');
	var oNumber=$('.tdNumber');
	var oGoods=$('.tdGoods');
	var oSpan=$('.provideCode');
	var oRefund=$('.refund');
//	console.log(oSpan.length);
//	console.log(oInput);
	$.each(oTd, function(i) {
		//判断是否付款
		if(oTd[i].innerHTML=='未付款'||oArea[i].innerHTML==''){
			
			oInput.eq(i).removeClass('fahuo');
			oInput.eq(i).addClass('error');
			oInput.eq(i).attr('disabled','disabled');
//			oSpan.eq(i).css('color','red');
		}
		else{
			oInput.eq(i).removeClass('error');
			oInput.eq(i).addClass('fahuo');
			oInput.eq(i).removeAttr('disabled');
		}
		//判断库存与需求差别
		$.ajax({
			type:"post",
			url:"http://localhost:3000/stocks/listbyProvideCode",
			async:true,
			data:{
				provideCode:oSpan.eq(i).html()
			}
		}).done(function(data){
//			console.log(data.docs[0]);
			if(data.docs.length>0){
				var number=data.docs[0].number;
			}
			else{
				var number=0;
			}
//			console.log(number);
//			console.log(oNumber.eq(i).html());
//			var number=data.docs[0].number?data.docs[0].number:0;
//			console.log(data.docs[0].number);
//			console.log(oNumber.eq(i).html());
			if(parseInt(number)<parseInt(oNumber.eq(i).html())&&oTd.eq(i).html()=='已付款'){
				oRefund.eq(i).removeClass('error');
				oRefund.eq(i).addClass('refund');
				oNumber.eq(i).addClass('redtext');
				oInput.eq(i).addClass('notenough');
			}
			else{
				oRefund.eq(i).removeClass('refund');
				oRefund.eq(i).addClass('error');
				oNumber.eq(i).removeClass('redtext');
				oInput.eq(i).removeClass('notenough');
			}
			if(oTd.eq(i).html()!='已付款'){
				oInput.eq(i).removeClass('fahuo');
				oInput.eq(i).addClass('error');
				oInput.eq(i).attr('disabled','disabled');
			}
		});
	});
//	console.lremoveClass('refund');removeClass('fahuo')og(oTd.length);
	paginate();
	//点击查看 传输id
//	view();
}

//点击发货 判断库存是否充足，充足则跳出是否确定发货，不充足则跳出库存不足，是否进货？点击进货进入商品添加页面
function checkEnough(obj){
	var oInput=$('.common');
	var oNumber=$('.tdNumber');
	var indexAll=obj.index('.common');
	var indexError=obj.index('.notenough');
	var oGoods=$('.tdGoods');
	var oSpan=$('.goodsNumber');
//	console.log(indexAll);
//	console.log(indexError);
	//当indexError为-1时，跳出库存不足，是否添加商品？
	if(indexError!=-1){
//		console.log(indexError);
		var bstop=confirm('库存不足，是否添加商品？');
		//确定添加跳转到商品添加页面
		if(bstop){
			window.open('purchaseAdd.html');
		}
	}
	else{
		var istrue=confirm('您确定要发货么？');
			//确定发货，修改订单数据为正在发货
		if(istrue){
			
			var checkidValue=$('.tdId').eq(indexAll).html();
			$.ajax({
				type:"put",
				url:"http://localhost:3000/checks/data/"+checkidValue,
				async:true,
				data:{
					status:'正在匹配快递员'
				}
			}).done(function(data){
				oInput.eq(indexAll).removeClass('fahuo');
				oInput.eq(indexAll).addClass('error');
				oInput.eq(indexAll).attr('disabled','disabled');
				console.log(data);
				$.ajax({
					type:"post",
					url:"http://localhost:3000/sends/data",
					async:true,
					data:{
						checkid:data._id,
					    userName: data.userName,
					    workerName: '暂时无人发货',
//					    provideCode: data.provideCode,
					    goods: data.goods,
					    number: data.number,
					    phoneNumber:data.phoneNumber,
//					    price: String,
//					    sum: String,
					    area: data.area,
					    // desc: String,
					    // url: String
					    status: '准备发货'
					}
				}).done(function(){
					window.location.reload();
				})
//				
//				console.log(checkidValue);
//				console.log(data.status);
			}).done(function(){
//				console.log(window.location.reload);
//					$.ajax({
//						type:"put",
//						url:"http://localhost:3000/checks/data/"+checkidValue,
//						async:true,
//						data:{
//							status:'已送达'
//						}
//					}).done(function(data1){
//						console.log(data1);
////						window.location.reload();
//		//				console.log(checkidValue);
//		//				console.log(data.status);
//					})
			});
		}
	}
};

//点击退款删除当前订单
function delthischeck(obj){
	var indexCommonRefund=obj.index('.commonRefund');
	var sid=$('.tdId').eq(indexCommonRefund).html();
	
//	console.log(indexCommonRefund);
//	console.log(sid);
	var a=confirm('确定要退款吗？');
	if(a){
		$.ajax({
			type:"delete",
			url:"http://localhost:3000/checks/data/"+sid,
			async:true
		}).done(function(){
			alert('退款成功');
			location.reload(); 
		});
	}
}

//导出表格数据
var idTmr;    
        function  getExplorer() {    
            var explorer = window.navigator.userAgent ;    
            //ie    
            if (explorer.indexOf("MSIE") >= 0) {    
                return 'ie';    
            }    
            //firefox    
            else if (explorer.indexOf("Firefox") >= 0) {    
                return 'Firefox';    
            }    
            //Chrome    
            else if(explorer.indexOf("Chrome") >= 0){    
                return 'Chrome';    
            }    
            //Opera    
            else if(explorer.indexOf("Opera") >= 0){    
                return 'Opera';    
            }    
            //Safari    
            else if(explorer.indexOf("Safari") >= 0){    
                return 'Safari';    
            }    
        }    
        function method5(tableid) {    
            if(getExplorer()=='ie')    
            {    
                var curTbl = document.getElementById(tableid);    
                var oXL = new ActiveXObject("Excel.Application");    
                var oWB = oXL.Workbooks.Add();    
                var xlsheet = oWB.Worksheets(1);    
                var sel = document.body.createTextRange();    
                sel.moveToElementText(curTbl);    
                sel.select();    
                sel.execCommand("Copy");    
                xlsheet.Paste();    
                oXL.Visible = true;    
    
                try {    
                    var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");    
                } catch (e) {    
                    print("Nested catch caught " + e);    
                } finally {    
                    oWB.SaveAs(fname);    
                    oWB.Close(savechanges = false);    
                    oXL.Quit();    
                    oXL = null;    
                    idTmr = window.setInterval("Cleanup();", 1);    
                }    
    
            }    
            else    
            {    
                tableToExcel(tableid)    
            }    
        }    
        function Cleanup() {    
            window.clearInterval(idTmr);    
            CollectGarbage();    
        }    
        var tableToExcel = (function() {    
            var uri = 'data:application/vnd.ms-excel;base64,',    
                    template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',    
                    base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },    
                    format = function(s, c) {    
                        return s.replace(/{(\w+)}/g,    
                                function(m, p) { return c[p]; }) }    
            return function(table, name) {    
                if (!table.nodeType) table = document.getElementById(table)    
                var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}    
                window.location.href = uri + base64(format(template, ctx))    
            }    
        })() 

