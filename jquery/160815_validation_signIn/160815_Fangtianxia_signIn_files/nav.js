
jQuery(function () {
    jQuery(".clear").remove();
    var deletename = "漳州,舟山,岳阳,盐城,襄阳,乐山,临沂,济宁,衡阳,蚌埠,全国";
    jQuery(".city20141104nr a").each(function () {
        var name = jQuery(this).text();
        if (deletename.indexOf(name) > 0) {
            jQuery(this).remove();
        } else {
            var temp = jQuery(this).attr("href").replace("http://", "").replace(".fang.com/", "").replace("www.", "").replace(".com/", "");
            if (temp == "" || temp == "www") {
                temp = "bj";
            }
            jQuery(this).attr("href", window.location.pathname+"?city=" + temp);//需要修改
        }
    })
});

    jQuery(function () {
        jQuery(".clear").remove();
        var deletename = "海外";
        jQuery(".city20141104nr a").each(function () {
            var name = jQuery(this).text();
            if (deletename.indexOf(name) >= 0) {
                jQuery(this).attr("href", "http://world.fang.com");
            }
        })
    });

    jQuery(function () {
        jQuery(".clear").remove();
        var deletename = "377城市";
        jQuery(".city20141104nr a").each(function () {
            var name = jQuery(this).text();
            if (deletename.indexOf(name) >= 0) {
                jQuery(this).attr("href", "http://fang.com/SoufunFamily.htm");
            }
        })
    });

    jQuery(function () {
        jQuery(".clear").remove();
        var deletename = "更多城市>>";
        jQuery(".city20141104nr a").each(function () {
            var name = jQuery(this).text();
            if (deletename.indexOf(name) >= 0) {
                jQuery(this).attr("href", "http://fang.com/SoufunFamily.htm");
            }
        })
    });

    //jQuery(function () {
    //    jQuery(".clear").remove();
    //    var deletename = "注册";
    //    jQuery(".s4Box a").each(function () {
    //        var name = jQuery(this).text();
    //        if (deletename.lastIndexOf(name) == 0) {
    //            jQuery(this).attr("href", "register.aspx");
    //        }
    //    });
    //});

    jQuery(function () {
        var tempHtmlRe = "<div class=\"s4Box\"><a href=\"/NewRegister.aspx\">注册</a></div><div class=\"listBox\" style=\"width:90px;\" id=\"div_listBox\"><ul><li><a href=\"/NewRegister.aspx\" target=\"_blank\">通行证</a></li><li><a href=\"http://agent.fang.com/AgentRegister.aspx\" target=\"_blank\">搜房帮</a></li><li><a href=\"http://dianpu.fang.com/register.aspx\" target=\"_blank\">装修帮</a></li></ul></div>";
        jQuery(".clear").remove();
        var deletename = "注册";
        jQuery(".s4Box a").eq(-2).mouseover(function () {
            jQuery(".s4a").eq(-2).html(tempHtmlRe);
        });
    });

    jQuery(function () {
        var tempHtml = "<div class=\"s4Box\"><a href=\"/Default/Login/\">登录</a></div><div class=\"listBox\" style=\"width:90px;\" id=\"div_listBox\"><ul><li><a href=\"/NewLogin.aspx?backurl=my.fang.com/\" target=\"_blank\">我的房天下</a></li><li><a href=\"http://agent.fang.com/\" target=\"_blank\">搜房帮</a></li><li><a href=\"http://www.fang.com/xinfangbang/login.html\" target=\"_blank\">新房帮</a></li><li><a href=\"http://dianpu.fang.com/\" target=\"_blank\">装修帮</a></li></ul></div>";
        jQuery(".clear").remove();
        var deletename = "登录";
        jQuery(".s4Box a:last").mouseover(function () {
            jQuery(".s4a:last").html(tempHtml);
        });
    });