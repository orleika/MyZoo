/**
 * Module dependencies.
 */
var config = require('../config.json');

/**
 * Show the index
 */
exports.read = function (req, res) {
  res.render('index', {
    title: config.title,
    keyword: config.keyword,
    description: config.description,
    og_type: 'website',
    og_image: '',
    og_url: '',
    og_site: ''
  });
};
