var express = require('express');
var router = express.Router();

// var mongoose = require('mongoose');
// var userSchema = require('../models/user');
// var User = mongoose.model('User', userSchema); // if you have mongodb

function authChecker(req, res, next) {
    // console.log('authChecker session ', req.session);
    // if (req.session.user_id) {
    //     next();
    // } else {
    //   console.log('auth checker')
    //    res.redirect("/login");
    // }
    next();
}

function roleObj(req){
  return { title : '360-Admin' }
}

/* GET home page. */
// add authChecker as middleware
router.get('/', authChecker, function(req, res, next) {
  // res.send('Hello')
  console.log('main')
  res.render('index', roleObj(req))
});

module.exports = router;
