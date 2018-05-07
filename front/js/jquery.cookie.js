//添加cookie的函数
		function addCookie(key,value,day){
			var date=new Date();//创建日期对象
			date.setDate(date.getDate()+day);//过期时间：获取当前的日期+天数，设置给date
			document.cookie=key+'='+encodeURI(value)+';expires='+date;//添加cookie，设置过期时间
		}
//得到cookie
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
//删除cookie
		
		function delCookie(key,value){
			addCookie(key,value,-1);//添加的函数,将时间设置为过去时间
		}