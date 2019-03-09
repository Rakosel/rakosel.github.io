//upd53c1 with upravl timer	https://rakosel.github.io/wsb_script_2_2_1.js  
// #84 dorabotal 'ACK' otkl autoload
// #303 vopros pro wide 	
// #416 391
// http://qaru.site/questions/66646/how-to-recognize-touch-events-using-jquery-in-safari-for-ipad-is-it-possible
		var stopAll = false, ra, rs, subwdeb = false, lines_in, i, url;
		var maOBJ,seOBJ,cnfOBJ;
  		var str_out = "", str_out1="";
  		var uart_json = {};
		var temp_json = {};
		var scrPos = 0, ovShBtn0 = false;
		var ast;
		var ua_mode=0;
		// reverse panelki dlya debug
		var sds,mds,sets;
		sds = $('.sideset');
		mds = $('.macnt');
		sets = $('.setcnt');
		cnftmp = $('.scntf');
		// rtc time auto from server


		function refr_rtc()
		{
			fetch('/get_rtc.json?n=' + Math.random(), 'GET', txjstmp, 10);
			if ((subwdeb == false) && $("#autmp").prop("checked"))
			{sub_grad();}
			//console.log("refr_rtc");
		}

		function btn_lm75_1()
		{
			i=0;
			var tarch = 0;	// conf
			var tos1 = 0;	// tos1
			var thyst1 = 0;	// thyst
			cnfOBJ = $("#scntf").serializeArray(); 
			console.log(cnfOBJ);
			tos1 = cnfOBJ[1].value;
			thyst1 = cnfOBJ[0].value;
			if(cnfOBJ[0].value>=cnfOBJ[1].value)
			{$("#"+cnfOBJ[0].name).val(tos1);$("#"+cnfOBJ[1].name).val(thyst1);
				cnfOBJ[1].value = thyst1;
				cnfOBJ[0].value = tos1;
				$('.lm75thy_1').text($("#"+cnfOBJ[0].name).val()+" C°");
			  $('.lm75tos_1').text($("#"+cnfOBJ[1].name).val()+" C°");
			}
			
			console.log(cnfOBJ[0].value+" "+ cnfOBJ[1].value);
			//$('input:checkbox:checked').each(function(){
    			//		alert($(this).val());
			//});
			
			while(($("#gLM75ch" + i).val()!=undefined) && (i < 100))
			{
				if($("#gLM75ch" + i).prop("checked"))
				{tarch|=(1 << i);}
				i++;
			}
		}

		// zapros temperature
		function sub_grad() 
  		{
			maOBJ = $("#tmpo").serializeArray(); 
				//maOBJ = $("#tmpo").serializeArray(); 
				//console.log("maOBJ");
				//console.log(maOBJ);
			//var c = '{"tm_adc":["_adc"],"bme280":[7,8,9,10,11],"temp_th":[0,1,2,3,4,5]}';
			maOBJ = $("#tmpo").serializeArray(); 
			fetch('/temp_out.json?n=' + Math.random(), 'GET', txjstmp, 10);
			
			//var c = '{"tm_adc":["_adc"],"bme280":[7,8,9,10,11],"temp_th":[0,1,2,3,4,5]}';
			//temp_json = JSON.parse(c);
			// var data = JSON.stringify( $("tmpo").serializeArray() ); <-----------			  
			//$.each(data, function(index,value)
			//{ } );
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
			
		// cont: TEMP, RTC, DEBUG + Settings
		 function txjstmp(s, d) {
  			var as1=$('.pst1');
			var as0=$('.pst0');

  			if (s != 200) {
				as0.removeClass('badge-success');
				as0.addClass('badge-danger');
				as0.text("Ошибка");
				as1.removeClass('badge-success');
				as1.addClass('badge-danger');
				as1.text("ОШИБКА");
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
					{ftvall("");console.log(s,e.message);}
  				}
  				else
  				{console.log(e.message);ftvall("");}
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
				{	$("#tm_adc").val(temp_json.temt_adc);
				}
				}	
				catch(e)
				{tmpvlof(i);console.log(e.message);}				
			}
			}
			if(temp_json["debug"])
			{
				seOBJ = $("#scntf").serializeArray();
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
					as1.text("ОШИБКА");
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
  			//clearTimeout(rs.handle);
  			//rs = to(refr, 3);
  			//refr();
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

//if(window.screen.availWidth>768 || window.screen.width>768 || window.innerWidth>768)
//| (device.desktop() && (window.screen.availWidth<768 || window.screen.width<768 || window.innerWidth<768 ))		
			if(!device.mobile() )
			{ $('.bt0st').click(); }	
		}
		
		// MENU - dublirovanmie
		$('.bt0st1').click(function bjst1()			  
		{	$('.bt0st').click();
			// otkl osnov knopku
			//$('.bt0st').attr("value", "off");
			//ast = $('.bt0st').attr( "value" );
			//rms_b();rm_b();
			// lg - ekran
			//shs_b();
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
		//function fixbar()
		{
						//var el = document.getElementsByClassName('.bt0st'); 
						ast = $('.bt0st').attr( "value" );
			
//if(window.screen.availWidth<768 || window.screen.width<768 || window.innerWidth<768)
//|| device.iphone() || (device.desktop() && (window.screen.availWidth<768 || window.screen.width<768 || window.innerWidth<768 ))
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
					//$('.mc1').removeClass('noscroll').html();
					//$('.bsn0').removeClass('overlay').html();
		}
		function sh_b()
		{
			// deviser HD
					$('.mc1').remove('col-12').html();
					$('.mc1').addClass('col-md-8 col-xl-8').html();
					$('.bsn0').addClass('col-md-4 col-xl-4').html();
					//$('.mc1').addClass('noscroll').html();
					//$('.bsn0').addClass('overlay').html();
		}
		function rms_b()
		{
					//$('.bsn0').removeClass('col-12').html();
					$('.bsn0').removeClass('col-12 overlay').html();
					$('.mc1').removeClass('noscroll collapse hide');
					//sh_b();
		}
		function shs_b()
		{
					//rm_b();
					//$('.bsn0').addClass('col-12').html();
					$('.bsn0').addClass('col-12 overlay').html();
					$('.mc1').addClass('noscroll collapse hide').html();
					//rm_b();
		}
		// DEBUG btn
		$('.swdeb').click(function swdebfn() 	
		{
						//var el = document.getElementsByClassName('.bt0st');
						if (this.checked == true)
							{$('.swdebl').text("Выключить режим настройки");this.setAttribute("disabled", "true");sdeb("ON");
							subwdeb=true;}		 		
							 	//$("#auza").setAttribute("checked", "true"); }
							else
							{$('.swdebl').text("Включить режим настройки");this.setAttribute("disabled", "false");sdeb("OFF");
							subwdeb=false;}
								//$("#auza").setAttribute("checked", "false");}

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
//if(window.screen.availWidth<768 || window.screen.width<768 || window.innerWidth<768)|| device.iphone() || (device.desktop() && (window.screen.availWidth<768 || window.screen.width<768 || window.innerWidth<768 ))
			if(device.mobile() )
			{
				if(ast!="on")
				{shs_b();sh_b();}	
				else
				{rms_b();rm_b();}
				$('.bt0st').click();
			}	
		}
  		//function toObject(arr) {
  		//	  var rv = {};
  		//	  for (var i = 0; i < arr.length; ++i)
  		//		if (arr[i] !== undefined) rv[i] = arr[i];
  		//	  return rv;
  		//	}
		// CALLBACK resizes	
		
		$(window).resize(function() {
				clresf();
		});
		
		function clresf()
		{
			ast = $('.bt0st').attr( "value" );
//if(window.screen.availWidth<768 || window.screen.width<768 || window.innerWidth<768 )
//|| (device.desktop() && (window.screen.availWidth<768 || window.screen.width<768 || window.innerWidth<768 )) || device.iphone()
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

  		window.onload = function() {
			//$(".collapse").collapse('hide');
			// Ubral onload.
			/*mds.load('https://rakosel.github.io/WSB_page_main.html', function()
			{
				 alert("loaded mds");
			}).html();
			sets.load('https://rakosel.github.io/WSB_page_slave.html', function()
			{
				   alert("loaded sets");
			}).html();*/
			//alert("ok");
			//maOBJ = $('form').serializeArray(); 
			//maOBJ = $("#tmpo").serializeArray(); 
			//seOBJ = $("#scntf").serializeArray();
			//alert("1");
			$('.bt0st').attr("value", "off");
			$('.navia').addClass('list-group-item list-group-item-action bg-light border');
  		  	$("#esp_tx").val('wsbuser.prints(node.heap());');
  			$("#esp_urx").val('');
			rs = setInterval(refr_rtc, 2000);
			i=0;
			//$(".bsn0").collapse('show');
			smgh();
  		}


		//sets.ready(function Slave() 
		//{
		/*
		$("#lm75sc_1").mousemove( function thy1(){
				$('.lm75thy_1').text($("#lm75sc_1").val()+" C°");
		});
		$("#lm75sc_2").mousemove(function thy2(){
				$('.lm75thy_2').text($("#lm75sc_2").val()+" C°");
		});
		$("#lm75so_1").mousemove( function tos1(){
				$('.lm75tos_1').text($("#lm75so_1").val()+" C°");
		});
		$("#lm75so_2").mousemove( function tos2(){
				$('.lm75tos_2').text($("#lm75so_2").val()+" C°");
		});
		
		$("#lm75sc_1").on("touchmove mousemove", function thy1(){
				$('.lm75thy_1').text($("#lm75sc_1").val()+" C°");
		});
		$("#lm75sc_2").on("touchmove mousemove", function thy2(){
				$('.lm75thy_2').text($("#lm75sc_2").val()+" C°");
		});
		$("#lm75so_1").on("touchmove mousemove", function tos1(){
				$('.lm75tos_1').text($("#lm75so_1").val()+" C°");
		});
		$("#lm75so_2").on("touchmove mousemove", function tos2(){
				$('.lm75tos_2').text($("#lm75so_2").val()+" C°");
		});	
		*/	

		/*$("#lm75sc_1").mousemove( function(){
				console.log(device.desktop());
				$('.lm75thy_1').text($("#lm75sc_1").val()+" C°");
		});
		$("#lm75sc_2").mousemove(function thy2(){
				$('.lm75thy_2').text($("#lm75sc_2").val()+" C°");
		});
		$("#lm75so_1").mousemove( function tos1(){
				$('.lm75tos_1').text($("#lm75so_1").val()+" C°");
		});
		$("#lm75so_2").mousemove( function tos2(){
				$('.lm75tos_2').text($("#lm75so_2").val()+" C°");
		});*/
