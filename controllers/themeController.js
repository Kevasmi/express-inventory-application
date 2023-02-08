const Theme = require('../models/theme');

const async = require('async');
const { body, validationResult } = require('express-validator');

// Display list of all Themes.
exports.theme_list = (req, res, next) => {
  Theme.find()
    .sort([['name', 'ascending']])
    .exec((err, list_themes) => {
      if (err) {
        return next(err);
      }
      // Successful, so render.
      res.render('theme_list', {
        title: 'Themes',
        theme_list: list_themes,
      });
    });
};

// Display detail page for specifics Themes.
exports.theme_detail = (req, res, next) => {
  res.send('No implementation for theme detail GET.');
};

exports.theme_create_get = (req, res, next) => {
  res.send('No implementation for theme create GET.');
};

exports.theme_create_post = (req, res, next) => {
  res.send('No implementation for theme create POST.');
};

exports.theme_delete_get = (req, res, next) => {
  res.send('No implementation for theme delete GET.');
};

exports.theme_delete_post = (req, res, next) => {
  res.send('No implementation for theme delete POST.');
};

exports.theme_update_get = (req, res, next) => {
  res.send('No implementation for theme update GET.');
};

exports.theme_update_post = (req, res, next) => {
  res.send('No implementation for theme update POST.');
};
