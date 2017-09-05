var POST_URL = "http://192.168.1.29:1337/posts/";
var COMMENT_URL_DATA = "http://192.168.1.29:1337/comments";
var GET_URL = "http://192.168.1.29:1337/posts?sort=id+desc";
var COMMENT_FIRST = "http://192.168.1.29:1337/posts/";
var COMMENT_LAST = "/comments";
var COMMENT_SORT = "?sort=id+desc";
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
	console.log("postID = "+id);
	postRecentId = id;
	$("#blogPostDisplay").html('<div class = "container"><img id="theImg" src="images/blogBanner.jpg" width="1170px" height="200px" /> </div>');
	var READMORE_URL = COMMENT_FIRST + id;
	$.get('template/readMore.html',function(readMoreTemplate){
		$.getJSON(READMORE_URL,function(readMoreData){
			var readTitle = readMoreData.title;
			var readPost = readMoreData.body;
			template = _.template(readMoreTemplate,{variable:'rmVars'})({re:readTitle,reb:readPost});
			$("#blogPostDisplay").append(template);	
			cmtDisplay();					
		});
	});
}
/*
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
*/ 
//comment form design
function cmtDisplay(){
   $.get('template/commentDisplay.html',function(cmtDisplayTemplate){
   		//console.log(cmtDisplayTemplate);
   		var COMMENT_URL = COMMENT_FIRST + postRecentId + COMMENT_LAST + COMMENT_SORT;
   		$.getJSON(COMMENT_URL,function(cmtData){
			//console.log("Comment URL = "+COMMENT_URL);
			var cmtResult = cmtData;
			console.log("Comment content");
			console.dir(cmtResult);
			template = _.template(cmtDisplayTemplate,{variable:'cmtVars'})({res:"Dharani dharan"});
			$("#blogPostDisplay").append(template);
		});
   }); 	
}


//comment displayed 
// function cmtDisplay(){
// 	$.get('template/commentDisplay.html',function(cmtDisplayData){
// 		console.log(cmtDisplayData);
// 	});
// 	var COMMENT_URL = COMMENT_FIRST + postRecentId + COMMENT_LAST + COMMENT_SORT;
// 	$.getJSON(COMMENT_URL,function(postComment){
// 	console.log("cmtFormDisplay = "+COMMENT_URL);
// 		$.each(postComment,function(key,value){
// 			$("#blogPostDisplay").append(cmtSection);

// 		});
// 	});
// }


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
	        }); 	
		});			
	});
}

/*
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
		var COMMENT_URL = COMMENT_FIRST + id + COMMENT_LAST + COMMENT_SORT;
		$.getJSON(COMMENT_URL,function(postComment){
			console.log("cmtFormDisplay = "+COMMENT_URL);
			$.each(postComment,function(key,value){
				$("#blogPostDisplay").append('<div class="thmbImage" style="float:left;margin-right:15px;"><img id="theImg" src="images/userIcon.png" width="56px" height="56px" style="overflow:auto;"/></div>');
				$("#blogPostDisplay").append("<div class='description' style='overflow:auto;'><h5 id='commentName'>" +postComment[key].name+ "</h5><p id='commentMessage'>" +postComment[key].body+ "</p></div>");
				$("#blogPostDisplay").append("<hr/>");
			});
		});
	});
}


function readMoreButton(id){
	console.log("Read more postID = "+id);
	postRecentId = id;
	$("#blogPostDisplay").html('<div class = "container"><img id="theImg" src="images/blogBanner.jpg" width="1170px" height="200px" /> </div>');
	var READMORE_URL = COMMENT_FIRST + id;
	$.getJSON(READMORE_URL,function(data){
		var blogContent = '<div class="container">';
		blogContent += '<h2 id="theHeading">' +data.title+ '</h2>';
		blogContent += '<p id="theParagraph">'+data.body+'</p>';
		blogContent += '</div>';
		blogContent += '<hr/>';
		$("#blogPostDisplay").append(blogContent);		
		//get comment
		commentDesign();
		$("#blogPostDisplay").append("<hr/>");
		cmtDisplay();
		//$("#blogPostDisplay").append("<div id='cmtDisplayRefresh'> Welcome screen </div>")		
	});
}


//comment displayed 
function cmtDisplay(){
	var COMMENT_URL = COMMENT_FIRST + postRecentId + COMMENT_LAST + COMMENT_SORT;
	$.getJSON(COMMENT_URL,function(postComment){
	console.log("cmtFormDisplay = "+COMMENT_URL);
		$.each(postComment,function(key,value){
			var cmtSection = '<div class = "container" >';
			cmtSection += '<div id="cmtSectionPart">'
			cmtSection += '<div class="thmbImage" style="float:left;margin-right:15px;">';
			cmtSection += '<img id="theImg" src="images/userIcon.png" width="56px" height="56px" style="overflow:auto;"/>';
			cmtSection += '</div>';
			cmtSection += '<div class="description" style="overflow:auto;">';
			cmtSection += '<h5 id="commentName"> '+postComment[key].name+' </h5>';
			cmtSection += '<p id="commentMessage">'+postComment[key].body+'</p>';
			cmtSection += '</div>';
			cmtSection += '</div>';
			cmtSection += '</div>';
			cmtSection += '<hr/>';
			//$("#blogPostDisplay").append('<div class="thmbImage" style="float:left;margin-right:15px;"><img id="theImg" src="images/userIcon.png" width="56px" height="56px" style="overflow:auto;"/></div>');
			//$("#blogPostDisplay").append("<div class='description' style='overflow:auto;'><h5 id='commentName'>" +postComment[key].name+ "</h5><p id='commentMessage'>" +postComment[key].body+ "</p></div>");
			$("#blogPostDisplay").append(cmtSection);
		});
	});
}

*/ 