const Product = require('../models/product');
const ProductInstance = require('../models/productinstance');

const async = require('async');
const { body, validationResult } = require('express-validator');

exports.index = (req, res) => {
  res.render('index', {
    title: 'Check It Out!',
  });
};

// Display list of products.
exports.product_list = (req, res, next) => {
  Product.find({}, 'name theme')
    .sort({ theme: 1 })
    .populate('theme')
    .exec((err, list_products) => {
      if (err) {
        return next(err);
      }
      // Successful, so render.
      res.render('product_list', {
        title: 'Product List',
        list_products,
      });
    });
};

// Display detail page for a specific product.
exports.product_detail = (req, res, next) => {
  async.parallel(
    {
      product(callback) {
        Product.findById(req.params.id).populate('theme').exec(callback);
      },
      product_instance(callback) {
        ProductInstance.find({ product: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.product == null) {
        // No results.
        const err = new Error('Product not found.');
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render('product_detail', {
        title: `${results.product.name}`,
        product: results.product,
        product_instances: results.product_instance,
      });
    }
  );
};

// Display product create form on GET.
exports.product_create_get = (req, res, next) => {
  res.render('product_form', { title: 'Create Product.' });
};

// Handle product create on POST.
exports.product_create_post = (req, res, next) => {
  res.send('No implementation for product create POST yet.');
};

exports.product_delete_get = (req, res, next) => {
  res.send('No implementation for product delete GET yet.');
};

exports.product_delete_post = (req, res, next) => {
  res.send('No implementation for product delete POST yet.');
};

exports.product_update_get = (req, res, next) => {
  res.send('No implementation for product update GET yet.');
};

exports.product_update_post = (req, res, next) => {
  res.send('No implementation for product update POST yet.');
};
