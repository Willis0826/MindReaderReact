var Record = require('../models/Record');

module.exports = function(req, res, next){
  var record = new Record(req.body);

  Record.find({}).exec(function(err, records){
    if (err) throw err;
    var resObejct = new Object();
    resObejct.records = [0,0,0,0,0 ,0,0,0,0,0];
    resObejct.schools = ['國北教','文化','台科大','世新','師大','中原','北商','東吳','淡江','圓山花博'];
    var j = 0;
    for(var i = 0 ; i < 10 ; i++){
      if(j < records.length){
        if(records[j].eventName == resObejct.schools[i]){
          var countSum = 0;
          for(var k = 0 ; k < records[j].professions.length ; k++){
            countSum += records[j].professions[k].count;
          }
          resObejct.records[i] = countSum;
          j++;
        }
      }
    }
    console.log(records);
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
