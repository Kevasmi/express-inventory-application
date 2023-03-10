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
        user: res.locals.currentUser,
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
        user: res.locals.currentUser,
      });
    }
  );
};

// Display theme create form on GET.
exports.theme_create_get = (req, res, next) => {
  res.render('theme_form', {
    title: 'Create Theme',
    user: res.locals.currentUser,
  });
};

// Handle theme create on POST.
exports.theme_create_post = [
  // Validate and sanitize fields.
  body('name').trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Theme with escaped and trimmed data.
    const theme = new Theme({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      res.render('theme_form', {
        title: 'Create Theme',
        theme,
        user: res.locals.currentUser,
        errors: errors.array(),
      });
    }

    // Data from form is valid. Save product.
    theme.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new theme record.
      res.redirect(theme.url);
    });
  },
];

exports.theme_delete_get = (req, res, next) => {
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
        res.redirect('/catalog/themes');
      }
      // Successful, so render.
      res.render('theme_delete', {
        title: `Delete Theme`,
        theme: results.theme,
        theme_products: results.theme_products,
        user: res.locals.currentUser,
      });
    }
  );
};

exports.theme_delete_post = (req, res, next) => {
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
      // Success
      if (results.theme_products > 0) {
        // Theme has products. Render in the same way as for GET route.
        res.render('theme_delete', {
          title: 'Delete Theme',
          theme: results.theme,
          theme_products: results.theme_products,
          user: res.locals.currentUser,
        });
        return;
      } else {
        // Theme has no products. Delete object and redirect to the list of genres.
        Theme.findByIdAndRemove(req.body.themeid, (err) => {
          if (err) {
            return next(err);
          }
          // Successful - so redirect to genre list.
          res.redirect('/catalog/themes');
        });
      }
    }
  );
};

exports.theme_update_get = (req, res, next) => {
  Theme.findById(req.params.id, (err, theme) => {
    if (err) {
      return next(err);
    }
    if (theme == null) {
      var err = new Error('Theme not found');
      err.status = 404;
      return next(err);
    }
    res.render('theme_form', {
      title: 'Update Theme',
      theme,
      user: res.locals.currentUser,
    });
  });
};

exports.theme_update_post = [
  // validate and sanitize te name field.
  body('name', 'Theme name required').trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    let errors = validationResult(req);

    // Create a Theme object with escaped/trimmed data and old id.
    const theme = new Theme({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values and error messages.
      res.render('theme_form', {
        title: 'Update Theme',
        theme,
        user: res.locals.currentUser,
        errors: errors.array(),
      });
      return;
    }
    // Data from form is valid. Update the record.
    Theme.findByIdAndUpdate(req.params.id, theme, {}, (err, thetheme) => {
      if (err) {
        return next(err);
      }
      // Successful - redirect to theme detail page.
      res.redirect(thetheme.url);
    });
  },
];
