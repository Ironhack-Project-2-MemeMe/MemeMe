const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');



router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/signup', (req, res, next) => {

  const { username, email, password } = req.body;

  let message = '';

  if (password.length < 8) {
    message = 'Your password needs to be 8 chars min';
  }
  if (username === '') {
    message = 'Your username cannot be empty'; 
  }
  if(email === ''){
    message = 'Your email cannot be empty';
  }
  

  // if(!username || !email){
  //   res.render('auth/signup', 
  //   { message: 'All fields are mandatory. Please provide your username, email and password' });
  //   return;
  // }


  // check if username exists in database -> show message
if (!message){
  User.findOne({ username: username })
    .then(found => {
      if (found !== null) {
        res.render('auth/signup', { username, email, message: 'This username is already taken' });
      } else {
        // hash the password, create the user and redirect to profile page
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);

        User.create({
          username: username,
          email: email,
          password: hash
        })
          .then(dbUser => {
            // log the user in
            // res.render('dashboard', { user: dbUser });
            // login with passport:
            // req.login();
            res.redirect('/login');
          })
          .catch(err => {
            console.log(err);
            res.render('auth/signup', { username, email, message: 'Please enter a valid email address.' });
          });
      }
    });
  } else {
    res.render('auth/signup', { username, email, message});
  }
});

 router.post('/login',(req, res, next) => { 
    passport.authenticate('local', function(err, user, info) { 
      if (err) { return next(err); }
      if (!user) { return res.render('auth/login', { message: 'Invalid credentials'}); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/profile');
      });
    })(req, res, next);
  });

router.get('/logout', (req, res) => {
  // logout the user using passport
  req.logout();
  res.redirect('/');
});

module.exports = router;