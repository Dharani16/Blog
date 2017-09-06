var POST_URL = "http://192.168.1.29:1337/posts/";
var COMMENT_URL_DATA = "http://192.168.1.29:1337/comments";
var GET_URL = "http://192.168.1.29:1337/posts?sort=id+desc";
var COMMENT_FIRST = "http://192.168.1.29:1337/posts/";
var COMMENT_LAST = "/comments";
var COMMENT_SORT = "?sort=id+desc";
var postRecentId ;

$(document).ready(function(){
	callIndex();
	$("#formDisplay").empty();
	$("#commentsDisplay").empty();
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
	$("#formDisplay").empty();
	$("#commentsDisplay").empty();
}

//callback readmore button
function readMoreButton(id){
	console.log("postID = "+id);
	postRecentId = id;
	$("#blogPostDisplay").html('<div class = "container"><img id="theImg" src="images/blogBanner.jpg" width="1160px;" height="200px" /> </div>');
	var READMORE_URL = COMMENT_FIRST + id;
	$.get('template/readMore.html',function(readMoreTemplate){
		$.getJSON(READMORE_URL,function(readMoreData){
			var readTitle = readMoreData.title;
			var readPost = readMoreData.body;
			template = _.template(readMoreTemplate,{variable:'rmVars'})({re:readTitle,reb:readPost});
			$("#blogPostDisplay").append(template);	
			commentFormDesign();
			commentDisplay();
		});
	});
}

//callback comment display
function commentDisplay(){
	$.get('template/cmtDisplay.html',function(cmtDisp){
		var COMMENT_URL = COMMENT_FIRST + postRecentId + COMMENT_LAST + COMMENT_SORT;
		$.getJSON(COMMENT_URL,function(cmtData){
			var cmtResult = cmtData;
			var rows = "";
			rows += _.template(cmtDisp,{variable:'data'})({resCmt:cmtResult});
			$("#commentsDisplay").html(rows);
		});
	});
}

//callback commnet form 
function commentFormDesign(){
	$.get('template/cmtForm.html',function(cmtFormTemplate){
		template = _.template(cmtFormTemplate);
		$("#formDisplay").html(template);
		//submit comment
		$("#btnCmtSubmit").click(function(){
			var name = $("#cmName").val();
  	 		var body = $("#cmMessages").val();
 		 	var email = $("#cmEmail").val(); 
	 	 	console.log("Name : "+name+"Email : "+email+"PostId : "+postRecentId+"Body : "+body);
	        $.ajax(COMMENT_URL_DATA, {	            	
	            method: 'POST',
	            data: {
	          	    name: name,
	              	body:  body,
	                email: email,
	                postId: postRecentId
	            }
	        }).then(function(data) {
	           	alert("Comment sent successfully !!");
	           	$("input[type=text], textarea").val("");
	           	commentDisplay();
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
	$("#formDisplay").empty();
	$("#commentsDisplay").empty();
}

// contact callback function
function callContactUs(){
	$.get('template/contactus.html',function(data){
		template = _.template(data);
		$("#blogPostDisplay").html(template);
	});
	$("#formDisplay").empty();
	$("#commentsDisplay").empty();
}

//callback create post
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
	           	$("input[type=text], textarea").val("");
	        }); 
		});			
	});
}
