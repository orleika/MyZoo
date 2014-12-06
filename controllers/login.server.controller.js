/**
 * Module dependencies.
 */
var models = require('../models'),
  User = models.User;

/**
 * Create a User
 */
exports.create = function (req, res) {
  if (!req.body.name) {
    res.status(400).send();
  } else {
    var user = new User();
    user.name = req.body.name;

    user.save(function (err) {
      if (err) {
        res.status(400).send({
          id: 0
        });
      } else {
        res.json({
          id: user._id
        });
      }
    });
  }
};
