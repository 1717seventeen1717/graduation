//登录时显示当前登录的账号
;(function(){
	function getCookie(key){
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
	var cookie=getCookie('UserNamePerson');
	console.log(cookie);
	$oA=$('.true-nav .in-login');
	$oLogin=$('.login-after');
	if(cookie){
		$oA.html("您好:"+cookie+"");
		$('.updatepwd').css('display','inline');
		$('.exitindex').css('display','inline');
		$('.exitindex').click(function(){
			var a=confirm('您确定要退出吗');
			if(a){
				window.location.href='login.html';
				delCookie('UserNamePerson');
			}
		})
		$oLogin.html("您好:"+cookie+"");
	}
	else{
//		alert(1);
		$oA.html("请登录");
	}
})();

//顶部轮播图
;(function(){
	var $middlefigure=$('.middle-figure');
//	var $imgs=$('.scroll img');
	var $imageul=$('.image-ul');
//	var $oLi=$('.image-ul li');
	var $spans=$('.borderradius');
	var $left=$('.middle-figure .left');
	var $right=$('.middle-figure .right');
	var $index=0;//当前移动的图片的索引
//	var $pindex=0;//前一张移动的图片的索引
	var arr=[];
	var $btn=$('.middle-figure button');
	$.ajax({
				type:"post",
				url:"http://localhost:3000/images/listEverything",
				async:true
	}).done(function(data){
//					console.log(data.docs);
					$.each(data.docs, function(i) {
						if(data.docs[i].type==1){
							arr.push(data.docs[i]);
						}
					});
					var html='';
//					console.log(arr);
					$.each(arr, function(i){
							html+=`<li><img src="${arr[i].url}"></li>`;
					});
					$imageul.append(html);
					var $imageli=$('.image-ul li');
					$imageli.addClass('image-li');
					$imageli.eq(0).addClass('image-li-op');
					//1.给$spans添加事件
					$spans.on('mouseover',function(ev){
						$index=$(this).index('.borderradius');//获取当前点击按钮的索引。
						tabswitch(ev);
						$pindex=$index;//将当前的索引给前一个索引。
					});
					//左右按钮滑过效果
//					$btn.on('mouseover',function(){
//						$(this).addClass('hover');
//					});
//					$btn.on('mouseout',function(){
//						$(this).removeClass('hover');
//					});
					//左右按钮点击效果
					$left.on('click',function(){
						$index--;
						if($index<0){
//							$pindex=0;
							$index=$imageli.length-1;
						}
						tabswitch();
					});
					$right.on('click',function(){
						$index++;
						if($index>$imageli.length-1){
//							$pindex=0;
							$index=0;
						}
						tabswitch();
					});
					function tabswitch(){
							$spans.eq($index).addClass('active').siblings('span').removeClass('active');
							$imageli.eq($index).stop(true,true).animate({
								opacity:1
							}).siblings('.image-li').stop(true,true).animate({
								opacity:0
							});
					};
					var $timer=setInterval(function(){
						$index++;
						if($index>$imageli.length-1){
//							$pindex=0;
							$index=0;
						}
						tabswitch();
					},1500);
					$middlefigure.hover(function(){
						clearInterval($timer);
					},function(){
						$timer=setInterval(function(){
						$index++;
						if($index>$imageli.length-1){
//							$pindex=0;
							$index=0;
						}
						tabswitch();
						},1500);
					});
					$middlefigure.css('cursor','pointer');
				});
})()
;



//顶部轮播图右侧
(function(){
	var $rlr=$('.right-login-reg');
	var $hideimage=$('.hide-image');
	var $oUl=$('.hide-image ul');
//	var $oLi=$('.hide-image ul li');
//	var $liA=$('.hide-image ul li a');
//	console.log($liA.length);
	$.ajax({
		type:"post",
		url:"http://localhost:3000/images/listEverything",
		async:true,
		dataType:'json',
	}).done(function(data){
		var arr=[];
		var arr1=[];
		var lastindex;
//		console.log(data);
		$.each(data.docs, function(i) {
			
			if(data.docs[i].type==2){
				arr.push(data.docs[i]);
//				console.log(data.docs[i]);
			}
		});
//		console.log(arr);
//		console.log(arr);
		var html='';
		$.each(arr, function(i){
//				console.log(arr[i].url);
				arr1[i]=arr[i].url.replace(/\\/g,'/');
				lastindex=find(arr1[i],'/',2);
//				console.log(lastindex);
				arr1[i]=arr[i].url.replace(/\\/g,'/').substr(lastindex+1);
//				console.log(arr1[i]);
				html+=`<li><a href="javascript:;"><img src="${arr1[i]}"></a></li>`;
		});
		$oUl.append(html);
//		$imageul.append(html);
	});
	
})();



//购物车
(function(){
	$shopcar=$('.shopcar-middle');
	$cardropdown=$('.cardropdpwn');
	$shopcar.on('mouseover',function(){
		$cardropdown.css('display','block');$('.shopcar-middle').css('border','1px solid #ccc').css('border-bottom','none').css('padding-bottom','2px');
		$cardropdown.hover(function(){
			$cardropdown.css('display','block');	
			$cardropdown.css('display','block');$('.shopcar-middle').css('border','1px solid #ccc').css('border-bottom','none');
		},function(){
			$cardropdown.css('display','none');
//			$('.shopcar-middle').css('border','1px solid #E3E4E5');
		})
	});
	$shopcar.on('mouseout',function(){
		$cardropdown.css('display','none');
		$('.shopcar-middle').css('border-bottom','1px solid #E3E4E5');
	});
})();



//顶部搜索框

(function(){
	var $search=$('#search .form');
	var $input=$('#search .form .text');
	var $oUl=$('.search-dropdpwn');
	var timer=null;
	function chagetitle(){
		
	}
	$.ajax({
		type:"get",
		url:"php/lunbo.php",
		async:true,
		dataType:'json',
	}).done(function(data){
		var $arr=data.tab3;
		(function(arr){
		    var i=0;
		    var length=$arr.length;//8 索引到7
		    (function a(){
		        timer=setTimeout(function(){
//		            console.log(arr[i++].title);
					var $ran=0;
					function ranNum(){
						$ran=Math.floor(Math.random()*length);
						return $ran;
					}
					ranNum();
					$input.prop('placeholder',arr[$ran].title);
		            a();
		        },1000);
		    }())
			$input.blur(function(){
				$oUl.css('display','none');
				(function a(){
		        timer=setTimeout(function(){
//		            console.log(arr[i++].title);
					var $ran=0;
					function ranNum(){
						$ran=Math.floor(Math.random()*length);
						return $ran;
					}
					ranNum();
					$input.prop('placeholder',arr[$ran].title);
		            a();
		        },1000)
		    	})()
			});
		}($arr))
	});
	$input.focus(function(){
		$(this).attr('placeholder','');
		$oUl.css('display','block')
//		.css('border','1px solid #ccc');
		$oUl.hover(function(){
			$oUl.css('display','block')
//			.css('border','1px solid #ccc');
		},function(){
			$oUl.css('display','none');
		});
		clearInterval(timer);
	});
	$input.on('input',function(){
		$.ajax({
			type:"get",
			url:"https://suggest.taobao.com/sug?code=utf-8&q="+$input.val()+"&_ksTS=1522229176078_571&callback=taobao&k="+$input.val()+"&area=c2c&bucketid=4",
			dataType:'jsonp',
			jsonpCallback:'taobao'
		}).done(function(data){
//			console.log(data);
			var $arr=data.result;
			var html='';
			if($arr.length<4){
				$.each($arr, function(i) {
	
					html+='<li><a href="https://suggest.taobao.com/sug?code=utf-8&q='+$input.val()+'&_ksTS=1522219179875_608&callback=taobao&k='+$input.val()+'&area=c2c&bucketid=4">'+$arr[i][0]+'</a></li>';
				});
			}else{
				$.each($arr, function(i) {
	
				html+='<li><a href="https://suggest.taobao.com/sug?code=utf-8&q='+$input.val()+'&_ksTS=1522219179875_608&callback=taobao&k='+$input.val()+'&area=c2c&bucketid=4">'+$arr[i][0]+'</a></li>';
				});
			};
			$oUl.html(html);
			$oUl.find('a').css({'color':'#333','width':'100%'});
		});
	});
	
	/*function taobao(data){
		console.log(data);
	}*/
})();



//右侧固定导航栏

(function(){
	var $oLi=$('.right-bar-top li');
	var $oDiv=$('.right-bar-bottom div');
	var $oEmtop=$('.right-bar-top em');
	var $oEmbottom=$('.right-bar-bottom em');
	var $oItop=$('.right-bar-top .tab-ico');
	var $oIbottom=$('.right-bar-bottom .tab-ico');
	var $oITip=$('.right-bar-bottom .tab-tip');
	$oLi.hover(function(){
		var $index=$(this).index();
		$timer=setTimeout(function(){
			$oEmtop.eq($index).stop(true).animate({
			left:-52+'px'
			});
			$oItop.eq($index).addClass('red-style');
			$oITip.css('display','none');
		},300);
	},function(){
		var $index=$(this).index();
		clearInterval($timer);
		$oEmtop.eq($index).stop(true).animate({
			left:35+'px'
		});
		$oItop.eq($index).removeClass('red-style');
		$oITip.css('display','block');
	});
	
	
	$oDiv.hover(function(){
		var $index=$(this).index();
		$timer1=setTimeout(function(){
			$oEmbottom.eq($index).stop(true).animate({
			left:-52+'px'
		});
		$oIbottom.eq($index).addClass('red-style');
		},300);
	},function(){
		var $index=$(this).index();
		clearInterval($timer1);
		$oEmbottom.eq($index).stop(true).animate({
			left:35+'px'
		});
		$oIbottom.eq($index).removeClass('red-style');
	})
})();




//头部广告
/*(function(){
	var $headeradv=$('.header-adv-bg');
	var $icon=$('.header-adv-top i');
	var $headeradvwrap=$('#header-adv');
	var $oA=$('.header-adv-bg');
	$icon.on('click',function(){
		$headeradvwrap.fadeOut();
	});
	$.ajax({
				url:'php/lunbo.php',
				async:true,
				dataType:'json'
	}).done(function(data){
		var $arr=data.tab1;
//		console.log($arr[0].url);
		$oA.css('background-image','url("'+$arr[0].url+'")');
	})
}
)();*/



//顶部二级导航
(function(){
	var $oDiv=$('.r-icon');
	var $oDrop=$('.dropdown');
	var $oWhitep=$('.navigation .white-block');
	var $oA=$('.true-nav a');
	var $mobileDiv=$('.mobile');
	var $threeDiv=$('.three-code');
	$mobileDiv.on('mouseover',function(){
		$threeDiv.css('display','block');
		$threeDiv.hover(function(){
			$threeDiv.css('display','block');
		},function(){
			$threeDiv.css('display','none');
		})
	});
	$mobileDiv.on('mouseout',function(){
		$threeDiv.css('display','none');
	});
//	console.log($oA.length);
//	alert($oA.length);
	$oA.hover(function(){
		$oA.removeClass('a-red');
		$(this).addClass('a-red');
	},function(){$oA.removeClass('a-red')})
	$oDiv.on('mouseover',function(){
		var $index=$(this).index('.r-icon');
//		alert($index);
//		$(this).addClass('important-right-hover');
		$oDrop.eq($index).parent('li').siblings('li').find('.dropdown').css('display','none');
		$oDrop.eq($index).css('display','block');
		if($index==2)
		{
			$oDiv.eq(2).addClass('r-icon-hover');
		}
		$oDrop.eq($index).hover(function(){
			$oDrop.eq($index).parent('li').siblings('li').find('.dropdown').css('display','none');
			$oDrop.eq($index).css('display','block');
			if($index==2)
			{
//				$oWhitep.css('display','block');
				$oDiv.eq(2).addClass('r-icon-hover');
			}
			$oWhitep.hover(function(){
			$oDrop.eq($index).parent('li').siblings('li').find('.dropdown').css('display','none');
			$oDrop.eq($index).css('display','block');},function(){
			$oDrop.eq($index).css('display','none');
			if($index==2)
			{
				$oDiv.eq(2).removeClass('r-icon-hover');
			}
		})
		},function(){
			$oDrop.eq($index).css('display','none');
			if($index==2)
			{
				$oDiv.eq(2).removeClass('r-icon-hover');
			}
		})
	});
	$oDiv.on('mouseout',function(){
		var $index=$(this).index('.r-icon');
		$oDrop.css('display','none');
		$oDiv.eq(2).removeClass('r-icon-hover');
	});
})();

//地区下拉
(function(){
	var $navareamain=$('.nav-area-main');
	var oSpan=$('.nav-area-main .ul-areamini-text');
	var $navleftdrop=$('.nav-left-drop');
	var $oLi=$('.nav-left-drop-ul li');
	var $oA=$('.nav-left-drop-ul li a');
	$navareamain.hover(function(){
		$navleftdrop.css('display','block');
	},function(){
		$navleftdrop.css('display','none');
	});
	$oA.hover(function(){
		$(this).addClass('a-over');
	},function(){
		$(this).removeClass('a-over');
	});
	$oLi.on('click',function(){
		oSpan.text($(this).text());
		$navleftdrop.css('display','none');
		$oA.eq($(this).index()).addClass('selected').parent('li').siblings('li').children('a').removeClass('selected');
//		$oA.eq($(this).index()).siblings('.nav-left-drop-ul li a').removeClass('selected');
	});
})();


//头部左侧隐藏图片
(function(){
	var $bbsn=$('#bbsn');
	var $oA=$('#bbsn a');
	var $showbg=$('#showbg');//显示图
	var $acontainer=$('#bbsn .acontainer');//隐藏图A
	var $hidebg=$('#hidebg');//隐藏图
	var $del=$('.del');//删除按钮
	var $container=$('#everything .container');
//	console.log($oA);
	$.ajax({
		type:"get",
		url:"php/lunbo.php",
		async:true,
		dataType:'json'
	}).done(function(data){
		var $arr=data.tab4;
//		console.log($arr);
	
		var html1='';
		var html2='';
//		console.log($arr[0].url);
		html1+=`<img src="${$arr[0].url}">`;
		html2+=`<img src="${$arr[1].url}">`;
		$showbg.append(html1);
		$showbg.find('img').css('float','right');
		$hidebg.append(html2);
		$showbg.find('img').on('mouseover',function(){
			$acontainer.stop(true).animate({
				width:790
			});
			$acontainer.hover(function(){
				$acontainer.css('width','790px');
			},function(){
				$acontainer.on('mouseleave',function(){
					$acontainer.stop(true).animate({
					width:0
					});
				});
		});});
		$del.on('click',function(){
			$acontainer.stop(true).animate({
				width:0
			});
		})
	});
})();
//		$showbg.find('img').hover(function(){
//			$acontainer.css('width','790px');
//			$acontainer.stop(true).animate({
//				width:790
//			});
//			$acontainer.hover(function(){
//				$acontainer.css('width','790px');
//			})
//			console.log($acontainer.width());
//	},function(){
//			console.log($acontainer.width());
//			if($acontainer.width()==790){
//				$acontainer.on('mouseleave',function(){
//					$acontainer.stop(true).animate({
//					width:0
//					});
//				});
//			}
//			else
//			{
//				$acontainer.stop(true).animate({
//				width:0
//				});
//			}
//		});
//<div id="bbsn">
//						 <a href="javascript:;" id="showbg"></a>
//						 <div class="acontainer">
//						 	<a href="javascript:;" id="hidebg"></a>
//						 	<span class="del iconfont"></span>
//						 </div>
//					</div>


//左侧二级导航
//(function(){
//	var $oUl=$('.container-left .left-menu');
//	var $oLi=$('.container-left .left-menu li');
//	var $leftDown=$('.container-left .leftdown');
//	$oLi.hover(function(){
//		$(this).addClass('li-bg');
//		$leftDown.css('display','block');
//		$leftDown.hover(function(){
//			$(this).css('display','block');
//		},function(){
//			$(this).css('display','none');
//		})
//	},function(){
//		$(this).removeClass('li-bg');
//		$($leftDown).css('display','none');
//	})
//})();

//左侧二级导航
(function(){
	var $oUl=$('.container-left .left-menu');
	var $oLi=$('.container-left .left-menu li');
	var $leftDown=$('.container-left .leftdown');
	$oLi.hover(function(){
		$(this).addClass('li-bg');
//		console.log($(this).index());
		$leftDown.eq($(this).index()).css('display','block');
		$leftDown.hover(function(){
			$leftDown.css('display','none');
			$(this).css('display','block');
		},function(){
			$(this).css('display','none');
		})
	},function(){
		$(this).removeClass('li-bg');
		$leftDown.css('display','none');
	})
})();





//倒计时
(function(){
		var $truehour=$('.true-hour .true-number');
		var $trueminute=$('.true-minute .true-number');
		var $truesecond=$('.true-second .true-number');
//		var Obox5=document.getElementById("box5");
//		console.log($truehour.html());
//		console.log($trueminute.html());
		function djs(){
			var future=new Date("2029-4-20 00:00:00");
			var now=new Date();
			var time=(future-now)/1000;
//			console.log(time);
			var day=parseInt(time/86400);
//			console.log(day);
			var hour=parseInt(time%86400/3600);
			if(hour<10){
				hour='0'+hour;
			}
			else{
				hour=hour;
			}
//			console.log(hour);
			var minute=parseInt(time%3600/60);
			if(minute<10){
				minute='0'+minute;
			}
			else{
				minute=minute;
			}
//			console.log(minute);
			var second=parseInt(time%60);
			if(second<10){
				second='0'+second;
			}
			else{
				second=second;
			}
//			console.log(second);
			
			var obj={
				d:day,
				h:hour,
				m:minute,
				s:second
			};
			$truehour.html(obj.h);
			$trueminute.html(obj.m);
			$truesecond.html(obj.s);
		};
		setInterval(function(){
			djs();
		},1000)
})();



//定时器边上的无缝切换图
(function(){
	var $oUl=$('.middle-lunbo .middle-lunbo-inner .ul-list');
	$.ajax({
		type:"post",
		url:"http://localhost:3000/images/listEverything",
		async:true,
		dataType:'json'
	}).done(function(data){
		var arr=[];
		var arr1=[];
		var lastindex;
//		console.log(data);
		$.each(data.docs, function(i) {
			if(data.docs[i].type==3){
				arr.push(data.docs[i]);
//				console.log(data.docs[i]);
			}
		});
//		var arr=data.tab5;
//		console.log(arr);
		var html='';
		$.each(arr, function(i) {
			arr1[i]=arr[i].url.replace(/\\/g,'/');
			lastindex=find(arr1[i],'/',2);
//			console.log(lastindex);
			arr1[i]=arr[i].url.replace(/\\/g,'/').substr(lastindex+1);
//			console.log(arr1[i]);
//			console.log(arr[i]);
			html+=`
<li class="li-items">
	<a href="javascript:;">
		<div class="true-image">
			<img src='${arr1[i]}'/>
		</div>
		<p class="message-title" style="color:#ccc">${arr[i].title}</p>
		<div class="price">
			<span class="new-price">
				<i>￥</i>
				<span>${arr[i].title2}</span>
			</span>
			<span class="orign-price">
				<i>￥</i>
				<span>${arr[i].title3}</span>
			</span>
		</div>
	</a>
</li>`;
		});
		$oUl.append(html);
		var $oImg=$('.li-items img');
		var $oA=$('.li-items a');
		var $oP=$('.message-title');
		var $newPrice=$('.new-price');
		var $orignPrice=$('.orign-price');
		var $prev=$('.middle-lunbo-inner .prev');
		var $next=$('.middle-lunbo-inner .next');
		var $oLi=$('.middle-lunbo-inner .ul-list .li-items');
//		console.log($('.middle-lunbo-inner').width());
//		console.log($oImg.length);
		$.each(arr, function(i) {
//			$oImg.eq(i).attr('src',arr[i].url);
//			$newPrice.eq(i).find('span').html(arr[i].title2);
//			$orignPrice.eq(i).find('span').html(arr[i].title3);
			$oLi.eq(i).addClass('addheight');
			$oA.eq(i).hover(function(){
				$oImg.eq(i).stop(true).animate({
					opacity:0.5
				})
			},function(){
				$oImg.eq(i).stop(true).animate({
					opacity:1
				})
			})
		});
		//窗口变化图片数量发生变化
		$(window).resize(function(){
				if($('.middle-lunbo-inner').width()<=599){
	//			var $oLi=$('.middle-lunbo-inner .ul-list .li-items');
//				console.log($oLi.length);
				var $arrslice1=$oLi.slice(-3);
				var $arrslice2=$oLi.slice(0,3);
				$('.prev-li').remove();
				$('.next-li').remove();
	//			console.log($arrslice);
				var html1=$arrslice1.clone().addClass('prev-li');
				var html2=$arrslice2.clone().addClass('next-li');
	//			console.log(html);
				$oUl.prepend(html1);
				$oUl.append(html2);
	//			$('.first_li').append(html);
//				console.log($('.prev-li').length);
//				console.log($('.next-li').length);
				var oChageLi=$('.middle-lunbo-inner .ul-list .li-items');
				$oUl.width(oChageLi.length*199);
				$oUl.css('left',-3*199);
	//			console.log(oChageLi.length);//18
//				oChageLi.slice(3,6).addClass('addheight');
				
			}
			else{
//				console.log($oLi.length);
				var $arrslice1=$oLi.slice(-4);
				var $arrslice2=$oLi.slice(0,4);
	//			console.log($arrslice);
				$('.prev-li').remove();
				$('.next-li').remove();
				var html1=$arrslice1.clone().addClass('prev-li');
				var html2=$arrslice2.clone().addClass('next-li');
	//			console.log(html);
				$oUl.prepend(html1);
				$oUl.append(html2);
	//			$('.first_li').append(html);
//				console.log($('.prev-li').length);
//				console.log($('.next-li').length);
				var oChageLi=$('.middle-lunbo-inner .ul-list .li-items');
				$oUl.width(oChageLi.length*200);
				$oUl.css('left',-4*200);
	//			console.log(oChageLi.length);//18
//				oChageLi.slice(4,8).addClass('addheight');
			}
		});
			//页面刷新判断
			if($('.middle-lunbo-inner').width()<=599){
	//			var $oLi=$('.middle-lunbo-inner .ul-list .li-items');
//				console.log($oLi.length);
				var $arrslice1=$oLi.slice(-3);
				var $arrslice2=$oLi.slice(0,3);
				$('.prev-li').remove();
				$('.next-li').remove();
	//			console.log($arrslice);
				var html1=$arrslice1.clone().addClass('prev-li');
				var html2=$arrslice2.clone().addClass('next-li');
	//			console.log(html);
				$oUl.prepend(html1);
				$oUl.append(html2);
	//			$('.first_li').append(html);
//				console.log($('.prev-li').length);
//				console.log($('.next-li').length);
				var oChageLi=$('.middle-lunbo-inner .ul-list .li-items');
				$oUl.width(oChageLi.length*199);
				$oUl.css('left',-3*199);
				console.log(oChageLi.length);//18
//				oChageLi.slice(3,6).addClass('addheight');
//				console.log(oChageLi.slice(6,9));
//				oChageLi.slice(0,3).addClass('addheight');
				//点击按钮触发事件
				$prev.on('click',function(){
					var oUlleft=$oUl.position().left;//-800
//					console.log(oUlleft);
					$oUl.stop().animate({
							left:parseInt(oUlleft+3*199)
						},function(){
							if($oUl.position().left>=0){
								$oUl.css('left',-2385);
//								console.log($oUl.position().left);
							}
					});
				})
				$next.on('click',function(){
					var oUlleft=$oUl.position().left;//-800
//					console.log(oUlleft);
					$oUl.stop().animate({
							left:parseInt(oUlleft-3*199)
						},function(){
							if($oUl.position().left<=-2385){
								$oUl.css('left',0);
//								console.log($oUl.position().left);
							}
					});
				})
				/*var timer=setInterval(function(){
					$next.click();
				},2000);
				$('.middle-lunbo-inner').on('mouseover',function(){
					clearInterval(timer);
//					alert(1);
				});
				$('.middle-lunbo-inner').on('mouseout',function(){
					timer=setInterval(function(){
					$next.click();
					},2000);
				})*/
			}
			else{
//				console.log($oLi.length);
				var $arrslice1=$oLi.slice(-4);
				var $arrslice2=$oLi.slice(0,4);
				$('.prev-li').remove();
				$('.next-li').remove();
	//			console.log($arrslice);
				var html1=$arrslice1.clone().addClass('prev-li');
				var html2=$arrslice2.clone().addClass('next-li');
	//			console.log(html);
				$oUl.prepend(html1);
				$oUl.append(html2);
	//			$('.first_li').append(html);
//				console.log($('.prev-li').length);
//				console.log($('.next-li').length);
				var oChageLi=$('.middle-lunbo-inner .ul-list .li-items');
				 	oChageLi.eq(4).addClass('nowli');
				var index=$oUl.find('.nowli').index();
//				console.log(index);
//				var oChageLinum=12;
				$oUl.width(oChageLi.length*200);
//				$oUl.addClass('.llll');
//				console.log(oChageLi.length);//18
//				oChageLi.slice(4,8).addClass('addheight');
				$prev.on('click',function(){
					var oUlleft=$oUl.position().left;//-800
//					console.log(oUlleft);
					$oUl.animate({
							left:oUlleft+4*200
						},function(){
							if($oUl.position().left>=0){
								$oUl.css('left',-2400);
//								console.log($oUl.position().left);
							}
					});
				})
				$next.on('click',function(){
					var oUlleft=$oUl.position().left;//-800
//					console.log(oUlleft);
					$oUl.animate({
							left:oUlleft-4*200
						},function(){
							if($oUl.position().left<=-2400){
								$oUl.css('left',0);
//								console.log($oUl.position().left);
							}
					});
				})
				/*var timer=setInterval(function(){
					$next.click();
				},3000);*/
				/*$('.middle-lunbo-inner .ul-list').on('mouseover',function(){
					clearInterval(timer);
//					alert(1);
				});
				$('.middle-lunbo-inner .ul-list').on('mouseout',function(){
					timer=setInterval(function(){
					$next.click();
					},1000);
				})*/
			}
	});
})();
//滚轮下拉顶部搜索框下拉显示
(function(){
	var n=0;
	var $searchmain=$('#search');
	var $searchmainInput=$('.search-main input');
				
	$(window).scroll(function(){
//		console.log($(window).scrollTop());
		if($(window).scrollTop()>=720){
			$searchmain.attr('id','search-onscroll');
			$searchmain.css('top',-100);
			$searchmainInput.css('background','#ccc');
	$searchmain.stop().animate({
					top:0
				},1000);
//			$searchmain.find('.text').css('background','#f1f1f1');
//			$searchmain.find('.search-main').css({'margin':'auto','height':'48px','width':'1190px'});
//			$searchmain.find('.search-logo').css()
	}
		else{
//			$searchmain.animate({
//					top:-100
//				},1000);
			$searchmain.attr('id','');
			$searchmain.attr('id','search');
			$searchmainInput.css('background','#fff');
		}
	})
})();
//家具装修设计图tab切换
(function(){
	var topLi=$(".city-four-top-y li");
	var imgDiv=$(".city-four-bottom-con");
//	console.log(topLi.length);
//  console.log(imgDiv.length);
	$.each(topLi, function(i) {
//		console.log(topLi.eq(i));
		topLi.eq(i).on('click',function(){
//			console.log(i);
//			topLi.attr('flag','0');
//			topLi.eq(i).attr('flag','1');
			topLi.removeClass('light');
			topLi.eq(i).addClass('light');
			imgDiv.css('display','none');
			imgDiv.eq(i).css('display','block');
		})
	});
})();


//购物车li拼接 以及加入购物车操作
(function(){
	var oUl=$('.ul-item-1');
	var html='';
	var sidarr=[];//存放sid的值
	var numarr=[];//存放数量的值。
	function getCookie(key){
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
	function addCookie(key,value,day){
		var date=new Date();//创建日期对象
		date.setDate(date.getDate()+day);//过期时间：获取当前的日期+天数，设置给date
		document.cookie=key+'='+encodeURI(value)+';expires='+date;//添加cookie，设置过期时间
	}
	function getcookievlaue(){
		if(getCookie('cartsid')){
			sidarr=getCookie('cartsid').split(',');
		}
		
		if(getCookie('cartsid')){
			numarr=getCookie('cartnum').split(',');
		}
	}
	$.ajax({
		type:"post",
		url:"http://localhost:3000/goods/listEverything",
		async:true
	}).done(function(data){
//		console.log(data.docs);
		var arr=[];
		var lastindex;
		var html='';
		$.each(data.docs, function(i) {
//			console.log(data.docs[i].url);
			arr[i]=data.docs[i].url.replace(/\\/g,'/');
			lastindex=find(arr[i],'/',1);
//			console.log(lastindex);
			arr[i]='img/'+data.docs[i].url.replace(/\\/g,'/').substr(lastindex+1);
//			console.log(arr[i]);
			html+=`<li index="${i}"><a href="javascript:;"><img src="${arr[i]}"/></a>
			<div class="bottom-title">
				<p class="message-title" style="color:#ccc">${data.docs[i].desc}</p>
				<div class="price">
					<span class="new-price">
						<i>￥</i>
						<span>${data.docs[i].price*2.5}</span>
					</span>
					<span class="orign-price">
						<i>￥</i>
						<span>${data.docs[i].price*4.5}</span>
					</span>
				</div>
			</div>
			<div class="button-div" style="left:130px"><input type="button" value="加入购物车" name="addCart" class="addCart middle-button" index="${i}"></div>
			</li>`;
//			<div class="button-div"><input type="button" value="查看详情" name="detail" class="detail middle-button"><input type="button" value="加入购物车" name="addCart" class="addCart middle-button" index="${i}"></div>
			
		});
		oUl.append(html);
	}).done(function(data){
		console.log(data.docs);
		var arr=[];
		$.each(data.docs, function(i) {
			arr[i]=data.docs[i].url.replace(/\\/g,'/');
			lastindex=find(arr[i],'/',1);
			arr[i]='img/'+data.docs[i].url.replace(/\\/g,'/').substr(lastindex+1);
		});
		var addCart=$('.ul-item-1 li .button-div .addCart');
		var newPrice=$('.ul-item-1 .new-price span');
		var userName=getCookie('UserNamePerson');
//		console.log(userName);
		console.log(addCart[0]);
		addCart.click(function(){
			var num=1;
			var index=$(this).index('.ul-item-1 li .button-div .addCart');
//			var sid = data.docs[index].provideCode;//当前按钮对应商品编号
//			getcookievlaue();//sidarr:存在
//			if($.inArray(sid,sidarr)!=-1){//存在
//				//将原来的值加上我当前的值
//				//parseInt(numarr[$.inArray(sid,sidarr)])：通过sid的位置，找到商品数量
////				var num=parseInt(numarr[$.inArray(sid,sidarr)])+parseInt($('#count').val());
////				numarr[$.inArray(sid,sidarr)]=num;//通过sid的位置，找num的位置
////				addCookie('cartnum', numarr.toString(), 7);
//				addCookie('cartnum', numarr.toString(), 7);
//			}else{//不存在
//				sidarr.push(sid);//将当前sid添加到数组里面。
//				addCookie('cartsid',sidarr.toString(),7);
////				numarr.push($('#count').val());
//				numarr.push(1);
//				addCookie('cartnum',numarr.toString(),7);
			$.ajax({
				type:"post",
				url:"http://localhost:3000/checks/listbyuserandgoods",
				async:true,
				data:{
					userName:$('.in-login').html().substr(3),
					goods:data.docs[index].goods,
					status:'未付款'
				}
			}).done(function(data2){
//				console.log(data2.docs.length);
//				var oSum=$('.new-price').eq(index).find('span').html();
//				var oSum=data.docs[index].price*2.5;
//				console.log(oSum);
				//若已加过购物车，直接打开购物车页面
				if(data2.docs.length>0){
					var oSum=data.docs[index].price*2.5;
					window.open('cart.html');
				}
				//若没有，则添加
				else{
					var oSum=data.docs[index].price*2.5;
//					console.log(oSum);
					console.log(getCookie('UserNamePerson'));
					$.ajax({
						type:"post",
						url:"http://localhost:3000/users/listbyusername",
						async:true,
						data:{
							username:getCookie('UserNamePerson')
						}
					}).done(function(data1){
						console.log(data1);
						var userArea=data1.docs[0].area;
						var phoneNumber=data1.docs[0].phoneNumber;
						console.log(userArea);
						$.ajax({
								type:"post",
								url:"http://localhost:3000/checks/data",
								async:true,
								data:{
									userName:$('.in-login').html().substr(3),
									provideCode:data.docs[index].provideCode,
									goods:data.docs[index].goods,
									number:1,
									phoneNumber:phoneNumber,
									price:data.docs[index].price,
									sum:oSum,
									status:'未付款',
									desc:data.docs[index].desc,
									url:arr[index],
									area:userArea
								}
						}).done(function(){
							window.open('cart.html');
						});
					});
					
					
				}
			});
		})
//		$.each(addCart, function(i) {
//			addCart.eq(i).click(function(){
////				console.log(i);
//				console.log(newPrice.eq(i).html());
//			})
//		});
		
//		console.log(addCart.length);
	});
	
	
})();


//查询字符第几次出现的位置
function find(str,cha,num){
var x=str.indexOf(cha);
for(var i=0;i<num;i++){
    x=str.indexOf(cha,x+1);
}
return x;
}