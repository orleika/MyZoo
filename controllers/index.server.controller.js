/**
 * Module dependencies.
 */
var async = require('async'),
  models = require('../models'),
  Gallery = models.Gallery,
  config = require('../config.json');

/**
 * Show the index
 */
exports.read = function (req, res) {
  async.waterfall([
    function (callback) {
      Gallery.find().limit(12).exec(
        function (err, galleries) {
          if (err) {
            callback(err);
          } else {
            callback(null, galleries);
          }
        });
    },
    function (galleries, callback) {
      res.render('index', {
        title: config.title,
        keywords: config.keywords,
        description: config.description,
        og_type: 'website',
        og_image: process.env.HOST + config.og_image,
        og_url: process.env.HOST + '/',
        og_site: config.og_site,
        galleries: galleries
      });
    }
  ], function (err) {
    if (err) {
      console.log(err);
      var error = new Error(err);
      error.status = 400;
      error.message = 'Bad Request';
      next(error);
    }
  });
};
