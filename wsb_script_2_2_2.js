// upd80a9 STABLE trim with upravl timer	https://rakosel.github.io/wsb_script_2_2_1.js
// 682 stroka trim ???
// except (
// http://qaru.site/questions/66646/how-to-recognize-touch-events-using-jquery-in-safari-for-ipad-is-it-possible
// function time(){
//https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
// }
// https://jscompress.com/
// https://beautifytools.com/javascript-minifier.php
// https://www.minifier.org/
// https://unminify.com/
// https://javascript-minifier.com/ https://jscompress.com/
// http://dean.edwards.name/packer/
// https://closure-compiler.appspot.com/home
// alert(time())//1300051970
// 469, 470
// https://playcode.io/new/
//
//		https://www.base64encode.org/enc/minify/
//	
/*
import 'bootstrap@4.6.0'
import $ from 'jquery'
$('button').click(function bjst1() {
  var str1 = "    3"
  a=Number(str1.trim());
   console.log(a)
});

});
*/
//
//
var stopAll = false,
	ra,
	rs,
	subwdeb = false,
	lines_in,
	i,
	url;
var maOBJ, seOBJ, bmeOBJ;
var str_out = "",
	str_out1 = "";
var uart_json = {};
var temp_json = {};
var input_lm75 = {};
var scrPos = 0,
	ovShBtn0 = false;
var ast = 0;
var ua_mode = 0;
var tmranim = 2000; // animate [s]

let T_arr = new Array();
let P_arr = new Array();
let H_arr = new Array();
let temp_arr = new Array();
	
T_arr = [0,1,2,4,5,16,17,20];
H_arr = [3,8,9,18,19,21];
P_arr = [6,7,12,13];
// reverse panelki dlya debug
var sds, mds, sets;
sds = $(".sideset");
mds = $(".macnt");
sets = $(".setcnt");
cnftmp = $(".scntf");
// rtc time auto from server

// SUBMIT debug
function btn_otp_wr() {
    var url1 = "/otp_mode?input=" + encodeURIComponent("Wr345") + "&";
    fetch(url1, "GET", txjstmp, 30);
}

function btn_sensor_rd() {
    var sval = $("#btnsens_val").val();
    var url1;
    var i = 0;
    if (ast == 1) {
        return;
    }
    for (i = 0; i < sval; i++) {
        url1 = "/otp_mode?input=" + encodeURIComponent("GiveMeas") + "&";
        fetch(url1, "GET", txjstmp, 50);
    }
}
// SUBMIT debug
function btn_otp_rd() {
    var url1 = "/otp_mode?input=" + encodeURIComponent("Rd345") + "&";
    fetch(url1, "GET", txjstmp, 30);
}

function refr_rtc() {
    if (subwdeb == false && $("#autmp").prop("checked")) {
        fetch("/get_rtc.json?n=" + Math.random(), "GET", txjstmp, 30);
        sub_grad();
    }
    //console.log("refr_rtc");
}

//sht30_1
function btn_rtc_wr() {
    //bmeOBJ = $("#scntf").serializeArray();

    // Rd mode
    var rtc_setd = {
        rtc_set: [Math.floor(Date.now() / 1000), 0, 0]
    };
    console.log(rtc_setd);
    //console.log(input_htu21d);
    fetch("/set_rtc.json?n=" + encodeURIComponent(JSON.stringify(rtc_setd)) + "&", "GET", txjstmp, 10);
}

//sht30_1
function btn_htu21d_Wr() {
    //bmeOBJ = $("#scntf").serializeArray();
    //console.log(bmeOBJ);
    // Rd mode
    var heater = $("#htu21d_ht option:selected").val();
    var mode = $("#htu21d_m option:selected").val();

    $(".btns_htu21d").removeClass("badge-success");
    $(".btns_htu21d").removeClass("badge-danger");

    var input_htu21d = {
        htu21d_conf: [mode, heater]
    };
    //console.log(input_htu21d);
    fetch("/input_htu21d.json?n=" + encodeURIComponent(JSON.stringify(input_htu21d)) + "&", "GET", txjstmp, 10);
}

//sht30_1
function btn_htu21d_Rd() {
    //bmeOBJ = $("#scntf").serializeArray();
    //console.log(bmeOBJ);
    // Rd mode
    $(".btns_htu21d").removeClass("badge-success");
    $(".btns_htu21d").removeClass("badge-danger");
    fetch("/output_htu21d.json?n=" + Math.random(), "GET", txjstmp, 10);
}

//sht30_1
function btn_sht30_1_Wr() {
    //bmeOBJ = $("#scntf").serializeArray();
    //console.log(bmeOBJ);
    // Rd mode
    var heater = $("#sht30_ht option:selected").val();
    var mode = $("#sht30_m option:selected").val();
    var scr = $("#sht30_scr option:selected").val();
    var rep = $("#sht30_rep option:selected").val();
    var mps_sel = $("#sht30_mps_sel option:selected").val();

    $(".btns_sht30").removeClass("badge-success");
    $(".btns_sht30").removeClass("badge-danger");

    input_sht30 = {
        sht30_conf: [heater, mode, scr, rep, mps_sel]
    };
    fetch("/input_sht30_1.json?n=" + encodeURIComponent(JSON.stringify(input_sht30)) + "&", "GET", txjstmp, 10);
    //console.log("[heater,mode,scr,rep,mps_sel]");
    //console.log(JSON.stringify(input_sht30));
}
//sht30_1
function btn_sht30_2_Wr() {
    //bmeOBJ = $("#scntf").serializeArray();
    //console.log(bmeOBJ);
    // Rd mode
    var heater = $("#sht31_ht option:selected").val();
    var mode = $("#sht31_m option:selected").val();
    var scr = $("#sht31_scr option:selected").val();
    var rep = $("#sht31_rep option:selected").val();
    var mps_sel = $("#sht31_mps_sel option:selected").val();

    $(".btns_sht31").removeClass("badge-success");
    $(".btns_sht31").removeClass("badge-danger");

    input_sht31 = {
        sht31_conf: [heater, mode, scr, rep, mps_sel]
    };
    fetch("/input_sht30_2.json?n=" + encodeURIComponent(JSON.stringify(input_sht31)) + "&", "GET", txjstmp, 10);
    //console.log("[heater,mode,scr,rep,mps_sel]");
    //console.log(JSON.stringify(input_sht30));
}

//sht30_1
function btn_sht30_1_Rd() {
    //bmeOBJ = $("#scntf").serializeArray();
    //console.log(bmeOBJ);
    // Rd mode
    $(".btns_sht30_1").removeClass("badge-success");
    $(".btns_sht30_1").removeClass("badge-danger");
    fetch("/output_sht30_1.json?n=" + Math.random(), "GET", txjstmp, 10);
}

//sht30_1
function btn_sht30_2_Rd() {
    //bmeOBJ = $("#scntf").serializeArray();
    //console.log(bmeOBJ);
    // Rd mode
    $(".btns_sht31").removeClass("badge-success");
    $(".btns_sht31").removeClass("badge-danger");
    fetch("/output_sht30_2.json?n=" + Math.random(), "GET", txjstmp, 10);
}

//bm280_1
function btn_bm280_1_Wr() {
    //bmeOBJ = $("#scntf").serializeArray();
    //console.log(bmeOBJ);
    // Rd mode
    var mode = $("#bm1s_m option:selected").val();
    var osrs = $("#bm1s_osrs option:selected").val();
    var bm1s_f = $("#bm1s_f option:selected").val();
    var bm1_t_st = $("#bm1_t_st option:selected").val();
    var bm_alt = $("#bm_alt").val();
    //$("#bm_alt").removeClass('is-invalid').html();
    //$(".altvld").css( "display", "none" );
    //$(".btns_bme280_1").fadeIn();
    $(".btns_bme280_1").removeClass("badge-success");
    $(".btns_bme280_1").removeClass("badge-danger");
    if ($.isNumeric(bm_alt) == false) {
        $(".btns_bme280_1").addClass("badge-danger").text("Ошибка (смотри выше)");
        //$("#bm_alt").addClass('is-invalid').html();
        //$(".altvld").css( "display", "block" );
        return;
    }
    input_bme280 = {
        bme280_conf: [mode, osrs, bm1s_f, bm1_t_st, bm_alt]
    };
    fetch("/input_bme280_1.json?n=" + encodeURIComponent(JSON.stringify(input_bme280)) + "&", "GET", txjstmp, 10);
    //console.log(JSON.stringify(input_bme280));
}

//bm280_2
function btn_bm280_2_Wr() {
    //bmeOBJ = $("#scntf").serializeArray();
    //console.log(bmeOBJ);
    // Rd mode
    var mode = $("#bm2s_m option:selected").val();
    var osrs = $("#bm2s_osrs option:selected").val();
    var bm1s_f = $("#bm2s_f option:selected").val();
    var bm1_t_st = $("#bm2_t_st option:selected").val();
    var bm_alt = $("#bm_alt").val();
    //$("#bm_alt").removeClass('is-invalid').html();
    //$(".altvld").css( "display", "none" );
    //$(".btns_bme280_1").fadeIn();
    $(".btns_bme280_2").removeClass("badge-success");
    $(".btns_bme280_2").removeClass("badge-danger");
    if ($.isNumeric(bm_alt) == false) {
        $(".btns_bme280_2").addClass("badge-danger").text("Ошибка (смотри выше)");
        //$("#bm_alt").addClass('is-invalid').html();
        //$(".altvld").css( "display", "block" );
        return;
    }
    input_bme280 = {
        bme280_conf: [mode, osrs, bm1s_f, bm1_t_st, bm_alt]
    };
    fetch("/input_bme280_2.json?n=" + encodeURIComponent(JSON.stringify(input_bme280)) + "&", "GET", txjstmp, 10);
    //console.log(JSON.stringify(input_bme280));
}

// C4itat
function btn_bm280_1_Rd() {
    $(".btns_bme280_1").removeClass("badge-success");
    $(".btns_bme280_1").removeClass("badge-danger");
    fetch("/output_bme280_1.json?n=" + Math.random(), "GET", txjstmp, 10);
}

function btn_bm280_2_Rd() {
    $(".btns_bme280_2").removeClass("badge-success");
    $(".btns_bme280_2").removeClass("badge-danger");
    fetch("/output_bme280_2.json?n=" + Math.random(), "GET", txjstmp, 10);
}

// cont: TEMP, RTC, DEBUG + Settings
function txjstmp(s, d) {
    var as1 = $(".pst1");
    var as0 = $(".pst0");
	var j=0;
		
	var j_T = 0.0;
	var j_H = 0.0;
	var j_P = 0.0;
	//var jT = 0;
	//var jH = 0;
	//var jP = 0;
	var T_cnt = 0
	var H_cnt = 0
	var P_cnt = 0
//    console.log(d);
    if (s != 200) {
        as0.removeClass("badge-success");
        as0.addClass("badge-danger");
        as0.text("Нет связи");
        as1.removeClass("badge-success");
        as1.addClass("badge-danger");
        as1.text("Нет связи");
        $(".swdeb").removeAttr("disabled");
        ftmpd();
        console.log("Connection proplem!");
        return 0;
        //clearTimeout(rs.handle);
    } else {
        as0.removeClass("badge-danger");
        as1.removeClass("badge-danger");
        as0.addClass("badge-success");
        as1.addClass("badge-success");
        as0.text("ОК ");
		as1.text("ОК ");
        if (typeof d === "string") {
            //console.log("priem ok!");
            try {
                temp_json = JSON.parse(d);
                console.log(s, temp_json);
            } catch (e) {
                // ftvall - form clear
                ftvall("");
                console.log(s, e.message);
                return 0;
            }
        } else {
            console.log("d not string");
            ftvall("");
            return 0;
        }
    }
    //$(".btns_bme280_1").fadeIn();
    // posle input BME280: WEB -> ESP

    if (temp_json["LM75_CMP"]) {
        //$(".btns_bme280_1").removeClass('badge-success');
        //$(".btns_bme280_1").removeClass('badge-danger');
        try {
            var aou1 = parseInt(temp_json.LM75_CMP[0].trim(), 10);
            var aou2 = parseInt(temp_json.LM75_CMP[1].trim(), 10);
            //console.log("temp_json.LM75_CMP[0]" + aou1);
            //console.log("temp_json.LM75_CMP[1]" + aou2);
            if (aou1 == 1) {
                $("#lm75_t1_chk").prop("checked", true);
            } else {
                $("#lm75_t1_chk").prop("checked", false);
            }
            if (aou2 == 1) {
                $("#lm75_t2_chk").prop("checked", true);
            } else {
                $("#lm75_t2_chk").prop("checked", false);
            }
        } catch (e) {
            console.log(e);
        }
    }

    if (temp_json["lm_75_1_cb"]) {
        //$(".btns_bme280_1").removeClass('badge-success');
        //$(".btns_bme280_1").removeClass('badge-danger');
        if (temp_json.lm_75_1_cb == "OK") {
            $(".btns_lm75_1").addClass("badge-success").text("ОК ");
        } else {
            $(".btns_lm75_1").addClass("badge-danger").text("Ошибка ");
        }
    }
    // posle output BME280: WEB <- ESP
    if (temp_json["lm75_1_ou"]) {
        //$(".btns_bme280_1").fadeIn();
        //i=0;
        //var hSt = temp_json.bme280_1_ou[0].toString(16).toUpperCase();
        //parseInt(hSt, 16)
        if (parseInt(temp_json.lm75_1_ou[1].trim(), 10) != 999 || parseInt(temp_json.lm75_1_ou[0].trim(), 10) != 999) {
            //$("#bm1_ch").val("0x"+Number(temp_json.bme280_1_ou[0]).toString(16).toUpperCase());
            var aou1 = parseInt(temp_json.lm75_1_ou[1].trim(), 10);
            var aou2 = parseInt(temp_json.lm75_1_ou[2].trim(), 10);
            //aou1 = aou1>>1;
            //aou2 = aou2>>1;

            $(".lm75thy_1").text(aou1 + " °C");
            $(".lm75tos_1").text(aou2 + " °C");
            $("#lm75sc_1").val(aou1);
            $("#lm75so_1").val(aou2);

            var statlm = parseInt(temp_json.lm75_1_ou[0].trim(), 10);
            var i = 0;

            if ($.isNumeric(statlm)) {
                for (i = 0; i <= 4; i++) {
                    if (statlm & (0x01 << i)) {
                        $("#gLM75ch" + i.toString()).prop("checked", true);
                    } else {
                        $("#gLM75ch" + i.toString()).prop("checked", false);
                    }
                }
            }
            $(".btns_lm75_1").addClass("badge-success").text("ОК ");
        } else {
            $(".btns_lm75_1").addClass("badge-danger").text("Ошибка ");
        }
        //bm1s_m
    }
    // posle output BME280: WEB <- ESP
    if (temp_json["lm75_2_ou"]) {
        //$(".btns_bme280_1").fadeIn();
        //i=0;
        //var hSt = temp_json.bme280_1_ou[0].toString(16).toUpperCase();
        //parseInt(hSt, 16)
        if (parseInt(temp_json.lm75_2_ou[1].trim(), 10) != 999 || parseInt(temp_json.lm75_2_ou[0].trim(), 10) != 999) {
            //$("#bm1_ch").val("0x"+Number(temp_json.bme280_1_ou[0]).toString(16).toUpperCase());
            var aou1 = parseInt(temp_json.lm75_2_ou[1].trim(), 10);
            var aou2 = parseInt(temp_json.lm75_2_ou[2].trim(), 10);
            //aou1 = aou1>>1;
            //aou2 = aou2>>1;

            $(".lm75thy_2").text(aou1 + "°C");
            $(".lm75tos_2").text(aou2 + "°C");
            $("#lm75sc_2").val(aou1);
            $("#lm75so_2").val(aou2);

            var statlm = parseInt(temp_json.lm75_2_ou[0].trim(), 10);
            var i = 0;

            if ($.isNumeric(statlm)) {
                for (i = 0; i <= 4; i++) {
                    if (statlm & (0x01 << i)) {
                        $("#gLM752ch" + i.toString()).prop("checked", true);
                    } else {
                        $("#gLM752ch" + i.toString()).prop("checked", false);
                    }
                }
            }
            $(".btns_lm75_2").addClass("badge-success").text("ОК ");
        } else {
            $(".btns_lm75_2").addClass("badge-danger").text("Ошибка ");
        }
        //bm1s_m
    }
    if (temp_json["lm_75_2_cb"]) {
        //$(".btns_bme280_1").removeClass('badge-success');
        //$(".btns_bme280_1").removeClass('badge-danger');
        if (temp_json.lm_75_2_cb == "OK") {
            $(".btns_lm75_2").addClass("badge-success").text("ОК ");
        } else {
            $(".btns_lm75_2").addClass("badge-danger").text("Ошибка ");
        }
    }
    if (temp_json["bme280_1_cb"]) {
        //$(".btns_bme280_1").removeClass('badge-success');
        //$(".btns_bme280_1").removeClass('badge-danger');
        if (temp_json.bme280_1_cb == "OK") {
            $(".btns_bme280_1").addClass("badge-success").text("ОК ");
        } else {
            $(".btns_bme280_1").addClass("badge-danger").text("Ошибка ");
        }
    }
    if (temp_json["bme280_2_cb"]) {
        //$(".btns_bme280_1").removeClass('badge-success');
        //$(".btns_bme280_1").removeClass('badge-danger');
        if (temp_json.bme280_2_cb == "OK") {
            $(".btns_bme280_2").addClass("badge-success").text("ОК ");
        } else {
            $(".btns_bme280_2").addClass("badge-danger").text("Ошибка ");
        }
    }
    //
    if (temp_json["GiveMeas_cb"]) {
        //$(".btns_bme280_1").removeClass('badge-success');
        //$(".btns_bme280_1").removeClass('badge-danger');
        console.log(temp_json.GiveMeas_cb);
        ast = 0;
        if (temp_json.GiveMeas_cb == "#ERR") {
            ast = 1;
            str_out1 = "";
            return;
        }
        if (temp_json.GiveMeas_cb == "#OVF") {
            ast = 1;
            $("#esp_urx").val(str_out1 + "#OVF");
            str_out1 = "";
            return;
        }
        //str_out1+=temp_json.GiveMeas_cb+"\n";
        str_out1 = $("#esp_urx").val().toString() + temp_json.GiveMeas_cb + "\n";
        $("#esp_urx").val(str_out1);
        //console.log($("#esp_urx").val().toString());
        //btn_sensor_rd();
    }
    //$(".btns_bme280_1").fadeIn();
    // posle input BME280: WEB -> ESP
    if (temp_json["Wr345_cb"]) {
        //$(".btns_bme280_1").removeClass('badge-success');
        //$(".btns_bme280_1").removeClass('badge-danger');
        if (temp_json.Wr345_cb == "OK") {
            $(".btns_otp").removeClass("badge-danger");
            $(".btns_otp").addClass("badge-success").text("ОК ");
        } else {
            $(".btns_otp").removeClass("badge-success");
            $(".btns_otp").addClass("badge-danger").text("Ошибка Wr345");
        }
    }
    //$(".btns_bme280_1").fadeIn();
    // posle input BME280: WEB -> ESP
    if (temp_json["Rd345_cb"]) {
        //$(".btns_bme280_1").removeClass('badge-success');
        //$(".btns_bme280_1").removeClass('badge-danger');
        if (temp_json.Rd345_cb == "OK") {
            $(".btns_otp").removeClass("badge-danger");
            $(".btns_otp").addClass("badge-success").text("ОК ");
        } else {
            $(".btns_otp").removeClass("badge-success");
            $(".btns_otp").addClass("badge-danger").text("Ошибка Rd345");
        }
    }
    if (temp_json["htu21d_cb"]) {
        //$(".btns_bme280_1").removeClass('badge-success');
        //$(".btns_bme280_1").removeClass('badge-danger');
        if (temp_json.htu21d_cb == "OK") {
            $(".btns_htu21d").addClass("badge-success").text("ОК ");
        } else {
            $(".btns_htu21d").addClass("badge-danger").text("Ошибка ");
        }
    }
    // posle output BME280: WEB <- ESP
    if (temp_json["htu21d_conf"]) {
        if (parseInt(temp_json.htu21d_conf[0], 10) != 999) {
            $("#htu21d_st").val("0x" + Number(temp_json.htu21d_conf[0]).toString(16).toUpperCase());
            var sthtu21d = parseInt(temp_json.htu21d_conf[0], 10);

            $("#htu21d_m option").removeProp("selected");
            $("#htu21d_ht option").removeProp("selected");

            $("#htu21d_m [value=" + temp_json.htu21d_conf[0] + "]").prop("selected", "selected");
            $("#htu21d_ht [value=" + temp_json.htu21d_conf[1] + "]").prop("selected", "selected");

            $(".btns_htu21d").addClass("badge-success").text("ОК ");
        } else {
            $(".btns_htu21d").addClass("badge-danger").text("Ошибка ");
        }
        //bm1s_m
    }

    if (temp_json["sht30_1_cb"]) {
        if (temp_json.sht30_1_cb == "OK") {
            $(".btns_sht30").addClass("badge-success").text("ОК ");
        } else {
            $(".btns_sht30").addClass("badge-danger").text("Ошибка ");
        }
    }
    if (temp_json["sht30_2_cb"]) {
        if (temp_json.sht30_2_cb == "OK") {
            $(".btns_sht31").addClass("badge-success").text("ОК ");
        } else {
            $(".btns_sht31").addClass("badge-danger").text("Ошибка ");
        }
    }

    // posle output BME280: WEB <- ESP
    if (temp_json["sht30_1_ou"]) {
        if (parseInt(temp_json.sht30_1_ou[0], 10) != 999) {
            $("#sht30_st").val("0x" + Number(temp_json.sht30_1_ou[0].trim()).toString(16).toUpperCase());
            var stsht30 = parseInt(temp_json.sht30_1_ou[0].trim(), 10);

            $("#sht30_ht option").removeProp("selected");
            $("#sht30_m option").removeProp("selected");
            $("#sht30_scr option").removeProp("selected");
            $("#sht30_rep option").removeProp("selected");
            $("#sht30_mps_sel option").removeProp("selected");

            $("#sht30_ht [value=" + temp_json.sht30_1_ou[1] + "]").prop("selected", "selected");
            $("#sht30_m [value=" + temp_json.sht30_1_ou[2] + "]").prop("selected", "selected");
            $("#sht30_rep [value=" + temp_json.sht30_1_ou[3] + "]").prop("selected", "selected");
            $("#sht30_mps_sel [value=" + temp_json.sht30_1_ou[4] + "]").prop("selected", "selected");
            $("#sht30_scr [value=" + temp_json.sht30_1_ou[5] + "]").prop("selected", "selected");
            $("#sht30_m").click();

            $(".btns_sht30").addClass("badge-success").text("ОК ");
        } else {
            $(".btns_sht30").addClass("badge-danger").text("Ошибка ");
        }
        //bm1s_m
    }
    // posle output BME280: WEB <- ESP
    if (temp_json["sht30_2_ou"]) {
        if (parseInt(temp_json.sht30_2_ou[0], 10) != 999) {
            $("#sht31_st").val("0x" + Number(temp_json.sht30_2_ou[0]).toString(16).toUpperCase());
            var stsht30 = parseInt(temp_json.sht30_2_ou[0], 10);

            $("#sht31_ht option").removeProp("selected");
            $("#sht31_m option").removeProp("selected");
            $("#sht31_scr option").removeProp("selected");
            $("#sht31_rep option").removeProp("selected");
            $("#sht31_mps_sel option").removeProp("selected");

            $("#sht31_ht [value=" + temp_json.sht30_2_ou[1] + "]").prop("selected", "selected");
            $("#sht31_m [value=" + temp_json.sht30_2_ou[2] + "]").prop("selected", "selected");
            $("#sht31_rep [value=" + temp_json.sht30_2_ou[3] + "]").prop("selected", "selected");
            $("#sht31_mps_sel [value=" + temp_json.sht30_2_ou[4] + "]").prop("selected", "selected");
            $("#sht31_scr [value=" + temp_json.sht30_2_ou[5] + "]").prop("selected", "selected");
            $("#sht31_m").click();

            $(".btns_sht31").addClass("badge-success").text("ОК ");
        } else {
            $(".btns_sht31").addClass("badge-danger").text("Ошибка ");
        }
        //bm1s_m
    }
    // posle output BME280: WEB <- ESP
    if (temp_json["bme280_1_ou"]) {
        //$(".btns_bme280_1").fadeIn();
        //i=0;
        //var hSt = temp_json.bme280_1_ou[0].toString(16).toUpperCase();
        //parseInt(hSt, 16)
        if (parseInt(temp_json.bme280_1_ou[1], 10) != 999 || parseInt(temp_json.bme280_1_ou[0].trim(), 10) != 999) {
            $("#bm1_ch").val("0x" + Number(temp_json.bme280_1_ou[0].trim()).toString(16).toUpperCase());
            //hSt = temp_json.bme280_1_ou[1].toString(16).toUpperCase();

            var bmst1 = parseInt(temp_json.bme280_1_ou[1], 10);

            $("#bm1_st").val("0x" + Number(temp_json.bme280_1_ou[1].trim()).toString(16).toUpperCase());
            //$(".btns_bme280_1").removeClass('badge-danger');
            //$(".btns_bme280_1").removeClass('badge-success');
            if ($.isNumeric(bmst1)) {
                //console.log("4uclo " + bmst1);
                if (bmst1 & 0x01) {
                    $("#gBM2801ch0").prop("checked", true);
                    //console.log("#gBM2801ch0 true " + bmst1);
                } else {
                    $("#gBM2801ch0").prop("checked", false);
                    //console.log("#gBM2801ch0 false " + bmst1);
                }
                if (bmst1 & 0x08) {
                    //console.log("#gBM2801ch3 ch true");
                    $("#gBM2801ch3").prop("checked", true);
                    //console.log("#gBM2801ch3 true " + bmst1);
                } //console.log("#gBM2801ch3 ch false");
                else {
                    $("#gBM2801ch3").prop("checked", false);
                    //console.log("#gBM2801ch3 false " + bmst1);
                }

                $("#bm1s_m option").removeProp("selected");
                $("#bm1s_osrs option").removeProp("selected");
                $("#bm1s_f option").removeProp("selected");
                $("#bm1_t_st option").removeProp("selected");
                //$('#bm1s_m option').each(function(){
                //		this.removeAttr("selected");
                //});

                $("#bm1s_m [value=" + temp_json.bme280_1_ou[2] + "]").prop("selected", "selected");
                $("#bm1s_osrs [value=" + temp_json.bme280_1_ou[3] + "]").prop("selected", "selected");
                $("#bm1s_f [value=" + temp_json.bme280_1_ou[4] + "]").prop("selected", "selected");
                $("#bm1_t_st [value=" + temp_json.bme280_1_ou[5] + "]").prop("selected", "selected");

                $(".btns_bme280_1").addClass("badge-success").text("ОК ");
            }
        } else {
            $("#bm1_ch").val("Ошибка");
            $("#bm1_st").val("Ошибка");
            $(".btns_bme280_1").addClass("badge-danger").text("Ошибка ");
        }
        //bm1s_m
    }
    // posle output BME280: WEB <- ESP
    if (temp_json["bme280_2_ou"]) {
        //$(".btns_bme280_1").fadeIn();
        //i=0;
        //var hSt = temp_json.bme280_1_ou[0].toString(16).toUpperCase();
        //parseInt(hSt, 16)
        if (parseInt(temp_json.bme280_2_ou[1], 10) != 999 || parseInt(temp_json.bme280_2_ou[0].trim(), 10) != 999) {
            $("#bm2_ch").val("0x" + Number(temp_json.bme280_2_ou[0]).toString(16).toUpperCase().trim());
            //hSt = temp_json.bme280_1_ou[1].toString(16).toUpperCase();

            var bmst2 = parseInt(temp_json.bme280_2_ou[1], 10);

            $("#bm2_st").val("0x" + Number(temp_json.bme280_2_ou[1]).toString(16).toUpperCase().trim());
            //$(".btns_bme280_1").removeClass('badge-danger');
            //$(".btns_bme280_1").removeClass('badge-success');
            if ($.isNumeric(bmst2)) {
                //console.log("4uclo " + bmst2);
                if (bmst2 & 0x01) {
                    $("#gBM2802ch0").prop("checked", true);
                    console.log("#gBM2802ch0 true " + bmst2);
                } else {
                    $("#gBM2802ch0").prop("checked", false);
                    console.log("#gBM2802ch0 false " + bmst2);
                }
                if (bmst1 & 0x08) {
                    //console.log("#gBM2801ch3 ch true");
                    $("#gBM2802ch3").prop("checked", true);
                    //console.log("#gBM2802ch3 true " + bmst2);
                } //console.log("#gBM2801ch3 ch false");
                else {
                    $("#gBM2802ch3").prop("checked", false);
                   //console.log("#gBM2802ch3 false " + bmst2);
                }

                $("#bm2s_m option").removeProp("selected");
                $("#bm2s_osrs option").removeProp("selected");
                $("#bm2s_f option").removeProp("selected");
                $("#bm2_t_st option").removeProp("selected");
                //$('#bm1s_m option').each(function(){
                //		this.removeAttr("selected");
                //});
                $("#bm2s_m [value=" + temp_json.bme280_2_ou[2] + "]").prop("selected", "selected");
                $("#bm2s_osrs [value=" + temp_json.bme280_2_ou[3] + "]").prop("selected", "selected");
                $("#bm2s_f [value=" + temp_json.bme280_2_ou[4] + "]").prop("selected", "selected");
                $("#bm2_t_st [value=" + temp_json.bme280_2_ou[5] + "]").prop("selected", "selected");
                $(".btns_bme280_2").addClass("badge-success").text("ОК ");
            }
        } else {
            $("#bm2_ch").val("Ошибка");
            $("#bm2_st").val("Ошибка");
            $(".btns_bme280_2").addClass("badge-danger").text("Ошибка ");
        }
        //bm1s_m
    }
	
    if (temp_json["temp"]) {
        for (i = 3; i <= maOBJ.length && (i - 3) <= temp_json.temp.length; i++) {
            //try {
            if (temp_json.temp[i - 3] == "#ERR" || temp_json.temp[i - 3] == "" || temp_json.temp[i - 3] == NaN) {
                tmpvloff(i);
            } else {
                tmpvlon(i);
            }
	     // str_out = temp_json.temp[i - 3];
	     //var newString = str.trim()
            //$("#" + maOBJ[i].name).val(temp_json.temp[i - 3]);
            $("#" + maOBJ[i].name).val(temp_json.temp[i - 3]);
			//temp_arr[i-3]=$("#" + maOBJ[i].name).val();
			temp_arr[i-3]=parseFloat(temp_json.temp[i - 3]);
			
        }
		//console.log(T_arr,H_arr,P_arr,temp_arr);
        for (i = 0; i < temp_arr.length; i++) {
            //try {
				if(i<T_arr.length && parseFloat(temp_arr[T_arr[i]]) != NaN)
				{
					j_T+=Math.abs(parseFloat(temp_arr[T_arr[i]]));T_cnt++; 
					//console.log("a5 "+parseFloat(temp_arr[T_arr[i]])+" "+T_arr[i]+" "+temp_arr[i]+" "+T_arr+" "+T_cnt);
				}
				if(i<H_arr.length && parseFloat(temp_arr[H_arr[i]]) != NaN)
				{
					j_H+=parseFloat(temp_arr[H_arr[i]]);H_cnt++;
				}
				if(i<P_arr.length && parseFloat(temp_arr[P_arr[i]]) != NaN)
				{
					j_P+=parseFloat(temp_arr[P_arr[i]]);P_cnt++;
				}	
        }
		//console.log(+"a5 "+j_T+" "+j_H+" "+j_P+" "+T_cnt+" "+H_cnt+" "+P_cnt);
		j_T=j_T/T_cnt; j_H=j_H/H_cnt; j_P=j_P/P_cnt;
		/*			    $("#" + maOBJ[0].name).removeClass("is-invalid").html();
						$("#" + maOBJ[0].name).removeClass("is-valid").html();
						$("#" + maOBJ[1].name).removeClass("is-invalid").html();
						$("#" + maOBJ[1].name).removeClass("is-valid").html();
						$("#" + maOBJ[2].name).removeClass("is-invalid").html();
						$("#" + maOBJ[2].name).removeClass("is-valid").html();
		if(j_T==NaN)
		{	$("#" + maOBJ[0].name).addClass("is-invalid").html();}
		else
		{ 	$("#" + maOBJ[0].name).addClass("valid").html();}
		if(j_P==NaN)
		{	$("#" + maOBJ[1].name).addClass("is-invalid").html();}
		else
		{ 	$("#" + maOBJ[1].name).addClass("valid").html();}
		if(j_H==NaN)
		{	$("#" + maOBJ[2].name).addClass("is-invalid").html();}
		else
		{ 	("#" + maOBJ[2].name).addClass("valid").html();}
		*/
		 $("#temperature").val(j_T.toString().substring(0, 6));
		 $("#humudity").val(j_H.toString().substring(0, 6));
		 $("#pressure").val(j_P.toString().substring(0, 6));
		
    }
    $("#tm_adc").removeClass("is-invalid").html();
    $("#tm_adc").removeClass("is-valid").html();
    if (temp_json["temt_adc"]) {
        $("#tm_adc").val(temp_json.temt_adc);
        if (temp_json.temt_adc == "" || temp_json.temt_adc == "#ERR") {
            $("#tm_adc").addClass('is-invalid').html();
        } else {
            $("#tm_adc").addClass('is-valid').html()
        }

    }
    var tht = parseFloat($("#htu21_t").val());
    //console.log(tht);
    var thh = parseFloat($("#htu21_h").val());
    var PP = 1.359 * Math.pow(10, 8) * Math.pow(10, -1762.39 / (tht + 235.66));
    var PPp = ((PP * 133.32) / 1000).toString();
    //console.log(PP);

    $("#htu21_pp").val(PPp.substring(0, 5));
    var DEW = (-(1762.39 / (Math.log(thh * (PP * 0.01)) - 8.1332) + 235.66)).toString();
    $("#htu21_dew").val(DEW.substring(0, 5));
    if (PPp == "NaN" || DEW == "NaN" || PPp == "" || DEW == "") {
        $("#htu21_dew").removeClass("is-invalid").html();
        $("#htu21_dew").removeClass("is-valid").html();
        $("#htu21_dew").addClass("is-invalid").html();
        $("#htu21_pp").removeClass("is-invalid").html();
        $("#htu21_pp").removeClass("is-valid").html();
        $("#htu21_pp").addClass("is-invalid").html();
    }
    $("#htu21_dew").removeClass("is-invalid").html();
    $("#htu21_dew").removeClass("is-valid").html();
    $("#htu21_dew").addClass("is-valid").html();
    $("#htu21_pp").removeClass("is-invalid").html();
    $("#htu21_pp").removeClass("is-valid").html();
    $("#htu21_pp").addClass("is-valid").html();

    if (temp_json["debug"]) {
        //seOBJ = $("#scntf").serializeArray();
        console.log(temp_json.debug);
        if (temp_json.debug == "ON") {
            //var	as=$('.pst1');
            //var as0=$('.pst0');
            sdmc_sh();
            as1.removeClass("badge-warning");
            as1.addClass("badge-success");
            as1.text("ВКЛ");
        } else if (temp_json.debug == "OFF") {
            sdmc_rm();
            as1.removeClass("badge-success");
            as1.addClass("badge-warning");
            as1.text("ВЫКЛ");
        } else {
            as1.removeClass("badge-success");
            as1.addClass("badge-danger");
            as1.text("НЕТ СВЯЗИ");
        }
        //$(".swdeb").attr("disabled", "false");
        $(".swdeb").removeAttr("disabled");
    }
    //$("#tm_adc").val(temp_json.debug);
    if (temp_json["rtc_get"]) {
        i = 0;
        for (i in temp_json.rtc_get) {
            str_out += temp_json.rtc_get[i] + "-";
        }
        $(".ptime").text(str_out.substring(0, str_out.length - 1));
    }
    str_out = "";
}

function tmpvlon(ii) {
    $("#" + maOBJ[ii].name)
		.removeClass("is-invalid")
		.html();
    $("#" + maOBJ[ii].name)
		.removeClass("is-valid")
		.html();
    $("#" + maOBJ[ii].name)
		.addClass("is-valid")
		.html();
}

function tmpvloff(ii) {
    $("#" + maOBJ[ii].name)
		.removeClass("is-invalid")
		.html();
    $("#" + maOBJ[ii].name)
		.removeClass("is-valid")
		.html();
    $("#" + maOBJ[ii].name)
		.addClass("is-invalid")
		.html();
}

function sdmc_sh() {
    mds.removeClass("collapse show");
    mds.addClass("collapse hide");
    sds.removeClass("collapse hide");
    sds.addClass("collapse show");
    sets.removeClass("collapse hide");
    sets.addClass("collapse show");
}

function sdmc_rm() {
    mds.removeClass("collapse hide");
    mds.addClass("collapse show");
    sds.removeClass("collapse show");
    sds.addClass("collapse hide");
    sets.removeClass("collapse show");
    sets.addClass("collapse hide");
}

function ftvall(cl) {
    for (i = 0; i < maOBJ.length; i++) {
        $("#" + maOBJ[i].name).val(cl);
        $("#" + maOBJ[i].name)
			.removeClass("is-invalid")
			.html();
        $("#" + maOBJ[i].name)
			.removeClass("is-valid")
			.html();
    }
}

function ftmpd() {
    for (i = 0; i < maOBJ.length; i++) {
        $("#" + maOBJ[i].name)
			.removeClass("is-invalid")
			.html();
        $("#" + maOBJ[i].name)
			.removeClass("is-valid")
			.html();
    }
}

function spt0() {
    var lines = $("#esp_tx")
		.val()
		.replace(/^[\n]+$/g, "")
		.split(/[\n]+/);
    return lines;
}

function smgh() {
    if (!device.mobile()) {
        $(".bt0st").click();
    }
}

// MENU - dublirovanmie
$(".bt0st1").click(function bjst1() {
    $(".bt0st").click();
});

function erxclr_uart() {
    $("#esp_tx").val("");
}

function etxclr_uart() {
    $("#esp_urx").val("");
    str_out1 = "";
}
// main knopka
$(".bt0st").click(function bjst() {
    ast = $(".bt0st").attr("value");
    if (device.mobile()) {
        if (ast != "on") {
            $(".bt0st").attr("value", "on");
            rm_b();
            rms_b();
            shs_b();
        } else {
            $(".bt0st").attr("value", "off");
            rm_b();
            rms_b();
            sh_b();
        }
    } else {
        //el.addAttr('value', 'on');
        // ecli knopka vykl
        if (ast != "on") {
            // knopka vkl
            $(".bt0st").attr("value", "on");
            rm_b();
            sh_b();
        }
        // ecli knopka vkl
        // knopka vykl
        else {
            $(".bt0st").attr("value", "off");
            rm_b();
        }
    }
});

function rm_b() {
    // remove deviser HD
    $(".mc1").removeClass("col-md-8 col-xl-8").html();
    $(".bsn0").removeClass("col-md-4 col-xl-4").html();
    $(".mc1").removeClass("noscroll collapse hide");
    $(".mc1").addClass("col-12").html();
}

function sh_b() {
    // deviser HD
    $(".mc1").remove("col-12").html();
    $(".mc1").addClass("col-md-8 col-xl-8").html();
    $(".bsn0").addClass("col-md-4 col-xl-4").html();
}

function rms_b() {
    //$('.bsn0').removeClass('col-12').html();
    $(".bsn0").removeClass("col-12 overlay").html();
    $(".mc1").removeClass("noscroll collapse hide");
}

function shs_b() {
    $(".bsn0").addClass("col-12 overlay").html();
    $(".mc1").addClass("noscroll collapse hide").html();
}
// DEBUG btn
$(".swdeb").click(function swdebfn() {
    if (this.checked == true) {
        $(".swdebl").text("Выключить режим настройки");
        this.setAttribute("disabled", "true");
        sdeb("ON");
        subwdeb = true;
    } else {
        $(".swdebl").text("Включить режим настройки");
        this.setAttribute("disabled", "false");
        sdeb("OFF");
        subwdeb = false;
    }
});
// SUBMIT debug
function sdeb(bl) {
    var url1 = "/debug_mode?input=" + encodeURIComponent(bl) + "&";
    fetch(url1, "GET", txjstmp, 10);
}

// MENU - href + onclick()
function clbtn0() {
    ast = $(".bt0st").attr("value");
    if (device.mobile()) {
        if (ast != "on") {
            shs_b();
            sh_b();
        } else {
            rms_b();
            rm_b();
        }
        $(".bt0st").click();
    }
}
$(window).resize(function () {
    clresf();
});

function clresf() {
    ast = $(".bt0st").attr("value");
    if (device.mobile()) {
        // knopka vkl SM
        if (ast == "on") {
            rms_b();
            shs_b();
        } else {
            rms_b();
        }
    } else {
        // knopka vkl HD
        if (ast == "on") {
            rm_b();
            sh_b();
        } else {
            rm_b();
        }
    }
}

function fetch(url, method, callback, time_out) {
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.onloadend = function () {
        callback(xhr.status, xhr.responseText);
    };
    xhr.ontimeout = function () {
        callback(-1, null);
    };
    xhr.open(method, url, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.timeout = time_out * 200;
    xhr.send();
}

function btn_lm75_1s() {
    //$(".btns_lm75_1").text("");
    $(".btns_lm75_1").removeClass("badge-danger");
    $(".btns_lm75_1").removeClass("badge-success");
    fetch("/output_lm75_1.json?n=" + Math.random(), "GET", txjstmp, 10);
}

function btn_lm75_2s() {
    //$(".btns_lm75_2").text("");
    $(".btns_lm75_2").removeClass("badge-danger");
    $(".btns_lm75_2").removeClass("badge-success");
    fetch("/output_lm75_2.json?n=" + Math.random(), "GET", txjstmp, 10);
}

function btn_lm75_1() {
    var i = 0;
    var input_lm75 = {};
    var tarch = 0; // conf
    var tos1 = 0; // tos1
    var thyst1 = 0; // thyst
    var sc_1l = $("#lm75sc_1");
    var so_1l = $("#lm75so_1");
    //cnfOBJ = $("#scntf").serializeArray();
    for (i = 0; i < 5 && $("#gLM75ch" + i).val() != undefined; ++i) {
        if ($("#gLM75ch" + i).prop("checked")) {
            tarch |= 1 << i;
        }
    }
    tos1 = sc_1l.val();
    thyst1 = so_1l.val();
    console.log(tos1 + " " + thyst1);
    if (thyst1 > tos1 && thyst1 < 0 && tos1 < 0) {
        i = tos1;
        thyst1 = tos1;
        tos1 = thyst1;
        console.log("thyst1>tos1 && (thyst1<0) && (tos1<0)" + tos1 + " " + thyst1);
    } else if (thyst1 > tos1) {
        i = thyst1;
        thyst1 = tos1;
        tos1 = i;
        console.log("thyst1>tos1" + tos1 + " " + thyst1);
    }
    if (tos1 == thyst1) {
        if (thyst1 < 0 && tos1 < 0) {
            thyst1--;
        } else {
            tos1++;
        }
    }
    sc_1l.val(thyst1);
    so_1l.val(tos1);
    $(".lm75thy_1").text(sc_1l.val() + " C°");
    $(".lm75tos_1").text(so_1l.val() + " C°");
    thyst1 = parseInt(sc_1l.val());
    tos1 = parseInt(so_1l.val());

    thyst1 = thyst1 * 2;
    tos1 = tos1 * 2;

    input_lm75 = {
        lm75_conf: [tarch, thyst1, tos1]
    };
    fetch("/input_lm75_1.json?n=" + encodeURIComponent(JSON.stringify(input_lm75)) + "&", "GET", txjstmp, 10);
    console.log(JSON.stringify(input_lm75));
    //cnfOBJ = { };
}

function btn_lm75_2() {
    var i = 0;
    var input_lm75 = {};
    var tarch = 0; // conf
    var tos1 = 0; // tos1
    var thyst1 = 0; // thyst
    var sc_1l = $("#lm75sc_2");
    var so_1l = $("#lm75so_2");
    //cnfOBJ = $("#scntf").serializeArray();
    for (i = 0; i < 5 && $("#gLM752ch" + i).val() != undefined; ++i) {
        if ($("#gLM752ch" + i).prop("checked")) {
            tarch |= 1 << i;
        }
    }
    tos1 = sc_1l.val();
    thyst1 = so_1l.val();
    console.log(tos1 + " " + thyst1);
    if (thyst1 > tos1 && thyst1 < 0 && tos1 < 0) {
        i = tos1;
        thyst1 = tos1;
        tos1 = thyst1;
        console.log("thyst1>tos1 && (thyst1<0) && (tos1<0)" + tos1 + " " + thyst1);
    } else if (thyst1 > tos1) {
        i = thyst1;
        thyst1 = tos1;
        tos1 = i;
        console.log("thyst1>tos1" + tos1 + " " + thyst1);
    }
    if (tos1 == thyst1) {
        if (thyst1 < 0 && tos1 < 0) {
            thyst1--;
        } else {
            tos1++;
        }
    }
    sc_1l.val(thyst1);
    so_1l.val(tos1);
    $(".lm75thy_2").text(sc_1l.val() + " C°");
    $(".lm75tos_2").text(so_1l.val() + " C°");
    thyst1 = parseInt(sc_1l.val());
    tos1 = parseInt(so_1l.val());

    thyst1 = thyst1 * 2;
    tos1 = tos1 * 2;

    input_lm75 = {
        lm75_conf: [tarch, thyst1, tos1]
    };
    fetch("/input_lm75_2.json?n=" + encodeURIComponent(JSON.stringify(input_lm75)) + "&", "GET", txjstmp, 10);
    console.log(JSON.stringify(input_lm75));
    //cnfOBJ = { };
}

// zapros temperature
function sub_grad() {
    maOBJ = $("#tmpo").serializeArray();
    fetch("/temp_out.json?n=" + Math.random(), "GET", txjstmp, 10);
    //console.log(maOBJ);
}

function submit_uart() {
    $("#btn1").prop("disabled", true);
    // spt0 - preobrazovanie ot mysora na UART
    lines_in = spt0();
    url = "";
    uart_json.uart_out = "null";

    if ($("#uart_get_ch").prop("checked")) {
        ua_mode = 1;
    } else {
        ua_mode = 0;
    }

    for (i = 0; i < lines_in.length; i++) {
        uart_json.uart_in = lines_in[i];
        if (ua_mode == 1) {
            fetch("/uart_get?input=" + encodeURIComponent(lines_in[i]) + "&", "GET", txjs_ua, 10);
        } else {
            fetch("/uart.json?n=" + encodeURIComponent(JSON.stringify(uart_json)) + "&", "GET", txjs_ua, 10);
        }
    }
}

function txjs_ua(s, d) {
    seOBJ = $("#scntf").serializeArray();
    $("#btn1").prop("disabled", false);
    if (s != 200) {
        str_out1 += "Send command error" + "\n";
        //clearTimeout(rs.handle);
        console.log("Connection proplem!");
    } else {
        if (typeof d === "string") {
            console.log("priem ok!");
            try {
                uart_json = JSON.parse(d);
            } catch (e) {
                console.log(e);
                return 0;
            }
        } else {
            uart_json.uart_out = "null";
            uart_json.uart_in = "null";
        }
        console.log(uart_json);
        if (uart_json.uart_out == "") {
            str_out1 += "ACK" + "\n";
        } else {
            str_out1 += uart_json.uart_out + "\n";
        }
        //console.log(uart_json.uart_out);
    }
    var esp_uart_out_val = $("#esp_urx");
    if (esp_uart_out_val.val() != "") {
        esp_uart_out_val.val(esp_uart_out_val.val() + str_out1);
    } else {
        esp_uart_out_val.val(str_out1);
    }
    console.log(str_out1);
    str_out1 = "";
    //clearTimeout(rs.handle);
    //rs = to(refr, 3);
    //refr();
}

window.onload = function () {
    $(".bt0st").attr("value", "off");
    $(".navia").addClass("list-group-item list-group-item-action bg-light border");
    $("#esp_tx").val("wsbuser.prints(node.heap());");
    $("#esp_urx").val("");
    rs = setInterval(refr_rtc, 3000);
    i = 0;
    //$(".bsn0").collapse('show');
    smgh();
};
