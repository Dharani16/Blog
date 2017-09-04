var POST_URL = "http://192.168.1.29:1337/posts";
var COMMENT_URL_DATA = "http://192.168.1.29:1337/comments";
var GET_URL = "http://192.168.1.29:1337/posts?sort=id+desc";
var COMMENT_FIRST = "http://192.168.1.29:1337/posts/";
var COMMENT_LAST = "/comments";
var postRecentId ;

$(document).ready(function(){
	callIndex();
});

//callback homepage
function callIndex(){
	$.get('template/header.html',function(templates){
		$.getJSON(GET_URL,function(data){
			var result = data;
			template = _.template(templates,{variable:'vars'})({res:result});
			$("#blogPostDisplay").html(template);
		});
	});
}

//callback readmore button
function readMoreButton(id){
	console.log("Read more postID = "+id);
	postRecentId = id;
	$("#blogPostDisplay").html('<img id="theImg" src="images/blogBanner.jpg" width="1170px" height="200px" />');
	var READMORE_URL = COMMENT_FIRST + id;
	$.getJSON(READMORE_URL,function(data){
		$("#blogPostDisplay").append("<h2 id='theHeading'>" +data.title+ "</h2>");
		$("#blogPostDisplay").append("<p id='theParagraph'>" +data.body+ "</p>");
		$("#blogPostDisplay").append("<hr/>");
		//get comment
		commentDesign();
		$("#blogPostDisplay").append("<hr/>");
		var COMMENT_URL = COMMENT_FIRST + id + COMMENT_LAST;
		console.log("Checking postRecentId in readmore fun = "+postRecentId);
		$.getJSON(COMMENT_URL,function(postComment){
			$.each(postComment,function(key,value){
				$("#blogPostDisplay").append('<div class="thmbImage" style="float:left;margin-right:15px;"><img id="theImg" src="images/userIcon.png" width="56px" height="56px" style="overflow:auto;"/></div>');
				$("#blogPostDisplay").append("<div class='description' style='overflow:auto;'><h5 id='commentName'>" +postComment[key].name+ "</h5><p id='commentMessage'>" +postComment[key].body+ "</p></div>");
				$("#blogPostDisplay").append("<hr/>");
			});
		});
	});
}

//comment form design
function commentDesign(){
    var cmtDesign = '<div class = "container">';
    cmtDesign += '<div class="row">';
    cmtDesign += '<h2>Comment Form</h2>';
	cmtDesign += '<form id="cmtForm">';
    cmtDesign += '<div class="col-md-6">';
    cmtDesign += '<label class="cmtLabel">Name</label>';
    cmtDesign += '<input type = "text" class="cmtName" id="cmName" name="uname"/>';
    cmtDesign += '</div>';
    cmtDesign += '<div class="col-md-6">';
    cmtDesign += '<label class="cmtLabel">Email</label>';
    cmtDesign += '<input type = "text" class="cmtEmail" id="cmEmail" name="email"/>';
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
	 	 // POST adds a random id to the object sent
	    $.ajax(COMMENT_URL_DATA, {	            	
	        method: 'POST',
	        data: {
	       	    name: name,
	           	body:  body,
	            email: email,
	            postId: postRecentId
	       }
	       }).then(function(data) {
	          	alert("Blog comments sent successfully!!");
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
	            	alert("Inserted new blog post successfully !!");
	        	}); 	
			});			
	});
}
