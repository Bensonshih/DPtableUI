$(function() {
	
	dashboardManagement = new dashboardManagement();

	dashboardManagement.listTasks(0,0);

	//click create button
	$("#cDPTableTask").click(function(){
		location.href = "/privacy/web/DeIdentificationProcess.html";
	});

	//check all box
	$("#DPTableCheckAll,#AnalysisCheckAll").bind("click",function (e) {	
		var checkboxes = $("input:checkbox");
		checkboxes.prop('checked', $(this).prop("checked"));
	});

});