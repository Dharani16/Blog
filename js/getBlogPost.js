var API_URL = "https://jsonplaceholder.typicode.com/posts";
var API_COMMENTS = "https://jsonplaceholder.typicode.com/comments";
var API_POST_COMMENT = "https://jsonplaceholder.typicode.com/comments?postId=";

$(document).ready(function(){
	$.get('template/header.html',function(templates){
		$.getJSON(API_URL,function(data){
			var result = data;
			template = _.template(templates, {variable: 'vars'})({res: result});
			$("#blogPostDisplay").html(template);			
		});
	});
});

//callback readmore button
function readMoreButton(id){
	$("#blogPostDisplay").html('<img id="theImg" src="images/blogBanner.jpg" width="1170px" height="200px" />');
	$.getJSON(API_URL,function(data){
		$("#blogPostDisplay").append("<h2 id='theHeading'>" +data[id-1].title+ "</h2>");
		$("#blogPostDisplay").append("<p id='theParagraph'>" +data[id-1].body+ "</p>");
		$("#blogPostDisplay").append("<hr/>");
		$("#blogPostDisplay").append("<h3> Comments </h3>");	
		$.getJSON(API_COMMENTS,function(commentData){
			var postCommentUrl = API_POST_COMMENT + id ;
			$.getJSON(postCommentUrl,function(postComment){
				$.each(postComment,function(key,value){	    				
					$("#blogPostDisplay").append('<div class="thmbImage" style="float:left;margin-right:15px;"><img id="theImg" src="images/userIcon.png" width="56px" height="56px" style="overflow:auto;"/></div>');
					$("#blogPostDisplay").append("<div class='description' style='overflow:auto;'><h5 id='commentName'>" +postComment[key].name+ "</h5><p id='commentMessage'>" +postComment[key].body+ "</p></div>");
					$("#blogPostDisplay").append("<hr/>");
				});				
			});		
		});
	});
}

// about callback function
function callAboutUs(){
	$.get('template/aboutus.html',function(data){
		template = _.template(data);
		$("#blogPostDisplay").html(template);
	});
}

// contact callback function
function callContactUs(){
	$.get('template/contactus.html',function(data){
		template = _.template(data);
		$("#blogPostDisplay").html(template);
	});
}

function callNewPostId(){
	$.get('template/createBlog.html',function(data){
		template = _.template(data);
		$("#blogPostDisplay").html(template);
			// clicked form button
		 	/*$("#btnCreate").click(function(){
	 		var bgTitle = $('#blgTitle').val();
  			var bgPost = $('#blgPost').val();
            // POST adds a random id to the object sent
            $.ajax('http://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                data: {
            	    title: 'foo',
                	body: 'bar',
                    userId: 1
                }
            }).then(function(data) {
            	alert("Check console");
            	console.log(data);
        	}); 
	 	}); */	
	});
}
