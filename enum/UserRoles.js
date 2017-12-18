var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var UserRoles = function Constructor() {
    
    };
    
    UserRoles.prototype.Admin = function()
    {
        return 1;
    }

    UserRoles.prototype.EndUser= function()
    {
        return 2;
    }
    module.exports = UserRoles;  