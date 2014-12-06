/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Gallery = mongoose.model('Gallery');

/**
 * Create a Gallery
 */
exports.create = function (req, res) {
  var uid = req.body.id,
    name = req.body.name,
    text = req.body.text,
    type = req.body.type,
    image = req.body.image,
    sound = req.body.sound;

  if (!id || !image) {
    res.status(400).send();
  } else {
    var gallery = new Gallery();
    gallery.uid = uid;
    gallery.name = name;
    gallery.text = text;
    gallery.type = type;
    gallery.image = image;
    gallery.sound = sound;

    gallery.save(function (err) {
      if (err) {
        res.status(400).send();
      } else {
        res.json({
          "suceess": true
        });
      }
    });
  }
};

/**
 * Show the Gallery
 */
var randomGallery = function (id, res) {

};

var userGallery = function (res) {

};

exports.read = function (req, res) {
  if (!req) {
    userGallery(res);
  } else if (req.query.id) {
    randomGallery(req.query.id, res);
  } else {
    res.status(400).send();
  }
};
