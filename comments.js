// Create web server using node.js

// run using node command
// node comments.js
// open browser and go to http://localhost:3000/
// to stop server, press Ctrl+C
// to restart server, run node comments.js again
// to restart server automatically after changes, install supervisor
// npm install -g supervisor
// run using supervisor command
// supervisor comments.js
// to restart server automatically after changes, install nodemon
// npm install -g nodemon
// run using nodemon command
// nodemon comments.js
// to restart server automatically after changes, install forever
// npm install -g forever
// run using forever command
// forever start comments.js

// include http module
var http = require('http');

// include url module
var url = require('url');

// include fs module
var fs = require('fs');

// include querystring module
var querystring = require('querystring');

// include redis module
var redis = require('redis');

// create redis client
var client = redis.createClient();

// create server
http.createServer(function (request, response) {
    // store request url
    var path = url.parse(request.url).pathname;

    // store request method
    var method = request.method;

    // store request body
    var requestBody = '';

    // if request method is POST
    if (method === 'POST') {
        // set encoding
        request.setEncoding('utf-8');

        // listen for data
        request.on('data', function (data) {
            // append data
            requestBody += data;
        });

        // listen for end
        request.on('end', function () {
            // parse query string
            var post = querystring.parse(requestBody);

            // if request url is /comment
            if (path === '/comment') {
                // store comment
                var comment = post.comment;

                // store comment id
                var commentId = post.commentId;

                // store comment key
                var commentKey = 'comment:' + commentId;

                // store comment time
                var commentTime = Date.now();

                // store comment data
                var commentData = {
                    comment: comment,
                    commentId: commentId,
                    commentTime: commentTime
                };

                // store comment data as JSON string
                var commentDataString = JSON.stringify(commentData);

                // store comment data in redis

