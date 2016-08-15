
//检查用户名
var isnamevalid = false;
//检查确认密码
var ispass1valid = false;
//检查密码
var ispassvalid = false;

var isupdate = false;

jQuery(document).ready(function () {
    jQuery("#strMobile").val(""); 
    jQuery("#strVcode").val("");
    jQuery("#txt_mathcode").val("");
    jQuery("#strUsername").val("");
    jQuery("#strPassword").val("");
    jQuery("#strPasswordConfirm").val("");

    jQuery("#strUsername").focus(function() {
        ShowWrong(jQuery("#strUsername"), "推荐使用中文名称;可输入4-20位字符,数字,英文,下划线或组合", "plus_b");
    });

    jQuery("#strUsername").blur(function() {      
        check_username(this);     
    });

    jQuery("#strPassword").blur(function() {
        check_pass(this);
    });
    jQuery("#strPassword").focus(function() {
        onPasswordFocus();
    });
    jQuery("#strPasswordConfirm").blur(function() {
        check_pass1(this);
    });
    jQuery("#strPasswordConfirm").focus(function() {
        ShowWrong(jQuery("#strPasswordConfirm"), "请再输入一遍相同的密码", "plus_b");
    });

});


function onPasswordFocus() {
    if (isupdate) {
        ShowWrong(jQuery("#strPassword"), "请输入通行证帐号的登录密码，以便核实您的帐号", "plus_b");
    }
    else {
        ShowWrong(jQuery("#strPassword"), "6-16个半角字符，可为字母、数字及组合，区分大小写", "plus_b");
    }
}


function check_username(obj) {
    if (check_value(obj)) {
        ajax_username();
    }
}
//普通验证
function check_value(obj) {
    if (val(obj) == "") {
        ShowWrong(obj, "请输入用户名，推荐使用中文名称", "plus_c");
        //ShowWrong(obj, "", "");
        return false;
    }

    if (/[A-Z]/.test(val(obj))) {
        ShowWrong(obj, "用户名必须全部小写", "plus_c");
        return false;
    }

    var pat = /^[0-9]+$/;
    if (pat.test(val(obj))) {
        ShowWrong(obj, "用户名不能全是数字，改一下吧", "plus_c");
        return false;
    }
    if (val(obj).indexOf(" ") > -1) {
        ShowWrong(obj, "请不要输入空格", "plus_c");
        return false;
    }
    if (!(/^[\u4E00-\u9FA5\uf900-\ufa2d\w]+$/).test(val(obj))) {
        ShowWrong(obj, "仅支持中英文，数字，下划线", "plus_c");
        return false;
    }
    if (GetStrLen(val(obj)) < 4 || GetStrLen(val(obj)) > 20) {
        ShowWrong(obj, "长度必须为4-20个字符或2-10个汉字", "plus_c");
        return false;
    }
    isnamevalid = true;
    return true;
}

function $(obj) { return document.getElementById(obj); }


//ajax检验用户名
function ajax_username() {
    jQuery.ajax({
        type: "get",
        async: true,
        //url: "/Register/ValidateUName",
        url: "/usernameexist.api",
        data: { "username": escape(val((jQuery("#strUsername"))))},
        success: function (req) {
                username_result(req);
        }
    });
}
//用户名检验结果
function username_result(req) {
    var userdivstyle = document.getElementById("userDiv").style.display;
    //var arr = req.split("|");
    //var mess = arr[1];
    if (req.IsExist == "false" && req.Tip != "用户名错误") {
        isnamevalid = true; //用户名验证正确
        //显示成功
        ShowWrong(jQuery("#strUsername"), "", "pw_success");
        closeDiv();
    }
    else if (req.IsExist == "true") {
        isnamevalid = false;
        //用户名被占用
        ShowWrong(jQuery("#strUsername"), "该用户名已被注册，选择推荐的用户名、或使用该用户名<a href=\"/Default/Login/NewLogin.aspx" + query + "\" target=\"_blank\">登录</a>", "plus_e");

        //显示下拉列表
        if (true) {         
            var udiv = req.UserNames;
            var str = "<ul>";
            var arru = udiv.split(',');
            str += "<li>推荐可用的用户名：</li>";
            for (var i = 0; i < arru.length; i++) {
                //str += "<tr><td  colspan=\"2\" style=\"height:22px; font-size:12px;\" align=\"left\" valign=\"middle\"><span onmouseover=\"this.style.backgroudColor='#000FFF';\" onClick=\"onchangUserName('" + arru[i] + "')\" style=\"cursor: hand; color:#444444\">" + arru[i] + "</span></td></tr>";
                str += "<li onmouseover=\"jQuery(this).addClass('bj');\" onmouseout=\"jQuery(this).removeClass('bj');\" onClick=\"onchangUserName('" + arru[i] + "')\" style=\"cursor: hand;\">" + arru[i] + "</li>";
            }
            str += "</ul>";
            jQuery("#userDiv").html(str);
            jQuery("#userDiv").show();
        }
    } else if (req.Tip == "用户名错误!") {
        isnamevalid = false;
        ShowWrong(jQuery("#strUsername"), "用户名错误!", "plus_e");
    }else {
        isnamevalid = false;
        ShowWrong(jQuery("#strUsername"), "该用户名已被注册，请重新输入或使用该用户名<a href=\"/Default/Login/NewLogin.aspx" + query + "\">登录</a>", "plus_e");
    }
    if (userdivstyle == 'block') {
        jQuery("#userDiv").hide();
    }
}

//选择推荐的用户名
function onchangUserName(username) {
    if (username) {
        isnamevalid = true; //用户名验证正确
        jQuery("#strUsername").val(username);
        jQuery("#userDiv").hide();
        //$('strUsername').focus();
        ShowWrong(jQuery("#strUsername"), "", "pw_success");
    }
}

//关闭推荐的用户名
function closeDiv() {
    jQuery("#userDiv").hide();
}




//得到输入值，已过滤空格
function val(obj) {
    return jQuery.trim(jQuery(obj).val());
}
//IE
function getIE(e) {
    var l = e.offsetLeft;
    while (e = e.offsetParent) {
        l += e.offsetLeft;
    }
    return l;
}
//获得字符串长度
function GetStrLen(key) {
    var l = escape(key), len;
    len = l.length - (l.length - l.replace(/\%u/g, "u").length) * 4;
    l = l.replace(/\%u/g, "uu");
    len = len - (l.length - l.replace(/\%/g, "").length) * 2;
    return len;
}





function ShowMess(obj, message) {
    if (message != "") {
        var showObject = jQuery("#span_" + jQuery(obj).attr("id"));
        showObject.removeClass("tips_form_correct");
        showObject.removeClass("tips_form_fault");
        showObject.html(message);
    }
}




function check_pass(obj) {

    if (isupdate) {
        ispassvalid = true;
        ShowWrong(obj, "", "");
    }
    else {
        if (val(obj) == "") {
            ShowWrong(obj, "请输入密码", "plus_c");
            //ShowWrong(obj, "", "");
            ispassvalid = false;
            return false;
        }
        if ((/>|<|,|\[|\]|\{|\}|\?|\/|\+|=|\||\'|\\|\"|:|;|\~|\!|\@|\#|\*|\$|\%|\^|\&|\(|\)|`/i).test(val(obj))) {
            ShowWrong(obj, "请勿用特殊字符", "plus_c");
            ispassvalid = false;
            return false;
        }
        if (val(obj).indexOf(" ") > -1) {
            ShowWrong(obj, "请不要输入空格", "plus_c");
            ispassvalid = false;
            return false;
        }
        if (GetStrLen(val(obj)) < 6 || GetStrLen(val(obj)) > 16) {
            ShowWrong(obj, "长度要求6-16个字符", "plus_c");
            ispassvalid = false;
            return false;
        }
        if (jQuery.trim(jQuery("#strPasswordConfirm").val()) != "") {
            if (val(obj) != jQuery.trim(jQuery("#strPasswordConfirm").val())) {
                ShowWrong(jQuery("#strPasswordConfirm"), "两次输入的密码不一致", "plus_c");
                ispassvalid = false;
                return false;
            }
            else {
                isupdate = true;
                ShowWrong(jQuery("#strPasswordConfirm"), "", "pw_success");
            }
        }
        ispassvalid = true;

        showpass(obj);
    }
}

function check_pass1(obj) {
    if (val(obj) == "") {
        ShowWrong(obj, "请输入密码", "plus_c");
        //ShowWrong(obj, "", "");
        ispass1valid = false;
        return false;
    }
    if ((/>|<|,|\[|\]|\{|\}|\?|\/|\+|=|\||\'|\\|\"|:|;|\~|\!|\@|\#|\*|\$|\%|\^|\&|\(|\)|`/i).test(val(obj))) {
        ShowWrong(obj, "请勿用特殊字符", "plus_c"); ;
        ispass1valid = false;
        return false;
    }

    if (GetStrLen(val(obj)) < 6 || GetStrLen(val(obj)) > 16) {
        ShowWrong(obj, "长度要求6-16个字符", "plus_c"); ;
        ispass1valid = false;
        return false;
    }

    if (val(obj) != jQuery.trim(jQuery("#strPassword").val())) {
        ShowWrong(obj, "两次输入的密码不一致", "plus_c");
        ispass1valid = false;
        return false;
    }
    ispass1valid = true;
    ShowWrong(obj, "", "pw_success");
}


//显示密码强度
function showpass(obj) {

    var item = val(obj);
    if (item != '' && (item.match(/^[0-9]{1,16}$/) || item.match(/^[A-Za-z]{1,16}$/) || item.match(/^[_]{1,16}$/))) {
        showitem = "<div class=\"pw_weight\" id=\"red_password_weight\"><span class=\"w1\" ></span></div>";
    }
    else if (item != '' && (item.match(/^[a-z0-9]{1,16}$/) || item.match(/^[A-Za-z]{1,16}$/) || item.match(/^[0-9_]{1,16}$/))) {
        showitem = "<div class=\"pw_weight\" id=\"red_password_weight\"><span class=\"w2\" ></span></div>";
    }
    else if (item != '' && item.match(/^[A-Za-z0-9]{1,16}$/)) {
        showitem = "<div class=\"pw_weight\" id=\"red_password_weight\"><span class=\"w3\" ></span></div>";
    }
    else {
        showitem = "";
    }
    var showObject = jQuery("#div_" + jQuery(obj).attr("id"));
    ShowWrong(obj, "", "pw_success");

    if (!isupdate) {
        showObject.html(showObject.html() + "" + showitem);
    }

}