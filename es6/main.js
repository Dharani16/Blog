const GET_URL = "http://192.168.1.29:1337/posts?sort=id+desc";
const COMMENT_FIRST = "http://192.168.1.29:1337/posts/";
const COMMENT_URL_DATA = "http://192.168.1.29:1337/comments";
const POST_URL = "http://192.168.1.29:1337/posts/";
const COMMENT_LAST = "/comments";
const COMMENT_SORT = "?sort=id+desc";
var postRecentId;

class BlogPoster{
    //callIndex
    callIndex(){
        $.get('template/header.html',function(templates){
            //console.log(templates)
            $.getJSON(GET_URL,function(data){
                //console.log(GET_URL)
                let result = data;
                let template = _.template(templates,{variable:'vars'})({res:result});
                $("#blogPostDisplay").html(template);
            });           
        })
        $("#formDisplay").empty();
        $("#commentsDisplay").empty();
    }  
    //callback readmore button
    readMoreButton(id){
        postRecentId = id
        $("#blogPostDisplay").html('<div class = "container"><img id="theImg" src="images/blogBanner.jpg" width="1160px;" height="200px" /> </div>');
        let READMORE_URL = COMMENT_FIRST+postRecentId;
        console.log("ReadMore URL : "+READMORE_URL);
        $.get('template/readMore.html',function(readMoreTemplate){
            $.getJSON(READMORE_URL,function(readMoreData){
                let readTitle = readMoreData.title;
                let readPost = readMoreData.body;
                let template = _.template(readMoreTemplate,{variable:'rmVars'})({re:readTitle,reb:readPost});
                $("#blogPostDisplay").append(template);	
            });
        });            
    }

    //callback comment display
    commentDisplay(){
        $.get('template/cmtDisplay.html',function(cmtDisp){
            var COMMENT_URL = COMMENT_FIRST + postRecentId + COMMENT_LAST + COMMENT_SORT;
            console.log("Comment URL = "+COMMENT_URL)
            $.getJSON(COMMENT_URL,function(cmtData){
                var cmtResult = cmtData;
                let rows =  _.template(cmtDisp,{variable:'data'})({resCmt:cmtResult});
                $("#commentsDisplay").html(rows);
            });
        });
    }

    //callback comment form display
    commentFormDesign(){
        $.get('template/cmtForm.html',function(cmtFormTemplate){
            let template = _.template(cmtFormTemplate);
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
	            }).done(function(data) {
                  console.log('success', data);
                  alert('Comment sent Successfully !!');
                  $("input[type=text], textarea").val("");
                  commentDisplay();
              })
              .fail(function(xhr) {
                  console.log('error', xhr);
              }); 	
            })
        })
    }

    // about callback function
    callAboutUs(){
	    $.get('template/aboutus.html',function(data){
		let template = _.template(data);
		    $("#blogPostDisplay").html(template);
	    });
	    $("#formDisplay").empty();
	    $("#commentsDisplay").empty();
    }

    // contact callback function
    callContactUs(){
        $.get('template/contactus.html',function(data){
            let template = _.template(data);
            $("#blogPostDisplay").html(template);
        });
        $("#formDisplay").empty();
        $("#commentsDisplay").empty();
    }

    //callback create post
    callNewPostId(){
        $.get('template/createBlog.html',function(data){
            let template = _.template(data);
            $("#blogPostDisplay").html(template);
            // clicked form button
            $("#btnCreate").click(function(){
                var bgTitleHead = $('#blgTitle').val();
                var bgPostMsg = $('#blgPost').val();
                // POST adds a random id to the object sent
                $.ajax(POST_URL, {	            	
                    method: 'POST',
                    data: {
                        title: bgTitleHead,
                        body:  bgPostMsg,
                        userId: 1
                    }
                }).done(function(data) {
                  console.log('success', data);
                  alert('Successfully Saved');
                  $("input[type=text], textarea").val("");
                })
                .fail(function(xhr) {
                  console.log('error', xhr);
                });
            });			
        });
    }

}

let obj = new BlogPoster()
obj.callIndex();

function readMoreButton(id) {
    obj.readMoreButton(id);
    obj.commentFormDesign();
    obj.commentDisplay();    
}
function callAboutUs(){
    obj.callAboutUs()    
}

function callContactUs(){
    obj.callContactUs()
}

function callNewPostId(){
    obj.callNewPostId()
}