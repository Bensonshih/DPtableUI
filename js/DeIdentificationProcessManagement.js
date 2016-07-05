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

	this.listColumnsetting = function(columns){
		//columns = data.col_names;

		//list column setting info
		$("#columnSettingBody").html('');	 
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
		};
	}

	this.showSensitiveTableAndColumnSetting = function(fileName){
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
				deIdentificationProcessManagement.listColumnsetting(jsonData.col_names);
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
		//console.log(requestBody);
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
			success: function(data) {
				console.log("execute DI task success.");
			},
			complete: function(data){
				response = data;
				console.log(response);
			},
			error: function() {
				console.log("execute DI task fail.");
			
			}
		});
		console.log(response);
		return response;
	}

}
