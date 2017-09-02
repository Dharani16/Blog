var API_URL = "https://jsonplaceholder.typicode.com/posts";
var API_COMMENTS = "https://jsonplaceholder.typicode.com/comments";
var API_POST_COMMENT = "https://jsonplaceholder.typicode.com/comments?postId=";
var POST_URL = "http://192.168.1.29:1337/posts";
var COMMENT_URL = "http://192.168.1.29:1337/comments";

$(document).ready(function(){
	callIndex();
});
//callback homepage
function callIndex(){
	$.get('template/header.html',function(templates){
		$.getJSON(API_URL,function(data){
			var result = data;
			template = _.template(templates, {variable: 'vars'})({res: result});
			$("#blogPostDisplay").html(template);			
		});
	});	
}

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
		commentDesign();
	});

}

//comment form design
function commentDesign(){
    var cmtDesign = '<div class = "container">';
    cmtDesign += '<div class="row">';
	cmtDesign += '<form id="cmtForm">';
    cmtDesign += '<div class="col-md-4">';
    cmtDesign += '<label class="cmtLabel">Name</label>';
    cmtDesign += '<input type = "text" class="cmtName" id="cmName" name="uname"/>';
    cmtDesign += '</div>';
    cmtDesign += '<div class="col-md-4">';
    cmtDesign += '<label class="cmtLabel">Email</label>';
    cmtDesign += '<input type = "text" class="cmtEmail" id="cmEmail" name="email"/>';
    cmtDesign += '</div>';
    cmtDesign += '<div class="col-md-4">';
    cmtDesign += '<label class="cmtLabel">ID</label>';
    cmtDesign += '<input type = "text" class="cmtId" id="cmId" name="id"/>';
    cmtDesign += '</div>';
    cmtDesign += '<div class="col-md-12">';
    cmtDesign += '<label class="cmtLabel">Message</label>';
    cmtDesign += '<textarea name="message" id="cmMessages" class="cmtMessage" id="blgPost" rows="2" cols="120"></textarea>';
    cmtDesign += '</div>';
    cmtDesign += '<center> <button type="button" class="btn btn-warning" id="btnCmtSubmit">Submit Comments <span class="glyphicon glyphicon-send"></span></button></center>';
    cmtDesign += '</form>';
    cmtDesign += '</div>';
    cmtDesign += '</div>';
 	$("#blogPostDisplay").append(cmtDesign);
 	//get form values
 	$("#btnCmtSubmit").click(function(){
 		var name = $("#cmName").val();
	 	var body = $("#cmMessages").val();
	 	var email = $("#cmEmail").val();
	 	var postId = $("#cmId").val();

	 	console.log("Name : "+name);
	 	console.log("Email : "+email);
	 	console.log("Id : "+postId);
	 	console.log("Body : "+body);
	 	 // POST adds a random id to the object sent
	    $.ajax(COMMENT_URL, {	            	
	        method: 'POST',
	        data: {
	       	    name: name,
	           	body:  body,
	            email: email,
	            postId: postId
	       }
	       }).then(function(data) {
	          	var bgTitleHead = $('#blgTitle').val("");
				var bgPostMsg = $('#blgPost').val("");
	       		alert("Blog posts inserted successfully !!");
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
			$("#btnCreate").click(function(){
				var bgTitleHead = $('#blgTitle').val();
				var bgPostMsg = $('#blgPost').val();
				console.log("Title : "+ bgTitleHead + "  " + "Post message :" + bgPostMsg);
				 // POST adds a random id to the object sent
	            $.ajax(POST_URL, {	            	
	                method: 'POST',
	                data: {
	            	    title: bgTitleHead,
	                	body:  bgPostMsg,
	                    userId: 1
	                }
	            }).then(function(data) {
	            	var bgTitleHead = $('#blgTitle').val("");
					var bgPostMsg = $('#blgPost').val("");
	        		alert("Blog posts inserted successfully !!");
	        	}); 	
			});			
	});
}

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
  });
*/	
