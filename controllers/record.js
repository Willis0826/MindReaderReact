var Record = require('../models/Record');

module.exports = function(req, res, next){
  //將使用者上傳的時間  分類到相對應的場次
  var recordObject = {
    eventName: req.body.eventName,
    professions: [
      {profession: '軍人',
      count: 0},
      {profession: '空服員',
      count: 0},
      {profession: '記者',
      count: 0},
      {profession: '業務',
      count: 0},
      {profession: '警察',
      count: 0},
      {profession: '翻譯',
      count: 0},
      {profession: '農夫',
      count: 0},
      {profession: '銀行員',
      count: 0},
      {profession: '工程師',
      count: 0},
      {profession: '廚師',
      count: 0},
      {profession: '建築師',
      count: 0},
      {profession: '攝影師',
      count: 0},
      {profession: '廣告設計',
      count: 0},
      {profession: '運動員',
      count: 0},
      {profession: '老師',
      count: 0},
      {profession: '作家',
      count: 0},
      {profession: '律師',
      count: 0},
      {profession: '藝人',
      count: 0},
      {profession: '導遊',
      count: 0},
      {profession: '醫生',
      count: 0}
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
