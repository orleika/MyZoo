var express = require('express'),
  router = express.Router();

/**
 * Module dependencies.
 */
var post = require('../controllers/post.server.controller');

router.get('/', post.create);

module.exports = router;
