var Record = require('../models/Record');

module.exports = function(req, res, next){
  var record = new Record(req.body);

  record.save(function(err){
  	if (err) throw err;
  	console.log('record saved!');
    res.end();
  });
};
