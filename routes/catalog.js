const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/productController');
const product_instance_controller = require('../controllers/productinstanceController');
const theme_controller = require('../controllers/themeController');

/// PRODUCT ROUTES ///

/// GET catalog home page.
router.get('/', product_controller.index);

// GET request for creating a Product.
router.get('/product/create', product_controller.product_create_get);

// POST request for creating a Product.
router.post('/product/create', product_controller.product_create_post);

// GET request for deleting a Product.
router.get('/product/:id/delete', product_controller.product_delete_get);

// POST request for deleteing a Product.
router.post('/product/:id/delete', product_controller.product_delete_post);

// GET request for updating a Product.
router.get('/product/:id/update', product_controller.product_update_get);

// POST request for updating a Product.
router.post('/product/:id/update', product_controller.product_update_post);

// GET request for one Product.
router.get('/product/:id', product_controller.product_detail);

// GET request for list of all Products.
router.get('/products', product_controller.product_list);

/// PRODUCTINSTANCE ROUTES ///

// GET request for creating a ProductInstance.
router.get(
  '/productinstance/create',
  product_instance_controller.productinstance_create_get
);

// POST request for creating a ProductInstance.
router.post(
  '/productinstance/create',
  product_instance_controller.productinstance_create_post
);

// GET request to delete ProductInstance.
router.get(
  '/productinstance/:id/delete',
  product_instance_controller.productinstance_delete_get
);

// POST request to delete ProductInstance.
router.post(
  '/productinstance/:id/delete',
  product_instance_controller.productinstance_delete_post
);

// GET request to update ProductInstance.
router.get(
  '/productinstance/:id/update',
  product_instance_controller.productinstance_update_get
);

// POST request to update ProductInstance.
router.post(
  '/productinstance/:id/update',
  product_instance_controller.productinstance_update_post
);

// GET request for one ProductInstance.
router.get(
  '/productinstance/:id',
  product_instance_controller.productinstance_detail
);

// GET request for list of all ProductInstances.
router.get(
  '/productinstances',
  product_instance_controller.productinstance_list
);

/// THEME ROUTES ///

// GET request for creating a Theme. NOTE This must come before route that displays Theme (uses id).
router.get('/theme/create', theme_controller.theme_create_get);

//POST request for creating Theme.
router.post('/theme/create', theme_controller.theme_create_post);

// GET request to delete Theme.
router.get('/theme/:id/delete', theme_controller.theme_delete_get);

// POST request to delete Theme.
router.post('/theme/:id/delete', theme_controller.theme_delete_post);

// GET request to update Theme.
router.get('/theme/:id/update', theme_controller.theme_update_get);

// POST request to update Theme.
router.post('/theme/:id/update', theme_controller.theme_update_post);

// GET request for one Theme.
router.get('/theme/:id', theme_controller.theme_detail);

// GET request for list of all Themes.
router.get('/theme/', theme_controller.theme_list);

module.exports = router;
