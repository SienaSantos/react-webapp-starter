var express = require('express');
var router = express.Router();
var x = require('../api/config')

// var mongoose = require('mongoose');
// var userSchema = require('../models/user');
// var User = mongoose.model('User', userSchema); // if you have mongodb

function authChecker(req, res, next) {
    console.log('authChecker session ', req.session);
    if (req.session.user_id) {
        next();
    } else {
      console.log('auth checker')
       res.redirect("/login");
    }
    next();
}

function roleObj(req){
  return { title : '360-Admin' }
}

/* GET home page. */
// add authChecker as middleware
router.get('/', function(req, res, next) {
  res.render('index', roleObj(req))
});
router.get('/data/loans', function(req, res, next) {
  res.render('index', roleObj(req))
});
router.get('/data/users', function(req, res, next) {
  res.render('index', roleObj(req))
});

x.forEach(route => {
  route.routes.forEach(module => {
    if(module.type === 'index'){
      router.get(module.route, function(req,res,next){
        request
         .get(module.source)
         .set('Accept', 'application/json')
         .then(resp => {
           if(module.cb)
              module.cb('hello woeerld', req, res)

            res.send(resp.body);
         });
      })
    }

    if(module.type === 'get'){
      router.get(module.route, function(req,res,next){
        request
         .get(`${module.source}/${req.params.id}`)
         .set('Accept', 'application/json')
         .then(resp => {
            res.send(resp.body);
         });
      })
    }

    if(module.type === 'post'){
      router.post(module.route, function(req,res,next){
        request.post(module.source)
          .set('Content-Type', 'application/json')
          .send(req.body)
          .then(data => res.send(data.body))
      })
    }
  })
})


module.exports = router;
