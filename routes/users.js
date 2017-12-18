var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var User = require('./../models/User');
var Database = require('./../utilities/Database');
var Messages = require('./../enum/Messages');
var Codes = require('./../enum/Codes');
var Response = require('./../utilities/Response');

var db = new Database({});
var messages = new Messages();
var codes = new Codes();
var response = new Response();
db.connectDatabase();

var addUser = router.route('/addUser');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

addUser.post(function (req, res) {
  var user;
  User.findOne({Email:req.body.Email,UserRole:1},function(err,user){
    if(user!=undefined)
    {
      response.code=codes.getAlreadyExistCode();
      response.message=messages.getAlreadyExistMessage();
      response.data=null;
      console.log(response);
      res.json(response);
    }
    else
    {
      user = new User();
      user.Email = req.body.Email;
      user.ProfileURL = req.body.ProfileURL;
      user.FullName = req.body.FullName;
      user.ChannelType = req.body.ChannelType;
      user.UserRole = req.body.UserRole;
      user.save(function (err, user) {
        if (err) {
          console.log(err);
          response.message=messages.getFailureMessage();
          response.code=codes.getFailureCode();
          res.json(err);
        }
        else {
          console.log(user);
          response.message = messages.getSuccessMessage();
          response.code = codes.getSuccessCode();
          response.data = user;
          res.json(response);
        }
      });
    }
  });
});

module.exports = router;
