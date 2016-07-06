$(function() {

	var dataPath = UTILITIES.data_path;
	var initDI_response = {};
	var loadingOption ={
		ajax: false,
		imgPath    : 'images/ajax-loading.gif',
		tip: '請稍後...'
	}
	var loading = $.loading(loadingOption);
	deIdentificationProcessManagement = new deIdentificationProcessManagement();

	//click confirm button
	$("#fileconfirm").click(function(){
		$("#filenameinput").prop('disabled',true);
		var fileName = $("#filenameinput").val();
		var data = {};
		data.fileName = fileName;
		//for list default column setting
		data.default = true;
		loading.open();
		deIdentificationProcessManagement.showSensitiveTableAndColumnSetting(data);
		loading.close();
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

			//clear the local storage
			localStorage.removeItem("columns");
			localStorage.removeItem("columnSetting");
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
		// $('#columnSettingBody tr').each(function() {
		// 	var jsonObject = {};
		//     var checkbox  = $(this).find("input:checkbox").prop('checked');
		//     var select = $(this).find("select").val();
		//     var columnName = $(this)
		//     jsonObject.checkbox = checkbox;
		//     jsonObject.select = select; 
		//     jsonArray.push(jsonObject); 
		//  });

		//begin to initiate the DI task
		init_response = _initDI();
		
	});

	//click column setting cancel button
	$("#columncancel").click(function(){
		$("#columnSettingBody").find("input,select,section").prop('disabled',false);
	});

	//click column setting reset button
	$("#columnreset").click(function(){
		if($("#columnSettingBody").find("input,select,section").prop('disabled') == false){
			var columns = [];
			columns = JSON.parse(window.localStorage.getItem("columns"));
			var data = {};
			data.col_names = columns;
			//for list default column setting
			data.default = true;
			deIdentificationProcessManagement.listColumnsetting(data);
		}
	});

	//execute the De-Identification task
	$("#execDI").click(function(){	
		_execDI(init_response);
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

	var _initDI = function(){
		var initDI_requestBody = {};
		var filename = "";
		var selected_attrs = {};
		var selected_names = [];
		var selected_types = [];
		var response;

		if($("#filenameinput").prop('disabled') && $("#filenameinput").val() != undefined && localStorage.getItem("columns") != undefined){
			filename = $("#filenameinput").val();
		}
		initDI_requestBody.data_path = dataPath + filename + ".csv";
		initDI_requestBody.task_name = "task_of_" + filename + ".csv";

		//check column setting panel
		$("#columnSettingBody input[type=checkbox]:checked").each(function(){
			var jsonObject = {};
			var selected_name = $(this).val();
			var selected_type = $(this).parent().parent().parent().find("select").val();
			selected_names.push(selected_name);
			selected_types.push(selected_type);
		});

		selected_attrs.names = selected_names;
		selected_attrs.types = selected_types;
		initDI_requestBody.selected_attrs = selected_attrs;
		//store the columns setting info
		window.localStorage.setItem("columnSetting",JSON.stringify(initDI_requestBody));
		response = deIdentificationProcessManagement.initDeIdentificationTask(initDI_requestBody);

		return response;
	}

	var _execDI = function(init_response){
		var execDI_requestBody = {};	
		var task_id = -1;
		var privacy_level = -1;
		var epsilon = -1.0;

		
		//the DI task is waitting
		if(init_response.status == 0){
			task_id = init_response.task_id;
			execDI_requestBody.task_id = task_id;
			privacy_level = $("#PL-options").val();

			//privacy level translation
			switch(privacy_level){
				case "1":
				epsilon = 0.01;
				break;
				case "2":
				epsilon = 0.1;
				break;
				case "3":
				epsilon = 1.0;
				break;
				case "4":
				epsilon = 10.0;
				break;
				case "5":
				epsilon = 100.0;
				break;
			}

			console.log("taskID: "+task_id+" privacy_level: " + privacy_level + " epsilon: "+ epsilon);
			execDI_requestBody.privacy_level = privacy_level;
			execDI_requestBody.epsilon = epsilon;

			//execute the DI task
			deIdentificationProcessManagement.execDeIdentificationTask(execDI_requestBody);
		}
	}

});
