var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var ChannelType = function Constructor() {
    
    };
    
    ChannelType.prototype.Email = function()
    {
        return 1;
    }

    ChannelType.prototype.Facebook= function()
    {
        return 2;
    }
    module.exports = ChannelType;  