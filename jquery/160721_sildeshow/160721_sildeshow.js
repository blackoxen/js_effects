$(function(){
	var page = 1;
	var i= 4;			//每个版面放4张图片
		
	$('span.next').click(function(){
		//缓存jQuery对象  
		var $tip = $('#tip');					//控制tip样式
		var	$viewBox = $('#viewBox');			//为了获取viewBox的宽度
		var	$list = $('#list');					//动画切换主体
		
		var	width = $viewBox.width();
		var len = $list.find('li').length;		//总的图片数量
		var page_count = Math.ceil(len/i);		//向上取整
		
		if( !$list.is(":animated")){			//判断list区域是否处于动画；避免快速连续点击时产生的动画积累。
			if (page == page_count) {
				$list.animate({left:'0px'},'normal');  //改变left值，跳的第一个版面
				page = 1;
			} else{
				$list.animate({left:'-='+width},'normal');  //通过改变left值，达到每次换一个版面
				page++;
			}
				
			$tip.find("span").eq((page-1)).addClass("current")                //tip样式切换
										.siblings().removeClass("current");   //删除其他同胞元素的样式
		}	
	});
	
	$('span.prev').click(function(){
		//缓存jQuery对象  
		var $tip = $('#tip');
		var	$viewBox = $('#viewBox');
		var	$list = $('#list');
		
		var	width = $viewBox.width();
		var len = $list.find('li').length;		//总的图片数量
		var page_count = Math.ceil(len/i);		//向上取整
		
		if( !$list.is(":animated")){			//判断list区域是否处于动画；避免快速连续点击时产生的动画积累。
			if (page == 1) {
				$list.animate({left:'-'+width*(page_count-1)},'normal');  //跳到最后一个版面，注意前面要加负号('-')。
				page = page_count;
			} else{
				$list.animate({left:'+='+width},'normal');  //通过改变left值，达到每次换一个版面
				page--;
			}
				
			$tip.find("span").eq((page-1)).addClass("current")   //tip样式切换；因为索引从0开始，所以用：page-1
										.siblings().removeClass("current");
		}	
	})
})
