var express = require('express'),
  router = express.Router();

/**
 * Module dependencies.
 */
var image = require('../controllers/image.server.controller');

router.get('/:id', image.read);

module.exports = router;
