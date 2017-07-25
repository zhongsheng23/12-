// 获取验证码地址
// "http://www.wfjtaqjy.gov.cn" + $("#imgValidateCode").attr("src");
// http://www.wfjtaqjy.gov.cn/ashx/validateCode.ashx?t=2
(function($) {$.fn.exist = function(){if($(this).length>=1){return true; } return false; }; })(jQuery);
var all_time = 0;
var code = 0;
var click_num = 0;

// 插件有效期
if (Date.parse('2018-2-1') - Date.now() < 0) {
    alert('插件已失效，请联系作者qq：112823567');
} else{

    setInterval(function(){
        // 如果头部dom不存在，显示头部dom
        if (all_time == 0) {
            if ($('#cj_zt').exist() == true) {$("#cj_zt").remove()};
            $("#divhead").before("<div id='cj_zt' style='background:green;font-size:45px;'> 插件开始运行..... </div>");
        }

        // 自动点击操作
        if ($('.btn-info').exist() == true) {
            // 清除头部dom节点
            if ($('#cj_zt').exist() == true) {$("#cj_zt").remove()}

            if ($('#imgValidateCode').exist() == true) {
                OCRAD(document.getElementById("imgValidateCode"), {
                    numeric: true
                }, function(text){
                    $("#input-name").attr("value",text);
                    
                    var objs  = document.getElementsByClassName("btn btn-info"); objs[0].click();
                    click_num = click_num + 1;

                    // 判断验证码是否正确
                    if ($(".text-danger").text() == "验证码输入不正确，请重新输入！") {
                        setTimeout(function() {
                            $("#imgValidateCode").click();
                            $(".text-danger").text("");
                            console.log("验证码错误，已更换验证码");
                        },1000);
                    } else {
                        code = code + 1;
                        all_time = all_time + 5;
                        console.log("验证码" + text + "识别成功");
                        $("#divhead").before("<div id='cj_zt' style='background:green;font-size: 45px;'>本次已运行"+ (Math.floor(all_time/60) + "小时" + (all_time%60) + "分" ) +"，自动点击"+ click_num +"次，识别"+ code +"个验证码</div>");

                    }
                })

            } else {
                var objs  = document.getElementsByClassName("btn btn-info"); objs[0].click();
                all_time = all_time + 5;
                click_num = click_num + 1;
                console.log("点击成功,增加五分钟");
                $("#divhead").before("<div id='cj_zt' style='background:green;font-size: 45px;'>本次已运行"+ (Math.floor(all_time/60) + "小时" + (all_time%60) + "分" ) +"，自动点击"+ click_num +"次，识别"+ code +"个验证码</div>");
            }

        }
    },3000);
}
