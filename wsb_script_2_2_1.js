  		var stopAll = false, ra, rs, submitted = false, lines_in, i, url;
		var maOBJ,seOBJ;
  		var str_out = "", str_out1="";
  		var uart_json = {};
		var temp_json = {};
		var scrPos = 0, ovShBtn0 = false;
		var ast;
		// reverse panelki dlya debug
		var sds,mds;
		sds = $('.sideset');
		mds = $('.macnt');
		
		// rtc time auto from server
		function refr_rtc()
		{
			fetch('/get_rtc.json?n=' + Math.random(), 'GET', txjstmp, 30);
			//console.log("refr_rtc");
		}
		
		// zapros temperature
		function sub_grad() 
  		{
			console.log(maOBJ);
			//var c = '{"tm_adc":["_adc"],"bme280":[7,8,9,10,11],"temp_th":[0,1,2,3,4,5]}';
			fetch('/temp_out.json?n=' + Math.random(), 'GET', txjstmp, 30);
			
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
  			for (i = 0; i < lines_in.length; i++)
  			{
  				uart_json.uart_in = lines_in[i];
  				fetch('/uart.json?n=' + encodeURIComponent(JSON.stringify(uart_json))+'&', 'GET', txjs_ua, 30);
  			}
			
  		}
			
		// cont: TEMP, RTC, DEBUG + Settings
		 function txjstmp(s, d) {
  			var as1=$('.pst1');
			var as0=$('.pst0');
			var sct0=$('.setcnt');
			 //ENbt = 1;
			// alert("dw45")
			 
			 
  			if (s != 200) {
				as0.removeClass('badge-success');
				as0.addClass('badge-danger');
				as0.text("Ошибка");
				as1.removeClass('badge-success');
				as1.addClass('badge-danger');
				as1.text("ОШИБКА");
				$('.swdeb').removeAttr('disabled'); 
				console.log("Connection proplem!");
				return 0;					  
  				//clearTimeout(rs.handle);
  
  			} else {
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
				$("#"+maOBJ[i].name).removeClass('is-valid').html();
				$("#"+maOBJ[i].name).removeClass('is-invalid').html();
				if((temp_json.temp[i-3] == "#ERR") || (temp_json.temp[i-3] == ''))
					{
						$("#"+maOBJ[i].name).addClass('is-invalid').html();
					}
					else
						{$("#"+maOBJ[i].name).addClass('is-valid').html()}
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
				{console.log(e.message);}				
			}
			}
			if(temp_json["debug"])
			{
				console.log(temp_json.debug);
				if(temp_json.debug == "ON")
				{
			//var	as=$('.pst1');
			//var as0=$('.pst0');
					sdmc_sh();
					sct0.addClass('collapse show');
					as1.removeClass('badge-warning');
					as1.addClass('badge-success');
					as1.text("ВКЛ");
				}
				else if(temp_json.debug == "OFF")
				{
					sdmc_rm();
					sct0.removeClass('collapse show');
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
		
		function sdmc_sh()
		{
			sds.removeClass('collapse hide');
			sds.addClass('collapse show');
			mds.removeClass('collapse show');
			mds.addClass('collapse hide');
		}
		
		function sdmc_rm()
		{	
			mds.removeClass('collapse hide');
			mds.addClass('collapse show');
			sds.removeClass('collapse show');
			sds.addClass('collapse hide');
		}
		
		function ftvall(cl)
		{
			for(i=0;i<maOBJ.length;i++)
			{$("#"+maOBJ[i].name).val(cl);}
		}

  		function spt0()
  		{
      		var lines = $('#esp_tx').val().replace(/^[\n]+$/g,'').split(/[\n]+/);
      		return lines;
  		}
  
  		//function to(cb, x) {
  		//	return setTimeout(cb, 1000 * x);
  		//}
  		function refr() {
  			//if (!stopAll)
  				fetch('/temp_out.json?n=' + Math.random(), 'GET', txjstmp, 10);
  		}
  		function txjs_ua(s, d) {
  			//console.log("function TransmitJS(s, d)");
  			//console.log(s,d);
  			//rs = to(refr, 8);
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
					{return 0;}
  					
  				}
  				else
  				{uart_json.uart_out="null";uart_json.uart_in="null";}
  				str_out1 += uart_json.uart_out + '\n';
				console.log(uart_json.uart_out);
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

		function smgh()
		{
			//clresf();
			if(window.screen.availWidth>768 || window.screen.width>768 || window.innerWidth>768)
			{
					$('.bt0st').click();
					
			}	
			
		}
		
		// MENU - dublirovanmie
		$('.bt0st1').click(function bjst1()			  
		{	$('.bt0st').click();});
		/*
		function fixbar()
		{
			var b;

			//alert(b);
			
			if(window.screen.availWidth<=768 || window.screen.width<=768 || window.innerWidth<=768)
			{		
			if($('.mc1').hasClass('noscroll') && a=='on')
			{
				$('.mc1').removeClass('noscroll').html();
				$('.bsn0').removeClass('overlay').html();					
			}
			else if(!$('.mc1').hasClass('noscroll') && a!='on')
			{
				$('.mc1').addClass('noscroll').html();
				$('.bsn0').addClass('overlay').html();
			}
			}
			//$("#main1").SetAttribute();
		}*/
		
		$('.bt0st').click(function bjst() 	
		//function fixbar()
		{
						//var el = document.getElementsByClassName('.bt0st'); 
						ast = $('.bt0st').attr( "value" );
					
						//el.addAttr('value', 'on');
						if(ast!="on")
						{$('.bt0st').attr("value", "on");}
						else
						{$('.bt0st').attr("value", "off");}
						
			   			//$.each(arr, function() {
        					//$(this).setAttribute('value', 'on');
							//$(this).setAttribute('value', 'on');
							//a=$(this).getAttribute('value');
							//$(this).setAttribute('value', 'on');
							//a=$(this).getAttribute('value');
							
    					//});
			
							//if(window.screen.availWidth<=768 || window.screen.width<=768 || window.innerWidth<=768)
							//{		
							if( ast!="on")
							{
								sh_b();
							}
							else
							{
								rm_b();
							}
							if(window.screen.availWidth<768 || window.screen.width<768 || window.innerWidth<768)
							{	
								
							if( ast!="on")
							{
								shs_b();
								
							}
							else
							{
								rms_b();
							}
							}
							
								//alert(a);
								//alert(('.mc1').hasClass('noscroll'));
							//}
						
						});
		// DEBUG btn
		$('.swdeb').click(function swdebfn() 	
		{
						//var el = document.getElementsByClassName('.bt0st');
						if (this.checked == true)
							{$('.swdebl').text("Выключить режим настройки");this.setAttribute("disabled", "true");sdeb("ON");}
							else
							{$('.swdebl').text("Включить режим настройки");this.setAttribute("disabled", "false");sdeb("OFF");}

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
			if(window.screen.availWidth<768 || window.screen.width<768 || window.innerWidth<768)
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
   			if(window.screen.availWidth<768 || window.screen.width<768 || window.innerWidth<768 )
				{
					if(ast!="on")
					{shs_b();sh_b();}	
					else
					{rms_b();rm_b();}
				}
				else
				{
					if(ast!="on")
					{rms_b();sh_b();}
				}						
   			/*if(window.screen.availWidth<=768 || window.screen.width<=768 || window.innerWidth<=768 )
				{
						{$(".collapse").collapse('hide');
								$('.btn_sensor_toogle').attr("value", "off");
								ast="on";
								rm_b();
						}
						else
						{$(".collapse").collapse('show');
								ast="off";
								$('.btn_sensor_toogle').attr("value", "on");
						}
				}
			else
				{
					rm_b();
					//console.log(window.innerWidth);	
				}*/
		}
		
		function rm_b()
		{

					$('.mc1').removeClass('col-md-8 col-xl-8').html();
					$('.bsn0').removeClass('col-md-4 col-xl-4').html();
					//$('.mc1').removeClass('noscroll').html();
					//$('.bsn0').removeClass('overlay').html();
		}
		function sh_b()
		{
					$('.mc1').addClass('col-md-8 col-xl-8').html();
					$('.bsn0').addClass('col-md-4 col-xl-4').html();
					//$('.mc1').addClass('noscroll').html();
					//$('.bsn0').addClass('overlay').html();
		}
		function rms_b()
		{
					//$('.bsn0').removeClass('col-12').html();
					$('.bsn0').removeClass('col-12').html();
					$('.mc1').removeClass('noscroll').html();
					$('.bsn0').removeClass('overlay').html();
					sh_b();
		}
		function shs_b()
		{
					//rm_b();
					//$('.bsn0').addClass('col-12').html();
					$('.mc1').addClass('noscroll').html();
					$('.bsn0').addClass('overlay').html();
					rm_b();
					$('.bsn0').addClass('col-12').html();
		}

		/*
		addEvent(window, "resize", function(event) {
			if(window.screen.availWidth>=576 || window.screen.width>=576 || window.innerWidth>=576)
				{				
					$('.mc1').removeClass('noscroll').html();
					$('.bsn0').removeClass('overlay').html();	
				}
		});*/

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
  			xhr.timeout = time_out * 100;
  			xhr.send();
  		}
		/*
		$('.tst0').click(function tst11() 	
		{
			console.log(maOBJ);
			$("#lm75_t1_chk").prop('indeterminate', true)
		});*/
		

  		window.onload = function() {
			//$(".collapse").collapse('hide');
			maOBJ = $("#tmpo").serializeArray(); 
			seOBJ = $("#scntf").serializeArray(); 
			$('.bt0st').attr("value", "off");
  		  	$("#esp_tx").val('wsbuser.prints(node.heap());');
  			$("#esp_urx").val('');
			rs = setInterval(refr_rtc, 2000);
			i=0;
			//$(".bsn0").collapse('show');
			smgh();
			//clresf();
			/*function smgh()
			{
			$('#lm75_t1').val(window.innerWidth);
			if(window.screen.availWidth<=768 || window.screen.width<=768 || window.innerWidth<=768)
			{$(".collapse").collapse('hide');}
			else
			{$(".collapse").collapse('show');}
			}*/
  		}
 
