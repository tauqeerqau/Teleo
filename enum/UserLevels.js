var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var UserLevels = function Constructor() {
    
    };
    
    UserLevels.prototype.Beginner = function()
    {
        return 1;
    }

    UserLevels.prototype.Intermediate= function()
    {
        return 2;
    }

    UserLevels.prototype.Advanced= function()
    {
        return 3;
    }
    module.exports = UserLevels;  