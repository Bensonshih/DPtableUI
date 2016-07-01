$(function() {
	
	dataSettingManagement = new dataSettingManagement();

	function _checkShowTable() {
		console.log("check list table");
		console.log("content keep: "+UTILITIES.contentKeep);
		if (UTILITIES.contentKeep == true) {
		var sensitiveData = $.cookie('Sensitive');
		dataSettingManagement.listSensitiveTableAndColumnSetting(sensitiveData);
		}
	}
	
	_checkShowTable();

	//click confirm button
	$("#fileconfirm").click(function(){
		$("#filenameinput").prop('disabled',true);
		var fileName = $("#filenameinput").val();
		dataSettingManagement.showSensitiveTable(fileName);
	});

	$("#filecancel").click(function(){		
		$("#filenameinput").prop('disabled',false);
	});

	$("#fileclear").click(function(){
		if($("#filenameinput").prop('disabled') == false){
			$("#filenameinput").val("");
			//clear table content
			$("#sensitiveHead").html('');
			$("#sensitiveBody").html('');
			//clear columns setting content
			$("#columnSettingBody").html('');

			//clear cookie and change flag
			$.removeCookie('Sensitive', null);
			UTILITIES.contentKeep = false;
		}
	});

	//check all box
	$("#dataSelectedCheckAll").bind("click",function (e) {	
		var checkboxes = $("input:checkbox");
		checkboxes.prop('checked', $(this).prop("checked"));
	});

});
