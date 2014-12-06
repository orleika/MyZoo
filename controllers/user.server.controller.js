/**
 * Module dependencies.
 */
var models = require('../models'),
  User = models.User;

/**
 * Read a User
 */
exports.read = function (req, res) {
  var id = req.query.id;

  if (!id) {
    res.status(400).send();
  } else {
    User.findById(id, function (err, user) {
      if (err) {
        res.status(400).send();
      } else {
        res.json(user);
      }
    });
  }
};
