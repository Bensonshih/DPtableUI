$(function() {

	var listJobs = function () {

		$.ajax({
			type: "Post",
			url: url,
			headers:{
				"Content-Type":"application/json"
			},
			dataType: "json",
			processData: false,
			data: JSON.stringify(requestBody),
			success: function(data) {

			},
			error: function() {
				
			}
		});
	}
});