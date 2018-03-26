// This Folder is to define api

var User = require('../models/user');

var config = require('../../config'); // requirequire to call as want want the secret key in config file

var secretKey = config.secretKey;

// writing 1st api
module.exports = function(app, express){

    var api = express.Router();

    api.post('/signup', function(req,res){
        //Refer schema
        var user = new User({
            name: req.body.name, // body represent body parser
            username: req.body.username, //body is used to remove body part from the request
            password: req.body.password,
         });

             //saving to the database

             user.save(function(err){
                 if(err){
                     res.send(err);
                     return;
                 }

                 res.json({ message : 'User has been Created'});
             });
    });

    return api; //Go back to api
}