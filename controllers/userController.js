const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.sign_up_get = (req, res, next) => {
  res.render('sign_up_form', {
    title: 'Sign-Up',
  });
};

exports.sign_up_post = [
  body('username').trim().isLength({ min: 1 }).escape(),
  body('password').trim().isLength({ min: 1 }).escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Error!');
      return res.render('sign_up_form', { title: 'Sign Up' });
    }
    try {
      const isUserInDB = await User.find({ username: req.body.username });
      if (isUserInDB.length > 0)
        return res.render('sign_up_form', {
          title: 'Sign Up',
          error: 'User already exists',
        });
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) return next(err);
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
          admin: req.body.admin,
          avatar: req.body.avatar,
        }).save((err) => (err ? next(err) : res.redirect('/')));
      });
    } catch {
      return next(err);
    }
  },
];

exports.log_in_get = (req, res, next) => {
  // If user is already logged in, redirect them to the homepage
  if (res.locals.currentUser) return res.redirect('/');
  res.render('log_in');
};

exports.log_in_post = passport.authenticate('local', {
  successRedirect: '/catalog',
  failureRedirect: '/users/log-in',
  failureMessage: true,
});

exports.sign_out = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
