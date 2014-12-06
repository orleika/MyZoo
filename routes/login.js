var express = require('express'),
  router = express.Router();

/**
 * Module dependencies.
 */
var login = require('../controllers/login.server.controller');

router.post('/', login.create);

module.exports = router;
