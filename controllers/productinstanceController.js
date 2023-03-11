const ProductInstance = require('../models/productinstance');
const Product = require('../models/product');

const async = require('async');
const { body, validationResult } = require('express-validator');

// Display list of all ProductInstances.
exports.productinstance_list = (req, res, next) => {
  ProductInstance.find()
    .populate('product')
    .exec((err, list_productinstance) => {
      if (err) {
        return next(err);
      }
      // Successful, so render.
      res.render('productinstance_list', {
        title: 'Inventory',
        list_productinstance,
        user: res.locals.currentUser,
      });
    });
};

// Display detail page for a specfic ProductInstance.
exports.productinstance_detail = (req, res, next) => {
  ProductInstance.findById(req.params.id)
    .populate('product')
    .exec((err, productinstance) => {
      if (err) {
        return next(err);
      }
      if (productinstance == null) {
        // No results.
        const err = new Error('Product instance not found.');
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render('productinstance_detail', {
        title: `${productinstance.product.name}: ${productinstance._id}`,
        productinstance,
        user: res.locals.currentUser,
      });
    });
};

// Display ProductInstance create form on GET.
exports.productinstance_create_get = (req, res, next) => {
  // Get all products, which we can add to our product.
  Product.find()
    .populate('theme')
    .exec((err, products) => {
      if (err) {
        return next(err);
      }
      res.render('productinstance_form', {
        title: 'Create Inventory',
        products,
        user: res.locals.currentUser,
      });
    });
};

// Handle ProductInstance create on POST.
exports.productinstance_create_post = [
  // Validate and sanitize fields.
  body('product.*').escape(),
  body('status').trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a ProductInstance object with escaped and trimmed data.
    const productinstance = new ProductInstance({
      product: req.body.product,
      status: req.body.status,
    });

    if (!errors.isEmpty()) {
      //There are errors. Render form again with sanitized values/error messages.

      // Get all products for form.
      Product.find()
        .populate('theme')
        .exec((err, products) => {
          if (err) {
            return next(err);
          }
          res.render('productinstance_form', {
            title: 'Create Inventory',
            products,
            user: res.locals.currentUser,
            errors: errors.array(),
          });
        });
      return;
    }

    // Data from form is valid. Save product instance.
    productinstance.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new product record.
      res.redirect(productinstance.url);
    });
  },
];

// Display ProductInstance delete form on GET.
exports.productinstance_delete_get = (req, res, next) => {
  ProductInstance.findById(req.params.id)
    .populate('product')
    .exec((err, productinstance) => {
      if (err) {
        return next(err);
      }
      if (productinstance == null) {
        // No results.
        res.redirect('/catalog/productinstances');
      }
      // Successful, so render.
      res.render('productinstance_delete', {
        title: 'Delete Inventory',
        productinstance,
        user: res.locals.currentUser,
      });
    });
};

// Handle ProductInstance delete on POST.
exports.productinstance_delete_post = (req, res, next) => {
  // Assume valid ProductInstance id in field.
  ProductInstance.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      return next(err);
    }
    // Success, so redirect to list of ProductInstance items.
    res.redirect('/catalog/productinstances');
  });
};

// Display ProductInstance update form on GET.
exports.productinstance_update_get = (req, res, next) => {
  async.parallel(
    {
      productinstance(callback) {
        ProductInstance.findById(req.params.id)
          .populate('product')
          .exec(callback);
      },
      products(callback) {
        Product.find().populate('theme').exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.productinstance == null) {
        // No results.
        let err = new Error('Product instance not found');
        err.status = 404;
        return next(err);
      }
      res.render('productinstance_form', {
        title: 'Update Inventory',
        productinstance: results.productinstance,
        products: results.products,
        selected_product: results.productinstance.product._id,
        user: res.locals.currentUser,
      });
    }
  );
};

// Handle ProductInstance update on POST.
exports.productinstance_update_post = [
  // Validate and sanitize fields.
  body('product.*').escape(),
  body('status').trim().escape(),

  // process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a ProductInstance object with escaped/trimmed data and current id.
    let productinstance = new ProductInstance({
      product: req.body.product,
      status: req.body.status,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors so render the form again, passing sanitized values and errors.
      Product.find()
        .populate('theme')
        .exec((err, products) => {
          if (err) {
            return next(err);
          }
          // Successful, so render.
          res.render('productinstance_form', {
            title: 'Update Inventory',
            productinstance,
            products,
            user: res.locals.currentUser,
            errors: errors.array(),
          });
        });
      return;
    } else {
      // Data from form is valid.
      ProductInstance.findByIdAndUpdate(
        req.params.id,
        productinstance,
        {},
        (err, theproductinstance) => {
          if (err) {
            return next(err);
          }
          // Successful - redirect to detail page.
          res.redirect(theproductinstance.url);
        }
      );
    }
  },
];
