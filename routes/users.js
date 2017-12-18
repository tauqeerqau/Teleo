var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var Password = require('./../utilities/Password');
var User = require('./../models/User');
var Database = require('./../utilities/Database');
var Messages = require('./../enum/Messages');
var Codes = require('./../enum/Codes');
var Response = require('./../utilities/Response');

var db = new Database({});
var messages = new Messages();
var codes = new Codes();
var response = new Response();
var password = new Password({});
db.connectDatabase();

var addUser = router.route('/addUser');
var login = router.route('/login');
var addUserDetail = router.route('/addUserDetail');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

addUser.post(function (req, res) {
  var user;
  User.findOne({Email:req.body.Email},function(err,user){
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
      user.UserPassword = password.createHash(req.body.Password);
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

login.post(function(req,res){

  var email = req.body.Email;
  var password = req.body.UserPassword;
  User.findOne({ Email: email }, function(err, user) {
      if (err) {
        response.message = messages.getFailureMessage();
        response.code = codes.getFailureCode();
        response.data = null;
        res.json(response);
      } else {
          if (user != null) {
              var validate = password.validateHash(user.UserPassword, req.body.UserPassword);
              if (validate == true) {
                  response.message = messages.getSuccessMessage();
                  response.code = codes.getSuccessCode();
                  response.data = user;
                  res.json(response);
              } else {
                  response.message = messages.getInvalidPassword();
                  response.code = codes.getInvalidPasswordCode();
                  response.data = null;
                  res.json(response);
              }
          } else {
              response.message = messages.getDoesNotExistMessage();
              response.code = codes.getDoesNotExistCode();
              response.data = null;
              res.json(response);
          }
      }
  })

});

addUserDetail.post(function(req,res){
  User.findById(req.body.UserId,function(err,user){
    if(err)
    {
      response.message = messages.getFailureMessage();
      response.code = codes.getFailureCode();
      response.data = null;
      res.json(response);
    }
    else
    {
      if(user==null)
      {
        response.message = messages.getDoesNotExistMessage();
        response.code = codes.getDoesNotExistCode();
        response.data = null;
        res.json(response);
      }
      else
      {
        user.UserLevel = req.body.UserLevel;
        user.UserGoal = req.body.UserGoal;
        user.UserHeightInFeet = req.body.UserHeightInFeet;
        user.UserHeightInInches = req.body.UserHeightInInches;
        user.UserWeightInLbs = req.body.UserWeightInLbs;
        user.save(function(err,user){
          response.message = messages.getSuccessMessage();
          response.code = codes.getSuccessCode();
          response.data = user;
          res.json(response);
        });
      }
    }
  });
});

module.exports = router;
