var Result = require('../models/Result');

module.exports = function(req, res, next){
  var resultObject = {
    professions: [
      {profession: '軍人',
      right: 0,
      wrong: 0},
      {profession: '空服人員',
      right: 0,
      wrong: 0},
      {profession: '記者',
      right: 0,
      wrong: 0},
      {profession: '業務',
      right: 0,
      wrong: 0},
      {profession: '警察',
      right: 0,
      wrong: 0},
      {profession: '翻譯',
      right: 0,
      wrong: 0},
      {profession: '農夫',
      right: 0,
      wrong: 0},
      {profession: '銀行員',
      right: 0,
      wrong: 0},
      {profession: '工程師',
      right: 0,
      wrong: 0},
      {profession: '廚師',
      right: 0,
      wrong: 0},
      {profession: '建築師',
      right: 0,
      wrong: 0},
      {profession: '攝影師',
      right: 0,
      wrong: 0},
      {profession: '廣告設計',
      right: 0,
      wrong: 0},
      {profession: '運動員',
      right: 0,
      wrong: 0},
      {profession: '老師',
      right: 0,
      wrong: 0},
      {profession: '作家',
      right: 0,
      wrong: 0},
      {profession: '律師',
      right: 0,
      wrong: 0},
      {profession: '藝人',
      right: 0,
      wrong: 0},
      {profession: '導遊',
      right: 0,
      wrong: 0},
      {profession: '醫生',
      right: 0,
      wrong: 0},
    ]
  }
  Result.findOneOrCreate({}, resultObject,(err, result)=>{
    for(var i = 0 ; i < result.professions.length ; i++){
      if(result.professions[i].profession == req.body.profession && req.body.isRight == 0){
        //不是正確答案
        result.professions[i].wrong++;
        break;
      }
      else if(result.professions[i].profession == req.body.profession && req.body.isRight == 1){
        //是正確答案
        result.professions[i].right++;
        break;
      }
    }
    result.save(function(err){
      if (err) throw err;
      res.end();
    });
  });
};
