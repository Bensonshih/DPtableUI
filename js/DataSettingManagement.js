function dataSettingManagement(){

	var endpoint = UTILITIES.endpoint;

	this.listSensitiveTableAndColumnSetting = function(data){
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

		//list column setting info
		$("#columnSettingBody").html('');
		for (var i = 0; i < columns.length; i++) {
			var columnName = columns[i];
			var columnInfo = "";

			columnInfo += "<tr>";
			columnInfo += "<td><label class=\"checkbox-inline\"><input type=\"checkbox\" value=\"\"></label></td>";
			columnInfo += "<td>" + columnName + "</td>";
			columnInfo += "<td><div class=\"dropdown\">";
			columnInfo += "<select class=\"form-control\">";
			columnInfo += "<option>連續型</option>";
			columnInfo += "<option>類別型</option>";
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

	this.showSensitiveTable = function(fileName){
		var url = endpoint + "api/data/";
		var requestBody = new Object();
		var filePath = "static/test/" + fileName + ".csv";
		requestBody.file_path = filePath;

		$.ajax({
			type: "Post",
			url: url,
			headers:{
				"Content-Type":"application/json"
			},
			dataType: "json",
			async: false,
			processData: false,
			data: JSON.stringify(requestBody),
			success: function(data) {
				var jsonData = JSON.parse(data);
				dataSettingManagement.listSensitiveTableAndColumnSetting(jsonData);
				//save cookie and set flag
				$.cookie('Sensitive',jsonData);
				UTILITIES.contentKeep = true;
				console.log("content keep in ajax: "+UTILITIES.contentKeep);
			},
			error: function() {
				console.log("file is not correct.");
				//clear table content
				$("#sensitiveHead").html('');
				$("#sensitiveBody").html('');
				$("#columnSettingBody").html('');
			}
		});
	}

	
}
