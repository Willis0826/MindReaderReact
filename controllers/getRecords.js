var Record = require('../models/Record');

module.exports = function(req, res, next){
  var record = new Record(req.body);

  Record.find({}).exec(function(err, records){
    if (err) throw err;
    res.json(posts);
  });
};
