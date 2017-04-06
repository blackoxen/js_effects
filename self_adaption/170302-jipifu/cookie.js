//var arr_wx = arr_wx ? arr_wx : '';
//var index_wx = Math.floor((Math.random()*arr_wx.length));
//var stxlwx = arr_wx[index_wx];

if (GetCookie('stxlwx') == null || !GetCookie('stxlwx') || GetCookie('stxlwx') == "null") {
	
    SetCookie("stxlwx", stxlwx, 3, "/", window.location.host, false);
    SetCookie("img", img, 3, "/", window.location.host, false);
	
	SetCookie("wx_img", wx_img, 3, "/", window.location.host, false);

} 
else {
    stxlwx = GetCookie("stxlwx");
    img = GetCookie("img");
	
    wx_img = GetCookie("wx_img");
	
}

if (GetCookie('img1') == null || !GetCookie('img1') || GetCookie('img1') == "null") {
	
    
    SetCookie("img1", img1, 3, "/", window.location.host, false);
	
	SetCookie("wx_img1", wx_img1, 3, "/", window.location.host, false);
	
} 
else {
    
   
	img1 = GetCookie("img1");
    wx_img1 = GetCookie("wx_img1");
	
}

function SetCookie(a, c, b, d, e, g) {

    var f = new Date;

    f.setTime(f.getTime() + b * 86400);

    b == null || f.toGMTString();

    document.cookie = a + "=" + escape(c) + (d == null ? "" : ";path=" + d) + (e == null ? "" : ";domain=" + e) + (g == true ? ";secure" : "")

}





function GetCookie(a) {

    var c = null,
        b = document.cookie + ";",
        d = a + "=",
        a = b.indexOf(d);

    a != -1 && (a += d.length, c = b.indexOf(";", a), c = unescape(b.substring(a, c)));

    return c

}

function contains(array, obj) { 

  var i = a.length; 

  while (i--) { 

    if (a[i] === obj) { 

      return true; 

    } 

  } 

  return false; 

}