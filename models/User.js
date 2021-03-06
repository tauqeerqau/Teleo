/**
 * Created by Tauqeer on 05-08-2016.
 */

// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var UserSchema = new mongoose.Schema({
    Email:String,
    ProfileURL:String,
    FullName:String,
    ChannelType:Number,
    UserRole:Number,
    UserPassword:String,
    UserLevel:Number,
    UserGoal:Number,
    UserHeightInFeet:Number,
    UserHeightInInches:Number,
    UserWeightInLbs:Number,
    UserGender:Number
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);