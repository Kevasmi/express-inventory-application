const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

/// AUTHENTICATION ROUTES ///

/// SIGN-UP ///
router.get('/sign-up', user_controller.sign_up_get);
router.post('/sign-up', user_controller.sign_up_post);

/// LOG-IN ///
router.get('/log-in', user_controller.log_in_get);
router.post('/log-in', user_controller.log_in_post);
router.get('/sign-out', user_controller.sign_out);

module.exports = router;
