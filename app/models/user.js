var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//to hash passwrod while saving to the database
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({

    name : String,
    username: {type: String, required: true, index: { unique: true}},
    password: {type: String, required: true, select: false} //select : fasle as we query it should not take the saved pswd

});

// Hashing Algorithm
UserSchema.pre('save', function(next){

    var user = this;  //this refer to user schema object

    if(!user.isModified('password')) return next();  //user password is not modified : True move to next master in database

    //using hash method of bcrypt
    bcrypt.hash(user.password, null, null, function(err, hash){

        if(err) return next(err);  // what does next signifies if err do nut stuck at error. Print error and go to next matches. if(false) hash the password

        user.password = hash;       //hash the password
        next();                     // go to the next match
    });
});


//For creating custom method for UserSCehma object
//user.password (store in db) compare with input password
//comparePassword we define our own method
UserSchema.methods.comparePassword = function(password){

    var user = this;
//bcrypt has inbuild method to compare the password
    return bcrypt.compareSync(password, user.password);  // comparing password
}

//compile schema with user 
// passing object UserSchema we are exporting where we want to use it
module.exports = mongoose.model('User', UserSchema);
