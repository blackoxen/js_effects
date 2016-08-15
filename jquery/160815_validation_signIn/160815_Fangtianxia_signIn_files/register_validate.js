
//����û���
var isnamevalid = false;
//���ȷ������
var ispass1valid = false;
//�������
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
        ShowWrong(jQuery("#strUsername"), "�Ƽ�ʹ����������;������4-20λ�ַ�,����,Ӣ��,�»��߻����", "plus_b");
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
        ShowWrong(jQuery("#strPasswordConfirm"), "��������һ����ͬ������", "plus_b");
    });

});


function onPasswordFocus() {
    if (isupdate) {
        ShowWrong(jQuery("#strPassword"), "������ͨ��֤�ʺŵĵ�¼���룬�Ա��ʵ�����ʺ�", "plus_b");
    }
    else {
        ShowWrong(jQuery("#strPassword"), "6-16������ַ�����Ϊ��ĸ�����ּ���ϣ����ִ�Сд", "plus_b");
    }
}


function check_username(obj) {
    if (check_value(obj)) {
        ajax_username();
    }
}
//��ͨ��֤
function check_value(obj) {
    if (val(obj) == "") {
        ShowWrong(obj, "�������û������Ƽ�ʹ����������", "plus_c");
        //ShowWrong(obj, "", "");
        return false;
    }

    if (/[A-Z]/.test(val(obj))) {
        ShowWrong(obj, "�û�������ȫ��Сд", "plus_c");
        return false;
    }

    var pat = /^[0-9]+$/;
    if (pat.test(val(obj))) {
        ShowWrong(obj, "�û�������ȫ�����֣���һ�°�", "plus_c");
        return false;
    }
    if (val(obj).indexOf(" ") > -1) {
        ShowWrong(obj, "�벻Ҫ����ո�", "plus_c");
        return false;
    }
    if (!(/^[\u4E00-\u9FA5\uf900-\ufa2d\w]+$/).test(val(obj))) {
        ShowWrong(obj, "��֧����Ӣ�ģ����֣��»���", "plus_c");
        return false;
    }
    if (GetStrLen(val(obj)) < 4 || GetStrLen(val(obj)) > 20) {
        ShowWrong(obj, "���ȱ���Ϊ4-20���ַ���2-10������", "plus_c");
        return false;
    }
    isnamevalid = true;
    return true;
}

function $(obj) { return document.getElementById(obj); }


//ajax�����û���
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
//�û���������
function username_result(req) {
    var userdivstyle = document.getElementById("userDiv").style.display;
    //var arr = req.split("|");
    //var mess = arr[1];
    if (req.IsExist == "false" && req.Tip != "�û�������") {
        isnamevalid = true; //�û�����֤��ȷ
        //��ʾ�ɹ�
        ShowWrong(jQuery("#strUsername"), "", "pw_success");
        closeDiv();
    }
    else if (req.IsExist == "true") {
        isnamevalid = false;
        //�û�����ռ��
        ShowWrong(jQuery("#strUsername"), "���û����ѱ�ע�ᣬѡ���Ƽ����û�������ʹ�ø��û���<a href=\"/Default/Login/NewLogin.aspx" + query + "\" target=\"_blank\">��¼</a>", "plus_e");

        //��ʾ�����б�
        if (true) {         
            var udiv = req.UserNames;
            var str = "<ul>";
            var arru = udiv.split(',');
            str += "<li>�Ƽ����õ��û�����</li>";
            for (var i = 0; i < arru.length; i++) {
                //str += "<tr><td  colspan=\"2\" style=\"height:22px; font-size:12px;\" align=\"left\" valign=\"middle\"><span onmouseover=\"this.style.backgroudColor='#000FFF';\" onClick=\"onchangUserName('" + arru[i] + "')\" style=\"cursor: hand; color:#444444\">" + arru[i] + "</span></td></tr>";
                str += "<li onmouseover=\"jQuery(this).addClass('bj');\" onmouseout=\"jQuery(this).removeClass('bj');\" onClick=\"onchangUserName('" + arru[i] + "')\" style=\"cursor: hand;\">" + arru[i] + "</li>";
            }
            str += "</ul>";
            jQuery("#userDiv").html(str);
            jQuery("#userDiv").show();
        }
    } else if (req.Tip == "�û�������!") {
        isnamevalid = false;
        ShowWrong(jQuery("#strUsername"), "�û�������!", "plus_e");
    }else {
        isnamevalid = false;
        ShowWrong(jQuery("#strUsername"), "���û����ѱ�ע�ᣬ�����������ʹ�ø��û���<a href=\"/Default/Login/NewLogin.aspx" + query + "\">��¼</a>", "plus_e");
    }
    if (userdivstyle == 'block') {
        jQuery("#userDiv").hide();
    }
}

//ѡ���Ƽ����û���
function onchangUserName(username) {
    if (username) {
        isnamevalid = true; //�û�����֤��ȷ
        jQuery("#strUsername").val(username);
        jQuery("#userDiv").hide();
        //$('strUsername').focus();
        ShowWrong(jQuery("#strUsername"), "", "pw_success");
    }
}

//�ر��Ƽ����û���
function closeDiv() {
    jQuery("#userDiv").hide();
}




//�õ�����ֵ���ѹ��˿ո�
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
//����ַ�������
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
            ShowWrong(obj, "����������", "plus_c");
            //ShowWrong(obj, "", "");
            ispassvalid = false;
            return false;
        }
        if ((/>|<|,|\[|\]|\{|\}|\?|\/|\+|=|\||\'|\\|\"|:|;|\~|\!|\@|\#|\*|\$|\%|\^|\&|\(|\)|`/i).test(val(obj))) {
            ShowWrong(obj, "�����������ַ�", "plus_c");
            ispassvalid = false;
            return false;
        }
        if (val(obj).indexOf(" ") > -1) {
            ShowWrong(obj, "�벻Ҫ����ո�", "plus_c");
            ispassvalid = false;
            return false;
        }
        if (GetStrLen(val(obj)) < 6 || GetStrLen(val(obj)) > 16) {
            ShowWrong(obj, "����Ҫ��6-16���ַ�", "plus_c");
            ispassvalid = false;
            return false;
        }
        if (jQuery.trim(jQuery("#strPasswordConfirm").val()) != "") {
            if (val(obj) != jQuery.trim(jQuery("#strPasswordConfirm").val())) {
                ShowWrong(jQuery("#strPasswordConfirm"), "������������벻һ��", "plus_c");
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
        ShowWrong(obj, "����������", "plus_c");
        //ShowWrong(obj, "", "");
        ispass1valid = false;
        return false;
    }
    if ((/>|<|,|\[|\]|\{|\}|\?|\/|\+|=|\||\'|\\|\"|:|;|\~|\!|\@|\#|\*|\$|\%|\^|\&|\(|\)|`/i).test(val(obj))) {
        ShowWrong(obj, "�����������ַ�", "plus_c"); ;
        ispass1valid = false;
        return false;
    }

    if (GetStrLen(val(obj)) < 6 || GetStrLen(val(obj)) > 16) {
        ShowWrong(obj, "����Ҫ��6-16���ַ�", "plus_c"); ;
        ispass1valid = false;
        return false;
    }

    if (val(obj) != jQuery.trim(jQuery("#strPassword").val())) {
        ShowWrong(obj, "������������벻һ��", "plus_c");
        ispass1valid = false;
        return false;
    }
    ispass1valid = true;
    ShowWrong(obj, "", "pw_success");
}


//��ʾ����ǿ��
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