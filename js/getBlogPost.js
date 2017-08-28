var API_URL = "https://jsonplaceholder.typicode.com/posts";
var API_COMMENTS = "https://jsonplaceholder.typicode.com/comments";
var API_POST_COMMENT = "https://jsonplaceholder.typicode.com/comments?postId=";
$(document).ready(function(){
	$.getJSON(API_URL,function(data){
		var result = {target:data};
		console.log(result);
		var finalResult = _.template($("#blogDisplay").text());
		$("#blogPostDisplay").html(finalResult(result));				
	});
});

function readMoreButton(id){
	console.log("Id = "+id);
	$("#blogPostDisplay").html('<img id="theImg" src="images/blogBanner.jpg" width="1170px" height="200px" />');
	$.getJSON(API_URL,function(data){
		$("#blogPostDisplay").append("<h2 id='theHeading'>" +data[id-1].title+ "</h2>");
		$("#blogPostDisplay").append("<p id='theParagraph'>" +data[id-1].body+ "</p>");
		$("#blogPostDisplay").append("<hr/>");
		$("#blogPostDisplay").append("<h3> Comments </h3>");	
		$.getJSON(API_COMMENTS,function(commentData){
			console.log("got id --> "+id);
			var postCommentUrl = API_POST_COMMENT + id ;
			console.log("Got post comment url -->"+postCommentUrl);
			$.getJSON(postCommentUrl,function(postComment){
				$.each(postComment,function(key,value){
					$("#blogPostDisplay").append('<img id="theImg" src="images/userIcon.png" width="56px" height="56px" />');
					$("#blogPostDisplay").append("<h5 id='commentName'>" +postComment[key].name+ "</h5>");
					$("#blogPostDisplay").append("<p id='commentMessage'>" +postComment[key].body+ "</p>");
					$("#blogPostDisplay").append("<hr/>");
					console.log(postComment[key].name);
					console.log(postComment[key].email);
					console.log(postComment[key].body);
				});				
			});		
		});
	});
}

// about callback function
function callAboutUs(){
	//alert("about us clicked !");
	var aboutTemp = _.template($("#blogAboutUs").text());
	$("#blogPostDisplay").html(aboutTemp);
}