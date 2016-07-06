function deIdentificationProcessManagement(){

	var endpoint = UTILITIES.endpoint;
	var dataPath = UTILITIES.data_path;

	this.listSensitiveTable = function(data){
		columns = data.col_names;	
		//build table head
		$("#sensitiveHead").html('');
		for (var k = 0; k < columns.length; k++) {
			var tableHead = "";
			tableHead += "<th class=\"text-center\">" + columns[k] + "</th>";
			$("#sensitiveHead").append(tableHead);
		};
		
		var rows = [];
		rows = data.rows;
		//build table body
		$("#sensitiveBody").html('');
		for (var i = 0; i < rows.length; i++) {
			var rowInfo = "";
			rowInfo += "<tr>";
			for (var j = 0; j < rows[i].length; j++) {
				rowInfo += "<td>" + rows[i][j] + "</td>";
			};
			rowInfo += "</tr>";
			$("#sensitiveBody").append(rowInfo);
		};	
	}

	this.listColumnsetting = function(data){
		var columns = data.col_names;
		var showDefaultColumnSetting = data.default;
		var selected_attrs = {};
		var selected_names = [];
		var selected_types = [];

		//list column setting info
		$("#columnSettingBody").html('');
		if(!showDefaultColumnSetting){
			selected_attrs = data.selected_attrs;
			selected_names = selected_attrs.names;
			selected_types = selected_attrs.types;

			for (var i = 0; i < columns.length; i++) {
				var columnName = columns[i];
				var columnInfo = "";
				var index = selected_names.indexOf(columnName);	

				columnInfo += "<tr>";
				if (index >=0) {
				 	//it is a selected attribute
					columnInfo += "<td><label class=\"checkbox-inline\"><input type=\"checkbox\" value=\"" + columnName +"\" checked></label></td>";
					columnInfo += "<td>" + columnName + "</td>";
					columnInfo += "<td><div class=\"dropdown\">";
					columnInfo += "<select class=\"form-control\">";
					if(selected_types[index] == "C"){
						columnInfo += "<option value=\"C\" selected>連續型</option>";
						columnInfo += "<option value=\"D\">類別型</option>";
					}else{
						columnInfo += "<option value=\"C\">連續型</option>";
						columnInfo += "<option value=\"D\" selected>類別型</option>";
					}
					
					columnInfo += "</select></div></td>";
					columnInfo += "<td>";
					columnInfo += "<section style=\"border-style:inset;\">";
					columnInfo += "<span class=\"attr_each\">" + columns[1];											
					columnInfo += "<span class=\"glyphicon glyphicon-remove-sign\" style=\"cursor: pointer;\" title=\"移除屬性\">";													
					columnInfo += "</span>";												
					columnInfo += "</span>";											
					columnInfo += "<span class=\"attr_each\">" + columns[2];											
					columnInfo += "<span class=\"glyphicon glyphicon-remove-sign\" style=\"cursor: pointer;\">";										
					columnInfo += "</span>";											
					columnInfo += "</span></section></td></tr>";
				}else{
				 	//it is not a selected attribute
					columnInfo += "<td><label class=\"checkbox-inline\"><input type=\"checkbox\" value=\"" + columnName +"\"></label></td>";
					columnInfo += "<td>" + columnName + "</td>";
					columnInfo += "<td><div class=\"dropdown\">";
					columnInfo += "<select class=\"form-control\">";
					columnInfo += "<option value=\"C\">連續型</option>";
					columnInfo += "<option value=\"D\">類別型</option>";
					columnInfo += "</select></div></td>";
					columnInfo += "<td>";
					columnInfo += "<section style=\"border-style:inset;\">";
					columnInfo += "<span class=\"attr_each\">" + columns[1];											
					columnInfo += "<span class=\"glyphicon glyphicon-remove-sign\" style=\"cursor: pointer;\" title=\"移除屬性\">";													
					columnInfo += "</span>";												
					columnInfo += "</span>";											
					columnInfo += "<span class=\"attr_each\">" + columns[2];											
					columnInfo += "<span class=\"glyphicon glyphicon-remove-sign\" style=\"cursor: pointer;\">";										
					columnInfo += "</span>";											
					columnInfo += "</span></section></td></tr>";
				}
				$("#columnSettingBody").append(columnInfo);
			}
		
		}else{
			for (var i = 0; i < columns.length; i++) {
			var columnName = columns[i];
			var columnInfo = "";	

			columnInfo += "<tr>";
			columnInfo += "<td><label class=\"checkbox-inline\"><input type=\"checkbox\" value=\"" + columnName +"\"></label></td>";
			columnInfo += "<td>" + columnName + "</td>";
			columnInfo += "<td><div class=\"dropdown\">";
			columnInfo += "<select class=\"form-control\">";
			columnInfo += "<option value=\"C\">連續型</option>";
			columnInfo += "<option value=\"D\">類別型</option>";
			columnInfo += "</select></div></td>";
			columnInfo += "<td>";
			columnInfo += "<section style=\"border-style:inset;\">";
			columnInfo += "<span class=\"attr_each\">" + columns[1];											
			columnInfo += "<span class=\"glyphicon glyphicon-remove-sign\" style=\"cursor: pointer;\" title=\"移除屬性\">";													
			columnInfo += "</span>";												
			columnInfo += "</span>";											
			columnInfo += "<span class=\"attr_each\">" + columns[2];											
			columnInfo += "<span class=\"glyphicon glyphicon-remove-sign\" style=\"cursor: pointer;\">";										
			columnInfo += "</span>";											
			columnInfo += "</span></section></td></tr>";																				
											   
			$("#columnSettingBody").append(columnInfo);
			}
		}
	
	}

	this.showSensitiveTableAndColumnSetting = function(inputData){
		var fileName = inputData.fileName;
		var url = endpoint + "api/data/";
		var requestBody = new Object();
		var filePath = dataPath + fileName + ".csv";
		requestBody.file_path = filePath;

		$.ajax({
			type: "Post",
			url: url,
			headers:{
				"Content-Type":"application/json;charset=utf-8"
			},
			dataType: "json",
			async: false,
			processData: false,
			data: JSON.stringify(requestBody),
			success: function(data) {
				var jsonData = JSON.parse(data);
				deIdentificationProcessManagement.listSensitiveTable(jsonData);
				inputData.col_names = jsonData.col_names;
				deIdentificationProcessManagement.listColumnsetting(inputData);
				//save columns name
				window.localStorage.setItem("columns",JSON.stringify(jsonData.col_names));
			},
			error: function() {
				console.log("file is not correct.");
				//$("#information").
				//clear table content
				$("#sensitiveHead").html('');
				$("#sensitiveBody").html('');
				$("#columnSettingBody").html('');
			}
		});
	}

	this.initDeIdentificationTask = function(requestBody) {
		var url = endpoint + "api/de-identification/";
		var response = null;
		console.log(requestBody);
		$.ajax({
			type: "Post",
			url: url,
			headers:{
				"Content-Type":"application/json;charset=utf-8"
			},
			dataType: "json",
			async: false,
			processData: false,
			data: JSON.stringify(requestBody),
			success: function(data) {
				response = data;
			},
			error: function() {
				console.log("initiate DI task fail.");
			
			}
		});

		return response;
	}

	this.execDeIdentificationTask = function(requestBody) {
		var taskID = requestBody.task_id;
		var url = endpoint + "api/de-identification/" + taskID + "/job/";
		var response = null;
		$.ajax({
			type: "Post",
			url: url,
			headers:{
				"Content-Type":"application/json"
			},
			dataType: "json",
			async: true,
			processData: false,
			data: JSON.stringify(requestBody),
			success: function(data,textStatus) {
				console.log("execute DI task success.");
				// console.log(data);
				// console.log(textStatus);
			},
			complete: function(xhr,textStatus,error){
				console.log(xhr);
				console.log(textStatus);
				console.log(error);
				if(textStatus == "success"){
					var responseJSON = xhr.responseJSON;
					var download_path = responseJSON.synthetic_path;
					var statistics_err = responseJSON.statistics_err;
					var columnSetting = JSON.parse(window.localStorage.getItem("columnSetting"));
					var selectedColumns = columnSetting.selected_attrs;

					deIdentificationProcessManagement.listStatisticsErrorRate(statistics_err,selectedColumns);
					//display corresponding epsilon
					$("#showEpsilon").html(responseJSON.epsilon.toString());

					//enable the download button	
					$("#download").prop('disabled',false);
					//disable the stop button	
					$("#stopDI").prop('disabled',true);
					//enable the start button	
					$("#execDI").prop('disabled',false);

					//click the button of download synthetic data 
					$("#download").click(function(e){	
						e.preventDefault();  //stop the browser from following
    					window.location.href = download_path;
					});


				}else if(textStatus == "error"){
					//disable the stop button	
					$("#stopDI").prop('disabled',true);
					//enable the start button	
					$("#execDI").prop('disabled',false);
				}
			},
			error: function() {
				console.log("execute DI task fail.");
			
			}
		});
	}

	this.listStatisticsErrorRate = function(statistics_err,selectedColumns){
		var selectedLength = selectedColumns.names.length;

		//build table head
		$("#statisticsHead").html('');
		for (var k = 0; k < selectedLength; k++) {
			var tableHead = "";
			if (k==0) {
				tableHead = "<th></th>";
			}
			tableHead += "<th class=\"text-center\">" + selectedColumns.names[k] + "</th>";
			$("#statisticsHead").append(tableHead);
		};
		//build table body
		$("#statisticsBody").html('');
		for (var i = 0; i < statistics_err.length; i++) {
			var statistics_key = statistics_err[i].stat_name;
			var statistics_value = statistics_err[i].value;
			
			var rowInfo = "";
			rowInfo += "<tr>";
			rowInfo += "<td>" + statistics_key + "</td>";
			for (var j = 0; j < selectedLength; j++) {
				var name = selectedColumns.names[j];
				console.log("error rate: " + statistics_value.name);
				rowInfo += "<td>" + statistics_value.name + "</td>";
			};
			rowInfo += "</tr>";
			$("#statisticsBody").append(rowInfo);
		};
	}

}
