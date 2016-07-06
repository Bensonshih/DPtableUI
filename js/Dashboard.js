$(function() {
	
	dashboardManagement = new dashboardManagement();

	dashboardManagement.listTasks(0,0);

	//click create button
	$("#cDPTableTask").click(function(){
		location.href = "/privacy/web/DeIdentificationProcess.html";
	});

	//click edit button
	$("#eDPTableTask").click(function(){
		var selected_task_id = $("#dpJobListBody input[type=checkbox]:checked").val();
		dashboardManagement.editTask(selected_task_id);
	});

	//check all box
	$("#DPTableCheckAll,#AnalysisCheckAll").bind("click",function (e) {	
		var checkboxes = $("input:checkbox");
		checkboxes.prop('checked', $(this).prop("checked"));
	});

});