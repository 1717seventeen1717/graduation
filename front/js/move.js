
function getstyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj)[attr];
	}
}

function bufferMove(obj,json,fn){//fn:回调函数
	var speed=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		//获取当前值取整的，不适合opacity
		var bstop=true;// 所有的属性都到了目标点。
		for(var attr in json){//attr:传入的属性   json[attr]
			var cur=null;
			if(attr=='opacity'){//如果属性是opacity:将opacity的值扩大100倍
				cur=Math.round(getstyle(obj,attr)*100);//减少误差，采用四舍五入取整。
			}else{
				cur=parseInt(getstyle(obj,attr));//px单位
			}
			
			speed=(json[attr]-cur)/8;//最大的透明的目标值扩大100倍 , 自己传输的
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			//当前值不等于目标点，继续运动。
			if(cur!=json[attr]){
				if(attr=='opacity'){//如果属性是opacity,重新赋值
					obj.style.opacity=(cur+speed)/100;   //上面扩大了100倍
					obj.style.filter='alpha(opacity='+(cur+speed)+')';
				}else{
					obj.style[attr]=cur+speed+'px';
				}
				bstop=false;//成立，不能关闭定时器
			}
			
		}
		
		
		if(bstop){//遍历结束bstop=true,代表所有的属性都到了目标点，停止定时器
			clearInterval(obj.timer);
			fn&&fn();//如果fn参数存在，执行它
		}

	},5);
}

