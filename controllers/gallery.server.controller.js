/**
 * Module dependencies.
 */
var async = require('async'),
  fs = require('fs'),
  models = require('../models'),
  User = models.User,
  Gallery = models.Gallery;

/**
 * Create a Gallery
 */
exports.create = function (req, res) {
  var body = req.body,
    imageData = req.files.image;
    // soundData = req.files.sound;
  console.log(req.files);
  console.log(req.body);

  if (true || !body.id || !imageData) {
    res.status(400).send();
  } else {
    async.waterfall([
      function (callback) {
        console.log("pass2");
        user.findById(body.id, function (err, user) {
          if (err) {
            callback(err);
          } else {
            callback(user.name);
          }
        });
      },
      function (uname, allback) {
        console.log("pass3");
        var gallery = new Gallery();
        gallery.uid = body.id;
        gallery.uname = uname;
        gallery.name = body.name;
        gallery.text = body.text;
        // gallery.type = body.type;
        gallery.image = process.env.HOST + '/' + imageData.path;
        // gallery.sound = soundData;

        gallery.save(function (err) {
          if (err) {
            callback(err);
          } else {
            callback(null, gallery._id);
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
var randomGallery = function () {
  Gallery.find({}).limit(12).exec(
    function (err, galleries) {
      return galleries;
    });
};

var userGallery = function (uid) {
  Gallery.find({
    uid: uid
  }, function (err, galleries) {
    return galleries;
  });
};

exports.read = function (req, res) {
  var galleries;

  if (!req.query.id) {
    console.log("pass");
    galleries = randomGallery();
    res.json(galleries);
  } else if (req.query.id) {
    galleries = userGallery(req.query.id);
    res.json(galleries);
  } else {
    res.status(400).send();
  }
};
