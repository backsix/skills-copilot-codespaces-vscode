// create web server
var express = require('express');
// create application
var app = express();
// create http server
var http = require('http');
var server = http.createServer(app);
// connect to mongo database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comments');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// define schema
var Schema = mongoose.Schema;
var commentSchema = new Schema({

