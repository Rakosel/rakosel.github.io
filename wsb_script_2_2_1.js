// upd62d2 with upravl timer	https://rakosel.github.io/wsb_script_2_2_1.js  
// #40 mojet check ya on dobavlyaet v ArraySerialize xyu ego znaet ?????????????
//	24_03 Razrabotat knopki upravlenya for bme280 (potom moj dlya lm75 cchitku)
// 	#83 bme280_conf
// http://qaru.site/questions/66646/how-to-recognize-touch-events-using-jquery-in-safari-for-ipad-is-it-possible

		var stopAll = false, ra, rs, subwdeb = false, lines_in, i, url;
		var maOBJ,seOBJ,bmeOBJ;
  		var str_out = "", str_out1="";
  		var uart_json = {};
		var temp_json = {};
		var input_lm75 = {};
		var scrPos = 0, ovShBtn0 = false;
		var ast;
		var ua_mode=0;
		var tmranim = 3000; // animate [s]
		// reverse panelki dlya debug
		var sds,mds,sets;
		sds = $('.sideset');
		mds = $('.macnt');
		sets = $('.setcnt');
		cnftmp = $('.scntf');
		// rtc time auto from server

		function refr_rtc()
		{
			//fetch('/get_rtc.json?n=' + Math.random(), 'GET', txjstmp, 10);
			if ((subwdeb == false) && $("#autmp").prop("checked"))
			{sub_grad();}
			//console.log("refr_rtc");
		}
		
		//sht30_1
		function btn_sht30_1_Wr()
		{
			//bmeOBJ = $("#scntf").serializeArray(); 
			//console.log(bmeOBJ);
			// Rd mode
		var heater = $("#sht30_ht option:selected").val();
		var mode = $("#sht30_m option:selected").val();
		var scr = $("#sht30_scr option:selected").val();
		var rep = $("#sht30_rep option:selected").val();
		var mps_sel = $("#sht30_mps_sel option:selected").val();

		$(".btns_sht30").removeClass('badge-success');
		$(".btns_sht30").removeClass('badge-danger');

		input_sht30 = { "sht3x_conf": [heater,mode,scr,rep,mps_sel] };
		fetch('/input_sht30_1.json?n=' + encodeURIComponent(JSON.stringify(input_sht30))+'&', 'GET', txjstmp, 10);
		console.log("[heater,mode,scr,rep,mps_sel]");
		console.log(JSON.stringify(input_sht30));

		}
		
		//bm280_1
		function btn_bm280_1_Wr()
		{
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
		$(".btns_bme280_1").removeClass('badge-success');
		$(".btns_bme280_1").removeClass('badge-danger');
		if($.isNumeric(bm_alt)==false)
		{
			$(".btns_bme280_1").addClass('badge-danger').text("Ошибка (смотри выше)");
			//$("#bm_alt").addClass('is-invalid').html();
			//$(".altvld").css( "display", "block" );
			return;
		}

		input_bme280 = { "bme280_conf": [mode,osrs,bm1s_f,bm1_t_st,bm_alt] };
		fetch('/input_bme280_1.json?n=' + encodeURIComponent(JSON.stringify(input_bme280))+'&', 'GET', txjstmp, 10);
		console.log(JSON.stringify(input_bme280));

		}
		
		// C4itat
		function btn_bm280_1_Rd()
		{
		$(".btns_bme280_1").removeClass('badge-success');
		$(".btns_bme280_1").removeClass('badge-danger');
			fetch('/output_bme280_1.json?n=' + Math.random(), 'GET', txjstmp, 10);
			
		}

		// cont: TEMP, RTC, DEBUG + Settings
		 function txjstmp(s, d) {
  			var as1=$('.pst1');
			var as0=$('.pst0');

  			if (s != 200) {
				as0.removeClass('badge-success');
				as0.addClass('badge-danger');
				as0.text("Нет связи");
				as1.removeClass('badge-success');
				as1.addClass('badge-danger');
				as1.text("Нет связи");
				$('.swdeb').removeAttr('disabled'); 
				ftmpd();
				console.log("Connection proplem!");
				return 0;					  
  				//clearTimeout(rs.handle);
  
  			} else {
				as1.removeClass('badge-danger');
				as0.removeClass('badge-danger');
				as0.addClass('badge-success');
				as0.text("ОК ");
  				if (typeof d === 'string') {
  					//console.log("priem ok!");
					try
					{temp_json = JSON.parse(d);console.log(s,temp_json);}
					// ftvall - form clear
					catch(e)
					{ftvall("");console.log(s,e.message);return 0;}
  				}
  				else
  				{console.log("d not string");ftvall("");return 0;}
  			}
			//$(".btns_bme280_1").fadeIn();
			// posle input BME280: WEB -> ESP
			if(temp_json["bme280_1_cb"])
			{
				//$(".btns_bme280_1").removeClass('badge-success');
				//$(".btns_bme280_1").removeClass('badge-danger');
				if(temp_json.bme280_1_cb == "OK")
				{
					$(".btns_bme280_1").addClass('badge-success').text("ОК ");
				}
				else
				{
					$(".btns_bme280_1").addClass('badge-danger').text("Ошибка ");
				}
			}		
			if(temp_json["sht30_1_cb"])
			{
				//$(".btns_bme280_1").removeClass('badge-success');
				//$(".btns_bme280_1").removeClass('badge-danger');
				if(temp_json.sht30_1_cb == "OK")
				{
					$(".btns_sht30").addClass('badge-success').text("ОК ");
				}
				else
				{
					$(".btns_sht30").addClass('badge-danger').text("Ошибка ");
				}
			}	
			
			// posle output BME280: WEB <- ESP		
			if(temp_json["bme280_1_ou"])
			{
				//$(".btns_bme280_1").fadeIn();
				//i=0;
				//var hSt = temp_json.bme280_1_ou[0].toString(16).toUpperCase();
				//parseInt(hSt, 16)
if(parseInt(temp_json.bme280_1_ou[1], 10) != 999 || parseInt(temp_json.bme280_1_ou[0], 10) != 999)
				{
				$("#bm1_ch").val("0x"+Number(temp_json.bme280_1_ou[0]).toString(16).toUpperCase());
				//hSt = temp_json.bme280_1_ou[1].toString(16).toUpperCase();
				
				var bmst1 = parseInt(temp_json.bme280_1_ou[1], 10);
				
				$("#bm1_st").val("0x"+Number(temp_json.bme280_1_ou[1]).toString(16).toUpperCase());
				//$(".btns_bme280_1").removeClass('badge-danger');
				//$(".btns_bme280_1").removeClass('badge-success');
				if($.isNumeric(bmst1))
				{
					console.log("4uclo "+bmst1);
					if(bmst1 & 0x01)
					{$("#gBM2801ch0").prop('checked', true);console.log("#gBM2801ch0 true "+bmst1);}
					else
					{$("#gBM2801ch0").prop('checked', false);console.log("#gBM2801ch0 false "+bmst1);}
					if(bmst1 & 0x08)//console.log("#gBM2801ch3 ch true");
					{$("#gBM2801ch3").prop('checked', true);console.log("#gBM2801ch3 true "+bmst1);}
					else//console.log("#gBM2801ch3 ch false");
					{$("#gBM2801ch3").prop('checked', false);console.log("#gBM2801ch3 false "+bmst1);}

					$('#bm1s_m option').removeProp("selected");
					$('#bm1s_osrs option').removeProp("selected");
					$('#bm1s_f option').removeProp("selected");
					$('#bm1_t_st option').removeProp("selected");
					//$('#bm1s_m option').each(function(){
					//		this.removeAttr("selected");
					//});

					$("#bm1s_m [value="+temp_json.bme280_1_ou[2]+"]").prop("selected", "selected");
					$("#bm1s_osrs [value="+temp_json.bme280_1_ou[3]+"]").prop("selected", "selected");
					$("#bm1s_f [value="+temp_json.bme280_1_ou[4]+"]").prop("selected", "selected");
					$("#bm1_t_st [value="+temp_json.bme280_1_ou[5]+"]").prop("selected", "selected");
					
					$(".btns_bme280_1").addClass('badge-success').text("ОК ");
				}
				}
				else
				{$("#bm1_ch").val("Ошибка");$("#bm1_st").val("Ошибка");
				$(".btns_bme280_1").addClass('badge-danger').text("Ошибка ");
				}
				//bm1s_m
			}	
			if(temp_json["temp"] )
			{
			for(i=3;i<=maOBJ.length;i++)
			{
				try
				{
				if((temp_json.temp[i-3] == "#ERR") || (temp_json.temp[i-3] == ''))
					{
						//$("#"+maOBJ[i].name).addClass('is-invalid').html();
						tmpvlof(i);
					}
					else
					{
						//$("#"+maOBJ[i].name).addClass('is-valid').html()
						tmpvlon(i);
					}
				if((i-3)<=temp_json.temp.length)
				{	
					$("#"+maOBJ[i].name).val(temp_json.temp[i-3]);
					console.log(temp_json.temp[i-3]);
				}
					
				if(temp_json["temt_adc"] )
				{	$("#tm_adc").val(temp_json.temt_adc);}
				}	
				catch(e)
				{tmpvlof(i);console.log(e.message); return 0;}				
			}
			}
			if(temp_json["debug"])
			{
				//seOBJ = $("#scntf").serializeArray();
				console.log(temp_json.debug);
				if(temp_json.debug == "ON")
				{
			//var	as=$('.pst1');
			//var as0=$('.pst0');
					sdmc_sh();
					as1.removeClass('badge-warning');
					as1.addClass('badge-success');
					as1.text("ВКЛ");
				}
				else if(temp_json.debug == "OFF")
				{
					sdmc_rm();
					as1.removeClass('badge-success');
					as1.addClass('badge-warning');
					as1.text("ВЫКЛ");
				}
				else
					{
					as1.removeClass('badge-success');
					as1.addClass('badge-danger');
					as1.text("НЕТ СВЯЗИ");
					}
				//$(".swdeb").attr("disabled", "false");
				$('.swdeb').removeAttr('disabled'); 
				//$("#tm_adc").val(temp_json.debug);
			}
			if(temp_json["rtc_get"])
			{
				i=0;
			 	for(i in temp_json.rtc_get)
			 	{str_out += temp_json.rtc_get[i] + '-'	}
				$(".ptime").text(str_out.substring(0, str_out.length - 1));
				
			}			 
			 
			 str_out = "";
  		}
		
		function tmpvlon(ii)
		{	
			$("#"+maOBJ[ii].name).removeClass('is-invalid').html();
			$("#"+maOBJ[ii].name).removeClass('is-valid').html();
			$("#"+maOBJ[ii].name).addClass('is-valid').html();
		}

		function tmpvlof(ii)
		{
			$("#"+maOBJ[ii].name).removeClass('is-invalid').html();
			$("#"+maOBJ[ii].name).removeClass('is-valid').html();
			$("#"+maOBJ[ii].name).addClass('is-invalid').html();
		}
		
		function sdmc_sh()
		{
			mds.removeClass('collapse show');
			mds.addClass('collapse hide');
			sds.removeClass('collapse hide');
			sds.addClass('collapse show');
			sets.removeClass('collapse hide');
			sets.addClass('collapse show');
		}
		
		function sdmc_rm()
		{	
			mds.removeClass('collapse hide');
			mds.addClass('collapse show');
			sds.removeClass('collapse show');
			sds.addClass('collapse hide');
			sets.removeClass('collapse show');
			sets.addClass('collapse hide');
		}
		
		function ftvall(cl)
		{
			for(i=0;i<maOBJ.length;i++)
			{$("#"+maOBJ[i].name).val(cl);
			$("#"+maOBJ[i].name).removeClass('is-invalid').html();
			$("#"+maOBJ[i].name).removeClass('is-valid').html();}
		}

		function ftmpd()
		{
			for(i=0;i<maOBJ.length;i++)
			{$("#"+maOBJ[i].name).removeClass('is-invalid').html();
			$("#"+maOBJ[i].name).removeClass('is-valid').html();}
		}

  		function spt0()
  		{
      		var lines = $('#esp_tx').val().replace(/^[\n]+$/g,'').split(/[\n]+/);
      		return lines;
  		}


		function smgh()
		{		
			if(!device.mobile() )
			{ $('.bt0st').click(); }	
		}
		
		// MENU - dublirovanmie
		$('.bt0st1').click(function bjst1()			  
		{	$('.bt0st').click();
		});

		function erxclr_uart()			  
		{	
			$("#esp_tx").val("");
		};

		function etxclr_uart()			  
		{	
			$("#esp_urx").val("");
		};
		// main knopka
		$('.bt0st').click(function bjst() 	
		{
					ast = $('.bt0st').attr( "value" );
					if(device.mobile() )
						{		
						if( ast!="on")
						{$('.bt0st').attr("value", "on"); rm_b(); rms_b(); shs_b(); }
						else
						{$('.bt0st').attr("value", "off"); rm_b(); rms_b(); sh_b(); } }
					else
					{
						//el.addAttr('value', 'on');
						// ecli knopka vykl
						if(ast!="on")
						// knopka vkl 
						{$('.bt0st').attr("value", "on"); rm_b();sh_b();}
						// ecli knopka vkl
						else	
						// knopka vykl	
						{$('.bt0st').attr("value", "off"); rm_b();}
					}

		});

		function rm_b()
		{
			// remove deviser HD
					$('.mc1').removeClass('col-md-8 col-xl-8').html();
					$('.bsn0').removeClass('col-md-4 col-xl-4').html();
					$('.mc1').removeClass('noscroll collapse hide');
					$('.mc1').addClass('col-12').html();
		}
		function sh_b()
		{
			// deviser HD
					$('.mc1').remove('col-12').html();
					$('.mc1').addClass('col-md-8 col-xl-8').html();
					$('.bsn0').addClass('col-md-4 col-xl-4').html();
		}
		function rms_b()
		{
					//$('.bsn0').removeClass('col-12').html();
					$('.bsn0').removeClass('col-12 overlay').html();
					$('.mc1').removeClass('noscroll collapse hide');
		}
		function shs_b()
		{
					$('.bsn0').addClass('col-12 overlay').html();
					$('.mc1').addClass('noscroll collapse hide').html();
		}
		// DEBUG btn
		$('.swdeb').click(function swdebfn() 	
		{
						if (this.checked == true)
							{$('.swdebl').text("Выключить режим настройки");this.setAttribute("disabled", "true");sdeb("ON");
							subwdeb=true;}		 		
							else
							{$('.swdebl').text("Включить режим настройки");this.setAttribute("disabled", "false");sdeb("OFF");
							subwdeb=false;}
		});
		// SUBMIT debug
		function sdeb(bl)
		{
			var url1 = '/debug_mode?input=' + encodeURIComponent(bl)+ '&';
			fetch(url1, 'GET', txjstmp, 10);
		}

		// MENU - href + onclick()
		function clbtn0()
		{
			ast = $('.bt0st').attr( "value" );
			if(device.mobile() )
			{
				if(ast!="on")
				{shs_b();sh_b();}	
				else
				{rms_b();rm_b();}
				$('.bt0st').click();
			}	
		}
		$(window).resize(function() {
				clresf();
		});
		
		function clresf()
		{
			ast = $('.bt0st').attr( "value" );
			if(device.mobile() )
				{
					// knopka vkl SM
					if(ast=="on")
					{rms_b();shs_b();}	
					else
					{rms_b();}
				}
				else
				{
					// knopka vkl HD
					if(ast=="on")
					{rm_b();sh_b();}	
					else
					{rm_b();}
				}						
		}


  		function fetch(url, method, callback, time_out) {
  			console.log(url);
  			var xhr = new XMLHttpRequest();
  			xhr.onloadend = function () 
  			{
  				callback(xhr.status, xhr.responseText);
  			}
  			xhr.ontimeout = function () {
  				callback(-1, null);
  			}
  			xhr.open(method, url, true);
  			xhr.setRequestHeader('Accept', 'application/json');
  			xhr.timeout = time_out * 200;
  			xhr.send();
  		}
		
		
		
		function btn_lm75_1()
		{
			var i=0;
			var input_lm75 = {};
			var tarch = 0;	// conf
			var tos1 = 0;	// tos1
			var thyst1 = 0;	// thyst
			var sc_1l = $("#lm75sc_1");
			var so_1l = $("#lm75so_1");
			//cnfOBJ = $("#scntf").serializeArray();			
			for(i=0;(i < 5) && ($("#gLM75ch" + i).val()!=undefined);++i )
			{
				if($("#gLM75ch" + i).prop("checked"))
				{tarch|=(1 << i);}
			}
			tos1 = sc_1l.val();
			thyst1 = so_1l.val();
			console.log(tos1 + " " + thyst1);
			if(thyst1>tos1 && (thyst1<0) && (tos1<0))
			{
				i=tos1;
				thyst1 = tos1;
				tos1 = thyst1;
			console.log("thyst1>tos1 && (thyst1<0) && (tos1<0)" + tos1 + " " + thyst1);
			}
			else if(thyst1>tos1)
			{
				i=thyst1;
				thyst1 = tos1;
				tos1 = i;
			console.log("thyst1>tos1" + tos1 + " " + thyst1);
			}
			if(tos1==thyst1)
			{	
				if(thyst1<0 && tos1<0)
				{thyst1--;}
				else
				{tos1++;}
			}
			sc_1l.val(thyst1);so_1l.val(tos1);
			  $('.lm75thy_1').text(sc_1l.val() +" C°");
			  $('.lm75tos_1').text(so_1l.val() +" C°");
			thyst1 = parseInt(sc_1l.val());
			tos1 = parseInt(so_1l.val());
			
			thyst1=thyst1*2;
			tos1=tos1*2;

			input_lm75 = { "lm75_conf": [tarch,thyst1,tos1] };
			fetch('/input_lm75_2.json?n=' + encodeURIComponent(JSON.stringify(input_lm75))+'&', 'GET', txjstmp, 10);
			console.log(JSON.stringify(input_lm75));
			//cnfOBJ = { };
		}

		// zapros temperature
		function sub_grad() 
  		{
			maOBJ = $("#tmpo").serializeArray(); 
			fetch('/temp_out.json?n=' + Math.random(), 'GET', txjstmp, 10);
			//console.log(maOBJ);
  		}	
		
  		function submit_uart() 
  		{
  			$("#btn1").prop("disabled", true);
			// spt0 - preobrazovanie ot mysora na UART
  			lines_in = spt0();
  			url = "";
  			uart_json.uart_out = "null";
				
				if ($("#uart_get_ch").prop("checked"))
				{ua_mode=1;}
				else
				{ua_mode=0;}
				
  			for (i = 0; i < lines_in.length; i++)
  			{
  				uart_json.uart_in = lines_in[i];
					if(ua_mode==1)
					{fetch('/uart_get?input=' + encodeURIComponent(lines_in[i])+'&', 'GET', txjs_ua, 10);}
					else
					{fetch('/uart.json?n=' + encodeURIComponent(JSON.stringify(uart_json))+'&', 'GET', txjs_ua, 10);}						
  			}
			
  		}

  		function txjs_ua(s, d) {
			seOBJ = $("#scntf").serializeArray();
			$("#btn1").prop("disabled", false);
  			if (s != 200) {
  				str_out1 += "Send command error"+'\n';
  				//clearTimeout(rs.handle);
  				console.log("Connection proplem!");
  			} else {
  				if (typeof d === 'string') {
  					console.log("priem ok!");
					try
					{uart_json = JSON.parse(d);}
					catch(e)
					{console.log(e);return 0;}
  				}
  				else
  				{uart_json.uart_out="null";uart_json.uart_in="null";}
				console.log(uart_json);
				if(uart_json.uart_out=="")
				{str_out1 += 'ACK' +'\n';}
				else
				{str_out1 += uart_json.uart_out +'\n';}
				//console.log(uart_json.uart_out);
  			}
			var esp_uart_out_val  = $("#esp_urx")
			if(esp_uart_out_val.val()!="")
  			{esp_uart_out_val.val(esp_uart_out_val.val()+str_out1);}
			else
			{esp_uart_out_val.val(str_out1);}
			console.log(str_out1);
			str_out1="";
  			//clearTimeout(rs.handle);
  			//rs = to(refr, 3);
  			//refr();
  		}
	

  		window.onload = function() {
			$('.bt0st').attr("value", "off");
			$('.navia').addClass('list-group-item list-group-item-action bg-light border');
  		  	$("#esp_tx").val('wsbuser.prints(node.heap());');
  			$("#esp_urx").val('');
			rs = setInterval(refr_rtc, 2000);
			i=0;
			//$(".bsn0").collapse('show');
			smgh();
  		}
