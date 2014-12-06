var express = require('express'),
  router = express.Router();

/**
 * Module dependencies.
 */
var gallery = require('../controllers/gallery.server.controller');

router.get('/', gallery.read);
router.post('/', gallery.create);

module.exports = router;
