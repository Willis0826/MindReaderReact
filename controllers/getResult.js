var Result = require('../models/Result');

module.exports = function(req, res, next){
  var result = new Result(req.body);

  Result.findOne({}).exec(function(err, result){
    if (err) throw err;
    var resObejct = new Object();
    resObejct.result = result.profession;
    resObejct.barColors = [
                          'rgba(255, 99, 132, 0.4)',
                          'rgba(54, 162, 235, 0.4)',
                          'rgba(255, 206, 86, 0.4)',
                          'rgba(75, 192, 192, 0.4)',
                          'rgba(153, 102, 255, 0.24)',
                          'rgba(255, 159, 64, 0.4)',
                          'rgba(202, 149, 84, 0.4)',
                          'rgba(22, 14, 184, 0.4)',
                          'rgba(52, 114, 14, 0.4)',
                          'rgba(70, 140, 54, 0.4)'
                          ];
    resObejct.barBorderColors = [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                          'rgba(202, 149, 84, 1)',
                          'rgba(22, 14, 184, 1)',
                          'rgba(52, 114, 14, 1)',
                          'rgba(70, 140, 54, 1)',
                          ];
    res.json(resObejct);
  });
};
