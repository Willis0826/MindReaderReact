var Record = require('../models/Record');

module.exports = function(req, res, next){
  var record = new Record(req.body);

  Record.find({}).exec(function(err, records){
    if (err) throw err;
    var resObejct = new Object();
    resObejct.records = records;
    resObejct.schools = ['國北教','台科大','北銘傳','北市商','東吳','東海','淡江','師大','中央','中原','高應大','文化','輔仁','政大'];
    res.json(resObejct);
  });
};
