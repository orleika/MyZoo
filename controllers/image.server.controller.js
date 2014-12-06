/**
 * Module dependencies.
 */
var models = require('../models'),
  Image = models.Image;

/**
 * Show the Image
 */

exports.read = function (req, res) {
  if (!req.param.id) {
    res.status(404).send();
  } else {
    var id = req.param.id;

    Image.findById(id, function (err, image) {
      res.send(image.data);
    });
  }
};
