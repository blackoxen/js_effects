
var ismobilevalid = false;
var isnamevalid = false;
//检查是否选择城市
var iscodevalid = true;
//密码验证
var ispass1valid = false;
var ispassvalid = false;

jQuery(document).ready(function () {
    jQuery("#vcode").attr("disabled", false);

    jQuery("#strMobile").focus(function () {
        ShowWrongMobile(this, "请填写手机号码，必须是11位数字，它将成为你的登录账号", "plus_b");
    });
    jQuery("#strMobile").blur(function () {
        //ajax手机检测
        check_mobilebase();
        ajax_checkmobile();
        //if (ismobilevalid) {
        //    check_mobile(this);
        //}
        jQuery("#mobileid").html(plusXing(jQuery("#strMobile").val(), 3, 4));
        if (ismobilevalid) {
            refresh_code();
        }
    });

    jQuery("#strVcode").focus(function () {
        ShowWrongMobile(this, "", "");
    });

    //jQuery("#strVcode").change(function () {
    //    iscodevalid = false;
    //});

    //"选择开通搜房卡"
    jQuery("#reg_card").click(function () {
        iscodevalid = false;
        regCardTip();
    });


    //异步手机验证码注册
    jQuery("#img_submit").click(function () {
        if (check()) {
            var primaryPwd1 = jQuery("#strPassword").val();
            var primaryPwd2 = jQuery("#strPasswordConfirm").val();
            //var pwdRtn = encryptedString(key_to_encode, jQuery("#strPassword").val());
            //jQuery("#strPassword").val(pwdRtn);
            //jQuery("#strPasswordConfirm").val(pwdRtn);
            var bindSoufunCard = jQuery("#reg_card").attr("checked") == true ? "1" : "0";
            var city = jQuery("#event_city_input").val();
            var service = jQuery("#service").val();
            var host = jQuery("#host").val();
            var backurl = jQuery("#backurl").val();
            jQuery.ajax({
                url: '/loginverifysms.api',
                type: 'GET',
                dataType: 'json',
                contentType: "application/json",
                // data: { "phoneNum": jQuery("#strMobile").val(), "phoneCode": jQuery("#strVcode").val(), "uid": jQuery("#strUsername").val(), "pwd1": jQuery("#strPassword").val(), "pwd2": jQuery("#strPasswordConfirm").val(), "bindSoufunCard": bindSoufunCard, "city": city, "service": service, "host": host },
                data: { "mobilephone": escape(jQuery("#strMobile").val()), "mobilecode": escape(jQuery("#strVcode").val()), "username": escape(jQuery("#strUsername").val()), "pwd": encryptedString(key_to_encode, escape(primaryPwd1)), "operatetype": "2", "service": escape(service) },
                success: function (req) {
                    //var arr = req.split('|');
                    if (req.Message == "Success") {
                        jQuery("#img_submit").attr("disabled", true);
                        //jQuery("#submitphone400").attr("disabled", true);
                        if (backurl == "") {
                            backurl = "https://passport.fang.com";
                        }
                        window.location.href = "/Register/RegisterSuccess?phonenum=" + escape(jQuery("#strMobile").val()) + "&username=" + escape(jQuery("#strUsername").val()) + "&backurl=" + backurl;
                    } else {
                        jQuery("#strPassword").val(primaryPwd1);
                        jQuery("#strPasswordConfirm").val(primaryPwd2);
                        jQuery("#img_submit").attr("disabled", false);
                        jQuery("#submitphone400").attr("disabled", false);
                        alert(req.Tip);
                    }
                }
            });
            //document.getElementById("mobileregister").submit();
        }
        //else {
        //    jQuery("#img_submit").attr("disabled", false);
        //}
    });


    //异步400电话注册
    jQuery("#submitphone400").click(function () {
        if (checkWithoutVerificationCode()) {
            var primaryPwd1 = jQuery("#strPassword").val();
            var primaryPwd2 = jQuery("#strPasswordConfirm").val();
            var pwdRtn = encryptedString(key_to_encode, jQuery("#strPassword").val());
            jQuery("#strPassword").val(pwdRtn);
            jQuery("#strPasswordConfirm").val(pwdRtn);
            var bindSoufunCard = jQuery("#reg_card").attr("checked") == true ? "1" : "0";
            var city = jQuery("#event_city_input").val();
            var service = jQuery("#service").val();
            var host = jQuery("#host").val();
            var backurl = jQuery("#backurl").val();
            jQuery.ajax({
                type: "post",
                async: true,
                url: "/Register/RegisterAction",
                data: { "phoneNum": jQuery("#strMobile").val(), "phoneCode": "000000", "uid": jQuery("#strUsername").val(), "pwd1": jQuery("#strPassword").val(), "pwd2": jQuery("#strPasswordConfirm").val(), "bindSoufunCard": bindSoufunCard, "city": city, "service": service, "host": host },
                success: function (req) {
                    //var arr = req.split('|');
                    if (req.Message == "Success") {
                        jQuery("#img_submit").attr("disabled", true);
                        jQuery("#submitphone400").attr("disabled", true);
                        if (backurl == "") {
                            backurl = "https://passport.fang.com";
                        }
                        window.location.href = "/Register/RegisterSuccess?phonenum=" + req.PhoneNum + "&username=" + req.UserName + "&backurl=" + backurl;
                    } else {
                        jQuery("#strPassword").val(primaryPwd1);
                        jQuery("#strPasswordConfirm").val(primaryPwd2);
                        jQuery("#img_submit").attr("disabled", false);
                        jQuery("#submitphone400").attr("disabled", false);
                        if (req.ErrorInfo == "错误,请检查手机号和验证码!") {
                            alert("您还未拨打400-890-0196电话！");
                        } else {
                            alert(req.ErrorInfo);
                        }
                    }
                }
            });
        }
    });

    jQuery("#a_sendcode").click(function () {
        if (jQuery("#vcode").attr("disabled") == true) {
            return;
        }
        if (jQuery("#strMobile").val() == "") {
            ShowWrong(jQuery("#strMobile"), "请输入手机号码", "plus_c");
            ismobilevalid = false;
            return;
        }
        check_mobilebase();
        if (ismobilevalid) {
            ajax_mobile();
        }
        if (ismobilevalid) {
            sendVcode(jQuery("#strMobile").val(), jQuery("#txt_mathcode").val());
        }
        return false;
    });

    jQuery("#btn_mathcode").click(function () {
        vcode_click();
    });
});
//注册搜房卡时的验证提示
function regCardTip() {
    if (jQuery("#reg_card").attr("checked") == true) {
        if (jQuery("#event_city_input").val() == "") {
            iscodevalid = false;
            ShowWrong(jQuery("#event_city_input"), "请选择城市", "plus_c");
        }
        else {
            iscodevalid = true;
            hiddenTip(jQuery("#event_city_input"));
        }
    }
    else {
        iscodevalid = true;
        hiddenTip(jQuery("#event_city_input"));
    }
}

function getPhoneCode() {
    if (jQuery("#vcode").val() == "免费获取验证码") {
        jQuery("#strVcode").val("");
        jQuery("#txt_mathcode").val("");
    }
    if (jQuery("#strMobile").val() == "") {
        //检查手机号是否为空
        ShowWrong(jQuery("#strMobile"), "请输入手机号码", "plus_c");
        ismobilevalid = false;
        return false;
    }
    //检查手机号格式
    check_mobilebase();
    //if (ismobilevalid) {
    //    //检查手机是否已经验证
    //    ajax_mobile();
    //}
    if (ismobilevalid) {
        //sendVcode(jQuery("#strMobile").val(), jQuery("#txt_mathcode").val());
        jQuery.ajax({
            url: '/loginsendmsm.api',
            type: 'GET',
            dataType: 'json',
            contentType: "application/json",
            data: { "MobilePhone": escape(jQuery("#strMobile").val()), "Service": jQuery("#service").val(), "MathCode": escape(jQuery("#txt_mathcode").val()), "Operatetype": "2"},
            success: function (json) {
                if (json.Message == "Success") {
                    refresh_code();
                    document.getElementById("div_mathcode").style.display = "none";
                    jQuery("#div_strVcode").empty();
                    jQuery("#vcode").attr("disabled", true);
                    jQuery("#strVcode").attr("disabled", false);
                    jQuery("#phoneshow").css("display", "block");
                    updateTimeLabel(60, "0");
                }
                else if (json.Message == "Error" && json.IsSent == "true") {
                    jQuery("#strVcode").attr("disabled", false);
                    alert(json.Tip);
                }
                else if (json.Message == "Error" && json.IsShowMathCode == "true") {
                    refresh_code();
                    jQuery("#vcode").attr("disabled", true);
                    jQuery("#div_mathcode").show();
                }
                else {
                    alert(json.Tip);
                }
            },
            error: function () {
                alert("系统错误请重试");
            }
        })
    }
    return false;
}

function vcode_click() {
    var code = jQuery("#txt_mathcode").val();
    if (code == "") {
        jQuery("#showWord").html("验证码为空").css("color", "red");
        return;
    }
    //var test = /^([a-z]|[A-Z]|\d){4}$/;
    //if (!test.test(code)) {
    //    jQuery("#showWord").html("格式不对").css("color", "red");
    //    return;
    //}
    jQuery("#showWord").html("");
    ajax_mobile();
    //验证验证码是否正确
    //jQuery.post(
    //    "/Register/VerifyMathCode",
    //    {
    //        mobile: jQuery("#strMobile").val(),
    //        mathcode: jQuery("#txt_mathcode").val()
    //    },
    //    function (result) {
    //        if (result != null && result.Message == "Success") {
    //            //验证码正确
    //            //验证手机号是否已经注册
    //             ajax_mobile();
    //        } else {
    //            //验证码不正确，提示验证码错误
    //            jQuery("#showWord").html("验证码错误").css("color", "red");
    //            jQuery("#div_strVcode").empty();
    //        }
    //    },
    //    "json"
    //    );

}

function sendVcode(mobile, mathcode) {
    var service = jQuery("#service").val();
    jQuery.ajax({
        url: '/loginsendmsm.api',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        data: { "MobilePhone": escape(jQuery("#strMobile").val()), "Service": jQuery("#service").val(), "MathCode": escape(jQuery("#txt_mathcode").val()), "Operatetype": "2" },
        success: function (json) {
            if (json.Message == "Success") {
                refresh_code();
                document.getElementById("div_mathcode").style.display = "none";
                jQuery("#div_strVcode").empty();
                jQuery("#vcode").attr("disabled", true);
                jQuery("#strVcode").attr("disabled", false);
                jQuery("#voiceCode").attr("disabled", true);
                jQuery("#getVoiceCode").attr("disabled", true);
                jQuery("#phoneshow").css("display", "block");
                updateTimeLabel(60, "0");
            }
            else if (json.Message == "Error" && json.IsSent == "true") {

                jQuery("#strVcode").attr("disabled", false);
                alert(json.Tip);
            }
            else if (json.Message == "Error" && json.IsShowMathCode == "true") {
                refresh_code();
                jQuery("#vcode").attr("disabled", true);
            }
            else {
                alert(json.Tip);
                //jQuery("#showWord").html(json.Tip).css("color", "red");
                jQuery("#div_mathcode").hide();
                jQuery("#vcode").attr("disabled", false);
                jQuery("#vcode").val("免费获取验证码");
            }
        },
        error: function () {
            alert("系统错误请重试");
        }
    })



    //jQuery.ajax({
    //    type: "post",
    //    url: "/Register/SendPhoneCode",
    //    dataType: "json",
    //    data: { "mobile": mobile, "mathcode": mathcode, "service": service },
    //    success: function (req) {
    //        if (req.Message == "Success") {
    //            refresh_code();
    //            document.getElementById("div_mathcode").style.display = "none";
    //            jQuery("#div_strVcode").empty();
    //            jQuery("#vcode").attr("disabled", true);
    //            jQuery("#strVcode").attr("disabled", false);
    //            jQuery("#phoneshow").css("display", "block");
    //            updateTimeLabel(60);
    //        }
    //        else if (req.ErrorInfo == "手机号不能为空!") {
    //            ShowWrong(jQuery("#strMobile"), req, "plus_c");
    //            jQuery("#div_strVcode").empty();
    //        }
    //        //else if (req.ErrorInfo == "验证码错误!") {
    //        //    jQuery("#showWord").html("验证码错误").css("color", "red");
    //        //    jQuery("#div_strVcode").empty();
    //        //}
    //        else {//发送失败
    //            //alert("手机验证码发送失败，请重试!")
    //            ShowWrong("#strVcode", req.ErrorInfo, "plus_c");
    //            jQuery("#div_mathcode").hide();
    //            jQuery("#vcode").attr("disabled", false);
    //            jQuery("#vcode").val("免费获取验证码");

    //        }
    //    }
    //});
}


function refresh_code() {
    //var codefor = jQuery("#strMobile").val();
    //var v_random = Math.round(Math.random() * 10000);
    jQuery("#imgcode").attr("src", "https://captcha.fang.com/Display?type=soufangbang&width=50&height=10&r=" + Math.round(Math.random() * 10000));
}

//手机号输入格式检测
function check_mobilebase() {

    var mobile = jQuery.trim(jQuery("#strMobile").val());
    //var pat = /^1\d{10}$/;
    var pat = /(^1[3|4|5|6|7|8|9]\d{9}$)/;
    if (mobile == "") {
        ShowWrong(jQuery("#strMobile"), "请输入手机号码", "plus_c");
        ismobilevalid = false;
        return false;
    }
    if (!pat.test(mobile)) {
        ShowWrong(jQuery("#strMobile"), "手机号码格式不正确", "plus_c");
        ismobilevalid = false;
        return false;
    }

    var showObject = jQuery("#div_strMobile");
    ismobilevalid = true;
    ShowWrong(jQuery("#strMobile"), "", "pw_success");
    //页面下部的发送
    jQuery("#a_sendcode").attr("disabled", false);
    jQuery("#vcode").attr("disabled", false);

}

//检查手机号
function check_mobile() {
    ajax_mobile();
}
//ajax异步检测手机号
function ajax_mobile() {
    ismobilevalid = true;
    //手机未绑定才发送验证码
    sendVcode(jQuery("#strMobile").val(), jQuery("#txt_mathcode").val());
    return true;
    //jQuery.ajax({
    //    type: "post",
    //    async: true,
    //    url: "/Register/CheckPhone",
    //    data: { "mobile": val((jQuery("#strMobile"))) },
    //    success: function (req) {
    //        //var resu = req.split(":");
    //        if (req.Message == "Success") {
    //            ismobilevalid = false;
    //            jQuery("#vcode").attr("disabled", false);
    //            refresh_code();
    //            ShowWrong(jQuery("#strMobile"), "该手机号已与" + req.UserName + "用户绑定，请<a href=\"/Default/Login/\" target=\"_blank\">重新登录</a>", "plus_e");
    //            return false;
    //        }
    //        else {
    //            ismobilevalid = true;
    //            //手机未绑定才发送验证码
    //            sendVcode(jQuery("#strMobile").val(), jQuery("#txt_mathcode").val());
    //            return true;
    //        }
    //    }
    //});
}

//ajax异步检测手机号新 20160321 zhangchenggye
function ajax_checkmobile() {
    var mobile = jQuery.trim(jQuery("#strMobile").val());
    var reg = /(^1[3|4|5|6|7|8|9]\d{9}$)/;
    if (mobile == "") {
        ismobilevalid = false;
        return false;
    }
    if (!reg.test(mobile)) {
        ismobilevalid = false;
        return false;
    }
    jQuery.ajax({
        type: "post",
        async: true,
        url: "/checkPhonebinding.api",
        dataType: 'json',
        data: {
            "MobilePhone": val((jQuery("#strMobile"))),
            "Service": "soufun-passport-web"
        },
        success: function (result) {
            if (result.Message == "Success") {
                if (result.IsBingding) {
                    ismobilevalid = false;
                    jQuery("#vcode").attr("disabled", true);
                    ShowWrong(jQuery("#strMobile"), "手机号已绑定，请直接<a href=\"/Default/Login/\" target=\"_blank\">登录</a>。", "plus_c");
                    return false;
                }
                else {
                    ismobilevalid = true;
                    jQuery("#vcode").attr("disabled", false);
                    return true;
                }
            }
           else {
                alert(result.Tip);
            }
        },
        error: function () {

            alert("系统异常，请重试。");
        }

    });

}

function check() {

    check_pass("#strPassword");
    check_pass1("#strPasswordConfirm");

    if (jQuery("#strMobile").val() == "") {
        ShowWrong(jQuery("#strMobile"), "请输入手机号码", "plus_c");
        ismobilevalid = false;
        return false;
    }

    if (jQuery("#strVcode").val() == "") {
        //ShowWrong(jQuery("#strVcode"), "请输入手机验证码", "plus_c");
        alert("请输入手机验证码!");
        iscodevalid = false;
        return false;
    }
    if (jQuery("#strUsername").val() == "") {
        ShowWrong(jQuery("#strUsername"), "请输入用户名", "plus_c");
        isnamevalid = false;
        return false;
    }
    if (jQuery("reg_card").checked) {
        if (jQuery("#event_city_input").val() == "") {
            ShowWrong(jQuery("#event_city_input"), "请选择城市", "plus_c");
            iscodevalid = false;
            return false;
        }
    }

    if (!jQuery("input[type='checkbox']").is(':checked')) {
        alert("请先选中同意《房天下服务协议》");
        return false;
    }
    if (!(isnamevalid && ispassvalid && ispass1valid && iscodevalid && ismobilevalid)) {
        alert("请按照页面的提示重新填写信息。");
        return false;
    }
    return true;
}

function checkWithoutVerificationCode() {

    check_pass("#strPassword");
    check_pass1("#strPasswordConfirm");

    if (jQuery("#strMobile").val() == "") {
        ShowWrong(jQuery("#strMobile"), "请输入手机号码", "plus_c");
        ismobilevalid = false;
        return false;
    }

    //if (jQuery("#strVcode").val() == "") {
    //    ShowWrong(jQuery("#strVcode"), "请输入手机验证码", "plus_c");
    //    iscodevalid = false;
    //    return false;
    //}
    iscodevalid = true;//忽略手机验证码非空验证。
    if (jQuery("#strUsername").val() == "") {
        ShowWrong(jQuery("#strUsername"), "请输入用户名", "plus_c");
        isnamevalid = false;
        return false;
    }
    if (jQuery("reg_card").checked) {
        if (jQuery("#event_city_input").val() == "") {
            ShowWrong(jQuery("#event_city_input"), "请选择城市", "plus_c");
            iscodevalid = false;
            return false;
        }
    }

    if (!jQuery("input[type='checkbox']").is(':checked')) {
        alert("请先选中同意《房天下服务协议》");
        return false;
    }
    if (!(isnamevalid && ispassvalid && ispass1valid && iscodevalid && ismobilevalid)) {
        alert("请按照页面的提示重新填写信息。");
        return false;
    }
    return true;
}

function GetStrLen(key) {
    var l = escape(key),
    len;
    len = l.length - (l.length - l.replace(/\%u/g, "u").length) * 4;
    l = l.replace(/\%u/g, "uu");
    len = len - (l.length - l.replace(/\%/g, "").length) * 2;
    return len;
}




//得到输入值，已过滤空格
function val(obj) {
    return jQuery.trim(jQuery(obj).val());
}


function ShowWrong(obj, message, className) {
    var showObject = jQuery("#div_" + jQuery(obj).attr("id"));
    showObject.show();
    showObject.html("<div class=\"" + className + "\">" + message + "</div>");
    jQuery("#div_mathcode").hide();

}

function hiddenTip(obj) {
    var showObject = jQuery("#div_" + jQuery(obj).attr("id"));
    showObject.hide();

}

function ShowWrongMobile(obj, message, className) {
    var showObject = jQuery("#div_" + jQuery(obj).attr("id"));

    showObject.show();
    showObject.html("<div class=\"" + className + "\">" + message + "</div>");

}

function ShowNone(obj) {
    ShowWrong(obj, "", "plus_c");
}

function updateTimeLabel(time, message) {
    var btn = jQuery("#vcode");
    var a_sendcode = jQuery("#a_sendcode");
    var voiceCode = jQuery("#voiceCode");
    var firstVoiceCode = jQuery("#getVoiceCode");
    voiceCode.val(time <= 0 ? "点击使用语音获取验证码" : ("" + (time) + "秒后点击重新发送"));
    firstVoiceCode.val(time <= 0 ? "点击使用语音获取验证码" : ("" + (time) + "秒后点击重新发送"));
    btn.val(time <= 0 ? "免费获取验证码" : ("" + (time) + "秒后点击重新发送"));
    var hander = setInterval(function () {
        if (time == 0) {
            clearInterval(hander);
            hander = null;
            voiceCode.val("点击使用语音获取验证码");
            firstVoiceCode.val("点击使用语音获取验证码");
            btn.val("免费获取验证码");
            btn.attr("disabled", false);
            firstVoiceCode.attr("disabled", false);
            voiceCode.attr("disabled", false);
            a_sendcode.attr("disabled", false);
            jQuery("#strVcodeTip").text("");
        }
        else {
            var times = "" + (time--) + "秒后点击重新发送";
            jQuery("#voiceCode").val(times);
            jQuery("#getVoiceCode").val(times);
            jQuery("#vcode").val(times);
        }
    }, 1000);
}

//发送语音验证码
function SendVoiceCode() {
    var getVoiceCode = jQuery("#getVoiceCode");
    jQuery.ajax({
        type: "post",
        async: true,
        url: "/Register/CheckPhone",
        data: { "mobile": val((jQuery("#strMobile"))) },
        success: function (req) {
            if (req.Message == "Success") {
                ismobilevalid = false;
                jQuery("#vcode").attr("disabled", false);
                refresh_code();
                ShowWrong(jQuery("#strMobile"), "该手机号已与" + req.UserName + "用户绑定，请<a href=\"/Default/Login/\" target=\"_blank\">重新登录</a>", "plus_e");
                return false;
            }
            else {
                ismobilevalid = true;
                //手机未绑定才发送验证码
                jQuery("#tips")
                var service = jQuery("#service").val();
                jQuery.ajax({
                    url: '/loginsendmsm.api',
                    type: 'GET',
                    dataType: 'json',
                    contentType: "application/json",
                    data: { "MobilePhone": escape(jQuery("#strMobile").val()), "Service": jQuery("#service").val(), "MathCode": escape(jQuery("#txt_mathcode").val()), "Operatetype": "2", "sendVoice": "1" },
                    success: function (json) {
                        if (json.Message == "Success") {
                            refresh_code();
                            document.getElementById("div_mathcode").style.display = "none";
                            jQuery("#div_strVcode").empty();
                            jQuery("#vcode").attr("disabled", true);
                            jQuery("#strVcode").attr("disabled", false);
                            jQuery("#voiceCode").attr("disabled", true);
                            jQuery("#getVoiceCode").attr("disabled", true);
                            jQuery("#phoneshow").css("display", "block");
                            jQuery("#getVoiceCode").css("display", "none");
                            jQuery("#detailinfoTip").css("display", "block");
                            jQuery("#detailinfo").css("display", "none");
                            jQuery("#mobileid").html(plusXing(jQuery("#strMobile").val(), 3, 4));
                            updateTimeLabel(60, "1");
                        }
                        else if (json.Message == "Error" && json.IsSent == "true") {

                            jQuery("#strVcode").attr("disabled", false);
                            alert(json.Tip);
                        }
                        else if (json.Message == "Error" && json.IsShowMathCode == "true") {
                            refresh_code();
                            jQuery("#vcode").attr("disabled", true);
                            jQuery("#voiceCode").attr("disabled", true);
                            jQuery("#getVoiceCode").attr("disabled", true);
                        }
                        else {

                            //jQuery("#showWord").html(json.Tip).css("color", "red");
                            alert(json.Tip);
                            jQuery("#div_mathcode").hide();
                            jQuery("#vcode").attr("disabled", false);
                            jQuery("#vcode").val("免费获取验证码");
                        }
                    },
                    error: function () {
                        alert("系统错误请重试");
                    }
                })
            }
        }
    });
}
//语音发验证码时,对手机号做处理str：字符串，frontLen：前面保留位数，endLen：后面保留位数。
function plusXing(str, frontLen, endLen) {
    var len = str.length - frontLen - endLen;
    var xing = '';
    for (var i = 0; i < len; i++) {
        xing += '*';
    }
    return str.substr(0, frontLen) + xing + str.substr(str.length - endLen);
}
