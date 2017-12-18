var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Database = function Constructor() {
    
    };
    
    
    Database.prototype.connectDatabase = function () {
        var url = 'mongodb://admin:ideofuzion123@ds059207.mlab.com:59207/teleo';
        mongoose.connect(url, function(err, db) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully Connected");
            }
        });
        return url;
    };

    module.exports = Database;  