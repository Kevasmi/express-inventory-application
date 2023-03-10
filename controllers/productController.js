const Product = require('../models/product');
const ProductInstance = require('../models/productinstance');
const Theme = require('../models/theme');

const async = require('async');
const { body, validationResult } = require('express-validator');

exports.index = (req, res, next) => {
  async.parallel(
    {
      products(callback) {
        Product.find({}).populate('theme').exec(callback);
      },
      productinstances(callback) {
        ProductInstance.find({}).populate('product').exec(callback);
      },
      themes(callback) {
        Theme.find({}).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render('index', {
        title: 'Check it out!',
        data: results,
        user: res.locals.currentUser,
        error: err,
      });
    }
  );
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
        user: res.locals.currentUser,
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
      product_instances(callback) {
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
        product_instances: results.product_instances,
        user: res.locals.currentUser,
      });
    }
  );
};

// Display product create form on GET.
exports.product_create_get = (req, res, next) => {
  // Get all themes, which we can add to our product.
  Theme.find().exec((err, themes) => {
    if (err) {
      return next(err);
    }
    res.render('product_form', {
      title: 'Create Product',
      themes,
      user: res.locals.currentUser,
    });
  });
};

// Handle product create on POST.
exports.product_create_post = [
  // Validate and sanitize fields.
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('image', 'Image must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('price', 'Price must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('pieceCount', 'Piece Count must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('setNumber', 'Set Number must not be empty.')
    .trim()
    .isLength({ min: 1 }),
  body('theme.*').escape(),
  body('difficulty').trim().escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Product object with escaped and trimmed data.
    const product = new Product({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      pieceCount: req.body.pieceCount,
      setNumber: req.body.setNumber,
      theme: req.body.theme,
      difficulty: req.body.difficulty,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all themes for form.
      Theme.find().exec((err, themes) => {
        if (err) {
          return next(err);
        }

        res.render('product_form', {
          title: 'Create Product',
          themes,
          product,
          user: res.locals.currentUser,
          errors: errors.array(),
        });
      });
      return;
    }

    // Data from form is valid. Save product.
    product.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new product record.
      res.redirect(product.url);
    });
  },
];

exports.product_delete_get = (req, res, next) => {
  async.parallel(
    {
      product(callback) {
        Product.findById(req.params.id).populate('theme').exec(callback);
      },
      product_productinstances(callback) {
        ProductInstance.find({ product: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.product == null) {
        // No results.
        res.redirect('/catalog/products');
      }
      res.render('product_delete', {
        title: 'Delete Product',
        product: results.product,
        product_productinstances: results.product_productinstances,
        user: res.locals.currentUser,
      });
    }
  );
};

exports.product_delete_post = (req, res, next) => {
  // Assume the post has valid id (ie no validation/sanitization).
  async.parallel(
    {
      product(callback) {
        Product.findById(req.params.id).populate('theme').exec(callback);
      },
      product_productinstances(callback) {
        ProductInstance.find({ product: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // Success
      if (results.product_productinstances.length > 0) {
        // Product has product instances. Render in the same way as for GET route.
        res.render('product_delete', {
          title: 'Delete Product',
          product: results.product,
          product_productinstances: results.product_productinstances,
          user: res.locals.currentUser,
        });
        return;
      }
      // Product has no product instances. Delete object and redirect to list of products.
      Product.findByIdAndRemove(req.body.id, (err) => {
        if (err) {
          return next(err);
        }
        // Success - go to product list.
        res.redirect('/catalog/products');
      });
    }
  );
};

exports.product_update_get = (req, res, next) => {
  async.parallel(
    {
      product(callback) {
        Product.findById(req.params.id).populate('theme').exec(callback);
      },
      themes(callback) {
        Theme.find().exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.product == null) {
        // No results.
        const err = new Error('Product not found');
        err.status = 404;
        return next(err);
      }
      // Success.
      res.render('product_form', {
        title: 'Update Product',
        product: results.product,
        themes: results.themes,
        selected_theme: results.product.theme._id,
        user: res.locals.currentUser,
      });
    }
  );
};

exports.product_update_post = [
  // Validate and sanitize fields.
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('image', 'Image must not be empty.').trim().isLength({ min: 1 }),
  body('price', 'Price must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('pieceCount', 'Piece Count must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('setNumber', 'Set Number must not be empty.')
    .trim()
    .isLength({ min: 1 }),
  body('theme.*').escape(),
  body('difficulty').trim().escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Product object with escaped/trimmed data and old id.
    const product = new Product({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      pieceCount: req.body.pieceCount,
      setNumber: req.body.setNumber,
      theme: req.body.theme,
      difficulty: req.body.difficulty,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      //Get all Themes for form.
      Theme.find().exec((err, themes) => {
        if (err) {
          return next(err);
        }
        res.render('product_form', {
          title: 'Update Product',
          themes,
          product,
          user: res.locals.currentUser,

          errors: errors.array(),
        });
      });
      return;
    }

    // Data from form is valid. Update the record.
    Product.findByIdAndUpdate(req.params.id, product, {}, (err, theproduct) => {
      if (err) {
        return next(err);
      }

      // Successful: redirect to product detail page.
      res.redirect(theproduct.url);
    });
  },
];
