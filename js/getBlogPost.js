var API_URL = "https://jsonplaceholder.typicode.com/posts";
var THUMBNAIL_IMAGE = "http://placehold.it/150/92c952";
$(document).ready(function(){
	$("#blogThumbnail").append("src",THUMBNAIL_IMAGE);
	$.getJSON(API_URL,function(data){
		var result = {target:data};
		console.log(result);
		var finalResult = _.template($("#blogDisplay").text());
		$("#blogPostDisplay").html(finalResult(result));				
	});
});

