var express = require('express'),
  router = express.Router();

/**
 * Module dependencies.
 */
var user = require('../controllers/user.server.controller');

router.get('/', user.read);

module.exports = router;
