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
		var columnCookie;
		if($.cookie("Column") != undefined){
			columnCookie = JSON.parse($.cookie("Column"));
		}
		 
		for (var i = 0; i < columns.length; i++) {
			var columnName = columns[i];
			var columnInfo = "";	

			columnInfo += "<tr>";
			if (columnCookie != undefined) {
				var checked = columnCookie[i].checkbox;
				if (checked) {
					columnInfo += "<td><label class=\"checkbox-inline\"><input type=\"checkbox\" value=\"\" checked ></label></td>";
				}else{
					columnInfo += "<td><label class=\"checkbox-inline\"><input type=\"checkbox\" value=\"\"></label></td>";
				}
			}else{
				columnInfo += "<td><label class=\"checkbox-inline\"><input type=\"checkbox\" value=\"\"></label></td>";
			}
			columnInfo += "<td>" + columnName + "</td>";
			columnInfo += "<td><div class=\"dropdown\">";
			columnInfo += "<select class=\"form-control\">";
			if (columnCookie != undefined) {
				var selected = columnCookie[i].select;
				if (selected == "C") {
					columnInfo += "<option value=\"C\" selected>連續型</option>";
					columnInfo += "<option value=\"D\">類別型</option>";
				}else{
					columnInfo += "<option value=\"C\">連續型</option>";
					columnInfo += "<option value=\"D\" selected>類別型</option>";
				}
			}else{
				columnInfo += "<option value=\"C\">連續型</option>";
				columnInfo += "<option value=\"D\">類別型</option>";
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
				//save cookie
				jsonData.fileName = fileName;
				$.cookie('Sensitive',JSON.stringify(jsonData));
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

	
}
