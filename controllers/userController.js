const bcrypt = require('bcryptjs');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

const User = require('../models/user');

exports.sign_up_get = (req, res, next) => {
  if (err) {
    return next(err);
  }
  res.render('sign_up_form', {
    title: 'Sign-Up',
  });
};

exports.sign_up_post = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });
};

exports.log_in_get = (req, res, next) => {
  if (err) {
    return next(err);
  }
  res.render('log_in', {
    title: 'Log-In',
  });
};

exports.log_in_post = (req, res, next) => {
  if (err) {
    return next(err);
  }
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  });
};

exports.log_out = (req, res, next) => {
  if (err) {
    return next(err);
  }
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
