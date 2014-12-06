/**
 * Module dependencies.
 */
var async = require('async'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
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
    imageData = req.body.image,
    soundData = req.body.sound;
  console.log(req.body);
  console.log("pass1");

  if (!uid || !imageData) {
    res.status(400).send();
  } else {
    async.waterfall([
      function (callback) {
        console.log("pass2");
        user.findById(uid, function (err, user) {
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
        gallery.uid = uid;
        gallery.uname = uname;
        gallery.name = name;
        gallery.text = text;
        gallery.type = type;
        gallery.sound = soundData;

        gallery.save(function (err) {
          if (err) {
            callback(err);
          } else {
            callback(null, gallery._id);
          }
        });
      },
      function (gid, callback) {
        console.log("pass4");
        var image = new Image();
        image.gid = gid;
        image.data = imageData;

        iamge.save(function (err) {
          if (err) {
            callback(err);
          } else {
            callback(null, image._id);
          }
        });
      },
      function (imgid, callback) {
        console.log("pass5");
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
