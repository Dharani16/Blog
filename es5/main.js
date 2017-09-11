"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GET_URL = "http://192.168.1.29:1337/posts?sort=id+desc";
var COMMENT_FIRST = "http://192.168.1.29:1337/posts/";
var COMMENT_URL_DATA = "http://192.168.1.29:1337/comments";
var POST_URL = "http://192.168.1.29:1337/posts/";
var COMMENT_LAST = "/comments";
var COMMENT_SORT = "?sort=id+desc";
var postRecentId;

var BlogPoster = function () {
    function BlogPoster() {
        _classCallCheck(this, BlogPoster);
    }

    _createClass(BlogPoster, [{
        key: "callIndex",

        //callIndex
        value: function callIndex() {
            $.get('template/header.html', function (templates) {
                //console.log(templates)
                $.getJSON(GET_URL, function (data) {
                    //console.log(GET_URL)
                    var result = data;
                    var template = _.template(templates, { variable: 'vars' })({ res: result });
                    $("#blogPostDisplay").html(template);
                });
            });
            $("#formDisplay").empty();
            $("#commentsDisplay").empty();
        }
        //callback readmore button

    }, {
        key: "readMoreButton",
        value: function readMoreButton(id) {
            postRecentId = id;
            $("#blogPostDisplay").html('<div class = "container"><img id="theImg" src="images/blogBanner.jpg" width="1160px;" height="200px" /> </div>');
            var READMORE_URL = COMMENT_FIRST + postRecentId;
            console.log("ReadMore URL : " + READMORE_URL);
            $.get('template/readMore.html', function (readMoreTemplate) {
                $.getJSON(READMORE_URL, function (readMoreData) {
                    var readTitle = readMoreData.title;
                    var readPost = readMoreData.body;
                    var template = _.template(readMoreTemplate, { variable: 'rmVars' })({ re: readTitle, reb: readPost });
                    $("#blogPostDisplay").append(template);
                });
            });
        }

        //callback comment display

    }, {
        key: "commentDisplay",
        value: function commentDisplay() {
            $.get('template/cmtDisplay.html', function (cmtDisp) {
                var COMMENT_URL = COMMENT_FIRST + postRecentId + COMMENT_LAST + COMMENT_SORT;
                console.log("Comment URL = " + COMMENT_URL);
                $.getJSON(COMMENT_URL, function (cmtData) {
                    var cmtResult = cmtData;
                    var rows = _.template(cmtDisp, { variable: 'data' })({ resCmt: cmtResult });
                    $("#commentsDisplay").html(rows);
                });
            });
        }

        //callback comment form display

    }, {
        key: "commentFormDesign",
        value: function commentFormDesign() {
            $.get('template/cmtForm.html', function (cmtFormTemplate) {
                var template = _.template(cmtFormTemplate);
                $("#formDisplay").html(template);
                //submit comment
                $("#btnCmtSubmit").click(function () {
                    var name = $("#cmName").val();
                    var body = $("#cmMessages").val();
                    var email = $("#cmEmail").val();
                    console.log("Name : " + name + "Email : " + email + "PostId : " + postRecentId + "Body : " + body);
                    $.ajax(COMMENT_URL_DATA, {
                        method: 'POST',
                        data: {
                            name: name,
                            body: body,
                            email: email,
                            postId: postRecentId
                        }
                    }).done(function (data) {
                        console.log('success', data);
                        alert('Comment sent Successfully !!');
                        $("input[type=text], textarea").val("");
                        commentDisplay();
                    }).fail(function (xhr) {
                        console.log('error', xhr);
                    });
                });
            });
        }

        // about callback function

    }, {
        key: "callAboutUs",
        value: function callAboutUs() {
            $.get('template/aboutus.html', function (data) {
                var template = _.template(data);
                $("#blogPostDisplay").html(template);
            });
            $("#formDisplay").empty();
            $("#commentsDisplay").empty();
        }

        // contact callback function

    }, {
        key: "callContactUs",
        value: function callContactUs() {
            $.get('template/contactus.html', function (data) {
                var template = _.template(data);
                $("#blogPostDisplay").html(template);
            });
            $("#formDisplay").empty();
            $("#commentsDisplay").empty();
        }

        //callback create post

    }, {
        key: "callNewPostId",
        value: function callNewPostId() {
            $.get('template/createBlog.html', function (data) {
                var template = _.template(data);
                $("#blogPostDisplay").html(template);
                // clicked form button
                $("#btnCreate").click(function () {
                    var bgTitleHead = $('#blgTitle').val();
                    var bgPostMsg = $('#blgPost').val();
                    // POST adds a random id to the object sent
                    $.ajax(POST_URL, {
                        method: 'POST',
                        data: {
                            title: bgTitleHead,
                            body: bgPostMsg,
                            userId: 1
                        }
                    }).done(function (data) {
                        console.log('success', data);
                        alert('Successfully Saved');
                        $("input[type=text], textarea").val("");
                    }).fail(function (xhr) {
                        console.log('error', xhr);
                    });
                });
            });
        }
    }]);

    return BlogPoster;
}();

var obj = new BlogPoster();
obj.callIndex();

function readMoreButton(id) {
    obj.readMoreButton(id);
    obj.commentFormDesign();
    obj.commentDisplay();
}
function callAboutUs() {
    obj.callAboutUs();
}

function callContactUs() {
    obj.callContactUs();
}

function callNewPostId() {
    obj.callNewPostId();
}