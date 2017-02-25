var Record = require('../models/Record');

module.exports = function(req, res, next){
  //將使用者上傳的時間  分類到相對應的場次
  var recordObject = {
    eventName: req.body.eventName,
    professions: [
      {profession: '警察',
      count: 0},
      {profession: '工程師',
      count: 0},
      {profession: '作家',
      count: 0},
      {profession: '老師',
      count: 0},
      {profession: '翻譯',
      count: 0},
      {profession: '農夫',
      count: 0},
    ]
  }
  Record.findOneOrCreate({eventName: req.body.eventName}, recordObject,(err, record)=>{
    for(var i = 0 ; i < record.professions.length ; i++){
      if(record.professions[i].profession == req.body.profession){
        record.professions[i].count++;
        break;
      }
    }
    record.save(function(err){
      if (err) throw err;
      res.end();
    });
  });
};
