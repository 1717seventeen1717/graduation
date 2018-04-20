(function(){
	var $search=$('#search .form');
	var $input=$('#search .form .text');
	var $oUl=$('.search-dropdpwn');

	$input.focus(function(){
		$(this).attr('placeholder','');
	});
	function taobao(data){

		var $arr=data.result;
		var html='';
		if($arr.length<4){
			$.each($arr, function(i) {

				html+='<li><a href="https://suggest.taobao.com/sug?code=utf-8&q=111&_ksTS=1522219179875_608&callback=jsonp609&k='+$arr[i]+'&area=c2c&bucketid=4">'+$arr[i]+'</a></li>';

		}else{
			$.each($arr, function(i) {

				html+='<li><a href="https://suggest.taobao.com/sug?code=utf-8&q=111&_ksTS=1522219179875_608&callback=jsonp609&k='+$arr[i]+'&area=c2c&bucketid=4">'+$arr[i]+'</a></li>';
			});
		};
		oUl.html(html);
	};
	$input.bind('input propertychange',function(){
		var cscript=document.createElement('script');

		cscript.src='https://suggest.taobao.com/sug?code=utf-8&q='+$input.val()+'&_ksTS=1522219975013_401&callback='+taobao+'&k=1&area=c2c&bucketid=4'
		$("body").append(cscript);
	});
})();