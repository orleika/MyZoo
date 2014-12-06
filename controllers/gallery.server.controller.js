/**
 * Module dependencies.
 */
var async = require('async'),
  mongoose = require('mongoose'),
  Gallery = mongoose.model('Gallery'),
  Image = mongoose.model('Image');

/**
 * Create a Gallery
 */
exports.create = function (req, res) {
  var uid = req.body.id,
    name = req.body.name,
    text = req.body.text,
    type = req.body.type,
    imageDate = req.body.image,
    soundDate = req.body.sound;

  if (!id || !image) {
    res.status(400).send();
  } else {
    var gallery = new Gallery();
    gallery.uid = uid;
    gallery.name = name;
    gallery.text = text;
    gallery.type = type;
    gallery.sound = soundDate;

    async.waterfall([
      function (callback) {
        gallery.save(function (err) {
          if (err) {
            callback(err);
          } else {
            callback(null, gallery._id);
          }
        });
      },
      function (gid, callback) {
        var image = new Image();
        image.gid = gid;
        image.data = image;

        iamge.save(function (err) {
          if (err) {
            callback(err);
          } else {
            callback(null, image._id);
          }
        });
      },
      function (imgid, callback) {
        var host = process.env.HOST,
          imageURL = host + "/image?" + imgid;

        Gallery.update({
          _id: gid
        }, {
          $set: {
            "image": imageURL
          }
        });
      }
    ], function (err) {
      if (err) {
        console.log(err);
        res.status(400).send('Bad Request');
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
