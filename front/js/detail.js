;(function(){
	function Fdj(){
    		this.wrap=document.querySelector('.wrap');
    		this.sf=document.getElementById('sf');
    		this.bf=document.getElementById('bf');
    		this.spic=document.getElementById('spic');
    		this.bpic=document.getElementById('bpic');
    		this.oUl=document.querySelector('#list ul');//移动的盒子
    		this.aLi=document.querySelectorAll('#list ul li');
    		this.left=document.getElementById('left');
    		this.right=document.getElementById('right');
    	}
    	Fdj.prototype={
   			//初始化方法
    		init:function(){
    			var that=this;
    			//1.显示小放大镜和大放大镜
    			this.spic.onmouseover=function(){
    				that.show();
    				that.sfsize();
    				//3.小放大镜跟随鼠标移动
    				this.onmousemove=function(ev){//this:小图
    					var ev=ev||window.event;
    					that.move(ev);
    				}
    			};
    			this.spic.onmouseout=function(){
    				that.hide();
    			};
    			
    			
    			//5.给每一个li添加点击事件，切换图片
    			for(var i=0;i<this.aLi.length;i++){
    				//this:实例对象
    				//alert(this);//[object,object]
    				(function(i){
    					//alert(this);//window
    					that.aLi[i].onclick=function(){
    						that.spic.getElementsByTagName('img')[0].src=that.aLi[i].getElementsByTagName('img')[0].src;
    						that.bpic.src=that.aLi[i].getElementsByTagName('img')[0].src;
    					}
    				})(i);
    			}
    			//6.移动左右箭头
    			var num=6;//显示的图片个数
    			var liwidth=this.aLi[0].offsetWidth;//1个li的width
    			if(this.aLi.length<=6){
    				this.right.style.color='#fff';
    			}
    			this.right.onclick=function(){
    				if(num < that.aLi.length){
    					num++;
    					if(num==that.aLi.length){
    						that.right.style.color='#fff';
    					}
    					that.left.style.color='#333';
    				}
    				
    				bufferMove(that.oUl,{left:-liwidth*(num-6)});
    				
    			};
    			
    			this.left.onclick=function(){
    				if(num > 6){
    					num--;
    					if(num==6){
    						that.left.style.color='#fff';
    					}
    					that.right.style.color='#333';
    				}
    				
    				bufferMove(that.oUl,{left:-liwidth*(num-6)});
    				
    			};
    			
    		},
    		show:function(){
    			this.sf.style.visibility='visible';
    			this.bf.style.visibility='visible';
    		},
    		sfsize:function(){
				//2.求小放大镜的宽高，同时求发大比例。
				this.sf.style.width=this.spic.offsetWidth*this.bf.offsetWidth/this.bpic.offsetWidth+'px';
				this.sf.style.height=this.spic.offsetHeight*this.bf.offsetHeight/this.bpic.offsetHeight+'px';
				this.scale=this.bf.offsetWidth/this.sf.offsetWidth;
    		},
    		hide:function(){
    			this.sf.style.visibility='hidden';
    			this.bf.style.visibility='hidden';
    		},
    		move:function(ev){
    			var l=ev.clientX-this.wrap.offsetLeft-this.sf.offsetWidth/2;
    			var t=ev.clientY-this.wrap.offsetTop-this.sf.offsetHeight/2;
    			if(l<0){
    				l=0;
    			}else if(l>=this.spic.offsetWidth-this.sf.offsetWidth){
    				l=this.spic.offsetWidth-this.sf.offsetWidth-2;
    			}
    			
    			if(t<0){
    				t=0;
    			}else if(t>=this.spic.offsetHeight-this.sf.offsetHeight){
    				t=this.spic.offsetHeight-this.sf.offsetHeight-2;
    			}
    			
    			this.sf.style.left=l+'px';
    			this.sf.style.top=t+'px';
    			//4.给大图赋值
    			this.bpic.style.left=-this.scale*l+'px';
    			this.bpic.style.top=-this.scale*t+'px';
    		}
    	};
    	
    	new Fdj().init();
})();


//加入购物车
(function(){
			var sidarr=[];//存放sid的值
			var numarr=[];//存放数量的值。
			function getCookie(key){
			var str=decodeURI(document.cookie);
			var arr=str.split('; ');
			for(var i=0;i<arr.length;i++){
				var arr1=arr[i].split('=');
 				if(arr1[0]==key){
					return arr1[1];
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

			$('.p-btn a').on('click', function() {
				//1.先判断当前点击的商品是否存在于cookie中。
				var sid = $('.id-image').attr('sid');//当前按钮对应图片的sid
				getcookievlaue();//sidarr:存在
				if($.inArray(sid,sidarr)!=-1){//存在
					//将原来的值加上我当前的值
					//parseInt(numarr[$.inArray(sid,sidarr)])：通过sid的位置，找到商品数量
					var num=parseInt(numarr[$.inArray(sid,sidarr)])+parseInt($('#count').val());
					numarr[$.inArray(sid,sidarr)]=num;//通过sid的位置，找num的位置
					addCookie('cartnum', numarr.toString(), 7);
				}else{//不存在
					sidarr.push(sid);//将当前sid添加到数组里面。
					addCookie('cartsid',sidarr.toString(),7);
					numarr.push($('#count').val());
					addCookie('cartnum',numarr.toString(),7);
				}
			});
})();
