/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  url = process.env.MONGODB_URI;

var db = mongoose.createConnection(url, function (err, res) {
  if (err) {
    console.log('Error connected: ' + url + ' - ' + err);
  } else {
    console.log('Success connected: ' + url);
  }
});

/**
 * User Schema
 */
var UserSchema = new Schema({
  name: String,
  date: {
    type: Date,
    default: Date.now
  }
});

exports.User = db.model('User', UserSchema);

/**
 * Gallery Schema
 */
var GallerySchema = new Schema({
  uid: ObjectId,
  uname: String,
  name: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  type: String,
  lat: String,
  lng: String,
  image: {
    url: String
  },
  sound: {
    url: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

exports.Gallery = db.model('Gallery', GallerySchema);
