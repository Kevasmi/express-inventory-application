const Theme = require('../models/theme');
const Product = require('../models/product');

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
        title: 'Theme List',
        theme_list: list_themes,
      });
    });
};

// Display detail page for specifics Themes.
exports.theme_detail = (req, res, next) => {
  async.parallel(
    {
      theme(callback) {
        Theme.findById(req.params.id).exec(callback);
      },
      theme_products(callback) {
        Product.find({ theme: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.theme == null) {
        // No results.
        const err = new Error('Theme not found.');
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render('theme_detail', {
        title: `${results.theme.name}`,
        theme: results.theme,
        theme_products: results.theme_products,
      });
    }
  );
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
