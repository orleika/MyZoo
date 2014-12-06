/**
 * Show the index
 */
exports.read = function(req, res) {
  res.json(res.render('index'));
};