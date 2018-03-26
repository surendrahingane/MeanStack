var express = require('express');
var bodyParser = require('body-Parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect(config.database, function(err){
    if(err){
        console.log(err);
    }else{
        console.log('Connected to the Database');
    }
});

var app = express();
//middleware
//extended : true to load images
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(morgan('dev')); // to log input at console

//define api to signup we require the api.js
var api = require('./app/routes/api')(app, express); //We have to pass app and function to module.export funtion of api.js
// As in api.js var api is treadet as local variable

app.use('/api', api);          // This is calling sign no nees to use sign up before /signup each time, localhost:3000/api/signup


app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(config.port,function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Listening on Port 3000");
    }
});