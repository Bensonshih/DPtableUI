$(function() {

	var loadingOption ={
		ajax: false,
		imgPath    : 'images/ajax-loading.gif',
		tip: '請稍後...'
	}
	var loading = $.loading(loadingOption);
	dataSettingManagement = new dataSettingManagement();

	function _checkShowTable() {
		// console.log("content keep: "+UTILITIES.contentKeep);
		if ($.cookie('Sensitive') != undefined || $.cookie('Sensitive') != null) {	
			var sensitiveData = JSON.parse($.cookie('Sensitive'));
			var fileName = sensitiveData.fileName;
			$("#filenameinput").val(fileName);
			$("#filenameinput").prop('disabled',true);
			dataSettingManagement.listSensitiveTableAndColumnSetting(sensitiveData);
			if($.cookie('Column') != undefined)
				$("#columnSettingBody").find("input,select,section").prop('disabled',true);
		}
	}
	
	_checkShowTable();

	//click confirm button
	$("#fileconfirm").click(function(){
		$("#filenameinput").prop('disabled',true);
		var fileName = $("#filenameinput").val();
		loading.open();
		dataSettingManagement.showSensitiveTable(fileName);
		loading.close();
	});

	$("#filecancel").click(function(){		
		$("#filenameinput").prop('disabled',false);
		$.removeCookie('Column', null);
	});

	$("#fileclear").click(function(){
		if($("#filenameinput").prop('disabled') == false){
			$("#filenameinput").val("");
			//clear table content
			$("#sensitiveHead").html('');
			$("#sensitiveBody").html('');
			//clear columns setting content
			$("#columnSettingBody").html('');

			//clear cookie
			$.removeCookie('Sensitive', null);
			$.removeCookie('Column', null);
		}
	});

	//check all box
	$("#dataSelectedCheckAll").bind("click",function (e) {	
		var checkboxes = $("input:checkbox");
		checkboxes.prop('checked', $(this).prop("checked"));
	});

	//click column setting confirm button
	$("#columnconfirm").click(function(){
		var jsonArray = [];
		$("#columnSettingBody").find("input,select,section").prop('disabled',true);
		$('#columnSettingBody tr').each(function() {
			var jsonObject = {};
		    var checkbox  = $(this).find("input:checkbox").prop('checked');
		    var select = $(this).find("select").val();
		    var columnName = $(this)
		    jsonObject.checkbox = checkbox;
		    jsonObject.select = select; 
		    jsonArray.push(jsonObject); 
		 });
		//save cookie
		$.cookie("Column",JSON.stringify(jsonArray));
	});

	//click column setting cancel button
	$("#columncancel").click(function(){
		$("#columnSettingBody").find("input,select,section").prop('disabled',false);
	});

	//click column setting reset button
	$("#columnreset").click(function(){
		if($("#columnSettingBody").find("input,select,section").prop('disabled') == false){
			$.removeCookie('Column', null);
			_checkShowTable();
		}
	});

	$(window).on('keydown',function(e){
		var keycode = e.keyCode;
		//console.log("keycode: " + keycode);
		if(keycode == 13){
			//press enter
			$("#fileconfirm").click();
		}else if(keycode == 116){
			//press F5
			$("#filenameinput").prop('disabled',false);
			$("#fileclear").click();
		}
	});


});
