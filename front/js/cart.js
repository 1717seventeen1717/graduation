/*//获取当前的cookie，将cookie商品列表创建出来
if (getCookie('cartsid') && getCookie('cartnum')) {
    var s = getCookie('cartsid').split(',');//存放sid数组
    var n = getCookie('cartnum').split(',');//存放数量数组
    for (var i = 0; i < s.length; i++) {
        createcart(s[i], n[i]);//遍历创建商品列表
    }
}
//function c(){
//	var cookie=getcookie('cartsid');
//	alert(cookie);
//};
//c();
//创建商品列表
function createcart(sid, num) {//sid：图片的编号  num:商品的数量
    $.ajax({
        url: 'json/cart.json',
        dataType: 'json'
    }).done(function(data) {
        for (var i = 0; i < data.length; i++) {
            if (sid == data[i].sid) {//图片的sid和数据里面的sid匹配
                var $clone = $('.goods-item:hidden').clone(true);//对隐藏的模块进行克隆
                //都是赋值
                $clone.find('.goods-pic').find('img').attr('src', data[i].img);
                $clone.find('.goods-pic').find('img').attr('sid', data[i].sid);
                $clone.find('.goods-d-info').find('a').html(data[i].title);
                $clone.find('.b-price').find('strong').html(data[i].price);
                $clone.find('.quantity-form').find('input').val(num);
                //计算价格
                var $dj1 = parseFloat($clone.find('.b-price strong').html());
                $clone.find('.b-sum strong').html(($dj1 * num).toFixed(2));
                $clone.css('display', 'block');//克隆的模块是隐藏，显示出来。
                $('.item-list').append($clone);//追加
                kong();
                totalprice();
            }
        }
    });
}
//商品列表不存在显示购物车为空
kong()
function kong() {
    if (getCookie('cartsid')) {
        $('.empty-cart').hide();
    } else {
        $('.empty-cart').show();
    }
}

//计算总价
totalprice();
function totalprice() {//计算总价
    var total = 0;
    var countnum = 0;
    $('.goods-item:visible').each(function() {//显示出来的进行遍历
        if ($(this).find('input:checkbox').is(':checked')) {//复选框是选中的
            total += parseFloat($(this).find('.b-sum strong').html());//商品的总价
            countnum += parseInt($(this).find('.quantity-form').find('input').val());//商品的数量
        }
    });
    $('.totalprice').html('￥' + total.toFixed(2));
    $('.amount-sum em').html(countnum);
}


//推荐商品的数据。
$.ajax({
	url: 'json/cart.json',//接口
	async:false,
    dataType: 'json'//数据的类型
}).done(function(data){//data:接口的返回的数据
	var $html = '';
    for (var i = 0; i < 4; i++) {
        $html += '<li>' +
            '<div class="goodsinfo">' +
            '<div class="p-img">' +
            '<a href="##"><img class="loadimg" src="' + data[i].img + '" alt="" sid="' + data[i].sid + '" /></a>' +
            '</div>' +
            '<div class="p-name">' +
            '<a class="loadt" href="##">' + data[i].title + '</a>' +
            '</div>' +
            '<div class="p-price"><strong><em>￥</em><i class="loadpcp">' + data[i].price + '</i></strong></div>' +
            '<div class="p-btn"><a href="javascript:void(0)"><b></b>加入购物车</a></div>' +
            '</div>' +
            '</li>';
    }
    $('.goods-list ul').html($html);//将数据追加到商品列表
});


var sidarr=[];//存放sid的值
var numarr=[];//存放数量的值。
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
	var sid = $(this).parents('.goodsinfo').find('.loadimg').attr('sid');//当前按钮对应图片的sid
	getcookievlaue();//sidarr:才存在
	if($.inArray(sid,sidarr)!=-1){//存在
		$('.goods-item:visible').each(function() {//遍历可视的商品列表
            if (sid == $(this).find('img').attr('sid')) {//添加购物车按钮对应的图片的sid和购物车中商品列表的sid一致
                var $num = $(this).find('.quantity-form input').val();//获取数量的值
                $num++;//数量累加
                $(this).find('.quantity-form input').val($num);//将数量赋值回去
                //计算价格
                var $dj = parseFloat($(this).find('.b-price strong').html());//获取当前的单价
                $(this).find('.b-sum strong').html(($dj * $num).toFixed(2));//计算商品总价

                //存储数量到cookie里面。通过编号找数量
                numarr[$.inArray(sid, sidarr)] = $num;//将数量存储到对应的cookie存放数量的数组中
                addCookie('cartnum', numarr.toString(), 7);//添加购物车
                totalprice();
            }
        });
	}else{//不存在
		sidarr.push(sid);//将当前sid添加到数组里面。
		addCookie('cartsid',sidarr.toString(),7);
		numarr.push(1);
		addCookie('cartnum',numarr.toString(),7);
		createcart(sid, 1);
	}
});
*/


function cookieToArray(){
	if(getCookie('cartsid')){
		sidarr=getCookie('cartsid').split(',');//将cookie值通过逗号拆分为数组。
	}else{
		sidarr=[];
	}
	
	if(getCookie('cartnum')){//存放数量
		numarr=getCookie('cartnum').split(',');
	}else{
		numarr=[];
	}
}

//1.推荐商品的数据。
//$.ajax({
//	type:'post',
//	url: 'http://localhost:3000/goods/listEverything',//接口
//	async:true
//}).done(function(data){//data:接口的返回的数据
//	console.log(data.docs);
//	var arr=[];
//	var lastindex;
//	var $html = '';
//	$.each(data.docs, function(i) {
//		arr[i]=data.docs[i].url.replace(/\\/g,'/');
//		lastindex=find(arr[i],'/',1);
////			console.log(lastindex);
//		arr[i]='img/'+data.docs[i].url.replace(/\\/g,'/').substr(lastindex+1);
//	});
//	console.log(arr);
//  for (var i = 0; i < 4; i++) {
//      $html += '<li>' +
//          '<div class="goodsinfo">' +
//          '<div class="p-img">' +
//          '<a href="#"><img class="loadimg" src="' + arr[i].url + '" alt="' + i + '" sid="' + data.docs[i]._id + '" /></a>' +
//          '</div>' +
//          '<div class="p-name">' +
//          '<a class="loadt" href="##">' + data.docs[i].title + '</a>' +
//          '</div>' +
//          '<div class="p-price"><strong><em>￥</em><i class="loadpcp">' + data.docs[i].price + '</i></strong></div>' +
//          '<div class="p-btn"><a href="javascript:void(0)"><b></b>加入购物车</a></div>' +
//          '</div>' +
//          '</li>';
//  }
//  $('.goods-list ul').html($html);//将数据追加到商品列表
//});


//购物车的思路
//每张图片都有sid，存放到cookie里面的是图片的sid和商品数量
//将每个产品的信息放置到数据里面。

//cookie自定义key值   cartsid 存放sid  cartnum 存放数量

//如果sid存在cookie里面，已经创建了商品列表，数量累加，否则就是第一次操作，创建商品列表

//3.获取cookie，cookie多个sid，多个商品数量，采用数组的形式存储。
//存储cookie的sid和数量
var sidarr = [];
var numarr = [];
function getcookievalue(){
	if(getCookie('cartsid')){
		sidarr=getCookie('cartsid').split(',');
	}
	
	if(getCookie('cartnum')){
		numarr=getCookie('cartnum').split(',');
	}
}

//2.给加入购物车按钮添加对应的事件，判断当前的按钮对应的图片的sid是否存在于cookie里面
//2.委托原理获取商品列表的添加购物车按钮
//$('.goods-list ul').on('click', '.p-btn a', function() {
//	var sid = $(this).parents('.goodsinfo').find('.loadimg').attr('sid');//当前按钮对应图片的sid
//	getcookievalue();//获取cookie值，放到对应的数组中
//	if ($.inArray(sid, sidarr) != -1) {//存在，数量加1
//		$('.goods-item:visible').each(function() {//遍历可视的商品列表
//          if (sid == $(this).find('img').attr('sid')) {//添加购物车按钮的索引和购物车中商品列表的索引一致
//              var $num = $(this).find('.quantity-form input').val();//获取数量的值
//              $num++;//数量累加
//              $(this).find('.quantity-form input').val($num);//将数量赋值回去
//              //计算价格
//              var $dj = parseFloat($(this).find('.b-price strong').html());//获取当前的单价
//              $(this).find('.b-sum strong').html(($dj * $num).toFixed(2));//计算商品总价
//
//              //存储数量到cookie里面。通过编号找数量
//              numarr[$.inArray(sid, sidarr)] = $num;//将数量存储到对应的cookie存放数量的数组中
//              addCookie('cartnum', numarr.toString(), 7);//添加购物车
//              totalprice();
//          }
//      });
//	}else{//当前商品列表没有进入购物车，创建商品列表
//		sidarr.push(sid);//将当前id添加到数组里面。
//      addCookie('cartsid', sidarr.toString(), 7);//将整个数组添加到cookie
//      numarr.push(1);//走这里数量都是1.
//      addCookie('cartnum', numarr.toString(), 7);
//      createcart(sid, 1);
//      totalprice();
//	}
//});



//4.创建一个商品列表的函数
//function createcart(sid, num) {//sid：图片的编号  num:商品的数量
	function createcart(){
//		console.log($('.usernametitle').html());
    $.ajax({
    	type:'post',
    	url:'http://localhost:3000/checks/listbyuserandarrearage',
    	async:true,
    	data:{
    		userName:$('.usernametitle').html()
    	}
//      url: 'json/cart.json',
//      dataType: 'json'
    }).done(function(data) {
//  	商品列表不存在显示购物车为空
//		console.log(data);
		if (data.docs.length>0) {
		        $('.empty-cart').hide();
//		        console.log(data.docs);
		    	var arr=[];
				$.each(data.docs, function(i) {
					arr[i]=data.docs[i].url.replace(/\\/g,'/');
					lastindex=find(arr[i],'/',1);
					arr[i]=data.docs[i].url.replace(/\\/g,'/').substr(lastindex+1);
				});
//		        console.log(arr);
		        $.each(data.docs, function(i) {
    		 	var $clone = $('.goods-item:hidden').clone(true);//对隐藏的模块进行克隆
    		 	var html='';
//              console.log($clone);
                //都是赋值
//              $clone.find('.goods-pic').find('img').attr('src', data[i].img);
//              $clone.find('.goods-pic').find('img').attr('sid', data[i].sid);
//              $clone.find('.goods-d-info').find('a').html(data[i].title);
//              $clone.find('.b-price').find('strong').html(data[i].price);
//              $clone.find('.quantity-form').find('input').val(num);
				$clone.attr('checkid',data.docs[i]._id);
				$clone.find('.goods-pic').find('img').attr('src', arr[i]);
//              $clone.find('.goods-pic').find('img').attr('sid', data[i].sid);
                $clone.find('.goods-d-info').find('a').html(data.docs[i].desc);
                $clone.find('.prop-text').html(data.docs[i].desc);
                $clone.find('.b-price').find('strong').html(data.docs[i].price);
//              $clone.find('.quantity-form').find('input').val(num);
                $clone.find('.quantity-form').find('input').val(data.docs[i].number);
				$clone.find('.quantity-add').attr('checkid',data.docs[i]._id);
                //计算价格
                var $dj1 = parseFloat($clone.find('.b-price strong').html());
//              $clone.find('.b-sum strong').html(($dj1 * num).toFixed(2));
                $clone.find('.b-sum strong').html(($dj1 * data.docs[i].number).toFixed(2));
                $clone.css('display', 'block');//克隆的模块是隐藏，显示出来。
                $('.item-list').append($clone);//追加
//              $('.item-list').append(html);
//              kong()
                totalprice();
    	});
		} else {
		        $('.empty-cart').show();
		}
    	
		
    	
       /* for (var i = 0; i < data.docs.length; i++) {
//          if (sid == data.docs[i].provideCode) {//图片的sid和数据里面的sid匹配
               
//          }
        }*/
    });
  }
//}


//5.页面加载检测购物车中是否有数据，有的话创建商品列表
//createcart();
//if (getCookie('cartsid') && getCookie('cartnum')) {
//  var s = getCookie('cartsid').split(',');//存放sid数组
//  var n = getCookie('cartnum').split(',');//存放数量数组
////  console.log(s,n);
//  for (var i = 0; i < s.length; i++) {
//      createcart(s[i], n[i]);//遍历创建商品列表
//  }
//}

//6.商品列表不存在显示购物车为空

//kong();

//function kong() {
//  if (getCookie('cartsid')) {
//      $('.empty-cart').hide();
//  } else {
//      $('.empty-cart').show();
//  }
//}




//7.计算总价
totalprice();

function totalprice() {//计算总价
    var total = 0;
    var countnum = 0;
    $('.goods-item:visible').each(function() {//显示出来的
        if ($(this).find('input:checkbox').is(':checked')) {//复选框是选中的
            total += parseFloat($(this).find('.b-sum strong').html());
            countnum += parseInt($(this).find('.quantity-form').find('input').val());
        }
    });
    $('.totalprice').html('￥' + total.toFixed(2));
    $('.amount-sum em').html(countnum);
}



//8.全选
$('.allsel').on('change', function() {
    $('.goods-item:visible').find('input:checkbox').prop('checked', $(this).prop('checked'));
    $('.allsel').prop('checked', $(this).prop('checked'));
    totalprice();
});

var $inputchecked = $('.goods-item:visible').find('input:checkbox');//获取委托元素
$('.item-list').on('change', $inputchecked, function() {
    var $inputs = $('.goods-item:visible').find('input:checkbox'); //放内部
    if ($('.goods-item:visible').find('input:checked').length == $inputs.length) {
        $('.allsel').prop('checked', true);
    } else {
        $('.allsel').prop('checked', false);
    }
    totalprice();
});


//9.删除商品列表
//删除cookie的函数
function delgoodslist(sid, sidarr) {//sid：当前的sid，sidarr:cookie的sid的值
    var index = -1;
    for (var i = 0; i < sidarr.length; i++) {
        if (sid == sidarr[i]) {
            index = i;
        }
    }
    sidarr.splice(index, 1);//删除数组对应的值
    numarr.splice(index, 1);//删除数组对应的值
    addCookie('cartsid', sidarr.toString(), 7);//添加cookie
    addCookie('cartnum', numarr.toString(), 7);
}

//删除单个商品的函数(委托)
$('.item-list').on('click', '.b-action a', function(ev) {
    cookieToArray(); //转数组
    var bool=confirm('你确定要删除吗？');
    if(bool!=true){
    	 return ;
    }
    else{
    	 $(this).first().parents('.goods-info').remove();
    	 delgoodslist($(this).first().parents('.goods-info').find('img').attr('sid'), sidarr);
   		 totalprice();
    };
});


//删除全部商品的函数
$('.operation a:first').on('click', function() {
    $('.goods-item:visible').each(function() {
        if ($(this).find('input:checkbox').is(':checked')) {
            $(this).remove();
            delgoodslist($(this).find('img').attr('sid'), sidarr);
        }
    });
    totalprice();
});

//10.修改数量的操作
//改变商品数量++
$('.quantity-add').on('click', function() {
	var index=$(this).index('.quantity-add');
    var $count = $(this).parents('.goods-item').find('.quantity-form input').val();
    $count++;
    if ($count >= 99) {
        $count = 99;
    }
    $(this).parents('.goods-item').find('.quantity-form input').val($count);
    $(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this)));//改变后的价格
    totalprice();
    putCheck($(this),index);
//  setcookie($(this));
	
});


//改变商品数量--
$('.quantity-down').on('click', function() {
	var index=$(this).index('.quantity-down');
	var sid=$(this).attr('checkid');
//	console.log($(this).attr('checkid'));
    var $count = $(this).parents('.goods-item').find('.quantity-form input').val();
    $count--;
    if ($count <= 1) {
        $count = 1;
    }
    $(this).parents('.goods-item').find('.quantity-form input').val($count);
    $(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this)));//改变后的价格
    totalprice();
//  setcookie($(this));
    putCheck($(this),index);
});


//直接输入改变数量
$('.quantity-form input').on('input', function() {
	var index=$(this).index('.quantity-form input');
    var $reg = /^\d+$/g; //只能输入数字
    var $value = parseInt($(this).val());
//  console.log($('.quantity-form input').length);
	console.log(index);
    if ($reg.test($value)) {
        if ($value >= 99) {//限定范围
            $(this).val(99);
        } else if ($value <= 0) {
            $(this).val(1);
        } else {
            $(this).val($value);
        }
    } else {
        $(this).val(1);
    }
    $(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this)));//改变后的价格
    totalprice();
//  setcookie($(this));
	putCheck($(this),index);
});

//点击确认付款 修改选中商品的状态为已付款
$('.submitA').click(function(){
	var check=confirm('你确定付款吗？');
	if(check){
		$('.goods-item:visible').each(function() {//显示出来的
	        if ($(this).find('input:checkbox').is(':checked')) {//复选框是选中的
	            $.ajax({
	            	type:"put",
	            	url:"http://localhost:3000/checks/data/"+$(this).attr('checkid'),
	            	async:true,
	            	data:{
	            		status:'已付款',
	            		area:$('.areatext').val()
	            	}
	            }).done(function(data){
	            	window.open('mycheck.html');
	            });
	        }
	    });
	}
	
})

//修改地址框修改订单
$('.areatext').on('input',function(){
	putarea();
})

//11.计算单个商品的价格
function singlegoodsprice(row) { //row:当前元素
    var $dj = parseFloat(row.parents('.goods-item').find('.b-price').find('strong').html());
    var $cnum = parseInt(row.parents('.goods-item').find('.quantity-form input').val());
    return ($dj * $cnum).toFixed(2);
}


//12.将改变后的数量的值存放到cookie
function setcookie(obj) { //obj:当前操作的对象
    cookieToArray();
    var $index = obj.parents('.goods-item').find('img').attr('sid');
    numarr[sidarr.indexOf($index)] = obj.parents('.goods-item').find('.quantity-form input').val();
    addCookie('cartnum', numarr.toString(), 7);
}


//查询字符第几次出现的位置
function find(str,cha,num){
var x=str.indexOf(cha);
for(var i=0;i<num;i++){
    x=str.indexOf(cha,x+1);
}
return x;
}

//修改订单数据

//点击修改当前id的订单
function putCheck(obj,index){
//	var index=obj.index('.quantity-add');
//	console.log(index);
	var sid=$('.goods-item').eq(index).attr('checkid');
//	var sid=$(this).parent('.goods-item').attr('checkid');
//	console.log(sid);
//	console.log($(this).attr('checkid'));
//	console.log(obj.parents('.goods-item').find('.b-sum strong').html());
	var sarea=$('.areatext').val();
//	console.log(obj.parents('.goods-item').find('.quantity-form input').val());
	$.ajax({
    	type:"put",
    	url:"http://localhost:3000/checks/data/"+sid,
    	async:true,
    	data:{
    		number:obj.parents('.goods-item').find('.quantity-form input').val(),
    		sum:obj.parents('.goods-item').find('.b-sum strong').html(),
    		area:sarea
    	}
   }).done(function(data){
   		
//  	console.log(data);
//  	console.log(data._id);
    });
}

;(function(){
	var oDiv=$('.usernametitle');
	var title=getCookie('UserNamePerson');
	oDiv.html(title);
	//5.页面加载检测购物车中是否有数据，有的话创建商品列表
	createcart();
	$.ajax({
			type:"post",
			url:"http://localhost:3000/users/listbyusername",
			async:true,
			data:{
				username:getCookie('UserNamePerson')
			}
	}).done(function(data){
//		console.log(data.docs[0].area);
		$('.areatext').val(data.docs[0].area);
	});
})();

//修改地址时修改订单
function putarea(){
	var length=$('.goods-item').length;
	var sid=[]
	for(var i=1;i<length;i++){
		sid.push($('.goods-item').eq(i).attr('checkid'));
	}
//	console.log(sid);
	var sarea=$('.areatext').val();

	$.each(sid, function(i) {
		console.log(i);
		$.ajax({
	    	type:"put",
	    	url:"http://localhost:3000/checks/data/"+sid[i],
	    	async:true,
	    	data:{
	    		area:sarea
	    	}
	   }).done(function(data){
//	   	console.log(data);
	   })
	});
}
