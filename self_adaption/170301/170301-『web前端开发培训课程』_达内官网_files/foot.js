	document.getElementById('id1').style.color='#ffffff';
	document.getElementById('id1').style.fontWeight='bolder';
//切换
$(document).ready(function() {
	jQuery.jqtab = function(tabtit,tab_conbox,shijian) {
		$(tab_conbox).find("li").hide();
		$(tabtit).find("li:first").addClass("thistab").show(); 
		$(tab_conbox).find("li:first").show();
	
		$(tabtit).find("li").bind(shijian,function(){
		  $(this).addClass("thistab").siblings("li").removeClass("thistab"); 
			var activeindex = $(tabtit).find("li").index(this);
			$(tab_conbox).children().eq(activeindex).show().siblings().hide();
			return false;
		});
	
	};
	
	/*调用方法如下：*/
	$.jqtab("#tabs","#tab_conbox","click");  //点击切换
	/*$.jqtab("#tabs2","#tab_conbox2","mouseenter");*/ //鼠标进过切换

});
function check(){
	document.getElementById('id2').style.color='#ffffff';
	document.getElementById('id1').style.color='#2b408b';
	document.getElementById('id2').style.fontWeight='bolder';
	document.getElementById('id1').style.fontWeight='normal';
}
function checks(){
	document.getElementById('id1').style.color='#ffffff';
	document.getElementById('id2').style.color='#2b408b';
	document.getElementById('id1').style.fontWeight='bolder';
	document.getElementById('id2').style.fontWeight='normal';
}

//焦点图
TouchSlide({ 
	slideCell:"#slides",
	titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
	mainCell:".bd ul", 
	effect:"leftLoop", 
	autoPage:true,//自动分页
	autoPlay:true //自动播放
});



//返回顶部
$("body").append('<div class="gotop" id="gotop"><div>');
$(window).scroll(function(){$(document).scrollTop()>300?$("#gotop").fadeIn():$("#gotop").fadeOut()});
$("#gotop").click(function(){$("html,body").animate({scrollTop:0},300)})
//标题文字滚动
//function run(obj){
//	var obj = document.getElementById(obj);
//	var strText= obj.innerHTML;
//	strText=strText.substring(1,strText.length)	+ strText.substring(0,1);
//	obj.innerHTML = strText;	  
//}
//setInterval('run("title")',400);

