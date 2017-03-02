var Record = require('../models/Record');
const schoolList = ['國北教','文化','台科大','世新','師大','中原','北商','東吳','淡江','圓山花博'];
module.exports = function(req, res, next){
  var schoolName = schoolList[req.query.index];
  Record.findOne({eventName: schoolName}).exec(function(err, record){
    if(err) throw err;
    var resObejct = new Object();
    resObejct.count = [];
    resObejct.profession = [];
    //分割成兩個獨立的陣列，以方便前端產生 Chart.js
    record.professions.forEach(function(profession){
      resObejct.profession.push(profession.profession);
      resObejct.count.push(profession.count);
    });
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
                          'rgba(70, 140, 54, 0.4)',
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
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                          'rgba(202, 149, 84, 1)',
                          'rgba(22, 14, 184, 1)',
                          'rgba(52, 114, 14, 1)',
                          'rgba(70, 140, 54, 1)'
                          ];
    res.json(resObejct);
  });
};
